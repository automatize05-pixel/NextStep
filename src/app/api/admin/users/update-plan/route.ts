import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    // 1. Verify Admin Access
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== 'automatize05@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // 2. Parse Form Data
    const formData = await req.formData()
    const targetUserId = formData.get('user_id') as string
    const newPlan = formData.get('new_plan') as string

    if (!targetUserId || !newPlan) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // 3. Update the Profile plan
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ plan: newPlan })
      .eq('id', targetUserId)

    if (profileError) throw profileError

    // 4. Update or Insert Subscription record logically for Premium/Elite plans
    // Calculate a 30-day window for manually granted plans, except for 'free'
    if (newPlan !== 'free') {
       const endDate = new Date()
       endDate.setDate(endDate.getDate() + 30) // 30 days from now

       // Check if there is an existing sub
       const { data: existingSub } = await supabase
         .from('subscriptions')
         .select('id')
         .eq('user_id', targetUserId)
         .maybeSingle()

       if (existingSub) {
         await supabase
           .from('subscriptions')
           .update({ plan: newPlan, status: 'active', end_date: endDate.toISOString() })
           .eq('id', existingSub.id)
       } else {
         await supabase
           .from('subscriptions')
           .insert([{
             user_id: targetUserId,
             plan: newPlan,
             status: 'active',
             start_date: new Date().toISOString(),
             end_date: endDate.toISOString()
           }])
       }
    } else {
       // If downgraded to free, set any active sub to inactive or expired
       await supabase
         .from('subscriptions')
         .update({ status: 'expired' })
         .eq('user_id', targetUserId)
         .eq('status', 'active')
    }

    // Redirect back to the user details page
    return NextResponse.redirect(`${new URL(req.url).origin}/admin/users/${targetUserId}`, 303)

  } catch (error: any) {
    console.error('Update Plan Server Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
