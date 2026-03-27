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

    // Check quota (allow unlimited for user.email === 'automatize05@gmail.com')
    if (user.email !== 'automatize05@gmail.com') {
      const quota = await checkUserQuota(user.id, 'ai_cv_generate')
      if (!quota.allowed) {
        return NextResponse.json({
          error: "Quota Exceeded",
          requiresUpgrade: quota.requiresUpgrade,
          plan: quota.plan,
          message: quota.message
        }, { status: 429 })
      }
    }

    const { profile, experiences, educations, skills } = await req.json()

    const systemPrompt = `Você é um Redator de Currículos Profissionais de Elite (Senior CV Writer).
Sua tarefa é transformar os dados brutos do usuário em um Currículo de Alto Impacto formatado para recrutadores e sistemas ATS (Applicant Tracking Systems).

REGRAS DE OURO:
1. Re-escreva o "Resumo Profissional" para ser denso, persuasivo e cheio de palavras-chave da área.
2. Melhore as descrições de "Experiência" usando o Método STAR (Situação, Tarefa, Ação, Resultado). Use verbos de ação (Implementei, Liderei, Otimizei).
3. Agrupe as Skills de forma lógica (ex: Hard Skills, Soft Skills, Ferramentas).
4. O resultado deve ser um objeto JSON que separa o conteúdo em seções profissionais.

Responda APENAS em JSON:
{
  "optimized_summary": "Texto do resumo otimizado...",
  "optimized_experiences": [
    {
      "id": "id_original",
      "company": "Empresa",
      "position": "Cargo Otimizado",
      "bullet_points": ["Ponto 1 com impacto", "Ponto 2 com métricas"]
    }
  ],
  "skill_groups": [
    { "category": "Core Tech", "skills": ["Skill 1", "Skill 2"] },
    { "category": "Gestão", "skills": ["Skill 3"] }
  ],
  "recommendation": "Uma dica rápida para o currículo físico"
}`

    const userMessage = `Otimize este currículo:
Nome: ${profile.full_name}
Cargo Atual: ${profile.title}
Bio Bruta: ${profile.bio}

Experiências:
${experiences.map((e: any) => `- ${e.position} na ${e.company}: ${e.description}`).join('\n')}

Educação:
${educations.map((e: any) => `- ${e.course} em ${e.institution}`).join('\n')}

Skills:
${skills.map((s: any) => s.name).join(', ')}`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 2500,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')

    // Log the action
    await logUserAction(user.id, 'ai_cv_generate')

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI CV API Error:", error)
    return NextResponse.json({ error: "Falha ao otimizar currículo." }, { status: 500 })
  }
}
