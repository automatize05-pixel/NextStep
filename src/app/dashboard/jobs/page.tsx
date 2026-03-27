"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
      if (!user) return

      // Load skills if profile exists
      const { data: skillsRes } = await supabase.from('skills').select('name').eq('user_id', user.id).limit(6)
      
      const res = await fetch('/api/ai/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: jobTitle || profile?.title,
          location,
          jobType,
          skills: skillsRes?.map((s: any) => s.name) || [],
          bio: profile?.bio
        })
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.requiresUpgrade) {
          alert(`🔒 ${data.message}`)
        } else {
          alert(data.error || "Erro ao pesquisar vagas.")
        }
        return
      }
      setJobs(data.jobs || [])
      setMarketInsight(data.market_insight || "")
      setSearched(true)
    } catch (e) {
      console.error(e)
      alert("Falha na conexão com o servidor de IA.")
    } finally { setLoading(false) }
  }

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200'
    return 'text-orange-600 bg-orange-50 border-orange-200'
  }

  const getTypeIcon = (type: string) => {
    if (type?.toLowerCase().includes('remoto')) return <Globe className="h-3 w-3" />
    if (type?.toLowerCase().includes('híbrido')) return <Zap className="h-3 w-3" />
    return <Building2 className="h-3 w-3" />
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-100/50 p-6 rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Busca Web em Tempo Real Ativa</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" /> Job Hunter IA
          </h1>
          <p className="text-slate-500 mt-1">Vagas reais extraídas agora do LinkedIn, Jobartis e AngoEmprego.</p>
        </div>
        <div className="flex items-center gap-3">
          {userPlan !== 'free' && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-xs font-black text-primary capitalize">{userPlan}</span>
            </div>
          )}
        </div>
      </div>

      {/* Free plan notice */}
      {userPlan === 'free' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4">
          <Lock className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="flex-1">
            <p className="font-black text-amber-800 text-sm">Plano Gratuito: Acesso Limitado</p>
            <p className="text-amber-600 text-xs">A pesquisa web em tempo real consome mais recursos. Evolua para o plano Essencial para 15 buscas/dia.</p>
          </div>
          <Link href="/plans">
            <Button size="sm" variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100 font-black">Ver Planos</Button>
          </Link>
        </div>
      )}

      {/* Search Form */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500" />
        <CardHeader><CardTitle className="text-xl">O que procura hoje?</CardTitle><CardDescription>A IA vai rastrear a web por vagas de acordo com os filtros abaixo.</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Cargo / Área Atuação *</label>
              <Input placeholder="Ex: Engenheiro de Software" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="bg-slate-50" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Localização (Filtro)</label>
              <Input placeholder="Ex: Luanda, Angola" value={location} onChange={e => setLocation(e.target.value)} className="bg-slate-50" />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-500 mb-1 block">Modelo de Trabalho</label>
              <select value={jobType} onChange={e => setJobType(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-primary font-medium">
                <option value="onsite">Presencial (Angola)</option>
                <option value="remote">Remoto / Internacional</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>
          </div>
          <Button className="mt-4 w-full md:w-auto px-8 font-black" onClick={search} disabled={loading || !jobTitle}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A Rastrear a Web...</> : <><Zap className="h-4 w-4 mr-2" />Iniciar Caça IA</>}
          </Button>
        </CardContent>
      </Card>

      {/* Market Insight */}
      {marketInsight && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 shadow-sm">
          <TrendingUp className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black uppercase text-blue-600 mb-1 tracking-widest">Resumo do Mercado em Tempo Real</p>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{marketInsight}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {searched && jobs.length === 0 && (
        <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="font-black text-slate-600">Nenhum resultado web no momento.</p>
          <p className="text-sm mt-1">Tente ser mais genérico no cargo ou procure 'Remoto'.</p>
        </div>
      )}

      {jobs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className="h-px flex-1 bg-slate-200" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{jobs.length} Vagas Encontradas agora</p>
             <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <Card key={i} className="hover:shadow-xl transition-all border-slate-100 hover:border-primary/50 group bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex h-full">
                    {/* Score side color */}
                    <div className={`w-1.5 ${job.match_score >= 80 ? 'bg-green-500' : 'bg-blue-500'}`} />
                    
                    <div className="p-6 flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="min-w-0">
                          <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-500 font-bold text-sm">{job.company}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-xs text-slate-400 font-medium">{job.location}</span>
                          </div>
                        </div>
                        <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-[11px] font-black uppercase tracking-wider ${getMatchColor(job.match_score)}`}>
                          {job.match_score}% Match
                        </div>
                      </div>

                      {/* Meta Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded uppercase">{getTypeIcon(job.type)} {job.type}</span>
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-[10px] font-black text-green-600 rounded uppercase">{job.salary_range}</span>
                      </div>

                      {/* AI Reasoning */}
                      <div className="mb-5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Análise de Compatibilidade</p>
                        <ul className="space-y-1">
                          {job.match_reasons?.slice(0, 2).map((r, ri) => (
                            <li key={ri} className="text-xs text-slate-600 flex gap-2 font-medium">
                              <span className="text-primary font-black">→</span> {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full font-black text-xs uppercase tracking-widest group-hover:bg-primary shadow-sm" size="sm">
                          Postular via Web <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-slate-300" />
          <p className="text-xl font-black text-slate-400">O Job Hunter está em modo de espera...</p>
          <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Insira o seu cargo acima para começarmos a varredura web.</p>
        </div>
      )}
    </div>
  )
}
