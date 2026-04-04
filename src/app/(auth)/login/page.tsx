"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Listen for SIGNED_IN event BEFORE calling signInWithPassword.
    // This is the iOS-safe approach: we only redirect AFTER Supabase confirms
    // the session cookie is 100% written in the browser (critical for Safari ITP).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        subscription.unsubscribe()
        // Use replace() to avoid /login appearing in browser history
        window.location.replace('/dashboard')
      }
    })

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      subscription.unsubscribe() // Cancel listener on failure
      setError(error.message)
      setLoading(false)
    }
    // On success: the onAuthStateChange fires SIGNED_IN and handles the redirect
  }

  return (
    <Card className="bg-card border-border shadow-2xl rounded-[2rem] overflow-hidden transition-all">
      <CardHeader className="space-y-2 text-center pb-8 pt-10">
        <CardTitle className="text-3xl font-black tracking-tighter">Bem-vindo de volta</CardTitle>
        <CardDescription className="font-bold text-muted-foreground">
          Faça login para continuar sua evolução profissional
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-6 px-8">
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-black uppercase tracking-widest">{error}</div>}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" htmlFor="email">Endereço de Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-border bg-muted/30 font-bold"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" htmlFor="password">Palavra-passe</label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-black text-primary hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="pr-12 h-12 rounded-xl border-border bg-muted/30 font-bold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 px-8 pb-10 pt-6">
          <Button type="submit" className="w-full h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95" disabled={loading}>
            {loading ? "A verificar sessão..." : "Entrar na Conta"}
          </Button>
          <div className="text-center text-xs font-bold text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline font-black decoration-2 underline-offset-4">
              Cadastre-se grátis
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
