import { createClient } from "@/lib/supabase/server"

// ============================================================
// Plan Limits — All daily limits per feature per plan
// ============================================================
export const PLAN_LIMITS: Record<string, Record<string, number>> = {
  free: {
    ai_interview:     3,   // 3 simulações de entrevista/dia
    ai_search:        4,   // 4 buscas de oportunidades/dia
    ai_cover_letter:  1,   // 1 carta de apresentação/dia
    ai_salary:        2,   // 2 análises salariais/dia
    ai_linkedin:      1,   // 1 otimização LinkedIn/dia
    ai_pitch:         1,   // 1 pitch script/dia
    ai_jobs_search:   3,   // 3 buscas web de vagas/dia
    ai_softskills:    0,   // Bloqueado no plano free
  },
  essential: {
    ai_interview:     20,
    ai_search:        20,
    ai_cover_letter:  5,
    ai_salary:        10,
    ai_linkedin:      5,
    ai_pitch:         5,
    ai_jobs_search:   15,
    ai_softskills:    2,
  },
  premium: {
    ai_interview:     100,
    ai_search:        100,
    ai_cover_letter:  30,
    ai_salary:        50,
    ai_linkedin:      20,
    ai_pitch:         20,
    ai_jobs_search:   50,
    ai_softskills:    10,
  },
  elite: {
    ai_interview:     9999,  // Ilimitado
    ai_search:        9999,
    ai_cover_letter:  9999,
    ai_salary:        9999,
    ai_linkedin:      9999,
    ai_pitch:         9999,
    ai_jobs_search:   9999,
    ai_softskills:    9999,
  },
}

// Features only available for paid plans (blocked on free)
export const PREMIUM_ONLY_FEATURES = ['ai_softskills']

// ============================================================
// Main Quota Check — Plan-Aware
// ============================================================
export async function checkUserQuota(userId: string, actionType: string = 'ai_search') {
  const supabase = await createClient()

  // 1. Get user's current plan from profile
  const { data: profileData } = await supabase
    .from('profiles')
    .select('plan, subscription_expires_at')
    .eq('id', userId)
    .single()

  let userPlan = profileData?.plan || 'free'

  // Check if subscription has expired
  if (userPlan !== 'free' && profileData?.subscription_expires_at) {
    const expiresAt = new Date(profileData.subscription_expires_at)
    if (expiresAt < new Date()) {
      userPlan = 'free' // Downgrade to free if expired
    }
  }

  // 2. Get plan limits for this action
  const planLimits = PLAN_LIMITS[userPlan] || PLAN_LIMITS.free
  const limit = planLimits[actionType] ?? (PLAN_LIMITS.free[actionType] ?? 0)

  // If limit is 0 and it's a premium-only feature, block
  if (limit === 0) {
    return {
      allowed: false,
      remaining: 0,
      limit: 0,
      current: 0,
      plan: userPlan,
      requiresUpgrade: true,
      message: `Esta funcionalidade não está disponível no plano gratuito. Faça upgrade para Essencial, Premium ou Elite!`
    }
  }

  // 3. Count user actions today
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
    return { allowed: true, remaining: 1, limit, current: 0, plan: userPlan, requiresUpgrade: false }
  }

  const currentCount = count || 0
  const remaining = Math.max(0, limit - currentCount)

  return {
    allowed: currentCount < limit,
    remaining,
    limit,
    current: currentCount,
    plan: userPlan,
    requiresUpgrade: false,
    message: remaining === 0
      ? `Limite diário de ${limit} atingido para o seu plano ${userPlan}. Faça upgrade ou volte amanhã!`
      : undefined
  }
}

/**
 * Logs a user action to decrement their quota.
 */
export async function logUserAction(userId: string, actionType: string = 'ai_search') {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('user_usage')
    .insert({ user_id: userId, action_type: actionType })

  if (error) {
    console.error("Log Action Error:", error)
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

  let userPlan = profileData?.plan || 'free'

  if (userPlan !== 'free' && profileData?.subscription_expires_at) {
    if (new Date(profileData.subscription_expires_at) < new Date()) {
      userPlan = 'free'
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data: usageData } = await supabase
    .from('user_usage')
    .select('action_type')
    .eq('user_id', userId)
    .gte('created_at', today.toISOString())

  const usageCount: Record<string, number> = {}
  usageData?.forEach(u => {
    usageCount[u.action_type] = (usageCount[u.action_type] || 0) + 1
  })

  const planLimits = PLAN_LIMITS[userPlan] || PLAN_LIMITS.free
  const status: Record<string, { current: number; limit: number; remaining: number; allowed: boolean }> = {}

  for (const [feature, limit] of Object.entries(planLimits)) {
    const current = usageCount[feature] || 0
    status[feature] = {
      current,
      limit,
      remaining: Math.max(0, limit - current),
      allowed: current < limit
    }
  }

  return { plan: userPlan, status }
}
