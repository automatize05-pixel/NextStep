export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Circle, Trophy, BarChart3, MessageSquare, FileText, UserCircle } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null;
  let expCount = 0;
  let eduCount = 0;
  let skillCount = 0;

  if (user) {
    const [profileRes, expRes, eduRes, skillRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('experiences').select('*', { count: 'exact', head: true }),
      supabase.from('education').select('*', { count: 'exact', head: true }),
      supabase.from('skills').select('*', { count: 'exact', head: true }),
    ])
    
    profile = profileRes.data;
    expCount = expRes.count || 0;
    eduCount = eduRes.count || 0;
    skillCount = skillRes.count || 0;
  }

  // Calculate completeness based on real data
  let points = 0;
  if (profile?.full_name) points += 10;
  if (profile?.title) points += 10;
  if (profile?.bio) points += 10;
  if (profile?.location) points += 10;
  if (expCount > 0) points += 20;
  if (eduCount > 0) points += 20;
  if (skillCount >= 3) points += 20;
  
  const completeness = points;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-heading">Olá, {profile?.full_name?.split(' ')[0] || 'Usuário'}!</h1>
          <p className="text-slate-500 text-base md:text-lg">Aqui está o seu progresso na jornada NextStep.</p>
        </div>
        <Link href="/dashboard/profile" className="w-full lg:w-auto">
          <Button className="w-full lg:w-auto bg-primary hover:bg-primary/90 shadow-md h-11 px-6 font-bold">Atualizar Perfil</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Perfil Completo</CardTitle>
            <UserCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{completeness}%</div>
            <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${completeness}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CV Otimizado</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{profile?.has_resume ? "Pronto" : "Pendente"}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-2 font-medium">
              {profile?.has_resume ? "Gerado com sucesso" : "Aguardando preenchimento"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Experiências</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{expCount}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-2 font-medium">Histórico profissional</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Competências</CardTitle>
            <Trophy className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">{skillCount}</div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-2 font-medium">Skills verificadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Next Steps */}
        <Card className="lg:col-span-4 shadow-md overflow-hidden">
          <CardHeader className="bg-slate-50/50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Roteiro de Evolução
            </CardTitle>
            <CardDescription>Siga estas etapas para maximizar suas chances.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border transition-colors ${completeness >= 60 ? 'bg-green-50/30 border-green-100' : 'bg-white'}`}>
              <div className={`hidden sm:block ${completeness >= 60 ? 'text-green-500' : 'text-primary'}`}>
                {completeness >= 60 ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:hidden mb-1">
                  {completeness >= 60 ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-primary" />}
                  <h4 className="text-sm font-bold">1. Base Profissional</h4>
                </div>
                <h4 className="hidden sm:block text-sm font-bold">1. Base Profissional</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Preencher dados básicos, bio e pelo menos 1 experiência.</p>
              </div>
              {completeness < 60 && (
                <Link href="/dashboard/profile" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto font-bold">Completar</Button>
                </Link>
              )}
            </div>

            <div className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border transition-colors ${profile?.has_resume ? 'bg-green-50/30 border-green-100' : 'bg-white'}`}>
              <div className={`hidden sm:block ${profile?.has_resume ? 'text-green-500' : 'text-muted-foreground'}`}>
                {profile?.has_resume ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:hidden mb-1">
                  {profile?.has_resume ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                  <h4 className="text-sm font-bold">2. Portfólio de Candidato</h4>
                </div>
                <h4 className="hidden sm:block text-sm font-bold">2. Portfólio de Candidato</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Gerar a primeira versão do seu currículo otimizado.</p>
              </div>
              {!profile?.has_resume && (
                <Link href="/dashboard/cv" className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" disabled={completeness < 40} className="w-full sm:w-auto font-bold">Gerar CV</Button>
                </Link>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border bg-slate-50 opacity-70">
              <div className="hidden sm:block text-muted-foreground">
                <Circle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:hidden mb-1">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-bold">3. Simulação de Entrevistas</h4>
                </div>
                <h4 className="hidden sm:block text-sm font-bold">3. Simulação de Entrevistas</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Treinar com a IA para sua primeira oportunidade real.</p>
              </div>
              <Link href="/dashboard/interviews" className="w-full sm:w-auto mt-2 sm:mt-0">
                <Button variant="outline" size="sm" disabled={!profile?.has_resume} className="w-full sm:w-auto font-bold">Treinar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="lg:col-span-3 shadow-md bg-gradient-to-br from-white to-blue-50/30 overflow-hidden border-blue-100/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-primary">
              <MessageSquare className="h-5 w-5" />
              Advisor IA
            </CardTitle>
            <CardDescription>Análise personalizada do seu momento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-5 rounded-2xl bg-white/80 border border-blue-100 shadow-sm text-sm leading-relaxed relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8"></div>
              <p className="font-bold text-primary mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Insight de hoje:
              </p>
              {completeness < 50 ? (
                <p className="text-slate-700">Seu perfil ainda está básico. Adicionar mais <strong>habilidades técnicas</strong> ajudará a IA a sugerir as melhores vagas em Angola para você.</p>
              ) : !profile?.has_resume ? (
                <p className="text-slate-700">Ótimo trabalho! O próximo passo ideal é <strong>gerar seu currículo</strong> para podermos analisar as palavras-chave.</p>
              ) : (
                <p className="text-slate-700">Seu currículo está pronto! Recomendamos agora focar na <strong>preparação para entrevistas</strong> técnicas.</p>
              )}
            </div>
            
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status por IA</h5>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {profile?.field_of_interest || "Geral"}
                </div>
                <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {profile?.current_level || "Nível não definido"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
