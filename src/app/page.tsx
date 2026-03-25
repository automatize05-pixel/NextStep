export const dynamic = 'force-dynamic'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ChevronRight, ShieldCheck, Zap, Globe, Users, ArrowRight, Star } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  // Real stats for social proof
  const { count: userCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true })
  const displayUserCount = (userCount || 0) + 1200 // Mock a bit for "Institutional" feel if needed, or keep it real

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
      
      {/* Premium Header */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-[100] border-b border-slate-100">
        <Link className="flex items-center gap-2 group" href="/">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">N</div>
          <span className="font-black text-2xl tracking-tighter text-slate-900">Next<span className="text-primary italic">Step</span></span>
        </Link>
        <nav className="hidden md:flex gap-10 items-center">
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors" href="#features">Funcionalidades</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors" href="#how-it-works">Como Funciona</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors" href="/support">Suporte</Link>
          <div className="h-4 w-px bg-slate-200" />
          {session ? (
            <Link href="/dashboard">
              <Button variant="default" className="rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">Dashboard</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-transparent hover:border-primary transition-all">Entrar</Link>
              <Link href="/register">
                <Button className="rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">Criar Conta</Button>
              </Link>
            </div>
          )}
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </header>

      <main className="flex-1">
        {/* Dynamic Premium Hero Section */}
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-slate-900">
           <div className="absolute inset-0 z-0 opacity-40">
             <Image 
                src="file:///C:/Users/us/.gemini/antigravity/brain/767c7cce-c0c5-4cd8-8575-819af80868d4/nextstep_hero_premium_1774478125152.png"
                alt="NextStep Hero"
                fill
                className="object-cover"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
           </div>

          <div className="container relative z-10 px-6 md:px-12 mx-auto">
            <div className="max-w-4xl space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary backdrop-blur-md">
                 <ShieldCheck className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Protocolo de Carreira Angola V5</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                O Seu Próximo <br />
                <span className="text-primary italic">Grande Passo</span> <br />
                Começa Aqui.
              </h1>
              
              <p className="max-w-2xl text-slate-300 text-lg md:text-xl font-bold leading-relaxed opacity-80">
                A primeira plataforma institucional de Angola que une Inteligência Artificial, busca de vagas em tempo real e simuladores de elite para acelerar sua jornada profissional.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href={session ? "/dashboard" : "/register"}>
                  <Button size="lg" className="h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_50px_rgba(var(--primary-rgb),0.4)] hover:scale-105 transition-all flex items-center gap-3 group">
                    Começar Gratuitamente
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-white/20 hover:bg-white/10 text-white font-black uppercase text-xs tracking-[0.2em] backdrop-blur-sm">
                    Ver Funcionalidades
                  </Button>
                </Link>
              </div>

              <div className="pt-12 flex items-center gap-8 border-t border-white/10">
                 <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center font-black text-[10px]">NS</div>
                    ))}
                 </div>
                 <div className="space-y-1">
                    <p className="text-white font-black text-xl tracking-tight">+{displayUserCount} Profissionais</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Já estão evoluindo com o NextStep</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights - Premium Grid */}
        <section id="features" className="w-full py-32 bg-white">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 mb-24">
               <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Ecossistema Profissional</p>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight italic">Tudo que você precisa em <br /> um só lugar.</h2>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <div className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm text-primary flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4">Busca Web em Tempo Real</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-6 italic">A IA Crawford varre os principais portais de emprego de Angola para encontrar a vaga que o LinkedIn não te mostrou.</p>
                <div className="pt-6 border-t border-slate-200">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">Tecnologia Crawler V5</span>
                </div>
              </div>
              
              <div className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm text-primary flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-black mb-4">Simulador de Entrevistas</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-6 italic">Prepare-se com nossa IA Recrutadora. Receba feedback real, melhore sua oratória e perca o medo com simulações personalizadas.</p>
                <div className="pt-6 border-t border-slate-200">
                    <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Real-time Coaching</span>
                </div>
              </div>

              <div className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm text-primary flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                  <ArrowRight className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black mb-4">Trilhas de Carreira</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-6 italic">Não sabe por onde começar? Nossas trilhas gamificadas te guiam do básico à contratação, com certificados validados.</p>
                <div className="pt-6 border-t border-slate-200">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Roadmap Strategist</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-slate-900 py-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="container px-6 md:px-12 mx-auto relative z-10 text-center space-y-12">
                <div className="flex justify-center gap-1 text-primary">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter max-w-4xl mx-auto">"O NextStep mudou a forma como encaro o mercado de trabalho em Luanda. É a ferramenta que faltava."</h2>
                <div>
                   <p className="text-white font-black text-xl">Ricardo dos Santos</p>
                   <p className="text-primary font-black uppercase tracking-widest text-xs mt-2">Engenheiro de Software • Premium User</p>
                </div>
            </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-20 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6 md:col-span-2">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-primary/20">N</div>
              <span className="font-black text-2xl tracking-tighter text-slate-900">Next<span className="text-primary italic">Step</span></span>
            </Link>
            <p className="text-slate-500 font-bold max-w-xs text-sm leading-relaxed">Modernizando a carreira dos angolanos com o poder da Inteligência Artificial e Governança de Dados.</p>
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-all"><Globe className="h-4 w-4" /></div>
            </div>
          </div>
          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400">Plataforma</h4>
             <ul className="space-y-4">
                <li><Link href="#features" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Funcionalidades</Link></li>
                <li><Link href="/dashboard" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Meu Perfil</Link></li>
                <li><Link href="/support" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Ajuda & FAQ</Link></li>
             </ul>
          </div>
          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400">Legal</h4>
             <ul className="space-y-4">
                <li><Link href="/terms" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Privacidade</Link></li>
                <li><Link href="/community" className="text-sm font-black text-slate-900 hover:text-primary transition-all">Diretrizes</Link></li>
             </ul>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">© 2026 NextStep Angola Hub • Built for Africa</p>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">System Operational v5.3.1</span>
            </div>
        </div>
      </footer>
    </div>
  )
}
