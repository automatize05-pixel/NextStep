"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Globe, MessageSquare, CheckCircle2, Star, Menu, X, Rocket, ChevronRight, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Real stats for social proof
  const displayUserCount = 1650

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 transition-colors">
      
      {/* Navigation */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-2xl z-[100] border-b border-border/50">
        <Link href="/">
          <Logo />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="/">Início</Link>
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="/about">Sobre</Link>
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="/collaborators">Doações</Link>
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="/partners">Parceiros</Link>
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="/contact">Contacto</Link>
          <Link className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" href="#pricing">Preços</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">
            Entrar
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-blue-700 text-primary-foreground rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 border-none transition-all active:scale-95">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-foreground z-[210] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-[200] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-300 md:hidden">
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-primary transition-all" href="/">Início</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-primary transition-all" href="/about">Sobre</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-primary transition-all" href="/collaborators">Doações</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-primary transition-all" href="/contact">Contacto</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-primary transition-all" href="#pricing">Preços</Link>
          <div className="flex flex-col w-full px-12 gap-4 mt-6">
            <Link onClick={() => setIsMenuOpen(false)} href="/login" className="w-full">
              <Button variant="outline" className="w-full h-16 rounded-2xl border-border bg-muted/30 text-foreground font-black text-xs uppercase tracking-widest hover:bg-muted transition-all">
                Entrar na Conta
              </Button>
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/register" className="w-full">
              <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-blue-700 text-primary-foreground font-black text-xs uppercase tracking-widest transition-all">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-muted/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -mr-96 -mt-96 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -ml-96 -mb-96 pointer-events-none" />
          
          <div className="container relative z-10 px-6 md:px-12 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">A IA que Impulsiona Carreiras em Angola</span>
                </div>
                
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                  O Seu <br />
                  <span className="text-primary italic">Treinador</span> <br />
                  de Carreira.
                </h1>
                
                <p className="max-w-xl text-muted-foreground text-lg sm:text-xl font-bold leading-relaxed opacity-95 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                  Não procures apenas um emprego. <br />
                  <span className="text-foreground">Treina até seres o candidato que nenhuma empresa pode recusar.</span> 
                  A nossa IA prepara-te para o sucesso real no mercado de Angola.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                  <Link href="/register">
                    <Button size="lg" className="h-16 px-12 rounded-2xl bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase text-sm tracking-widest transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] border-none active:scale-95 group">
                      Começar Agora — É Grátis
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-border hover:bg-muted text-foreground bg-transparent font-black uppercase text-sm tracking-widest transition-all">
                      Conhecer Recursos
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image & Floating Badges */}
              <div className="relative flex justify-center lg:justify-end animate-in zoom-in duration-1000 delay-200 mt-12 lg:mt-0">
                <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl">
                  <Image 
                    src="/hero-career.png"
                    alt="Profissional NextStep"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 p-5 bg-card border border-border shadow-2xl rounded-2xl flex items-center gap-4 transition-transform hover:scale-105">
                   <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">CV ATS Score</p>
                      <p className="text-2xl font-black text-green-500">98%</p>
                   </div>
                </div>

                <div className="absolute -bottom-6 -left-6 p-5 bg-card border border-border shadow-2xl rounded-2xl flex items-center gap-4 transition-transform hover:scale-105">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Zap className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase leading-none mb-2">Simulação de IA</p>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: '87%' }} />
                        </div>
                        <span className="text-[11px] font-black text-primary">87%</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full py-16 border-y border-border bg-card/30">
           <div className="container px-6 md:px-12 mx-auto flex flex-col items-center gap-4 text-center">
              <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">Impacto Regional</p>
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter">
                Junte-se a <span className="text-primary underline decoration-primary/30 decoration-8 underline-offset-8">+{displayUserCount}</span> profisisonais evoluindo hoje em Luanda.
              </h2>
           </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 bg-background">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center space-y-4 mb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  <Star className="h-3 w-3 fill-primary" /> Recursos de Elite
               </div>
               <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none">Tudo o que você precisa <br /><span className="text-primary italic">em um só lugar.</span></h2>
               <p className="max-w-2xl mx-auto text-muted-foreground font-bold text-lg sm:text-xl px-4 mt-6">Tecnologia simplificada para impulsionar o seu crescimento profissional.</p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  title: 'Vagas em Tempo Real', 
                  desc: 'Encontre oportunidades reais em Angola e no mundo. Nossa IA filtra o que realmente combina com você.',
                  icon: <Globe className="h-8 w-8 text-blue-500" />,
                  link: '#',
                  color: 'blue'
                },
                { 
                  title: 'Simulador de Elite', 
                  desc: 'Treine entrevistas com uma IA que responde como um recrutador real. Perca o medo e ganhe confiança.',
                  icon: <MessageSquare className="h-8 w-8 text-primary" />,
                  link: '#',
                  color: 'primary'
                },
                { 
                  title: 'Currículo de Impacto', 
                  desc: 'Gere currículos profissionais prontos para sistemas de seleção (ATS) em segundos. Destaque-se na multidão.',
                  icon: <ShieldCheck className="h-8 w-8 text-purple-500" />,
                  link: '#',
                  color: 'purple'
                }
              ].map((item, i) => (
                <div key={i} className="group p-10 bg-card rounded-[3rem] border border-border hover:border-primary/50 transition-all shadow-xl hover:shadow-primary/5 relative overflow-hidden animate-in fade-in zoom-in duration-1000">
                  <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-8 border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground font-bold text-base leading-relaxed mb-10 opacity-80">{item.desc}</p>
                  <Link href={item.link} className="inline-flex items-center gap-3 text-[11px] font-black uppercase text-primary tracking-[0.2em] hover:opacity-80 transition-all">
                    Explorar Recurso <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-32 bg-muted/20">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter">Planos & <span className="text-primary italic">Preços</span></h2>
              <p className="text-muted-foreground font-black text-lg max-w-xl mx-auto uppercase tracking-widest opacity-60">Invista no seu futuro. Resultados reais.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { id: 'free', name: 'Explora', price: 'Grátis', desc: 'Ideal para começar', btn: 'outline' },
                { id: 'starter', name: 'Primeiro Passo', price: '1.500 Kz', desc: 'Entrada no mercado', btn: 'default' },
                { id: 'essential', name: 'Preparação Pro', price: '3.500', desc: 'Recomendado', premium: true, btn: 'default' },
                { id: 'premium', name: 'Aceleração', price: '8.500', desc: 'Resultados rápidos', btn: 'default' },
                { id: 'elite', name: 'Elite VIP', price: '15.000', desc: 'Tudo Ilimitado', btn: 'default' }
              ].map((plan) => (
                <Card key={plan.id} className={`p-8 bg-card border-border rounded-[2.5rem] flex flex-col justify-between transition-all hover:-translate-y-2 hover:shadow-2xl ${plan.premium ? 'border-primary border-4 shadow-primary/10 scale-105 z-10' : ''}`}>
                  <div className="space-y-6">
                    <div>
                       <h3 className="font-black text-xl mb-1">{plan.name}</h3>
                       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{plan.desc}</p>
                    </div>
                    <div>
                      <span className="text-3xl font-black">{plan.price}</span>
                      {plan.price !== 'Grátis' && <span className="text-muted-foreground text-xs font-bold leading-none ml-1">Kz/mês</span>}
                    </div>
                  </div>
                  <Link href={`/register?plan=${plan.id}`} className="mt-8">
                    <Button variant={plan.btn as any} className={`w-full font-black text-[10px] uppercase tracking-widest rounded-xl h-12 shadow-lg ${plan.premium ? 'animate-pulse' : ''}`}>
                       Começar
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border py-20 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Logo />
            <p className="text-muted-foreground font-bold text-sm leading-relaxed max-w-xs">Redefinindo o futuro do trabalho em Angola através da inteligência artificial e excelência tecnológica.</p>
          </div>
          
          <div className="space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[11px] text-foreground border-l-4 border-primary pl-3">A Plataforma</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all">Nossa Missão</Link></li>
                <li><Link href="/collaborators" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all">Doações & Apoio</Link></li>
                <li><Link href="/partners" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all">Seja Parceiro</Link></li>
              </ul>
          </div>

          <div className="space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[11px] text-foreground border-l-4 border-primary pl-3">Comunidade</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all">Instagram</Link></li>
                <li><Link href="#" className="text-sm font-bold text-muted-foreground hover:text-primary transition-all">LinkedIn</Link></li>
              </ul>
          </div>

          <div className="flex flex-col justify-end">
             <div className="p-5 bg-muted rounded-[2rem] border border-border flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground opacity-70">Sistema Operacional</span>
             </div>
          </div>
        </div>
        
        <div className="container mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">© 2026 NEXTSTEP TECHNOLOGIES. LUANDA, ANGOLA.</p>
           <div className="flex gap-8">
              <Link href="/terms" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em]">Termos</Link>
              <Link href="/privacy" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em]">Privacidade</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
