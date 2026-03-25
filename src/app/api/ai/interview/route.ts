import { createClient } from "@/lib/supabase/server"
import { checkUserQuota, logUserAction } from "@/lib/security/quota"
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check Quota for Interview
    const quota = await checkUserQuota(user.id, 'ai_interview')
    if (!quota.allowed && user.email !== 'automatize05@gmail.com') {
      return NextResponse.json({ 
        error: "Quota Exceeded", 
        message: `Você atingiu seu limite diário de ${quota.limit} simulações. Volte amanhã!` 
      }, { status: 429 })
    }

    const { action, topic, history } = await req.json()
    
    // Log action
    await logUserAction(user.id, 'ai_interview')

    if (action === 'start') {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert technical and behavioral interviewer for a company. You are interviewing a candidate for the following role/topic: " + topic + ". Ask the very first interview question. Be professional, concise, and speak in Portuguese (pt-BR)." }
        ],
      })

      return NextResponse.json({ question: completion.choices[0].message.content })
    }

    if (action === 'answer') {
      // Map history to OpenAI format
      const messages = history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }))

      messages.unshift({ 
        role: "system", 
        content: `You are an expert interviewer for the role/topic: ${topic}. The user is answering your previous question. Evaluate their answer briefly (1-2 sentences), then ask the NEXT question. Keep it professional, encouraging, and in Portuguese (pt-BR).`
      })

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      })

      return NextResponse.json({ reply: completion.choices[0].message.content })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
