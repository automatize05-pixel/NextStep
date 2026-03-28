"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, Loader2, CheckCircle2, Crown, ArrowLeft } from "lucide-react"

const PLAN_INFO: Record<string, { name: string; price: number; color: string }> = {
  starter: { name: 'Primeiro Passo', price: 1500, color: 'border-green-400' },
  essential: { name: 'Preparação Pro', price: 3500, color: 'border-blue-400' },
  premium: { name: 'Aceleração Total', price: 8500, color: 'border-purple-400' },
  elite: { name: 'Elite VIP', price: 15000, color: 'border-yellow-400' },
}

const IBAN_INFO = {
  bank: "IBAN KWik",
  iban: "AO06.0420.0000.0000.0006.1077.260",
  account_holder: "NextStep Lda.",
  entity: "10116",
  reference: "947005277",
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const plan = searchParams.get('plan') || 'essential'
  const planInfo = PLAN_INFO[plan] || PLAN_INFO.essential

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")

  const handleUpload = async () => {
    if (!file || !name) return
    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // Upload receipt to Supabase Storage
      const ext = file.name.split('.').pop()
      const fileName = `receipts/${user.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('receipts').getPublicUrl(fileName)
      const receiptUrl = urlData?.publicUrl

      // Create subscription record
      const { error: subError } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan_type: plan,
        amount_kz: planInfo.price,
        receipt_url: receiptUrl,
        status: 'pending',
        notes: notes || `Comprovativo enviado por ${name}`
      })

      if (subError) throw subError
      setDone(true)
    } catch (err) {
      console.error(err)
      alert("Erro ao enviar comprovativo. Tente novamente.")
    } finally { setUploading(false) }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white">Comprovativo Enviado!</h1>
          <p className="text-slate-400">O seu pagamento está em análise. A activação do plano <span className="text-white font-black">{planInfo.name}</span> será feita em até 24 horas úteis.</p>
          <p className="text-slate-200 text-sm">Receberá uma notificação assim que o seu plano for ativado.</p>
          <Button onClick={() => router.push('/dashboard')} className="w-full">← Ir ao Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <button onClick={() => router.push('/plans')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /> Voltar aos planos
        </button>

        {/* Plan Summary */}
        <div className={`p-6 rounded-2xl border-2 ${planInfo.color} bg-slate-900`}>
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="text-white font-black text-lg">Plano {planInfo.name}</p>
              <p className="text-slate-300 text-sm">Activação em até 24h após confirmação do pagamento</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-black text-white">{planInfo.price.toLocaleString('pt-AO')} Kz</p>
              <p className="text-slate-400 text-xs">por mês</p>
            </div>
          </div>
        </div>

        {/* IBAN Instructions */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">1. Faça a Transferência</CardTitle>
            <CardDescription className="text-slate-400">Transfira o valor para a conta abaixo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-4">
              <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest text-center">Recomendado: Pagamento por Referência</p>
              <div className="flex justify-between items-center py-2 border-b border-primary/10">
                <span className="text-slate-400 text-sm font-bold">Entidade</span>
                <span className="text-white font-black text-sm">{IBAN_INFO.entity}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400 text-sm font-bold">Referência</span>
                <span className="text-primary font-black text-sm">{IBAN_INFO.reference}</span>
              </div>
            </div>

            <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest text-center">Ou via IBAN</p>
            {[
              { label: 'Banco', value: IBAN_INFO.bank },
              { label: 'IBAN', value: IBAN_INFO.iban },
              { label: 'Titular', value: IBAN_INFO.account_holder },
              { label: 'Montante', value: `${planInfo.price.toLocaleString('pt-AO')} Kz` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                <span className="text-slate-400 text-sm font-bold">{label}</span>
                <span className="text-white font-black text-sm text-right">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upload Receipt */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">2. Envie o Comprovativo</CardTitle>
            <CardDescription className="text-slate-300">Após a transferência, envie a prova de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-slate-400 mb-2 block">O seu nome completo *</label>
              <Input placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 font-bold" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Comprovativo (imagem ou PDF) *</label>
              <label className={`block w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center ${file ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-primary/60 bg-slate-800/50'}`}>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                {file ? (
                  <div className="text-green-400">
                    <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-black text-sm">{file.name}</p>
                    <p className="text-xs text-green-600 mt-1">{(file.size / 1024).toFixed(0)} KB — Clique para trocar</p>
                  </div>
                ) : (
                  <div className="text-slate-400">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-bold text-sm">Clique para selecionar</p>
                    <p className="text-xs mt-1">JPG, PNG ou PDF — Máx. 5MB</p>
                  </div>
                )}
              </label>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-400 mb-2 block">Notas (opcional)</label>
              <Input placeholder="Ex: Pagamento referente ao mês de Abril..." value={notes} onChange={e => setNotes(e.target.value)} className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" />
            </div>
            <Button className="w-full font-black" onClick={handleUpload} disabled={!file || !name || uploading}>
              {uploading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A enviar...</> : <><Upload className="h-4 w-4 mr-2" />Enviar Comprovativo</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
