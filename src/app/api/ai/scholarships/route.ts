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
      const quota = await checkUserQuota(user.id, 'scholarships_search')
      if (!quota.allowed) {
        return NextResponse.json({
          error: "Quota Exceeded",
          requiresUpgrade: quota.requiresUpgrade,
          plan: quota.plan,
          message: quota.message
        }, { status: 429 })
      }
    }

    const { profile, country, degree, area } = await req.json()

    if (!country || !degree || !area) {
      return NextResponse.json({ error: "Faltam parâmetros de pesquisa." }, { status: 400 })
    }

    const systemPrompt = `Você é um Especialista de Elite em Bolsas de Estudo Internacionais (Scholarship Hunter IA).
Sua tarefa é analisar o perfil do utilizador (angolano/lusófono) e indicar as 3 melhores bolsas de estudo no exterior que se adequam ao seu objetivo.
Deve focar nas fundações renomadas: DAAD (Alemanha), Erasmus+ (Europa), Chevening (Reino Unido), Fulbright (EUA), Eiffel (França), MEXT (Japão), etc.

REGRAS:
1. Devolva apenas as bolsas que combinam com o destino "${country}", grau de ensino "${degree}" e área "${area}". Se o país for "Global" pesquise em qualquer lugar.
2. Cada bolsa deve ter uma Análise de "Gaps" (O que a bolsa exige VS O que o candidato aparenta ter com base na bio/título atual).
3. Seja realista e dê passos práticos (ex: preparar o exame IELTS, traduzir o passaporte).

Responda APENAS num formato JSON estruturado assim:
{
  "recommendations": [
    {
      "program_name": "Nome da Bolsa",
      "country": "País de origem da bolsa",
      "match_score": 85,
      "description": "Breve resumo sobre a bolsa...",
      "application_link": "URL ou Link de candidatura oficial",
      "requirements": ["Requisito 1", "Requisito 2"],
      "gap_analysis": "O candidato tem X, mas precisa de Y para se destacar.",
      "action_plan": "Passo a passo rápido para preparar a candidatura."
    }
  ],
  "general_advice": "Dica final de ouro para aumentar a aprovação em processos internacionais."
}`

    const userMessage = `Por favor analise o meu perfil e sugira bolsas de estudo:
Destino Alvo: ${country}
Grau Desejado: ${degree}
Área de Estudo: ${area}

O Meu Perfil Atual:
Nome: ${profile?.full_name || 'Usuário'}
Cargo: ${profile?.title || 'Estudante/Profissional'}
Bio: ${profile?.bio || 'Sem biografia detalhada.'}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 2800,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    // Log the usage correctly so limits are counted
    await logUserAction(user.id, 'scholarships_search')

    return NextResponse.json(result)
  } catch (error) {
    console.error("Scholarship API Error:", error)
    return NextResponse.json({ error: "Falha ao analisar bolsas de estudo." }, { status: 500 })
  }
}
