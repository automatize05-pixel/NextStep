import { createClient } from "@/lib/supabase/server"
import { NEXTSTEP_PLANS, PlanType } from "@/lib/limits"

/**
 * Main Quota Check — Plan-Aware
 * Uses the new 'usage_tracking' table for performance and reliability
 */
export async function checkUserQuota(userId: string, featureKey: string = 'ai_test_daily') {
  const supabase = await createClient()

  // 1. Get user's current plan from profile
  const { data: profileData } = await supabase
    .from('profiles')
    .select('plan, subscription_expires_at')
    .eq('id', userId)
    .single()

  let userPlan = (profileData?.plan as PlanType) || 'free'

  // Check if subscription has expired
  if (userPlan !== 'free' && profileData?.subscription_expires_at) {
    const expiresAt = new Date(profileData.subscription_expires_at)
    if (expiresAt < new Date()) {
      userPlan = 'free' // Downgrade to free if expired
    }
  }

  // 2. Get plan limits for this feature
  const planLimits = NEXTSTEP_PLANS[userPlan] || NEXTSTEP_PLANS.free
  const limit = (planLimits as any)[featureKey] ?? 0

  // 3. Get current usage from DB
  const { data: usage } = await supabase
    .from('usage_tracking')
    .select('usage_count, daily_reset_at')
    .eq('user_id', userId)
    .eq('feature_key', featureKey)
    .single()

  let currentCount = 0
  if (usage) {
    // Check if it's already past the reset time
    if (new Date(usage.daily_reset_at) < new Date()) {
      currentCount = 0
    } else {
      currentCount = usage.usage_count
    }
  }

  const remaining = Math.max(0, limit - currentCount)

  return {
    allowed: currentCount < limit,
    remaining,
    limit,
    current: currentCount,
    plan: userPlan,
    requiresUpgrade: currentCount >= limit,
    message: currentCount >= limit
      ? `Limite atingido para o plano ${userPlan}. Faça upgrade ou volte amanhã!`
      : undefined
  }
}

/**
 * Logs a user action by calling the RPC function increment_usage
 */
export async function logUserAction(userId: string, featureKey: string = 'ai_test_daily') {
  const supabase = await createClient()
  
  // Use the RPC function created in v15 migration
  const { error } = await supabase.rpc('increment_usage', { 
    u_id: userId, 
    f_key: featureKey 
  })

  if (error) {
    console.error("Log Action Error (RPC):", error)
  }
}

/**
 * Get quota status for all features for a user (for UI display)
 */
export async function getUserQuotaStatus(userId: string) {
  const supabase = await createClient()

  const { data: profileData } = await supabase
    .from('profiles')
    .select('plan, subscription_expires_at')
    .eq('id', userId)
    .single()

  let userPlan = (profileData?.plan as PlanType) || 'free'

  if (userPlan !== 'free' && profileData?.subscription_expires_at) {
    if (new Date(profileData.subscription_expires_at) < new Date()) {
      userPlan = 'free'
    }
  }

  const { data: usageData } = await supabase
    .from('usage_tracking')
    .select('feature_key, usage_count, daily_reset_at')
    .eq('user_id', userId)

  const usageMap: Record<string, number> = {}
  usageData?.forEach((u: any) => {
    if (new Date(u.daily_reset_at) > new Date()) {
      usageMap[u.feature_key] = u.usage_count
    }
  })

  const planLimits = NEXTSTEP_PLANS[userPlan] || NEXTSTEP_PLANS.free
  const status: any = {}

  for (const [feature, limit] of Object.entries(planLimits)) {
    const current = usageMap[feature] || 0
    status[feature] = {
      current,
      limit,
      remaining: Math.max(0, (limit as number) - current),
      allowed: current < (limit as number)
    }
  }

  return { plan: userPlan, status }
}
