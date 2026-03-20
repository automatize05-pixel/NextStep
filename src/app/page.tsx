export const dynamic = 'force-dynamic'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link className="flex items-center justify-center font-bold text-xl text-primary" href="/">
          NextStep
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Funcionalidades
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">
            Como Funciona
          </Link>
          {session ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                Entrar
              </Link>
              <Link href="/register">
                <Button size="sm">Cadastro Grátis</Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40 text-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Dê o <span className="text-primary">próximo passo</span> da sua carreira
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pt-4">
                  Construa seu perfil, crie currículos impactantes e prepare-se para o mercado com apoio de inteligência artificial. Uma plataforma 100% gratuita para sua evolução profissional.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Link href={session ? "/dashboard" : "/register"}>
                  <Button size="lg" className="h-12 px-8 text-md">Começar Gratuitamente</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-md">Entenda como funciona</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Tudo que você precisa em um só lugar</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">Desenvolvemos as melhores ferramentas para alavancar sua carreira.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-card">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Gerador de Currículo</h3>
                <p className="text-muted-foreground">Crie currículos profissionais com templates modernos diretamente a partir do seu perfil estruturado.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-card">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Trilhas de Capacitação</h3>
                <p className="text-muted-foreground">Guias práticos passo a passo para conseguir estágios, o primeiro emprego ou transição de carreira.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition bg-card">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Simulador com IA</h3>
                <p className="text-muted-foreground">Treine para entrevistas respondendo perguntas reais e receba feedback imediato da nossa Inteligência Artificial.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between h-16 gap-4">
          <p className="text-sm text-muted-foreground">© 2026 NextStep. Todos os direitos reservados.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="#">Termos de Uso</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground" href="#">Privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
