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
      const quota = await checkUserQuota(user.id, 'ai_salary')
      if (!quota.allowed) {
        return NextResponse.json({ error: "Quota Exceeded", message: "Limite diário atingido. Faça upgrade!" }, { status: 429 })
      }
    }

    const { jobTitle, sector, yearsExperience, location, skills } = await req.json()

    if (!jobTitle) return NextResponse.json({ error: "jobTitle required" }, { status: 400 })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em mercado laboral e remuneração de Angola (Luanda, Benguela, Huambo, outras províncias). 
Responda APENAS em JSON no formato: 
{
  "min_kz": number,
  "median_kz": number,
  "max_kz": number,
  "min_usd": number,
  "median_usd": number,
  "max_usd": number,
  "insights": ["insight1", "insight2", "insight3"],
  "market_demand": "Alta|Média|Baixa",
  "recommendation": "texto curto de aconselhamento"
}
Base a análise no mercado angolano atual (2026). Considera inflação, setor petrolífero, multinacionais, setor público e privado local.`
        },
        {
          role: "user",
          content: `Analisa o salário justo para:
- Cargo: ${jobTitle}
- Setor: ${sector || 'Não especificado'}
- Anos de experiência: ${yearsExperience || 0}
- Localização: ${location || 'Luanda'}
- Skills principais: ${skills ? skills.join(', ') : 'Não especificado'}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 500,
    })

    await logUserAction(user.id, 'ai_salary')

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(result)
  } catch (error) {
    console.error("Salary API error:", error)
    return NextResponse.json({ error: "Falha ao analisar salário." }, { status: 500 })
  }
}
