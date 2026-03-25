import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Fetch full profile for context
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
  const { data: skills } = await supabase.from("skills").select("*").eq("profile_id", user.id)
  const { data: experiences } = await supabase.from("experiences").select("*").eq("profile_id", user.id)

  const profileContext = `
    Nome: ${profile?.full_name}
    Título: ${profile?.title}
    Habilidades: ${skills?.map((s: any) => s.name).join(", ")}
    Experiências: ${experiences?.map((e: any) => `${e.position} na ${e.company}`).join("; ")}
    Estado: Angola
  `

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em recrutamento e carreira no mercado de Angola. Sua tarefa é sugerir vagas de emprego reais e cursos de capacitação que se adequem ao perfil do usuário em Luanda/Angola. Retorne um JSON com duas listas: 'jobs' (vagas) e 'courses' (cursos). Cada item deve ter 'title', 'organization', 'description' e 'match_score' (0-100)."
        },
        {
          role: "user",
          content: `Encontre oportunidades para este perfil: ${profileContext}`
        }
      ],
      response_format: { type: "json_object" }
    })

    const opportunities = JSON.parse(response.choices[0].message.content || '{"jobs":[], "courses":[]}')
    return NextResponse.json(opportunities)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
