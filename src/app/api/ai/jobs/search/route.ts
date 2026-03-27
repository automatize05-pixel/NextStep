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

    const systemPrompt = `Você é um especialista em recrutamento atuando em Angola.
Sua tarefa é cruzar o perfil do candidato com o mercado e sugerir 8 oportunidades de carreira realistas.
IMPORTANTE: Como você não tem acesso em tempo real à internet, VOCÊ É ESTRITAMENTE PROIBIDO de inventar URLs de sites de empresas (ex: nomedaempresa.co.ao). Isso quebra a aplicação.
Para o campo "apply_link", você DEVE OBRIGATORIAMENTE gerar um link de pesquisa dinâmico e funcional para que o usuário encontre a vaga real.
Use um destes três formatos de links dinâmicos substituindo os espaços por %20:
1. LinkedIn: https://www.linkedin.com/jobs/search/?keywords=[Nome%20da%20Empresa]%20[Cargo]&location=Angola
2. Jobartis: https://www.jobartis.com/vagas?q=[Cargo]&location=Luanda
3. AngoEmprego: https://www.angoemprego.com/?s=[Cargo]

Para vagas remotas internacionais, direcione sempre para o LinkedIn ou plataformas conhecidas como Toptal/WeWorkRemotely.

Responda APENAS em JSON:
{
  "jobs": [
    {
      "title": "Nome exato do cargo",
      "company": "Empresa real em Angola (ex: BAI, Unitel, Africell, Sonangol) ou Global",
      "location": "Luanda, Angola | Remoto",
      "type": "Presencial|Remoto|Híbrido",
      "salary_range": "150.000 - 300.000 Kz/mês",
      "match_score": 87,
      "match_reasons": ["Motivo 1", "Motivo 2"],
      "requirements": ["Req 1", "Req 2", "Req 3"],
      "description": "Descrição curta da vaga.",
      "apply_link": "https://www.linkedin.com/jobs/search/?keywords=Unitel%20Desenvolvedor&location=Angola",
      "posted_days_ago": 3
    }
  ],
  "search_context": "Breve análise do mercado atual para este perfil",
  "market_insight": "Um conselho prático estratégico"
}`

    const userMessage = `Pesquisa vagas para este candidato evitando links falsos:
- Cargo/Área pretendida: ${jobTitle || 'Não especificado'}
- Localização preferida: ${location || 'Angola (Geral)'}
- Tipo de trabalho: ${jobType === 'remote' ? 'Remoto/Internacional' : jobType === 'hybrid' ? 'Híbrido' : 'Presencial em Angola'}
- Skills principais: ${skills?.join(', ') || 'Não especificado'}
- Perfil resumido: ${bio || 'Profissional angolano'}

Data atual: ${new Date().toLocaleDateString('pt-AO')}
Regra Dourada: O "apply_link" DEVE encaminhar estruturalmente para uma pesquisa real no LinkedIn ou Jobartis. Nunca invente o dominio da empresa.`

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
