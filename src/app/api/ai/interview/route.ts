import { createClient } from "@/lib/supabase/server"
import { checkUserQuota, logUserAction } from "@/lib/security/quota"
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = (topic: string) => `
Você é um recrutador especialista e experiente realizando uma entrevista profissional real para a função/área: "${topic}".
Regras estritas:
- Conduza a entrevista em Português (pt-BR/pt-AO).
- Seja profissional, direto e encorajador.
- Faça UMA pergunta por vez.
- Após a resposta do candidato, avalie brevemente em 1-2 frases e faça a próxima pergunta.
- Após 5-6 perguntas, encerre com uma avaliação geral e pontuação de 0-100.
`

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check Quota (admin is exempt)
    if (user.email !== 'automatize05@gmail.com') {
      const quota = await checkUserQuota(user.id, 'ai_interview')
      if (!quota.allowed) {
        return NextResponse.json({ 
          error: "Quota Exceeded", 
          message: `Você atingiu seu limite diário de ${quota.limit} simulações. Faça upgrade do seu plano ou volte amanhã!` 
        }, { status: 429 })
      }
    }

    const { action, topic, history, sessionId } = await req.json()

    if (action === 'start') {
      // Create a new interview session in DB
      const { data: session } = await supabase
        .from('interview_sessions')
        .insert({ user_id: user.id, topic, messages: [] })
        .select('id')
        .single()

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT(topic) },
          { role: "user", content: "Pode começar a entrevista." }
        ],
        temperature: 0.7,
        max_tokens: 300,
      })

      await logUserAction(user.id, 'ai_interview')

      return NextResponse.json({ 
        question: completion.choices[0].message.content,
        sessionId: session?.id
      })
    }

    if (action === 'answer') {
      const messages = (history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }))

      messages.unshift({ role: "system", content: SYSTEM_PROMPT(topic) })

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 400,
      })

      const reply = completion.choices[0].message.content

      // Update session messages in DB
      if (sessionId) {
        await supabase
          .from('interview_sessions')
          .update({ messages: history })
          .eq('id', sessionId)
          .eq('user_id', user.id)
      }

      return NextResponse.json({ reply })
    }

    if (action === 'finish') {
      // Extract score from final message using AI
      const scoreCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Based on the interview history provided, give only a JSON object like: {\"score\": 75, \"feedback\": \"Ótima performance geral...\"}. Score from 0-100." },
          { role: "user", content: JSON.stringify(history) }
        ],
        response_format: { type: "json_object" },
        max_tokens: 200,
      })

      let scoreData = { score: 70, feedback: "Boa entrevista!" }
      try {
        scoreData = JSON.parse(scoreCompletion.choices[0].message.content || '{}')
      } catch (e) { /* keep defaults */ }

      // Save completed session
      if (sessionId) {
        await supabase
          .from('interview_sessions')
          .update({ 
            messages: history, 
            score: scoreData.score, 
            feedback: scoreData.feedback,
            completed_at: new Date().toISOString()
          })
          .eq('id', sessionId)
          .eq('user_id', user.id)
      }

      return NextResponse.json(scoreData)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Interview API error:", error)
    return NextResponse.json({ error: "Falha ao processar a requisição." }, { status: 500 })
  }
}
