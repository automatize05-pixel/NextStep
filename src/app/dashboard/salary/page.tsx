"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DollarSign, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function SalaryPage() {
  const supabase = createClient()
  const [jobTitle, setJobTitle] = useState("")
  const [sector, setSector] = useState("")
  const [yearsExp, setYearsExp] = useState("1")
  const [location, setLocation] = useState("Luanda")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [defaultSkills, setDefaultSkills] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const [{ data: profile }, { data: skills }] = await Promise.all([
        supabase.from('profiles').select('title').eq('id', user.id).single(),
        supabase.from('skills').select('name').eq('profile_id', user.id).limit(5)
      ])
      if (profile?.title) setJobTitle(profile.title)
      if (skills) setDefaultSkills(skills.map((s: any) => s.name))
    }
    load()
  }, [])

  const analyze = async () => {
    if (!jobTitle) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/ai/salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, sector, yearsExperience: parseInt(yearsExp), location, skills: defaultSkills })
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message || data.error); return }
      setResult(data)
    } finally { setLoading(false) }
  }

  const formatKz = (v: number) => v ? `${(v/1000).toFixed(0)}k Kz` : '—'
  const formatUsd = (v: number) => v ? `$${v.toLocaleString()}` : '—'
  const demandColor = result?.market_demand === 'Alta' ? 'text-green-600' : result?.market_demand === 'Baixa' ? 'text-red-500' : 'text-orange-500'
  const DemandIcon = result?.market_demand === 'Alta' ? TrendingUp : result?.market_demand === 'Baixa' ? TrendingDown : Minus

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-green-600" /> Análise Salarial Justa
        </h1>
        <p className="text-slate-500 mt-1">Descubra se a proposta que recebeu é justa para o mercado angolano.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Parâmetros da Análise</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-1 block">Cargo *</label>
              <Input placeholder="Ex: Engenheiro Civil Sénior" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Setor</label>
                <Input placeholder="Ex: Petrolífero" value={sector} onChange={e => setSector(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Localização</label>
                <Input placeholder="Ex: Luanda" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700 mb-1 block">Anos de Experiência</label>
              <Input type="number" min="0" max="30" value={yearsExp} onChange={e => setYearsExp(e.target.value)} />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={analyze} disabled={loading || !jobTitle}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A analisar...</> : "🔍 Analisar Salário"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-green-700">Resultado da Análise</CardTitle>
                <div className={`flex items-center gap-2 font-black text-sm ${demandColor}`}>
                  <DemandIcon className="h-5 w-5" /> Demanda de mercado: {result.market_demand}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Mínimo", kz: result.min_kz, usd: result.min_usd, color: "text-slate-600" },
                    { label: "Mediana", kz: result.median_kz, usd: result.median_usd, color: "text-green-700 font-black" },
                    { label: "Máximo", kz: result.max_kz, usd: result.max_usd, color: "text-slate-600" },
                  ].map(col => (
                    <div key={col.label} className="text-center p-4 bg-white rounded-xl border">
                      <p className="text-xs font-black uppercase text-slate-400 mb-2">{col.label}</p>
                      <p className={`text-xl font-black ${col.color}`}>{formatKz(col.kz)}</p>
                      <p className="text-xs text-slate-400">{formatUsd(col.usd)}</p>
                    </div>
                  ))}
                </div>
                {result.recommendation && (
                  <div className="p-4 bg-white rounded-xl border-l-4 border-green-500">
                    <p className="text-sm font-bold text-slate-700">{result.recommendation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {result.insights && (
              <Card>
                <CardHeader><CardTitle className="text-base">Insights do Mercado</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {result.insights.map((insight: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm text-slate-600"><span className="text-green-500 font-black">→</span>{insight}</div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
