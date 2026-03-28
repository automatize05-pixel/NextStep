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
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50/40">
      <Card className="w-full max-w-md shadow-xl border-slate-200/60 bg-white/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-6 pt-8 pb-4 text-center">
          <div className="flex justify-center">
            <div className={`h-14 w-14 ${success ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'} rounded-2xl flex items-center justify-center shadow-sm border border-current/10`}>
               {success ? <CheckCircle2 className="h-7 w-7" /> : <ShieldCheck className="h-7 w-7" />}
            </div>
          </div>
          <div className="space-y-2 px-4">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              {success ? "Senha redefinida" : "Nova senha"}
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium text-sm leading-relaxed">
              {success 
                ? "Sua conta foi atualizada. A redirecionar para o login..." 
                : "Defina uma combinação forte para o seu novo acesso."}
            </CardDescription>
          </div>
        </CardHeader>
        {!success && (
          <form onSubmit={handleUpdate}>
            <CardContent className="space-y-6 px-8">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-in shake-in">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] ml-1" htmlFor="password">Nova senha</label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-50/50 border-slate-200 h-11 text-sm font-semibold rounded-xl focus:bg-white transition-all pr-10"
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

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] ml-1" htmlFor="confirm">Verificar senha</label>
                <Input 
                  id="confirm" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-50/50 border-slate-200 h-11 text-sm font-semibold rounded-xl focus:bg-white transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="px-8 pt-2 pb-10">
              <Button type="submit" className="w-full h-11 font-bold text-sm bg-primary hover:bg-blue-600 transition-all rounded-xl shadow-md shadow-primary/10" disabled={loading}>
                {loading ? "A atualizar..." : "Redefinir Senha"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}
