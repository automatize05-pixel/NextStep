"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to onboarding after successful registration
    router.refresh()
    setTimeout(() => {
      router.push("/onboarding")
    }, 300)
  }

  return (
    <Card className="bg-card border-border shadow-2xl rounded-[2rem] overflow-hidden transition-all">
      <CardHeader className="space-y-2 text-center pb-8 pt-10">
        <CardTitle className="text-3xl font-black tracking-tighter">Crie sua conta</CardTitle>
        <CardDescription className="font-bold text-muted-foreground">
          Insira seus dados para começar a usar o NextStep
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-6 px-8">
          {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-black uppercase tracking-widest">{error}</div>}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" htmlFor="name">Nome Completo</label>
            <Input 
              id="name" 
              type="text" 
              placeholder="João Silva" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border-border bg-muted/30 font-bold"
            />
          </div>
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
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1" htmlFor="password">Palavra-passe</label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required
                minLength={6}
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
            {loading ? "Criando conta..." : "Criar conta gratuita"}
          </Button>
          <div className="text-center text-xs font-bold text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-black decoration-2 underline-offset-4">
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
