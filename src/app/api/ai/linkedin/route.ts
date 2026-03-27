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

    if (user.email !== 'automatize05@gmail.com') {
      const quota = await checkUserQuota(user.id, 'ai_linkedin')
      if (!quota.allowed) {
        return NextResponse.json({ error: "Quota Exceeded", message: "Limite diário atingido. Faça upgrade!" }, { status: 429 })
      }
    }

    const { title, bio, skills, yearsExperience } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em SEO para LinkedIn e employer branding focado no mercado africano e angolano.
Responda APENAS em JSON no formato:
{
  "optimized_headline": "string (max 220 chars)",
  "optimized_about": "string (max 2000 chars)",
  "top_keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
  "skills_to_add": ["skill1", "skill2", "skill3"],
  "tips": ["dica1", "dica2", "dica3"]
}`
        },
        {
          role: "user",
          content: `Otimiza o perfil LinkedIn para:
- Título atual: ${title || 'Não definido'}
- Bio atual: ${bio || 'Não definido'}
- Skills: ${skills ? skills.join(', ') : 'Não especificado'}
- Anos de experiência: ${yearsExperience || 0}
Foco em recrutadores no mercado angolano, CPLP e multinacionais.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 800,
    })

    await logUserAction(user.id, 'ai_linkedin')

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(result)
  } catch (error) {
    console.error("LinkedIn API error:", error)
    return NextResponse.json({ error: "Falha ao otimizar perfil." }, { status: 500 })
  }
}
