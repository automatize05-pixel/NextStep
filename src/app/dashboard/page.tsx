export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Circle, Trophy, BarChart3, MessageSquare, FileText, UserCircle, Briefcase, Crown, ArrowRight } from "lucide-react"

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
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Hero Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-primary p-8 rounded-[2.5rem] border border-primary/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] -mr-32 -mt-32 rounded-full transition-transform group-hover:scale-110 duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] -ml-32 -mb-32 rounded-full" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Sessão Ativa</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Olá, {profile?.full_name?.split(' ')[0] || 'Usuário'}! 👋</h1>
          <p className="text-white/80 text-lg font-bold">O seu sucesso está a ser construído agora.</p>
        </div>
        
        <Link href="/dashboard/profile" className="relative z-10 w-full lg:w-auto">
          <Button className="w-full lg:w-auto bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/10 h-14 px-10 font-black text-xs uppercase tracking-[0.2em] rounded-2xl group transition-all active:scale-95">
            Atualizar Perfil
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-xl border-l-4 border-l-primary overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Perfil Completo</CardTitle>
            <UserCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{completeness}%</div>
            <div className="w-full bg-muted h-2 mt-4 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${completeness}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border shadow-xl border-l-4 border-l-blue-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">CV Otimizado</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{profile?.has_resume ? "Pronto" : "Pendente"}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-black uppercase tracking-widest leading-none">
              {profile?.has_resume ? "Gerado com sucesso" : "Aguardando preenchimento"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl border-l-4 border-l-purple-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Experiências</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{expCount}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-black uppercase tracking-widest leading-none">Histórico profissional</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl border-l-4 border-l-orange-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Competências</CardTitle>
            <Trophy className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{skillCount}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-black uppercase tracking-widest leading-none">Skills verificadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Next Steps */}
        <Card className="lg:col-span-4 shadow-xl border-border bg-card overflow-hidden rounded-[2rem]">
          <CardHeader className="border-b bg-muted/20 pb-6">
            <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tight">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Roteiro de Evolução
            </CardTitle>
            <CardDescription className="font-bold text-muted-foreground">Siga estas etapas para maximizar suas chances no mercado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className={`flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl border transition-all ${completeness >= 60 ? 'bg-green-500/5 border-green-500/20 shadow-sm' : 'bg-background border-border shadow-inner'}`}>
              <div className={`hidden sm:flex h-12 w-12 rounded-xl items-center justify-center shrink-0 ${completeness >= 60 ? 'bg-green-500/10 text-green-500' : 'bg-primary/5 text-primary'}`}>
                {completeness >= 60 ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-black tracking-tight mb-1">1. Base Profissional</h4>
                <p className="text-sm text-muted-foreground font-bold leading-snug">Complete os dados básicos, bio e pelo menos 1 experiência.</p>
              </div>
              {completeness < 60 && (
                <Link href="/dashboard/profile" className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto font-black h-10 px-6 rounded-xl border-primary/20 text-primary hover:bg-primary/5">Completar</Button>
                </Link>
              )}
            </div>

            <div className={`flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl border transition-all ${profile?.has_resume ? 'bg-green-500/5 border-green-500/20 shadow-sm' : 'bg-background border-border shadow-inner'}`}>
              <div className={`hidden sm:flex h-12 w-12 rounded-xl items-center justify-center shrink-0 ${profile?.has_resume ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                {profile?.has_resume ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-black tracking-tight mb-1">2. Portfólio de Candidato</h4>
                <p className="text-sm text-muted-foreground font-bold leading-snug">Gerar a primeira versão do seu currículo otimizado pela IA.</p>
              </div>
              {!profile?.has_resume && (
                <Link href="/dashboard/cv" className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" disabled={completeness < 40} className="w-full sm:w-auto font-black h-10 px-6 rounded-xl transition-all">Gerar CV</Button>
                </Link>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl border bg-muted/10 border-border opacity-70 grayscale">
              <div className="hidden sm:flex h-12 w-12 rounded-xl items-center justify-center shrink-0 bg-muted text-muted-foreground">
                <Circle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-black tracking-tight mb-1">3. Simulação de Entrevistas</h4>
                <p className="text-sm text-muted-foreground font-bold leading-snug">Prepare-se com a nossa IA para o mercado real.</p>
              </div>
              <Link href="/dashboard/interviews" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" disabled={!profile?.has_resume} className="w-full sm:w-auto font-black h-10 px-6 rounded-xl">Treinar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="lg:col-span-3 shadow-2xl bg-card border-border overflow-hidden rounded-[2rem] relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tight text-primary">
              <MessageSquare className="h-6 w-6" />
              Advisor IA
            </CardTitle>
            <CardDescription className="font-bold">Análise estratégica baseada no seu perfil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-3xl bg-muted/30 border border-border shadow-inner relative group-hover:bg-muted/50 transition-colors">
              <p className="font-black text-[10px] uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <Trophy className="h-3 w-3" />
                Insight de Hoje
              </p>
              <div className="text-[15px] text-foreground font-bold leading-relaxed">
                {completeness < 50 ? (
                  <p>O seu perfil ainda está básico. Adicionar mais <span className="text-primary underline decoration-2 underline-offset-4 font-black">habilidades técnicas</span> ajudará a IA a sugerir as melhores vagas em Angola para você.</p>
                ) : !profile?.has_resume ? (
                  <p>Ótimo trabalho! O próximo passo ideal é <span className="text-primary underline decoration-2 underline-offset-4 font-black">gerar o seu currículo</span> para podermos analisar as palavras-chave.</p>
                ) : (
                  <p>O seu currículo está pronto! Recomendamos agora focar na <span className="text-primary underline decoration-2 underline-offset-4 font-black">preparação para entrevistas</span> técnicas com a nossa IA.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">O Seu Estado Atual</h5>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-black text-primary shadow-sm">
                  {profile?.field_of_interest || "ÁREA GERAL"}
                </div>
                <div className="px-5 py-2 bg-muted border border-border rounded-xl text-xs font-black text-foreground shadow-sm">
                  {profile?.current_level?.toUpperCase() || "NÍVEL INICIAL"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics & Gamification Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Career Progress Tracker */}
        <Card className="shadow-xl bg-card border-border rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-muted/10 border-b">
            <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" /> Evolução de Carreira
            </CardTitle>
            <CardDescription className="font-bold">Acompanhe o seu crescimento mensal.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex h-48 items-end gap-3 mt-4">
              {[
                { month: 'Nov', score: 20 },
                { month: 'Dez', score: 35 },
                { month: 'Jan', score: 55 },
                { month: 'Fev', score: 85 },
                { month: 'Mar', score: completeness },
              ].map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end group cursor-pointer">
                  <div className="w-full bg-muted/40 rounded-xl relative flex items-end justify-center h-full max-h-[160px] overflow-hidden">
                    <div 
                      className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all duration-300 rounded-t-xl relative border-t-4 border-primary" 
                      style={{ height: `${data.score}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-[10px] py-1.5 px-3 rounded-xl font-black shadow-xl whitespace-nowrap">
                        {data.score} Pontos
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-muted-foreground mt-4 uppercase tracking-widest">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements / Badges */}
        <Card className="shadow-xl bg-card border-border rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-muted/10 border-b">
            <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" /> Minhas Conquistas
            </CardTitle>
            <CardDescription className="font-bold">Badges que desbloqueou navegando na plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Perfil Ativo', desc: 'Dados Preenchidos', icon: <UserCircle className="h-5 w-5 text-blue-500" />, bg: 'bg-blue-500/10 border-blue-500/20', unlocked: completeness >= 50 },
                { title: 'Criador Elite', desc: 'Primeiro CV Gerado', icon: <FileText className="h-5 w-5 text-purple-500" />, bg: 'bg-purple-500/10 border-purple-100/20', unlocked: profile?.has_resume },
                { title: 'Caçador', desc: 'Pronto para Vagas', icon: <Briefcase className="h-5 w-5 text-orange-500" />, bg: 'bg-orange-500/10 border-orange-500/20', unlocked: false },
                { title: 'VIP NextStep', desc: 'Acesso Premium', icon: <Crown className="h-5 w-5 text-yellow-500" />, bg: 'bg-yellow-500/10 border-yellow-500/20', unlocked: profile?.plan !== 'free' },
              ].map((b, i) => (
                <div key={i} className={`p-4 rounded-[1.5rem] border flex items-center gap-4 transition-all duration-300 hover:shadow-lg ${b.unlocked ? b.bg : 'bg-muted/30 border-border opacity-50 grayscale'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-card shadow-sm shrink-0 border border-border/50`}>
                    {b.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[13px] font-black text-foreground leading-tight truncate">{b.title}</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1">{b.unlocked ? b.desc : 'Bloqueado'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
