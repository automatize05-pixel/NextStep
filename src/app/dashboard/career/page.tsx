"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Compass, Lightbulb, Target, TrendingUp, ChevronRight, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CareerDiscoveryPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [skills, setSkills] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const [profileRes, skillRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('skills').select('*').eq('user_id', user.id)
        ])
        
        if (profileRes.data) setProfile(profileRes.data)
        if (skillRes.data) setSkills(skillRes.data)
        
        // Mock AI recommendation generation
        // In a real app, this would call an API with OpenAI
        generateMockRecommendations(profileRes.data, skillRes.data || [])
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const generateMockRecommendations = (profileData: any, skillData: any[]) => {
    const interest = profileData?.field_of_interest || "Tecnologia"
    
    // Simulate AI logic based on interest and existing skills
    const recommendations = [
      {
        id: 1,
        role: `Especialista em ${interest}`,
        match: 85,
        why: `Seu perfil demonstra forte interesse em ${interest}. Com a base que você já tem, este é o caminho mais natural.`,
        gaps: ["Certificação Avançada", "Experiência em Projetos Reais"],
        salary: "250.000 Kz - 500.000 Kz",
        demand: "Alta"
      },
      {
        id: 2,
        role: "Gestor(a) de Projetos Digitais",
        match: 60,
        why: `Suas soft skills e visão estratégica detectadas na sua bio sugerem uma boa transição para gestão.`,
        gaps: ["Metodologias Ágeis", "Gestão de Stakeholders"],
        salary: "450.000 Kz - 800.000 Kz",
        demand: "Média-Alta"
      }
    ]
    setRecommendations(recommendations)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <Compass className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold animate-pulse">Analisando seu DNA Profissional...</h2>
          <p className="text-muted-foreground">Cruzando suas competências com as tendências do mercado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-3xl border border-primary/10">
        <div className="space-y-2">
          <Badge className="bg-primary hover:bg-primary shadow-lg mb-2">
            <Sparkles className="h-3 w-3 mr-1" /> IA Ativada
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight">Descoberta de Carreira</h1>
          <p className="text-muted-foreground text-lg text-balance">
            Nossa IA analisou seu perfil e encontrou os melhores caminhos para sua evolução.
          </p>
        </div>
        <div className="flex -space-x-4">
          <div className="h-16 w-16 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center shadow-xl">
             <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center shadow-xl">
             <Target className="h-8 w-8 text-purple-600" />
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-white bg-orange-100 flex items-center justify-center shadow-xl">
             <Lightbulb className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/5">
             <div className="absolute top-0 right-0 p-4">
               <div className="bg-green-50 text-green-700 text-xs font-black px-2 py-1 rounded border border-green-200">
                 {rec.match}% MATCH
               </div>
             </div>
             
             <CardHeader>
               <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary">Caminho Sugerido</CardDescription>
               <CardTitle className="text-2xl pt-2">{rec.role}</CardTitle>
             </CardHeader>
             
             <CardContent className="space-y-6">
               <div className="p-4 bg-muted/40 rounded-xl text-sm italic text-gray-700 border-l-4 border-primary/20">
                 "{rec.why}"
               </div>

               <div className="space-y-3">
                 <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                   <Target className="h-3 w-3" /> Gaps de Competência:
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {rec.gaps.map((gap: string) => (
                     <Badge key={gap} variant="outline" className="bg-white border-red-100 text-red-600 text-[10px] font-bold">
                       - {gap}
                     </Badge>
                   ))}
                 </div>
               </div>

               <div className="flex justify-between items-center py-4 border-t border-dashed">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Média Salarial</p>
                    <p className="font-bold text-lg text-primary">{rec.salary}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Demanda</p>
                    <Badge variant="secondary" className="font-bold">{rec.demand}</Badge>
                  </div>
               </div>
             </CardContent>
             
             <CardFooter>
               <Link href="/dashboard/tracks" className="w-full">
                 <Button className="w-full group-hover:bg-primary transition-colors gap-2">
                   Ver Trilhas Relacionadas <ChevronRight className="h-4 w-4" />
                 </Button>
               </Link>
             </CardFooter>
          </Card>
        ))}

        {/* Dynamic Tip Card */}
        <Card className="bg-black text-white overflow-hidden flex flex-col justify-center p-8 text-center space-y-6 lg:col-span-1">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center self-center">
            <Lightbulb className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Dica da IA NextStep</h3>
            <p className="text-gray-400 text-sm">
              Você tem {skills.length} habilidades cadastradas. Perfis com mais de 10 habilidades específicas têm <b>3.5x mais</b> chances de serem chamados para entrevistas.
            </p>
          </div>
          <Link href="/dashboard/profile">
            <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white">
              Adicionar Mais Habilidades
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
