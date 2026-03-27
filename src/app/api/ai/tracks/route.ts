import { createClient } from "@/lib/supabase/server"
import { checkUserQuota, logUserAction } from "@/lib/security/quota"
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Check quota
    if (user.email !== 'automatize05@gmail.com') {
      const quota = await checkUserQuota(user.id, 'ai_tracks_generate')
      if (!quota.allowed) {
        return NextResponse.json({
          error: "Quota Exceeded",
          requiresUpgrade: quota.requiresUpgrade,
          message: quota.message
        }, { status: 429 })
      }
    }

    const { targetRole, currentLevel } = await req.json()

    // Professional Career Track Prompt
    const systemPrompt = `Você é um Arquiteto de Carreiras IA especializado no mercado de tecnologia e corporativo global e de Angola.
Sua tarefa é criar uma Trilhas de Aprendizagem (Career Track) dinâmica, baseada em tendências reais de 2026.

REGRAS:
1. Divida a trilha em marcos lógicos (Milestones).
2. Para cada marco, sugira recursos REAIS (ex: "Curso de [X] no Coursera", "Documentação oficial de [Y]", "Canal YouTube [Z]").
3. Inclua uma estimativa de tempo e nível de dificuldade.
4. Adicione uma seção de "Diferenciais para o Mercado Angolano".

Responda APENAS em JSON:
{
  "track_title": "Título da Trilha",
  "overview": "Breve resumo da jornada",
  "milestones": [
    {
      "step": 1,
      "title": "Fundamentos de...",
      "description": "O que aprender aqui",
      "resources": ["Link ou Nome do Recurso 1", "Recurso 2"],
      "duration": "2 semanas"
    }
  ],
  "market_tips": ["Dica 1", "Dica 2"],
  "salary_expectation": "Estimativa salarial para este cargo"
}`

    const userMessage = `Crie uma trilha para o cargo de: ${targetRole}. 
Nível atual do usuário: ${currentLevel}.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    // Log action
    await logUserAction(user.id, 'ai_tracks_generate')

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI Tracks API Error:", error)
    return NextResponse.json({ error: "Falha ao gerar trilha de carreira." }, { status: 500 })
  }
}
