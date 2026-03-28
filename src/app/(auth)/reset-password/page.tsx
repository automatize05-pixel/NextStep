"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Small delay before redirecting
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50/50">
      <Card className="w-full max-w-md shadow-2xl border-slate-100 animate-in fade-in zoom-in duration-300">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className={`h-16 w-16 ${success ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'} rounded-full flex items-center justify-center shadow-inner`}>
               {success ? <CheckCircle2 className="h-8 w-8 text-green-600" /> : <ShieldCheck className="h-8 w-8 text-primary" />}
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
            {success ? "Senha Redefinida!" : "Nova Senha"}
          </CardTitle>
          <CardDescription className="text-slate-500 font-bold text-base">
            {success 
              ? "Sua conta foi atualizada com sucesso. A redirecionar para o login..." 
              : "Defina uma senha forte para proteger o seu acesso à NextStep."}
          </CardDescription>
        </CardHeader>
        {!success && (
          <form onSubmit={handleUpdate}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-in shake-in">
                  {error}
                </div>
              )}
              
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em]" htmlFor="password">Nova Senha</label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-slate-200 h-12 font-black shadow-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em]" htmlFor="confirm">Confirmar Nova Senha</label>
                <Input 
                  id="confirm" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white border-slate-200 h-12 font-black shadow-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button type="submit" className="w-full h-12 font-black text-sm uppercase tracking-widest bg-primary hover:bg-blue-600 shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Atualizando..." : "Atualizar Senha"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
