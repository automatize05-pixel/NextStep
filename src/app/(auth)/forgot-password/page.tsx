"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setMessage("Enviamos um link de recuperação para o seu email. Por favor, verifique a sua caixa de entrada.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50/40">
      <Card className="w-full max-w-md shadow-xl border-slate-200/60 bg-white/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-6 pt-8 pb-4 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-primary transition-all gap-1.5 self-center group"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> 
            Voltar ao Login
          </Link>
          <div className="flex justify-center">
            <div className={`h-14 w-14 ${sent ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'} rounded-2xl flex items-center justify-center shadow-sm border border-current/10`}>
               {sent ? <CheckCircle2 className="h-7 w-7" /> : <Mail className="h-7 w-7" />}
            </div>
          </div>
          <div className="space-y-2 px-4">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              {sent ? "Link enviado" : "Recuperar acesso"}
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium text-sm leading-relaxed">
              {sent 
                ? "Verifique o seu email para redefinir a sua senha." 
                : "Introduza o seu email para receber um link de redefinição."}
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="space-y-6 px-8">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-in shake-in">
                {error}
              </div>
            )}
            {message && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs font-bold flex gap-3 items-center">
                 <CheckCircle2 className="h-5 w-5 shrink-0" />
                 <span>{message}</span>
              </div>
            )}
            {!sent && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] ml-1" htmlFor="email">Email de acesso</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50/50 border-slate-200 h-11 text-sm font-semibold rounded-xl focus:bg-white transition-all"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-8 pt-2 pb-10">
            {!sent ? (
              <Button type="submit" className="w-full h-11 font-bold text-sm bg-primary hover:bg-blue-600 transition-all rounded-xl shadow-md shadow-primary/10" disabled={loading}>
                {loading ? "A processar..." : "Enviar link de recuperação"}
              </Button>
            ) : (
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-11 font-bold text-sm border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  Voltar ao Login
                </Button>
              </Link>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
