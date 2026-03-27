"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileEdit, Loader2, Copy, Download, ClockIcon, CheckCircle2 } from "lucide-react"

interface CoverLetter { id: string; job_title: string; company_name: string; created_at: string }

export default function CoverLetterPage() {
  const supabase = createClient()
  const [jobTitle, setJobTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<CoverLetter[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const [{ data: profile }, { data: letters }] = await Promise.all([
        supabase.from('profiles').select('full_name, title, bio').eq('id', user.id).single(),
        supabase.from('cover_letters').select('id, job_title, company_name, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
      ])
      setUserProfile(profile)
      setHistory(letters || [])
    }
    load()
  }, [])

  const generate = async () => {
    if (!jobTitle) return
    setLoading(true)
    setResult("")
    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, companyName, userProfile })
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message || data.error); return }
      setResult(data.content)
      // Refresh history
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: letters } = await supabase.from('cover_letters').select('id, job_title, company_name, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
        setHistory(letters || [])
      }
    } finally { setLoading(false) }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `carta_apresentacao_${jobTitle.replace(/\s/g,'_')}.txt`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
          <FileEdit className="h-8 w-8 text-primary" /> Carta de Apresentação
        </h1>
        <p className="text-slate-500 mt-1">Gere uma carta profissional e persuasiva com IA, adaptada ao mercado angolano.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Gerar Nova Carta</CardTitle><CardDescription>Preencha os dados da vaga e a IA escreve para você.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Cargo Pretendido *</label>
                <Input placeholder="Ex: Analista de Dados Sénior" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Nome da Empresa (opcional)</label>
                <Input placeholder="Ex: BFA, Unitel, Sonangol..." value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <Button className="w-full" onClick={generate} disabled={loading || !jobTitle}>
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A gerar...</> : "✨ Gerar com IA"}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">Carta Gerada</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>{copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />} {copied ? "Copiado!" : "Copiar"}</Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}><Download className="h-4 w-4 mr-1" /> .TXT</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans bg-slate-50 p-6 rounded-xl">{result}</pre>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Histórico</CardTitle><CardDescription>Suas últimas cartas geradas.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {history.length === 0 && <p className="text-sm text-slate-400 italic">Nenhuma carta gerada ainda.</p>}
              {history.map(l => (
                <div key={l.id} className="p-3 bg-slate-50 rounded-xl border hover:border-primary/40 transition-all">
                  <p className="font-bold text-sm text-slate-900 truncate">{l.job_title}</p>
                  {l.company_name && <p className="text-xs text-slate-500">{l.company_name}</p>}
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><ClockIcon className="h-3 w-3" />{new Date(l.created_at).toLocaleDateString('pt-AO')}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
