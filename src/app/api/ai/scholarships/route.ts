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

REGRA DE SEGURANÇA CRÍTICA:
- NUNCA invente links de candidatura.
- Se não tiver certeza do link exato da subpágina de 2026, forneça APENAS o link do PORTAL PRINCIPAL oficial (ex: https://www.daad.de, https://www.chevening.org).
- Se a bolsa for real mas não souber o link, deixe o campo "application_link" como o URL do portal oficial e use o campo "help_how_to_apply" para dar instruções de pesquisa.

Responda APENAS num formato JSON estruturado assim:
{
  "recommendations": [
    {
      "program_name": "Nome da Bolsa",
      "country": "País de origem da bolsa",
      "match_score": 85,
      "description": "Breve resumo sobre a bolsa...",
      "application_link": "URL DO PORTAL OFICIAL (Proibido inventar links profundos inexistentes)",
      "help_how_to_apply": "Instrução curta de como encontrar esta bolsa dentro do portal acima ou no Google.",
      "requirements": ["Requisito 1", "Requisito 2"],
      "gap_analysis": "Análise de perfil vs requisitos.",
      "action_plan": "Passos práticos para candidatura."
    }
  ],
  "general_advice": "Dica final de ouro."
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
