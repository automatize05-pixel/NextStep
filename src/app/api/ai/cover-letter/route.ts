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

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.email !== 'automatize05@gmail.com') {
      const quota = await checkUserQuota(user.id, 'ai_cover_letter')
      if (!quota.allowed) {
        return NextResponse.json({
          error: "Quota Exceeded",
          message: `Limite diário de cartas atingido. Faça upgrade do seu plano!`
        }, { status: 429 })
      }
    }

    const { jobTitle, companyName, userProfile } = await req.json()

    if (!jobTitle) {
      return NextResponse.json({ error: "jobTitle is required" }, { status: 400 })
    }

    const systemPrompt = `
Você é um especialista em redação profissional com foco no mercado angolano.
Escreva uma carta de apresentação profissional, persuasiva e personalizada.
Use linguagem formal/profissional em Português (pt-AO/pt-BR).
Estrutura: Abertura impactante, Corpo (3 parágrafos: motivação, competências, valor), Encerramento.
Máximo de 350 palavras.
`

    const userMessage = `
Escreva uma carta de apresentação para:
- Cargo pretendido: ${jobTitle}
- Empresa: ${companyName || 'Empresa não especificada'}
- Perfil do candidato: ${userProfile ? JSON.stringify(userProfile) : 'Profissional motivado e ambicioso'}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.75,
      max_tokens: 600,
    })

    const content = completion.choices[0].message.content || ''

    // Save to DB
    const { data: saved } = await supabase
      .from('cover_letters')
      .insert({
        user_id: user.id,
        job_title: jobTitle,
        company_name: companyName || null,
        content
      })
      .select('id')
      .single()

    await logUserAction(user.id, 'ai_cover_letter')

    return NextResponse.json({ content, id: saved?.id })
  } catch (error) {
    console.error("Cover Letter API error:", error)
    return NextResponse.json({ error: "Falha ao gerar a carta." }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data } = await supabase
      .from('cover_letters')
      .select('id, job_title, company_name, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    return NextResponse.json({ letters: data || [] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
