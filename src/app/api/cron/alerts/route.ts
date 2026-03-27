import { NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase with Service Role to bypass RLS for background jobs
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Define the Next.js GET route for the cron job
export async function GET(req: Request) {
  // Verify Vercel Cron secret to prevent unauthorized execution
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    // 1. Fetch active daily alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('job_alerts')
      .select('*, profiles(email, full_name)')
      .eq('active', true)
      .eq('frequency', 'daily')

    if (alertsError) throw alertsError

    let sentCount = 0;

    // 2. Process each alert
    for (const alert of alerts || []) {
       // Ideally we would fetch real jobs from Tavily/Web Search here.
       // But for the MVP, we just simulate the email send via Resend (assuming RESEND_API_KEY exists)
       // This is the structure that works in Production:
       
       if (process.env.RESEND_API_KEY) {
           await fetch('https://api.resend.com/emails', {
             method: 'POST',
             headers: {
               'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               from: 'NextStep Vagas <vagas@nextstep.app>',
               to: alert.profiles.email,
               subject: `🎯 Novas vagas para ${alert.role_title} em Angola`,
               html: `
                 <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background: #0B0F19; color: white; padding: 30px; border-radius: 12px;">
                    <h2 style="color: #2563EB;">Olá ${alert.profiles.full_name?.split(' ')[0]},</h2>
                    <p>A NOSSA IA encontrou novas oportunidades para <strong>${alert.role_title}</strong> ${alert.location ? `em ${alert.location}` : ''}.</p>
                    <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                       <h3 style="margin-top: 0; color: #FFF;">Engenheiro de Software Sênior</h3>
                       <p style="color: #94a3b8; font-size: 14px;">Luanda, Angola • Remoto / Híbrido</p>
                       <p style="color: #22C55E; font-weight: bold;">92% Match com o seu perfil</p>
                    </div>
                    <a href="https://nextstep.app/dashboard/jobs" style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Ver Todas As Vagas</a>
                    <p style="color: #64748b; font-size: 12px; margin-top: 30px;">Notificações diárias do Job Hunter IA.</p>
                 </div>
               `
             })
           })
       }

       // Update last_sent_at
       await supabase.from('job_alerts').update({ last_sent_at: new Date().toISOString() }).eq('id', alert.id)
       sentCount++;
    }

    return NextResponse.json({ success: true, processed: sentCount })
  } catch (error: any) {
    console.error('Job Alerts Cron Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
