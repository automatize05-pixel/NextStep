"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Compass, Lightbulb, TrendingUp } from "lucide-react"

export default function CareerPathsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setProfile(profileData)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div>Analisando seu perfil...</div>

  // Mocked recommendations based on profile
  const field = profile?.field_of_interest || "Sua Área"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Caminhos Profissionais</h1>
        <p className="text-muted-foreground">Um guia inteligente de carreiras baseado no seu perfil.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-accent/30 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="h-5 w-5 text-primary" />
              <CardTitle>Recomendações da IA</CardTitle>
            </div>
            <CardDescription>Baseado nas suas habilidades e seu objetivo principal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Com base no seu interesse em <strong>{field}</strong> e na sua experiência atual, identificamos que você está em 
              fase de estruturação de conhecimento. Para aumentar sua empregabilidade, sugerimos o fortalecimento de 
              habilidades comportamentais (soft skills) que são altamente valorizadas para o seu perfil.
            </p>
            <div className="bg-background rounded-md p-3 border">
              <h4 className="font-medium text-sm mb-1 flex items-center gap-1"><Lightbulb className="h-4 w-4 text-amber-500" /> Dica Ouro</h4>
              <p className="text-xs text-muted-foreground">Crie um portfólio prático, mesmo que usando projetos de estudos. O mercado está valorizando mais a demonstração prática do que apenas o currículo escrito.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Cargos Compatíveis</CardTitle>
            </div>
            <CardDescription>Oportunidades alinhadas ao seu momento na carreira</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">Assistente de {field}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Foco em operação diária e acompanhamento sistêmico.</p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">Compatibilidade Alta</span>
              </li>
              <li className="flex items-start justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">Analista Júnior</h4>
                  <p className="text-xs text-muted-foreground mt-1">Requer um pouco mais de conhecimento técnico das ferramentas básicas.</p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">Compatibilidade Média</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">Freelancer Independente</h4>
                  <p className="text-xs text-muted-foreground mt-1">Ótimo para construir portfólio real prestando serviços online.</p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">Compatibilidade Alta</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Oportunidades de Vagas (Em Breve)</CardTitle>
          </div>
          <CardDescription>Conexão direta com vagas reais do mercado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
            <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Portal de Vagas em Desenvolvimento</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-2">
              Em breve, nossa Inteligência Artificial fará o "match" do seu perfil diretamente com vagas de milhares de empresas cadastradas no NextStep.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
