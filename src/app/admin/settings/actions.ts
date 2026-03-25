'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

/**
 * Toggles the global maintenance mode.
 * Only 'automatize05@gmail.com' can perform this action via RLS.
 */
export async function toggleMaintenanceMode(currentState: boolean) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('system_settings')
    .update({ 
      maintenance_mode: !currentState,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)

  if (error) {
    console.error("Supabase Error toggleMaintenanceMode:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/settings')
  return { success: true, newState: !currentState }
}

/**
 * Updates the daily AI request limit per user.
 */
export async function updateDailyLimit(newLimit: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('system_settings')
    .update({ 
      daily_ai_limit: newLimit,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/settings')
  return newLimit
}

/**
 * Toggles specific AI engine features.
 */
export async function toggleAiFeature(feature: string, currentState: boolean) {
  // Logic could be expanded to a feature_flags table later
  // For now we just mock success as the user requested UI feedback
  console.log(`Toggling ${feature} to ${!currentState}`)
  revalidatePath('/admin/settings')
  return !currentState
}
