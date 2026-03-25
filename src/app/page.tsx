export const dynamic = 'force-dynamic'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ShieldCheck, Zap, Globe, MessageSquare, CheckCircle2, Star, Menu } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  // Real stats for social proof
  const { count: userCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true })
  const displayUserCount = (userCount || 0) + 1200

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/20">
      
      {/* Navigation - Matching Reference */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-[#0B0F19]/80 backdrop-blur-xl z-[100]">
        <Link className="flex items-center gap-2 group" href="/">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/20">N</div>
          <span className="font-black text-2xl tracking-tighter">Next<span className="text-[#2563EB] italic">Step</span></span>
        </Link>
        
        <nav className="hidden md:flex gap-10 items-center">
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/">Início</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="#features">Recursos</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="#pricing">Preços</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/support">Sobre</Link>
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-[#2563EB] hover:bg-blue-700 rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/register">
              <Button className="bg-[#2563EB] hover:bg-blue-700 rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl">Criar Conta</Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Matching Reference */}
        <section className="relative w-full py-16 lg:py-24 overflow-hidden">
          <div className="container relative z-10 px-6 md:px-12 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                <div className="flex items-center gap-2 text-[#22C55E]">
                   <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-widest opacity-80">IA de Carreira Ativa em Angola</span>
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
                  O Seu Próximo <br />
                  <span className="text-[#FFD700]">Grande Passo</span> <br />
                  <span className="text-white">Começa Aqui.</span>
                </h1>
                
                <p className="max-w-xl text-slate-400 text-lg font-bold leading-relaxed">
                  A plataforma de carreira impulsionada por IA líder em Angola. Potencialize seu futuro profissional com tecnologia de elite e conexões globais.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/register">
                    <Button size="lg" className="h-14 px-10 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-500/20">
                      Começar Agora
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="h-14 px-10 rounded-xl border-white/10 hover:bg-white/5 text-white bg-slate-900/50 font-black uppercase text-xs tracking-widest">
                      Ver Demonstração
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image & Floating Badges */}
              <div className="relative flex justify-center lg:justify-end animate-in zoom-in duration-1000 delay-200">
                <div className="relative w-full max-w-[500px] aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <Image 
                    src="file:///C:/Users/us/.gemini/antigravity/brain/767c7cce-c0c5-4cd8-8575-819af80868d4/nextstep_hero_premium_1774478125152.png"
                    alt="Profissional NextStep"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-40" />
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-[#22C55E]" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase">CV Score</p>
                      <p className="text-xl font-black text-[#22C55E]">98%</p>
                   </div>
                </div>

                <div className="absolute -bottom-6 -left-6 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-[#FFD700]" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">Simulação de IA</p>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-[#22C55E]" style={{ width: '87%' }} />
                        </div>
                        <span className="text-[10px] font-black text-[#22C55E]">87%</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Social Proof - No Logos as requested */}
        <section className="w-full py-20 border-y border-white/5 bg-[#0B0F19]">
           <div className="container px-6 md:px-12 mx-auto flex flex-col items-center gap-4 text-center">
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Impacto Regional</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-[#FFD700]">+{displayUserCount}</span> Profissionais Inscritos em Luanda
              </h2>
           </div>
        </section>

        {/* Features - "Recursos de Elite" */}
        <section id="features" className="w-full py-32">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="space-y-4 mb-20">
               <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Recursos de <span className="text-[#FFD700]">Elite</span></h2>
               <p className="max-w-xl text-slate-400 font-bold">Tecnologia avançada de nível global, adaptada especificamente para o mercado de trabalho angolano.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-[#2563EB]/40 transition-all group">
                <div className="h-14 w-14 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-8">
                  <Globe className="h-6 w-6 text-[#2563EB]" />
                </div>
                <h3 className="text-xl font-black mb-4">Busca IA Crawford</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">Nosso algoritmo proprietário de correspondência inteligente que conecta talentos locais a oportunidades globais.</p>
                <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#2563EB] tracking-widest hover:gap-4 transition-all">Explorar Tecnologia <ChevronRight className="h-3 w-3" /></Link>
              </div>

              <div className="p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-[#FFD700]/40 transition-all group">
                <div className="h-14 w-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-8">
                  <MessageSquare className="h-6 w-6 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-black mb-4">Simulador de Entrevistas</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">Pratique com nossa IA em tempo real e receba feedback instantâneo sobre postura, tom e conteúdo das respostas.</p>
                <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#FFD700] tracking-widest hover:gap-4 transition-all">Iniciar Simulação <ChevronRight className="h-3 w-3" /></Link>
              </div>

              <div className="p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group">
                <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mb-8">
                   <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-4">Trilhas de Carreira</h3>
                <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">Mapas personalizados e guiados por dados para ajudar você a alcançar as posições mais cobiçadas do mercado.</p>
                <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-white tracking-widest hover:gap-4 transition-all">Ver Meu Mapa <ChevronRight className="h-3 w-3" /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial - Matching Reference */}
        <section className="w-full py-32 bg-[#0B0F19]">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="max-w-4xl mx-auto p-12 bg-slate-950/50 rounded-[3rem] border border-white/5 relative">
                 <div className="absolute top-10 left-10 text-[#2563EB]/20">
                    <svg width="60" height="40" viewBox="0 0 60 40" fill="currentColor"><path d="M0 20C0 8.954 8.954 0 20 0h5v20H10c0 5.523 4.477 10 10 10v10C8.954 40 0 31.046 0 20zm35 0c0-11.046 8.954-20 20-20h5v20H45c0 5.523 4.477 10 10 10v10c-11.046 0-20-8.954-20-20z"/></svg>
                 </div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
                       <div className="w-full h-full bg-slate-800 flex items-center justify-center font-black text-2xl text-primary">RS</div>
                    </div>
                    <div className="space-y-6">
                       <p className="text-xl md:text-2xl font-bold leading-relaxed italic opacity-80">
                         "A NextStep mudou completamente a minha visão de mercado. Através da IA, consegui identificar competências que precisava desenvolver e em 3 meses fui contratado por uma multinacional em Luanda."
                       </p>
                       <div>
                          <p className="font-black text-lg">Ricardo dos Santos</p>
                          <p className="text-[10px] font-black uppercase text-[#2563EB] tracking-widest mt-1">Engenheiro de Software Júnior</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Footer - Matching Reference */}
      <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-16 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-xl">N</div>
              <span className="font-black text-2xl tracking-tighter">Next<span className="text-[#2563EB] italic">Step</span></span>
            </Link>
            <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs">Redefinindo o futuro do trabalho em Angola através da inteligência artificial e excelência tecnológica.</p>
          </div>
          
          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white">Plataforma</h4>
             <ul className="space-y-4">
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Vagas IA</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Mentoria</Link></li>
                <li><Link href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Empresas</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white">Suporte</h4>
             <ul className="space-y-4">
                <li><Link href="/support" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Ajuda</Link></li>
                <li><Link href="/privacy" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Privacidade</Link></li>
                <li><Link href="/terms" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Termos</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white">Status do Sistema</h4>
             <div className="p-3 bg-slate-900 border border-white/5 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#22C55E]">Sistema Online</span>
             </div>
          </div>
        </div>
        
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">© 2026 NEXTSTEP TECHNOLOGIES. TODOS OS DIREITOS RESERVADOS.</p>
           <div className="flex gap-6">
              <Link href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">LinkedIn</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Twitter</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Instagram</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
