"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Loader2, CheckCircle2, ChevronRight, ArrowLeft, 
  Copy, Smartphone, CreditCard, Clock, Check, 
  FileText, X, PlusCircle, ShieldCheck
} from "lucide-react"

const PLAN_INFO: Record<string, { name: string; price: number; color: string; badge: string }> = {
  starter: { name: 'Primeiro Passo', price: 1500, color: 'border-green-500', badge: 'ENTRADA' },
  essential: { name: 'Preparação Pro', price: 3500, color: 'border-blue-500', badge: 'RECOMENDADO' },
  elite: { name: 'Elite VIP', price: 8500, color: 'border-yellow-500', badge: 'LUXO & CARREIRA' },
}

const PAYMENT_INFO = {
  entity: "10166",
  reference: "947005277",
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const plan = searchParams.get('plan') || 'essential'
  const planInfo = PLAN_INFO[plan] || PLAN_INFO.essential

  const [step, setStep] = useState<'info' | 'selection' | 'details'>('info')
  const [method, setMethod] = useState<'referencia' | 'express' | null>(null)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  
  const [timeLeft, setTimeLeft] = useState(7199)

  useEffect(() => {
    if (step !== 'details') return
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [step])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleNext = () => {
    if (step === 'info') {
      if (!name || !email || !phone) return
      setStep('selection')
    }
  }

  const selectMethod = (m: 'referencia' | 'express') => {
    setMethod(m)
    setStep('details')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0])
    }
  }

  const handleSubmitPayment = async () => {
    if (!receiptFile) return
    setLoading(true)
    
    try {
      const fileExt = receiptFile.name.split('.').pop()
      const fileName = `${Date.now()}-${name.replace(/\s+/g, '_')}.${fileExt}`
      const filePath = fileName

      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, receiptFile)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath)

      const { error: subError } = await supabase.from('subscriptions').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        plan_type: plan,
        amount_kz: planInfo.price,
        receipt_url: publicUrl,
        status: 'pending',
        user_name: name,
        user_email: email,
        user_phone: phone,
        notes: `Pagamento via ${method === 'referencia' ? 'Referência Multicaixa' : 'Multicaixa Express'}`
      })

      if (subError) throw subError

      router.push('/dashboard?status=pending_payment')
    } catch (error) {
      console.error('Error submitting payment:', error)
      alert('Erro ao enviar comprovativo. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const renderInfoForm = () => (
    <Card className="border-slate-800 shadow-2xl rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-10 space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Nome completo</label>
            <Input 
              placeholder="Digite seu nome" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="h-14 rounded-2xl border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 font-bold px-6 focus:ring-2 focus:ring-primary/50 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Email Comercial</label>
            <Input 
              type="email"
              placeholder="seu@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="h-14 rounded-2xl border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 font-bold px-6 focus:ring-2 focus:ring-primary/50 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Telemóvel (WhatsApp)</label>
            <Input 
              placeholder="+244 9xx xxx xxx" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              className="h-14 rounded-2xl border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 font-bold px-6 focus:ring-2 focus:ring-primary/50 transition-all" 
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50">
           <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-slate-400 font-bold text-sm">Plano Selecionado</span>
              <span className="text-white font-black text-sm">{planInfo.name}</span>
           </div>
           <div className="flex justify-between items-center mb-10 px-2">
              <span className="text-white font-black text-xl">Total a pagar</span>
              <span className="text-green-400 font-black text-2xl tracking-tight">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </div>

           <Button 
             className="w-full h-20 rounded-[2rem] bg-white hover:bg-slate-100 text-slate-950 font-black text-sm tracking-widest transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-4 group"
             onClick={handleNext}
             disabled={!name || !email || !phone}
           >
             <span className="uppercase tracking-[0.2em]">Próximo Passo</span>
             <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
           </Button>
           
           <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
             <ShieldCheck className="h-4 w-4 text-slate-400" />
             <p className="text-[9px] text-slate-400 text-center font-bold uppercase tracking-widest">Pagamento 100% Seguro & Protegido</p>
           </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSelection = () => (
    <Card className="border-slate-800 shadow-2xl rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <CardContent className="p-10 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-white">Método de Pagamento</h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Selecione como deseja pagar</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <button 
             onClick={() => selectMethod('referencia')}
             className={`h-52 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 group hover:shadow-2xl ${
               method === 'referencia' ? 'border-primary bg-primary/5 shadow-primary/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
             }`}
           >
              <div className="w-20 h-20 rounded-3xl bg-[#002D5B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <CreditCard className="h-10 w-10 text-white" />
              </div>
              <div className="text-center px-4">
                <span className="text-white font-black text-sm block">Referência</span>
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 block">Multicaixa / ATM</span>
              </div>
           </button>
           <button 
             onClick={() => selectMethod('express')}
             className={`h-52 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 group hover:shadow-2xl ${
               method === 'express' ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-[#FF6B00]/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
             }`}
           >
              <div className="w-20 h-20 rounded-3xl bg-[#FF6B00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <Smartphone className="h-10 w-10 text-white" />
              </div>
              <div className="text-center px-4">
                <span className="text-white font-black text-sm block">Express</span>
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 block">Telemóvel / App</span>
              </div>
           </button>
        </div>

        <div className="pt-8 border-t border-slate-800/50">
           <div className="flex justify-between items-center mb-10 px-2">
              <span className="text-white font-black text-xl">Total</span>
              <span className="text-green-400 font-black text-2xl">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </div>
           <Button 
             variant="ghost" 
             className="w-full text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
             onClick={() => setStep('info')}
           >
             ← Alterar dados de contacto
           </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderDetails = () => (
    <Card className="border-slate-800 shadow-2xl rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl overflow-hidden relative animate-in fade-in slide-in-from-right-4 duration-500">
      <CardContent className="p-10 space-y-8">
        <button onClick={() => setStep('selection')} className="absolute top-8 right-8 p-3 hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2 pt-4">
           <h2 className="text-2xl font-black text-white">
             {method === 'referencia' ? 'Pagamento por Referência' : 'Multicaixa Express'}
           </h2>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
             {method === 'referencia' ? 'Finalize no seu banco ou ATM' : 'Confirme no seu telemóvel'}
           </p>
        </div>

        {/* Timer Box */}
        <div className={`p-8 rounded-[2rem] border transition-all text-center space-y-2 ${method === 'referencia' ? 'bg-primary/5 border-primary/20' : 'bg-orange-500/5 border-orange-500/20'}`}>
           <div className="flex items-center justify-center gap-2 text-slate-500">
              <Clock className="h-4 w-4" />
              <span className="text-[9px] font-black uppercase tracking-widest">Expira em</span>
           </div>
           <div className={`text-4xl font-black font-mono tracking-tighter ${method === 'referencia' ? 'text-primary' : 'text-orange-500'}`}>
              {formatTime(timeLeft)}
           </div>
        </div>

        {method === 'referencia' ? (
           <div className="space-y-4">
              <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-1 block tracking-widest">Entidade</span>
                    <span className="text-white font-black text-2xl tracking-tight">{PAYMENT_INFO.entity}</span>
                 </div>
                 <Button variant="ghost" className="p-4 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all" onClick={() => handleCopy(PAYMENT_INFO.entity, 'entity')}>
                    {copied === 'entity' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>
              <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-1 block tracking-widest">Referência</span>
                    <span className="text-white font-black text-2xl tracking-[0.1em]">{PAYMENT_INFO.reference}</span>
                 </div>
                 <Button variant="ghost" className="p-4 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all" onClick={() => handleCopy(PAYMENT_INFO.reference, 'ref')}>
                    {copied === 'ref' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>
              <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-1 block tracking-widest">Valor</span>
                    <span className="text-white font-black text-2xl tracking-tight">{planInfo.price.toLocaleString('pt-AO')} kz</span>
                 </div>
                 <Button variant="ghost" className="p-4 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all" onClick={() => handleCopy(planInfo.price.toString(), 'val')}>
                    {copied === 'val' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>
           </div>
        ) : (
           <div className="text-center py-6 space-y-10">
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                    <Smartphone className="h-8 w-8 text-orange-500" />
                 </div>
                 <h3 className="text-xl font-black text-white">Aguarando Aprovação</h3>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Confirme a notificação enviada para o seu telemóvel.</p>
              </div>

              <div className="p-8 bg-slate-950/50 border border-slate-800 rounded-3xl inline-block min-w-[240px]">
                 <span className="text-[9px] font-black uppercase text-slate-500 mb-1 block tracking-widest">Total a pagar</span>
                 <span className="text-white font-black text-2xl tracking-tight">{planInfo.price.toLocaleString('pt-AO')} kz</span>
              </div>
           </div>
        )}

        <div className="pt-8 space-y-6">
           <div className="p-8 bg-slate-950/50 border-2 border-dashed border-slate-800 rounded-[2.5rem] hover:border-primary/50 transition-all group overflow-hidden">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
               <FileText className="h-4 w-4" /> Anexar Comprovativo
             </h4>
             
             <div className="flex flex-col items-center justify-center gap-4">
               {receiptFile ? (
                 <div className="flex items-center gap-4 w-full p-4 bg-slate-900 border border-primary/20 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                     <CheckCircle2 className="h-6 w-6" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-black text-white truncate">{receiptFile.name}</p>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pronto para envio</p>
                   </div>
                   <button 
                     onClick={() => setReceiptFile(null)} 
                     className="p-3 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-xl transition-all"
                   >
                     <X className="h-5 w-5" />
                   </button>
                 </div>
               ) : (
                 <label className="w-full cursor-pointer group/upload">
                   <div className="flex flex-col items-center justify-center gap-4 py-4 transition-all group-hover/upload:scale-105">
                     <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-700 group-hover/upload:text-primary group-hover/upload:border-primary/50 transition-all shadow-xl">
                       <PlusCircle className="h-8 w-8" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 group-hover/upload:text-slate-400 transition-colors text-center">Carregar Comprovativo (JPG, PNG ou PDF)</p>
                   </div>
                   <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                 </label>
               )}
             </div>
           </div>

           <Button 
             className="w-full h-16 rounded-[2rem] bg-white hover:bg-slate-100 text-slate-950 font-black text-xs tracking-[0.2em] transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 uppercase"
             onClick={handleSubmitPayment}
             disabled={loading || !receiptFile}
           >
             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CheckCircle2 className="h-5 w-5" /> Submeter Pagamento</>}
           </Button>
           
           <p className="text-[10px] text-slate-600 text-center font-bold uppercase tracking-widest">
             Ao pagar, você concorda com os <a href="/terms#payments" className="text-primary hover:underline italic">termos de activação</a>.
           </p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[180px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[180px] rounded-full" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="w-full max-w-2xl relative z-10 space-y-10">
        <div className="flex items-center justify-between px-6">
           <button onClick={() => router.push('/plans')} className="text-slate-500 hover:text-white transition-colors flex items-center gap-3 group">
              <div className="p-2 border border-slate-800 rounded-xl group-hover:bg-slate-800 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Voltar aos planos</span>
           </button>
           <div className={`px-5 py-2 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-[0.2em]`}>
              {planInfo.badge} — {planInfo.name}
           </div>
        </div>

        {step === 'info' && renderInfoForm()}
        {step === 'selection' && renderSelection()}
        {step === 'details' && renderDetails()}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
           <div className="relative">
             <div className="h-20 w-20 rounded-3xl border-4 border-slate-800 border-t-primary animate-spin" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Crown className="h-8 w-8 text-white/20" />
             </div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 animate-pulse">Encriptando Sessão</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
