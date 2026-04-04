"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Globe, GraduationCap, MapPin, Search, ChevronRight, Activity, BookOpen, Crown, AlertTriangle } from "lucide-react"
import { UpgradeModal } from "@/components/shared/upgrade-modal"

interface ScholarshipRecommendation {
  program_name: string
  country: string
  match_score: number
  description: string
  application_link?: string
  requirements: string[]
  gap_analysis: string
  action_plan: string
}

export default function ScholarshipsPage() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  
  const [country, setCountry] = useState("Global")
  const [degree, setDegree] = useState("Mestrado")
  const [area, setArea] = useState("")

  const [recommendations, setRecommendations] = useState<ScholarshipRecommendation[]>([])
  const [generalAdvice, setGeneralAdvice] = useState("")
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        if (data) setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const handleSearch = async () => {
    if (!area) return

    setLoading(true)
    setRecommendations([])

    try {
      const res = await fetch('/api/ai/scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, country, degree, area })
      })

      if (res.status === 429) {
        setShowUpgradeModal(true)
        setLoading(false)
        return
      }

      const data = await res.json()
      if (data.recommendations) {
        setRecommendations(data.recommendations)
        setGeneralAdvice(data.general_advice)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
           <Globe className="w-32 h-32 text-primary rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-widest uppercase mb-4 shadow-xl shadow-primary/20">NOVO</Badge>
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-foreground">A sua ponte para <span className="text-primary">Bolsas Internacionais</span></h1>
          <p className="text-muted-foreground font-bold text-lg leading-relaxed text-balance">
            Diga-nos onde quer estudar e a nossa IA fará uma varredura nas maiores fundações mundiais (DAAD, Fulbright, Chevening), comparando o seu currículo com os requisitos reais.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Formulário */}
        <div className="space-y-6">
          <Card className="bg-card border-border shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="flex items-center gap-2 font-black text-lg">
                 <Search className="w-5 h-5 text-primary" /> Parâmetros de Busca
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">País Alvo</label>
                <select 
                   value={country}
                   onChange={e => setCountry(e.target.value)}
                   className="w-full h-12 rounded-xl border-border bg-background font-bold px-3 text-sm"
                >
                  <option value="Global">Em Todo o Mundo</option>
                  <option value="Europa (Erasmus / Outros)">Europa Geral</option>
                  <option value="Alemanha (DAAD)">Alemanha</option>
                  <option value="Reino Unido (Chevening / Outros)">Reino Unido</option>
                  <option value="Estados Unidos (Fulbright)">Estados Unidos</option>
                  <option value="Brasil (CAPES / CNPq)">Brasil</option>
                  <option value="França (Eiffel / Outros)">França</option>
                  <option value="Japão (MEXT)">Japão</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Grau</label>
                <select 
                   value={degree}
                   onChange={e => setDegree(e.target.value)}
                   className="w-full h-12 rounded-xl border-border bg-background font-bold px-3 text-sm"
                >
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutoramento / PhD">Doutoramento / PhD</option>
                  <option value="Pós-Graduação">Pós-Graduação</option>
                  <option value="Cursos Curtos / Especialização">Especialização Curta</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Área Específica</label>
                <Input 
                  placeholder="Ex: Engenharia Informática, Gestão de Projetos, Economia..." 
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="h-12 border-border bg-background font-bold rounded-xl"
                />
              </div>

              <Button 
                onClick={handleSearch}
                disabled={loading || !area}
                className="w-full h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 transition-all mt-4"
              >
                {loading ? "Mapeando Fundações..." : "Descobrir Bolsas"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          {loading && (
             <div className="h-64 flex flex-col items-center justify-center p-8 bg-card border-border border border-dashed rounded-3xl animate-pulse">
               <Globe className="w-10 h-10 text-primary/50 animate-spin-slow mb-4" />
               <p className="font-bold text-muted-foreground">O nosso agente inteligente está a cruzar o seu perfil com as bases internacionais...</p>
             </div>
          )}

          {!loading && recommendations.length === 0 && (
             <div className="h-64 flex flex-col items-center justify-center p-8 bg-card border-border border border-dashed rounded-3xl text-center">
               <GraduationCap className="w-12 h-12 text-muted-foreground/30 mb-4" />
               <h3 className="font-black text-xl mb-2">Pronto para estudar fora?</h3>
               <p className="text-muted-foreground text-sm max-w-md font-bold">Defina a sua área e deixe a nossa IA auditar as centenas de fundações disponíveis para sugerir os melhores *matches* com o seu CV atual.</p>
             </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
              <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl text-sm leading-relaxed mb-8 flex gap-4">
                 <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Crown className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="font-black tracking-tight text-blue-700 mb-1">Dica Global da IA</h4>
                    <p className="font-bold text-muted-foreground">{generalAdvice}</p>
                 </div>
              </div>

              {recommendations.map((rec, i) => (
                <Card key={i} className="bg-card border-border rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all relative group">
                  <div className="absolute top-6 right-6 flex flex-col items-end">
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Match Score</span>
                     <Badge variant={rec.match_score > 70 ? 'default' : 'secondary'} className="font-black text-lg px-3 py-1 bg-emerald-500 hover:bg-emerald-600">
                       {rec.match_score}%
                     </Badge>
                  </div>
                  <CardHeader className="pr-32">
                    <CardTitle className="text-2xl font-black text-foreground mb-2 flex items-center gap-2">
                       {rec.program_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 font-bold">
                       <MapPin className="w-4 h-4 text-primary" /> {rec.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-sm font-bold leading-relaxed">{rec.description}</p>
                    
                    <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
                       <h4 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" /> Análise de Requisitos Virtuais
                       </h4>
                       <p className="text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                          {rec.gap_analysis}
                       </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                       <div>
                          <h4 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                             <BookOpen className="w-3 h-3" /> Requisitos Fortes
                          </h4>
                          <ul className="space-y-2">
                            {rec.requirements.map((req, r) => (
                              <li key={r} className="text-xs font-bold text-muted-foreground flex relative pl-4">
                                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                                {req}
                              </li>
                            ))}
                          </ul>
                       </div>
                       
                       <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <h4 className="font-black text-[10px] uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                             Plano de Ação
                          </h4>
                          <p className="text-xs font-bold text-muted-foreground leading-relaxed">
                            {rec.action_plan}
                          </p>
                       </div>
                    </div>
                 <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {rec.application_link && (
                      <Button asChild className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-emerald-600/20">
                         <a href={rec.application_link} target="_blank" rel="noopener noreferrer">
                           Candidatar à Bolsa Principal
                         </a>
                      </Button>
                    )}
                 </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        title="Limite de Pesquisa Atingido"
        description="O Plano Gratuito possui limite diário de buscas internacionais ativas para salvaguardar a IA. Subscreva um plano Premium para varrer as maiores fundações mundiais sem limites!"
      />
    </div>
  )
}
