import { createClient } from "@/lib/supabase/server"

/**
 * Checks if a user has exceeded their daily AI usage limit.
 * Returns { allowed: boolean, remaining: number, limit: number }
 */
export async function checkUserQuota(userId: string, actionType: string = 'ai_search') {
  const supabase = await createClient()

  // 1. Get current global limit
  const { data: settings } = await supabase
    .from('system_settings')
    .select('daily_ai_limit')
    .eq('id', 1)
    .single()

  const limit = settings?.daily_ai_limit || 10

  // 2. Count user actions today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('user_usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action_type', actionType)
    .gte('created_at', today.toISOString())

  if (error) {
    console.error("Quota Check Error:", error)
    return { allowed: true, remaining: 1, limit: limit } // Fail open to not block users on DB error
  }

  const currentCount = count || 0
  const remaining = Math.max(0, limit - currentCount)

  return {
    allowed: currentCount < limit,
    remaining,
    limit,
    current: currentCount
  }
}

/**
 * Logs a user action to decrement their quota.
 */
export async function logUserAction(userId: string, actionType: string = 'ai_search') {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('user_usage')
    .insert({
      user_id: userId,
      action_type: actionType
    })

  if (error) {
    console.error("Log Action Error:", error)
  }
}
