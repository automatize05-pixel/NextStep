"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, Clock, BarChart, Lock, PlayCircle, Trophy, Sparkles, 
  ChevronRight, CheckCircle2, Target, Lightbulb, Loader2 
} from "lucide-react"

export default function TracksPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [targetRole, setTargetRole] = useState("")
  const [generatedTrack, setGeneratedTrack] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setProfile(p)
        if (p?.title) setTargetRole(p.title)
      }
    }
    load()
  }, [])

  const generateTrack = async () => {
    if (!targetRole) return
    setLoading(true)
    try {
      const res = await fetch('/api/ai/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, currentLevel: 'Iniciante' })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setGeneratedTrack(data)
    } catch (err) {
      console.error(err)
      alert("Falha ao gerar trilha. Verifique sua quota.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 space-y-3">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 px-3 py-1 font-black uppercase tracking-tighter text-[10px]">
            <Sparkles className="h-3 w-3 mr-1 animate-pulse" /> IA Career Architect
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Trilhas de Elite 2026</h1>
          <p className="text-white text-xl font-bold max-w-2xl leading-relaxed opacity-100">
            Mapeamos o mercado em tempo real para criar o seu roadmap personalizado. Não estude o que é estático, domine o que o mercado pede hoje.
          </p>
        </div>
      </div>

      {/* AI Search Section */}
      {!generatedTrack && (
        <Card className="bg-slate-900/50 border-white/5 backdrop-blur-xl p-8 max-w-3xl mx-auto text-center space-y-6">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tight">Qual seu próximo passo?</h2>
            <p className="text-slate-200 font-bold text-lg">Insira o cargo que deseja alcançar ou a área que quer dominar.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Input 
              placeholder="Ex: Desenvolvedor Senior, Gestor de Tráfego, UI Designer..." 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-slate-950/50 border-white/10 h-12 text-white font-bold"
            />
            <Button 
               disabled={loading || !targetRole}
               onClick={generateTrack}
               className="h-12 px-8 bg-primary hover:bg-primary/90 font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Gerando...</> : "Mapear Trilha IA"}
            </Button>
          </div>
        </Card>
      )}

      {/* Generated Track View */}
      {generatedTrack && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: The Map */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <ChevronRight className="text-primary h-6 w-6" /> {generatedTrack.track_title}
              </h2>
              <Button variant="ghost" className="text-xs text-slate-500 font-bold hover:text-white" onClick={() => setGeneratedTrack(null)}>
                Redefinir Objetivo
              </Button>
            </div>

            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {generatedTrack.milestones.map((step: any, idx: number) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-primary font-black shadow-xl z-10 shrink-0 md:order-1 transition-all duration-500 group-hover:scale-125 group-hover:bg-primary group-hover:text-white">
                    {step.step}
                  </div>
                  {/* Content Card */}
                  <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/80 border-white/5 hover:border-primary/50 transition-all p-6 shadow-2xl backdrop-blur-sm">
                    <CardHeader className="p-0 mb-3 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px] font-bold text-slate-500 border-slate-700">{step.duration}</Badge>
                        <CheckCircle2 className="h-4 w-4 text-slate-800" />
                      </div>
                      <CardTitle className="text-lg font-black text-white">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.resources.map((res: string, ridx: number) => (
                          <div key={ridx} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-300 border border-white/5">
                            <BookOpen className="h-3 w-3 text-primary" /> {res}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Insights */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="bg-slate-900 border-white/5 overflow-hidden">
                <div className="bg-primary/20 p-4 border-b border-white/5 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span className="font-black text-xs uppercase tracking-widest text-primary">Destaques do Mercado</span>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    {generatedTrack.market_tips.map((tip: string, tidx: number) => (
                      <div key={tidx} className="flex gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <p className="text-sm text-slate-300 font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Estimativa Salarial 2026</p>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                      <p className="text-3xl font-black text-white tracking-tighter">{generatedTrack.salary_expectation}</p>
                      <p className="text-xs text-slate-500 mt-1">Baseado em dados de mercado para {targetRole}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-slate-950 hover:bg-slate-800 border border-white/10 font-bold no-print" 
                    variant="outline"
                    onClick={handleDownloadPDF}
                  >
                    Baixar Roadmap PDF
                  </Button>
                </CardContent>
             </Card>

             <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 p-6 flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-xl shadow-indigo-500/20">
                  <Trophy className="h-8 w-8 text-indigo-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-white italic tracking-tight">Certificação NextStep</h3>
                  <p className="text-xs text-slate-400 font-medium">Complete esta trilha para ganhar o badge de Profissional Validado no seu perfil.</p>
                </div>
             </Card>
          </div>
        </div>
      )}

      {/* Footer / Info */}
      <div className="text-center pt-20">
        <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">NextStep Engine v4.0 • Real-Time Learning</p>
      </div>
    </div>
  )
}
