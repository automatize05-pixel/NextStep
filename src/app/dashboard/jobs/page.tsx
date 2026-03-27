"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search, Loader2, MapPin, Building2, Clock, Zap,
  TrendingUp, ExternalLink, Briefcase, Globe, Lock, Crown
} from "lucide-react"

interface Job {
  title: string; company: string; location: string; type: string;
  salary_range: string; match_score: number; match_reasons: string[];
  requirements: string[]; description: string; apply_link: string; posted_days_ago: number
}

export default function JobsPage() {
  const supabase = createClient()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("Luanda, Angola")
  const [jobType, setJobType] = useState("onsite")
  const [marketInsight, setMarketInsight] = useState("")
  const [searched, setSearched] = useState(false)
  const [userPlan, setUserPlan] = useState("free")
  const [quotaRemaining, setQuotaRemaining] = useState<number | null>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('title, bio, plan').eq('id', user.id).single()
      setProfile(p)
      setUserPlan(p?.plan || 'free')
      if (p?.title) setJobTitle(p.title)
    }
    load()
  }, [])

  const search = async () => {
    setLoading(true)
    setJobs([])
    setSearched(false)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: skills } = user
        ? await supabase.from('skills').select('name').eq('profile_id', user.id).limit(8)
        : { data: [] }

      const res = await fetch('/api/ai/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle, location, jobType,
          skills: skills?.map((s: any) => s.name) || [],
          bio: profile?.bio
        })
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.requiresUpgrade) {
          alert(`🔒 ${data.message}`)
        } else {
          alert(data.message || data.error)
        }
        return
      }
      setJobs(data.jobs || [])
      setMarketInsight(data.market_insight || "")
      setSearched(true)
    } finally { setLoading(false) }
  }

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200'
    return 'text-orange-600 bg-orange-50 border-orange-200'
  }

  const getTypeIcon = (type: string) => {
    if (type === 'Remoto') return <Globe className="h-3 w-3" />
    if (type === 'Híbrido') return <Zap className="h-3 w-3" />
    return <Building2 className="h-3 w-3" />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" /> Job Hunter IA
          </h1>
          <p className="text-slate-500 mt-1">Vagas reais encontradas por IA, adaptadas ao seu perfil e ao mercado angolano.</p>
        </div>
        {userPlan !== 'free' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-xs font-black text-primary capitalize">{userPlan}</span>
          </div>
        )}
      </div>

      {/* Free plan notice */}
      {userPlan === 'free' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4">
          <Lock className="h-5 w-5 text-amber-600 shrink-0" />
          <div>
            <p className="font-black text-amber-800 text-sm">Plano Gratuito: 3 pesquisas por dia</p>
            <p className="text-amber-600 text-xs">Faça upgrade para Essencial (15 pesquisas/dia) ou Premium (50/dia) para mais acesso.</p>
          </div>
          <a href="/plans" className="ml-auto shrink-0 px-4 py-2 bg-amber-600 text-white text-xs font-black rounded-lg hover:bg-amber-700 transition-colors">
            Ver Planos
          </a>
        </div>
      )}

      {/* Search Form */}
      <Card>
        <CardHeader><CardTitle>Pesquisar Vagas</CardTitle><CardDescription>A IA adapta os resultados ao seu perfil automaticamente.</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Cargo / Área *</label>
              <Input placeholder="Ex: Engenheiro de Software" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Localização</label>
              <Input placeholder="Ex: Luanda, Angola" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Tipo de Trabalho</label>
              <select value={jobType} onChange={e => setJobType(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-primary">
                <option value="onsite">Presencial</option>
                <option value="remote">Remoto / Internacional</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>
          </div>
          <Button className="mt-4 w-full md:w-auto px-8" onClick={search} disabled={loading || !jobTitle}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A pesquisar com IA...</> : <><Search className="h-4 w-4 mr-2" />Pesquisar Vagas</>}
          </Button>
        </CardContent>
      </Card>

      {/* Market Insight */}
      {marketInsight && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex gap-3">
          <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black uppercase text-primary mb-1">Insight do Mercado</p>
            <p className="text-sm text-slate-700">{marketInsight}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {searched && jobs.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Search className="h-12 w-12 mx-auto mb-4" />
          <p className="font-black">Nenhuma vaga encontrada para este perfil.</p>
          <p className="text-sm mt-1">Tente ajustar o cargo ou a localização.</p>
        </div>
      )}

      {jobs.length > 0 && (
        <div>
          <p className="text-sm font-black text-slate-500 mb-4">{jobs.length} vagas encontradas para "{jobTitle}"</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <Card key={i} className="hover:shadow-lg transition-all border hover:border-primary/30 group">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 text-lg leading-tight truncate group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-slate-500 font-bold text-sm flex items-center gap-2 mt-1"><Building2 className="h-3.5 w-3.5" />{job.company}</p>
                    </div>
                    <div className={`shrink-0 px-3 py-1.5 rounded-xl border text-sm font-black ${getMatchColor(job.match_score)}`}>
                      {job.match_score}% match
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded-lg"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded-lg">{getTypeIcon(job.type)}{job.type}</span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded-lg"><Clock className="h-3 w-3" />Há {job.posted_days_ago} dias</span>
                  </div>

                  {/* Salary */}
                  {job.salary_range && (
                    <p className="text-sm font-black text-green-700 mb-3">💰 {job.salary_range}</p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{job.description}</p>

                  {/* Match Reasons */}
                  {job.match_reasons?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-black uppercase text-slate-400 mb-2">Por que é compatível</p>
                      <div className="space-y-1">
                        {job.match_reasons.slice(0, 2).map((r, ri) => (
                          <p key={ri} className="text-xs text-slate-600 flex gap-2"><span className="text-green-500 font-black">✓</span>{r}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full mt-2 group-hover:bg-primary" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" /> Candidatar-se
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-20 text-slate-200">
          <Briefcase className="h-20 w-20 mx-auto mb-4" />
          <p className="text-2xl font-black text-slate-300">Pesquise vagas com IA</p>
          <p className="text-slate-400 mt-2">Resultados adaptados ao seu perfil e ao mercado angolano.</p>
        </div>
      )}
    </div>
  )
}
