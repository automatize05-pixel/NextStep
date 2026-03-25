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
      {/* Header */}
      <header className="px-4 md:px-6 h-16 border-b flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link className="flex items-center justify-center font-bold text-xl text-primary" href="/">
          NextStep
        </Link>
        <nav className="flex gap-3 sm:gap-6 items-center">
          <Link className="hidden sm:block text-sm font-medium hover:text-primary transition-colors" href="#features">
            Funcionalidades
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
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 bg-muted/40 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Dê o <span className="text-primary">próximo passo</span> da sua carreira
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl pt-4">
                  Construa seu perfil, crie currículos impactantes e prepare-se para o mercado com apoio de inteligência artificial. Uma plataforma focada na evolução profissional para Angola.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto px-4">
                <Link href={session ? "/dashboard" : "/register"} className="w-full sm:w-auto">
                  <Button size="lg" className="h-12 w-full sm:px-8 text-md font-bold shadow-lg">Começar Gratuitamente</Button>
                </Link>
                <Link href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-12 w-full sm:px-8 text-md font-bold">Como funciona?</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tudo que você precisa</h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">Desenvolvemos as melhores ferramentas para alavancar sua carreira no mercado angolano.</p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-card">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Gerador de Currículo</h3>
                <p className="text-muted-foreground leading-relaxed">Crie currículos profissionais com templates modernos directamente a partir do seu perfil estruturado.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-card">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Trilhas de Capacitação</h3>
                <p className="text-muted-foreground leading-relaxed">Guias práticos passo a passo para conseguir estágios, o primeiro emprego ou transição de carreira.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-card sm:col-span-2 lg:col-span-1">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Simulador com IA</h3>
                <p className="text-muted-foreground leading-relaxed">Treine para entrevistas respondendo perguntas reais e receba feedback imediato da nossa Inteligência Artificial.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-12 bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center gap-6">
          <Link className="font-bold text-xl text-primary" href="/">NextStep</Link>
          <p className="text-sm text-muted-foreground text-center">© 2026 NextStep. Evoluindo a carreira dos angolanos. Todos os direitos reservados.</p>
          <nav className="flex gap-6">
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/terms">Termos</Link>
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/privacy">Privacidade</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
