export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// POST /api/alerts
// Updates or creates a job alert configuration for the current user
export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { role_title, location, active, frequency } = await req.json()

    // Upsert the alert (we assume 1 active alert per user for simplicity in V11)
    const { data: existing } = await supabase
      .from('job_alerts')
      .select('id')
      .eq('user_id', user.id)
      .single()

    let result;
    if (existing) {
       result = await supabase
         .from('job_alerts')
         .update({ role_title, location, active, frequency })
         .eq('id', existing.id)
    } else {
       result = await supabase
         .from('job_alerts')
         .insert([{
            user_id: user.id,
            role_title,
            location,
            active,
            frequency
         }])
    }

    if (result.error) throw result.error;

    return NextResponse.json({ success: true, message: "Alertas atualizados com sucesso" })
  } catch (error: any) {
    console.error("Alerts error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/alerts
// Gets the current user's job alert config
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('job_alerts')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found

    return NextResponse.json({ data: data || null })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
