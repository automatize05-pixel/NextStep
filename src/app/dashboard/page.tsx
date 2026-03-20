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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, {profile?.full_name?.split(' ')[0] || 'Usuário'}!</h1>
          <p className="text-muted-foreground text-lg">Aqui está o seu progresso na jornada NextStep.</p>
        </div>
        <Link href="/dashboard/profile">
          <Button className="bg-primary hover:bg-primary/90 shadow-md">Atualizar Perfil</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Perfil Completo</CardTitle>
            <UserCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completeness}%</div>
            <div className="w-full bg-secondary/30 h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${completeness}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">CV Otimizado</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile?.has_resume ? "Pronto" : "Pendente"}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {profile?.has_resume ? "Gerado com sucesso" : "Aguardando preenchimento"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Experiências</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{expCount}</div>
            <p className="text-xs text-muted-foreground mt-2">Registos profissionais no perfil</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Competências</CardTitle>
            <Trophy className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{skillCount}</div>
            <p className="text-xs text-muted-foreground mt-2">Habilidades técnicas e soft skills</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Next Steps */}
        <Card className="md:col-span-4 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Roteiro de Evolução
            </CardTitle>
            <CardDescription>Siga estas etapas para maximizar suas chances.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`flex items-start gap-4 p-3 rounded-lg border transition-colors ${completeness >= 60 ? 'bg-green-50/50 border-green-100' : 'bg-white'}`}>
              <div className={`mt-1 ${completeness >= 60 ? 'text-green-500' : 'text-primary'}`}>
                {completeness >= 60 ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">1. Base Profissional</h4>
                <p className="text-sm text-muted-foreground">Preencher dados básicos, bio e pelo menos 1 experiência.</p>
              </div>
              {completeness < 60 && (
                <Link href="/dashboard/profile">
                  <Button variant="outline" size="sm">Completar</Button>
                </Link>
              )}
            </div>

            <div className={`flex items-start gap-4 p-3 rounded-lg border transition-colors ${profile?.has_resume ? 'bg-green-50/50 border-green-100' : 'bg-white'}`}>
              <div className={`mt-1 ${profile?.has_resume ? 'text-green-500' : 'text-muted-foreground'}`}>
                {profile?.has_resume ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">2. Portfólio de Candidato</h4>
                <p className="text-sm text-muted-foreground">Gerar a primeira versão do seu currículo otimizado.</p>
              </div>
              {!profile?.has_resume && (
                <Link href="/dashboard/cv">
                  <Button variant="outline" size="sm" disabled={completeness < 40}>Gerar CV</Button>
                </Link>
              )}
            </div>

            <div className="flex items-start gap-4 p-3 rounded-lg border bg-white opacity-60">
              <div className="mt-1 text-muted-foreground">
                <Circle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">3. Simulação de Entrevistas</h4>
                <p className="text-sm text-muted-foreground">Treinar com a IA para sua primeira oportunidade.</p>
              </div>
              <Link href="/dashboard/interviews">
                <Button variant="outline" size="sm" disabled={!profile?.has_resume}>Treinar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="md:col-span-3 shadow-md bg-gradient-to-br from-white to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Advisor IA
            </CardTitle>
            <CardDescription>Análise personalizada do seu momento.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm leading-relaxed text-primary-foreground dark:text-primary">
              <p className="font-bold mb-2">Insight de hoje:</p>
              {completeness < 50 ? (
                <p>Seu perfil ainda está muito básico. Adicionar pelo menos <strong>3 habilidades técnicas</strong> e detalhar suas <strong>conquistas</strong> na última experiência ajudará a IA a sugerir as melhores trilhas de estudo para você.</p>
              ) : !profile?.has_resume ? (
                <p>Ótimo trabalho preenchendo seu perfil! O próximo passo ideal é <strong>gerar seu currículo</strong>. Analisaremos as palavras-chave para garantir que você passe nos filtros automáticos (ATS).</p>
              ) : (
                <p>Seu currículo está pronto! Recomendamos agora a trilha de <strong>"Soft Skills para Entrevistas"</strong> para alinhar seu discurso técnico com o que os recrutadores buscam.</p>
              )}
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase text-muted-foreground">Área de Interesse</h5>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-white border rounded-full text-xs font-medium shadow-sm">
                  {profile?.field_of_interest || "Geral"}
                </div>
                <div className="px-3 py-1 bg-white border rounded-full text-xs font-medium shadow-sm">
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
