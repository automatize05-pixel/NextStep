'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function approvePayment(formData: FormData) {
  const supabase = await createClient()
  const subscriptionId = formData.get('subscriptionId') as string
  const userId = formData.get('userId') as string
  const planType = formData.get('planType') as string

  // Set subscription expiry to 30 days from now
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'approved', updated_at: new Date().toISOString() })
    .eq('id', subscriptionId)

  // Update user's plan
  await supabase
    .from('profiles')
    .update({ plan: planType, subscription_expires_at: expiresAt.toISOString() })
    .eq('id', userId)

  // Log the action
  await supabase.from('audit_logs').insert({
    user_id: userId,
    action: 'plan_approved',
    metadata: { plan: planType, subscription_id: subscriptionId }
  })

  revalidatePath('/admin/payments')
}

export async function rejectPayment(formData: FormData) {
  const supabase = await createClient()
  const subscriptionId = formData.get('subscriptionId') as string

  await supabase
    .from('subscriptions')
    .update({ status: 'rejected', updated_at: new Date().toISOString() })
    .eq('id', subscriptionId)

  revalidatePath('/admin/payments')
}
