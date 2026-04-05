"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ShieldCheck, Loader2, QrCode, Smartphone, 
  CheckCircle2, AlertCircle, ArrowLeft, Lock
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminMFAPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // MFA States
  const [step, setStep] = useState<'intro' | 'enroll' | 'verify' | 'success'>('intro')
  const [factorId, setFactorId] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [verifyCode, setVerifyCode] = useState("")
  const [challengeId, setChallengeId] = useState<string | null>(null)

  const onEnroll = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      })

      if (enrollError) throw enrollError

      setFactorId(data.id)
      setQrCode(data.totp.qr_code)
      setStep('enroll')
    } catch (err: any) {
      setError(err.message || "Erro ao iniciar inscrição MFA")
    } finally {
      setLoading(false)
    }
  }

  const onVerify = async () => {
    if (!factorId) return
    setLoading(true)
    setError(null)
    try {
      // 1. Create a challenge
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId,
      })

      if (challengeError) throw challengeError

      // 2. Verify the challenge
      const { data: verification, error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: verifyCode,
      })

      if (verifyError) throw verifyError

      setStep('success')
    } catch (err: any) {
      setError(err.message || "Código inválido. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[180px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 blur-[180px] rounded-full" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Voltar ao Painel</span>
        </button>

        <Card className="border-slate-800 shadow-2xl rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl overflow-hidden border-2">
          <CardContent className="p-10">
            {step === 'intro' && (
              <div className="space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto border border-blue-500/20">
                  <ShieldCheck className="h-10 w-10 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-white">Segurança em Duas Etapas</h1>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Proteja a sua conta de administrador adicionando uma camada extra de segurança. Use um app como o Google Authenticator ou Authy.
                  </p>
                </div>
                <Button 
                   onClick={onEnroll} 
                   disabled={loading}
                   className="w-full h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] tracking-[0.2em] shadow-xl shadow-blue-600/20 uppercase"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Iniciar Configuração"}
                </Button>
              </div>
            )}

            {step === 'enroll' && (
              <div className="space-y-8 text-center animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white">Digitalize o QR Code</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    Abra o seu app de autenticação e digitalize a imagem abaixo
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-[2rem] inline-block shadow-2xl">
                   {qrCode && <img src={qrCode} alt="MFA QR Code" className="w-48 h-48" />}
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-500">Após digitalizar, clique em próximo para verificar.</p>
                  <Button 
                     onClick={() => setStep('verify')} 
                     className="w-full h-16 rounded-[1.5rem] bg-white hover:bg-slate-100 text-slate-900 font-black text-[12px] tracking-[0.2em] uppercase"
                  >
                    Próximo Passo
                  </Button>
                </div>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-8 text-center animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto">
                   <Lock className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white">Verificar Código</h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    Introduza o código de 6 dígitos gerado no seu app
                  </p>
                </div>

                <div className="space-y-6">
                  <Input 
                    placeholder="000000"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-16 text-center text-3xl font-black tracking-[0.5em] bg-slate-950/50 border-slate-800 rounded-2xl text-white focus:ring-blue-500"
                  />
                  {error && (
                    <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs animate-pulse">
                       <AlertCircle className="h-4 w-4" />
                       {error}
                    </div>
                  )}
                  <Button 
                     onClick={onVerify} 
                     disabled={loading || verifyCode.length !== 6}
                     className="w-full h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] tracking-[0.2em] shadow-xl shadow-blue-600/20 uppercase"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirmar & Ativar"}
                  </Button>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto border border-green-500/20">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white">MFA Ativado com Sucesso!</h2>
                  <p className="text-slate-400 text-sm leading-relaxed px-4">
                    Sua conta de administrador agora está protegida com segurança de nível militar. 
                  </p>
                </div>
                <Button 
                   onClick={() => router.push('/admin/payments')} 
                   className="w-full h-16 rounded-[1.5rem] bg-white hover:bg-slate-100 text-slate-900 font-black text-[12px] tracking-[0.2em] uppercase"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-10 flex items-center justify-center gap-2 opacity-40">
           <Smartphone className="h-4 w-4 text-slate-500" />
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest text-center">Proteção Ativa • Próximo Passo Governance</p>
        </div>
      </div>
    </div>
  )
}
