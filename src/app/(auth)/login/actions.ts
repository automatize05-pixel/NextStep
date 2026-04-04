"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  if (!email || !password) {
    return { error: "Email e senha são obrigatórios" }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Return success instead of server redirect, letting the client handle it for better mobile cookie reliability
  return { success: true }
}
