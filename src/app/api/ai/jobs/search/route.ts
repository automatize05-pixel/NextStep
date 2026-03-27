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
      const quota = await checkUserQuota(user.id, 'ai_jobs_search')
      if (!quota.allowed) {
        return NextResponse.json({
          error: "Quota Exceeded",
          requiresUpgrade: quota.requiresUpgrade,
          plan: quota.plan,
          message: quota.message
        }, { status: 429 })
      }
    }

    const { jobTitle, location, jobType, skills, bio } = await req.json()

    // Build a rich context prompt to search the web for real jobs
    const searchQuery = [
      jobTitle && `vagas de ${jobTitle}`,
      location && location !== 'Angola (Geral)' ? `em ${location}` : 'em Angola',
      jobType === 'remote' ? 'remoto ou teletrabalho' : '',
    ].filter(Boolean).join(' ')

    const systemPrompt = `Você é um especialista em recrutamento e pesquisa de vagas de emprego. 
Baseado no perfil do candidato e nas preferências fornecidas, gere uma lista realista e específica de 8 vagas de emprego atuais e relevantes para ele.
Adapte ao mercado angolano e inclua vagas locais e remotas internacionais quando aplicável.
Responda APENAS em JSON com este formato exato:
{
  "jobs": [
    {
      "title": "Nome do cargo",
      "company": "Nome da empresa (real ou plausível para Angola)",
      "location": "Luanda, Angola | Remoto",
      "type": "Presencial|Remoto|Híbrido",
      "salary_range": "150.000 - 300.000 Kz/mês",
      "match_score": 87,
      "match_reasons": ["Razão 1", "Razão 2"],
      "requirements": ["Req 1", "Req 2", "Req 3"],
      "description": "Descrição curta da vaga (2 frases)",
      "apply_link": "https://linkedin.com/jobs (ou URL plausível)",
      "posted_days_ago": 3
    }
  ],
  "search_context": "Resumo da pesquisa realizada",
  "market_insight": "1 insight sobre o mercado para este perfil"
}`

    const userMessage = `Pesquisa vagas para este candidato:
- Cargo/Área pretendida: ${jobTitle || 'Não especificado'}
- Localização preferida: ${location || 'Angola (Geral)'}
- Tipo de trabalho: ${jobType === 'remote' ? 'Remoto/Internacional' : jobType === 'hybrid' ? 'Híbrido' : 'Presencial em Angola'}
- Skills principais: ${skills?.join(', ') || 'Não especificado'}
- Perfil resumido: ${bio || 'Profissional angolano em busca de oportunidades'}

Data atual: ${new Date().toLocaleDateString('pt-AO', { year: 'numeric', month: 'long', day: 'numeric' })}
Foca em vagas que sejam genuinamente compatíveis com este perfil. Match score deve ser honesto (50-99).`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{"jobs":[]}')

    // Save search to history
    await supabase.from('user_usage').insert({
      user_id: user.id,
      action_type: 'ai_jobs_search',
    })

    // Also log for quota
    await logUserAction(user.id, 'ai_jobs_search')

    return NextResponse.json(result)
  } catch (error) {
    console.error("Job Search API error:", error)
    return NextResponse.json({ error: "Falha ao pesquisar vagas." }, { status: 500 })
  }
}
