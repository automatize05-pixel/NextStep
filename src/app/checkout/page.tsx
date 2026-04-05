"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Loader2, CheckCircle2, Crown, ArrowLeft, 
  Copy, Smartphone, CreditCard, Clock, Check, RotateCcw,
  FileText, X, PlusCircle
} from "lucide-react"

const PLAN_INFO: Record<string, { name: string; price: number; color: string; badge: string }> = {
  starter: { name: 'Primeiro Passo', price: 1500, color: 'border-green-400', badge: 'INICIANTE' },
  essential: { name: 'Preparação Pro', price: 3500, color: 'border-blue-400', badge: 'RECOMENDADO' },
  premium: { name: 'Aceleração Total', price: 8500, color: 'border-purple-400', badge: 'AVANÇADO' },
  elite: { name: 'Elite VIP', price: 8500, color: 'border-yellow-400', badge: 'EXCLUSIVO' },
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

  // Steps: 'info' | 'selection' | 'details'
  const [step, setStep] = useState<'info' | 'selection' | 'details'>('info')
  const [method, setMethod] = useState<'referencia' | 'express' | null>(null)
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const [timeLeft, setTimeLeft] = useState(7199) // 2 hours in seconds

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
      // 1. Upload receipt to storage
      const fileExt = receiptFile.name.split('.').pop()
      const fileName = `${Date.now()}-${name.replace(/\s+/g, '_')}.${fileExt}`
      const filePath = `receipts/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, receiptFile)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath)

      // 2. Create subscription record
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
    <Card className="border-slate-100 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
      <CardContent className="p-10 space-y-8">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Nome completo</label>
            <Input 
              placeholder="Seu nome" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 font-bold px-6 focus:ring-2 focus:ring-[#00875A] transition-all" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Email</label>
            <Input 
              type="email"
              placeholder="seu@email.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 font-bold px-6 focus:ring-2 focus:ring-[#00875A] transition-all" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Número de telefone</label>
            <Input 
              placeholder="Digite o seu número de telefone" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-900 placeholder:text-slate-300 font-bold px-6 focus:ring-2 focus:ring-[#00875A] transition-all" 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50">
           <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-slate-500 font-bold text-sm">Acesso ao Plano {planInfo.name}</span>
              <span className="text-slate-900 font-bold text-sm">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </div>
           <div className="flex justify-between items-center mb-8 px-2">
              <span className="text-slate-900 font-black text-xl">Total</span>
              <span className="text-[#00875A] font-black text-xl">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </div>

           <Button 
             className="w-full h-20 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-black text-sm tracking-widest transition-all shadow-xl shadow-[#00875A]/20 flex items-center justify-between px-10 group"
             onClick={handleNext}
             disabled={!name || !email || !phone}
           >
             <span className="uppercase">Adquirir Agora</span>
             <span className="text-white/90 group-hover:translate-x-1 transition-transform">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </Button>
           
           <p className="text-[10px] text-slate-400 text-center mt-6">Ao pagar, você concorda com os <span className="text-[#00875A] font-bold">termos e políticas</span>.</p>
        </div>
      </CardContent>
    </Card>
  )

  const renderSelection = () => (
    <Card className="border-slate-100 shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
      <CardContent className="p-10 space-y-10">
        <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center mt-2">Escolha o Método de Pagamento</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <button 
             onClick={() => selectMethod('referencia')}
             className={`h-48 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-4 group hover:shadow-2xl ${
               method === 'referencia' ? 'border-[#002D5B] bg-[#002D5B]/5 shadow-xl' : 'border-slate-100 bg-white hover:border-slate-200'
             }`}
           >
              <div className="w-20 h-20 rounded-2xl bg-[#002D5B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <CreditCard className="h-10 w-10 text-white" />
              </div>
              <div className="text-center px-4">
                <span className="text-slate-900 font-black text-sm block">Referência Multicaixa</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic opacity-60">Pague no ATM ou Banco</span>
              </div>
           </button>
           <button 
             onClick={() => selectMethod('express')}
             className={`h-48 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-4 group hover:shadow-2xl ${
               method === 'express' ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-xl' : 'border-slate-100 bg-white hover:border-slate-200'
             }`}
           >
              <div className="w-20 h-20 rounded-2xl bg-[#FF6B00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                 <Smartphone className="h-10 w-10 text-white" />
              </div>
              <div className="text-center px-4">
                <span className="text-slate-900 font-black text-sm block">Multicaixa Express</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic opacity-60">Confirme no seu Telemóvel</span>
              </div>
           </button>
        </div>

        <div className="pt-4 border-t border-slate-50">
           <div className="flex justify-between items-center mb-8 px-2">
              <span className="text-slate-900 font-black text-xl">Total</span>
              <span className="text-[#00875A] font-black text-xl">{planInfo.price.toLocaleString('pt-AO')} kz</span>
           </div>
           <Button 
             variant="ghost" 
             className="w-full text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-600"
             onClick={() => setStep('info')}
           >
             ← Voltar aos dados
           </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderDetails = () => (
    <Card className="border-slate-100 shadow-xl rounded-[2.5rem] bg-white overflow-hidden relative">
      <CardContent className="p-10 space-y-8">
        <button onClick={() => setStep('selection')} className="absolute top-8 right-8 p-3 hover:bg-slate-50 rounded-full transition-all text-slate-400">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2 pt-4">
           <h2 className="text-2xl font-black text-slate-900">
             {method === 'referencia' ? 'Detalhes do Pagamento por Referência' : 'Pagamento Multicaixa Express'}
           </h2>
           <p className="text-slate-400 font-medium text-sm px-8">
             {method === 'referencia' 
               ? 'Use estes dados para completar o pagamento através do seu banco' 
               : 'Aguarde a notificação no seu telefone para autorizar o pagamento'
             }
           </p>
        </div>

        {/* Timer */}
        <div className={`p-8 rounded-[2rem] border transition-all text-center space-y-2 ${method === 'referencia' ? 'bg-[#00875A]/5 border-[#00875A]/20' : 'bg-amber-50 border-amber-200'}`}>
           <div className="flex items-center justify-center gap-2 text-slate-400">
              <Clock className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tempo restante</span>
           </div>
           <div className={`text-4xl font-black font-mono tracking-tighter ${method === 'referencia' ? 'text-[#00875A]' : 'text-amber-600'}`}>
              {formatTime(timeLeft)}
           </div>
        </div>

        {method === 'referencia' ? (
           <div className="space-y-4">
              <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Entidade</span>
                    <span className="text-slate-900 font-black text-xl">{PAYMENT_INFO.entity}</span>
                 </div>
                 <Button variant="ghost" className="p-3 text-slate-400 hover:text-[#00875A]" onClick={() => handleCopy(PAYMENT_INFO.entity, 'entity')}>
                    {copied === 'entity' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Referência</span>
                    <span className="text-slate-900 font-black text-xl tracking-wider">{PAYMENT_INFO.reference}</span>
                 </div>
                 <Button variant="ghost" className="p-3 text-slate-400 hover:text-[#00875A]" onClick={() => handleCopy(PAYMENT_INFO.reference, 'ref')}>
                    {copied === 'ref' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between group">
                 <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Valor</span>
                    <span className="text-slate-900 font-black text-xl font-mono">{planInfo.price.toLocaleString('pt-AO')} kz</span>
                 </div>
                 <Button variant="ghost" className="p-3 text-slate-400 hover:text-[#00875A]" onClick={() => handleCopy(planInfo.price.toString(), 'val')}>
                    {copied === 'val' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                 </Button>
              </div>

              <div className="pt-6 space-y-3">
                 <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-4">Instruções:</h4>
                 {[
                   'Acesse seu Internet Banking ou aplicativo do banco',
                   'Selecione a opção "Pagamentos por Referência"',
                   'Introduza a Entidade e Referência acima',
                   'Confirme o valor e autorize o pagamento'
                 ].map((inst, i) => (
                   <p key={i} className="text-xs text-slate-500 font-medium flex gap-3">
                     <span className="text-slate-300 font-black">{i + 1}.</span> {inst}
                   </p>
                 ))}
              </div>
           </div>
        ) : (
           <div className="text-center py-6 space-y-10">
              <div className="space-y-4">
                 <div className="w-16 h-16 bg-[#00875A]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-[#00875A]" />
                 </div>
                 <h3 className="text-xl font-black text-slate-900">Pedido de Pagamento Enviado</h3>
                 <p className="text-sm text-slate-500 px-10">Verifique o seu telefone para confirmar o pagamento.</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl inline-block min-w-[200px]">
                 <span className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Valor</span>
                 <span className="text-slate-900 font-black text-xl font-mono tracking-tighter">{planInfo.price.toLocaleString('pt-AO')} kz</span>
              </div>

              <div className="pt-4 text-left space-y-3 px-2">
                 <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-4">Instruções:</h4>
                 {[
                   'Aguarde a notificação no seu telefone',
                   'Abra a app do seu banco ou Multicaixa Express',
                   'Verifique os detalhes do pagamento',
                   'Introduza o seu PIN para autorizar'
                 ].map((inst, i) => (
                   <p key={i} className="text-xs text-slate-500 font-medium flex gap-3">
                     <span className="text-slate-300 font-black">{i + 1}.</span> {inst}
                   </p>
                 ))}
              </div>
           </div>
        )}

        <div className="pt-4 space-y-4">
           {/* Receipt Upload Zone */}
           <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] hover:border-[#00875A] transition-all group">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-[#002B5B] mb-4 flex items-center gap-2">
               <FileText className="h-4 w-4" /> Zona de Comprovativo
             </h4>
             
             <div className="flex flex-col items-center justify-center gap-4 py-2">
               {receiptFile ? (
                 <div className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl border border-[#00875A]/20 shadow-xl animate-in fade-in slide-in-from-bottom-2">
                   <div className="w-12 h-12 bg-[#00875A]/10 rounded-xl flex items-center justify-center text-[#00875A]">
                     <CheckCircle2 className="h-6 w-6" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-black text-slate-900 truncate">{receiptFile.name}</p>
                     <p className="text-[10px] font-bold text-slate-400">{(receiptFile.size / 1024 / 1024).toFixed(2)} MB • Pronto</p>
                   </div>
                   <button 
                     onClick={() => setReceiptFile(null)} 
                     className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                   >
                     <X className="h-4 w-4" />
                   </button>
                 </div>
               ) : (
                 <label className="w-full cursor-pointer group">
                   <div className="flex flex-col items-center justify-center gap-3 p-4 transition-all group-hover:scale-105">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-[#002B5B] group-hover:shadow-2xl transition-all border border-slate-100">
                       <PlusCircle className="h-8 w-8" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors text-center">Clique para carregar comprovativo</p>
                   </div>
                   <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                 </label>
               )}
             </div>
           </div>

           <Button 
             className="w-full h-16 rounded-[2rem] bg-[#002D5B] hover:bg-[#001D3D] text-white font-black text-[12px] tracking-[0.2em] transition-all shadow-xl shadow-[#002D5B]/20 flex items-center justify-center gap-3 uppercase"
             onClick={handleSubmitPayment}
             disabled={loading || !receiptFile}
           >
             {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CheckCircle2 className="h-5 w-5" /> Submeter Pagamento</>}
           </Button>
           <p className="text-[10px] text-slate-400 text-center font-bold">Após carregar o comprovativo, clique em submeter para ativação imediata após conferência.</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00875A] blur-[150px] opacity-10 rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00875A] blur-[150px] opacity-10 rounded-full" />
      </div>

      <div className="w-full max-w-2xl relative z-10 space-y-8">
        <div className="flex items-center justify-between px-4 mb-4">
           <button onClick={() => router.push('/plans')} className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-[10px] font-black uppercase tracking-widest">Voltar aos planos</span>
           </button>
           <div className={`px-4 py-1.5 rounded-full border border-[#00875A]/10 bg-white/50 backdrop-blur-sm text-[9px] font-black text-[#00875A] uppercase tracking-widest`}>
              Plano {planInfo.name} — {planInfo.badge}
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <Loader2 className="h-16 w-16 text-[#00875A] animate-spin stroke-[1.5]" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00875A]/60 animate-pulse">Iniciando Checkout</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
