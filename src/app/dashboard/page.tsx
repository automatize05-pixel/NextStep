import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data;
  }

  // Calculate generic profile completeness
  const completeness = profile?.full_name && profile?.current_level && profile?.field_of_interest ? 40 : 10;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Olá, {profile?.full_name?.split(' ')[0] || 'Usuário'}!</h1>
        <p className="text-muted-foreground">Bem-vindo(a) ao seu painel de evolução profissional.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfil Completo</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completeness}%</div>
            <p className="text-xs text-muted-foreground">Preencha seus dados na aba Perfil</p>
            <div className="w-full bg-secondary/20 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${completeness}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Currículo</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.has_resume ? "Pronto" : "Pendente"}</div>
            <p className="text-xs text-muted-foreground">Gere um PDF em "Meu Currículo"</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trilhas Concluídas</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Explore as opções em "Trilhas"</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas Simuladas</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Aumente sua confiança treinando</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>Recomendações para sua evolução</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <span className="text-primary font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Completar Perfil Profissional</h4>
                <p className="text-sm text-muted-foreground">Adicione suas experiências e formação.</p>
              </div>
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">Fazer agora</Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 opacity-50">
              <div className="bg-muted p-2 rounded-full">
                <span className="text-muted-foreground font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Gerar Primeiro Currículo</h4>
                <p className="text-sm text-muted-foreground">Precisa do perfil 100% preenchido.</p>
              </div>
              <Button variant="outline" size="sm" disabled>Bloqueado</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sua Prontidão (Análise IA)</CardTitle>
            <CardDescription>Baseado nos dados do seu perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md bg-accent/50 text-sm">
              <p className="mb-2"><strong>Aviso do Orientador:</strong></p>
              <p>Seu perfil ainda possui poucas informações para uma análise profunda. Recomendamos adicionar suas <strong>habilidades principais</strong> e <strong>experiências recentes</strong> para que a IA possa sugerir caminhos de carreira interessantes para a área de {profile?.field_of_interest || "tecnologia"}.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
