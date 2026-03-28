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
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50/50">
      <Card className="w-full max-w-md shadow-2xl border-slate-100 animate-in fade-in zoom-in duration-300">
        <CardHeader className="space-y-4 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors gap-2 mb-2"
          >
            <ChevronLeft className="h-4 w-4" /> Voltar ao Login
          </Link>
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
               {sent ? <CheckCircle2 className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
            {sent ? "Email Enviado!" : "Recuperar Senha"}
          </CardTitle>
          <CardDescription className="text-slate-500 font-bold text-base px-2">
            {sent 
              ? "Siga as instruções no seu email para redefinir o seu acesso." 
              : "Insira o seu email abaixo e enviaremos um link para criar uma nova senha."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-in shake-in">
                {error}
              </div>
            )}
            {message && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-bold flex gap-3 items-start">
                 <CheckCircle2 className="h-5 w-5 shrink-0" />
                 <span>{message}</span>
              </div>
            )}
            {!sent && (
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-500 tracking-[0.2em]" htmlFor="email">Seu Email Profissional</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="exemplo@email.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-slate-200 h-12 font-black shadow-sm"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-2">
            {!sent ? (
              <Button type="submit" className="w-full h-12 font-black text-sm uppercase tracking-widest bg-primary hover:bg-blue-600 shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Link de Recuperação"}
              </Button>
            ) : (
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-12 font-black text-sm uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-50 shadow-sm">
                  Retornar ao Login
                </Button>
              </Link>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
