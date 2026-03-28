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

    const { jobTitle, location, jobType, skills, bio, isFirstJob } = await req.json()

    // Build a search query to pull real jobs
    const jobKeywords = jobTitle || skills?.[0] || 'Emprego'
    const locationKeyword = location && location !== 'Angola (Geral)' ? location : 'Angola'
    
    // Se for Modo Primeiro Emprego, adicionamos modificadores de busca para vagas Junior/Estágio
    const firstJobModifiers = isFirstJob ? " (junior OR estagio OR sem experiencia)" : ""
    const searchQuery = `Vagas de ${jobKeywords}${firstJobModifiers} em ${locationKeyword} ${jobType === 'remote' ? 'remoto' : ''}`

    let webResultsText = ""
    
    // Perform Real-Time Web Search if Tavily API Key is present
    if (process.env.TAVILY_API_KEY) {
      try {
        const tavilyRes = await fetch('https://api.tavily.com/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: process.env.TAVILY_API_KEY,
            query: searchQuery,
            search_depth: "basic",
            include_domains: ["linkedin.com/jobs", "jobartis.com", "angoemprego.com"],
            max_results: 6
          })
        })
        const tavilyData = await tavilyRes.json()
        if (tavilyData.results && tavilyData.results.length > 0) {
           webResultsText = tavilyData.results.map((r: any) => `[VAGA REAL]\nTítulo/Empresa na Web: ${r.title}\nLink Original: ${r.url}\nDescrição Encontrada: ${r.content}`).join('\n\n')
        }
      } catch (e) {
        console.error("Tavily API Fetch failed:", e)
      }
    }

    const systemPrompt = `Você é um especialista em recrutamento atuando em Angola.
Sua tarefa é cruzar o perfil do candidato com o mercado e sugerir oportunidades de carreira.
IMPORTANTE: Se lhe forem fornecidos [RESULTADOS WEB REAIS], você deve EXATAMENTE extrair as vagas contidas nesses resultados. Não mude o nome da empresa, nem tente inventar. O "apply_link" deve ser exatamente o "Link Original" retornado da web.
Se não houver resultados da web, você DEVE gerar pesquisas dinâmicas funcionais (ex: https://www.linkedin.com/jobs/search/?keywords=...).

Responda APENAS em JSON:
{
  "jobs": [
    {
      "title": "Nome exato do cargo",
      "company": "Empresa real em Angola (ex: BAI, Unitel, Africell, Sonangol) ou Global",
      "location": "Luanda, Angola | Remoto",
      "type": "Presencial|Remoto|Híbrido",
      "salary_range": "150.000 - 300.000 Kz/mês (Estimar se não estiver na web)",
      "match_score": 87,
      "match_reasons": ["Motivo 1", "Motivo 2"],
      "requirements": ["Req 1", "Req 2", "Req 3"],
      "description": "Descrição curta da vaga.",
      "apply_link": "https://www.linkedin.com/... (Link Exato da Web ou Link Dinâmico)",
      "posted_days_ago": 3
    }
  ],
  "search_context": "Breve análise de mercado baseada nos resultados",
  "market_insight": "Um conselho prático"
}`

    const userMessage = `Pesquisa vagas para este candidato:
- Cargo/Área pretendida: ${jobTitle || 'Não especificado'}
- Localização preferida: ${location || 'Angola (Geral)'}
- Tipo de trabalho: ${jobType === 'remote' ? 'Remoto/Internacional' : jobType === 'hybrid' ? 'Híbrido' : 'Presencial em Angola'}
- Skills principais: ${skills?.join(', ') || 'Não especificado'}
- Perfil resumido: ${bio || 'Profissional angolano'}
- MODO PRIMEIRO EMPREGO ATIVO: ${isFirstJob ? 'SIM (Priorizar vagas que NÃO exigem experiência ou são de nível Junior/Estágio)' : 'NÃO (Pesquisa normal de mercado)'}

Data atual: ${new Date().toLocaleDateString('pt-AO')}
${webResultsText ? `\n[RESULTADOS WEB REAIS OBTIDOS NESTE SEGUNDO VIA TAVILY]\nBaseia a tua recomendação de vagas a 100% nos seguintes dados extraídos diretamente da Web (aplica os URLs reais):\n\n${webResultsText}` : `\nRegra Dourada: Sem resultados web ao vivo. O "apply_link" DEVE encaminhar estruturalmente para uma pesquisa real no LinkedIn (https://www.linkedin.com/jobs/search/?keywords=...). Nunca invente.`}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Lower temperature since we extract precise data now
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
