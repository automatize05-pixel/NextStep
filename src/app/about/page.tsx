"use client"

import Link from "next/link"
import { ShieldCheck, Target, Users, Zap, Globe, MessageSquare, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/20">
      
      {/* Navigation (Simplified) */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-[#0B0F19]/90 backdrop-blur-2xl z-[100] border-b border-white/5">
        <Link className="flex items-center gap-2 group z-[110]" href="/">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-transform group-hover:scale-110">N</div>
          <span className="font-black text-xl tracking-tighter hover:opacity-80 transition-opacity">Next<span className="text-[#2563EB] italic">Step</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/">Início</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors text-primary" href="/about">Sobre</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/#pricing">Preços</Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/login">
              <Button className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider px-8 rounded-xl h-11">Entrar</Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-white z-[210] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#0B0F19] z-[200] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-300">
            <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/">Início</Link>
            <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] text-primary transition-all" href="/about">Sobre</Link>
            <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/#pricing">Preços</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/login">
              <Button className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-12 h-16 rounded-2xl mt-6">Entrar</Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12">
            <div className="container mx-auto text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 mb-8">
                   <ShieldCheck className="h-4 w-4" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">O Futuro do Trabalho em Angola</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Redefinindo o <span className="text-blue-500">Sucesso</span> <br /> Através da IA.
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-bold leading-relaxed max-w-xl mx-auto italic opacity-80">
                  "A nossa missão é empoderar cada profissional angolano com as mesmas ferramentas de elite utilizadas nos maiores centros tecnológicos do mundo."
                </p>
            </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 bg-slate-950/30">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-12">
                   <div className="space-y-4">
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Nossa Visão</h2>
                      <div className="h-1.5 w-16 bg-blue-500 rounded-full" />
                      <p className="text-slate-300 font-bold leading-relaxed text-base md:text-lg">
                        Fundada em Luanda, a NextStep nasceu de uma lacuna clara no mercado: o acesso desigual a tecnologias de preparação de carreira. Acreditamos que o talento angolano é mundial e merece ser apresentado com excelência.
                      </p>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3 p-6 bg-slate-900/40 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all">
                         <Target className="h-8 w-8 text-blue-500" />
                         <h4 className="font-black text-xl">Precisão IA</h4>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Algoritmos treinados para o mercado local e global.</p>
                      </div>
                      <div className="space-y-3 p-6 bg-slate-900/40 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all">
                         <Users className="h-8 w-8 text-blue-500" />
                         <h4 className="font-black text-xl">Comunidade</h4>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mais de 10.000 profissionais impactados positivamente.</p>
                      </div>
                   </div>
                </div>

                <div className="relative">
                   <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] p-1 shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: "url('/about-hero.png')" }} />
                      <div className="h-full w-full bg-slate-900/40 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-end">
                         <Zap className="h-12 w-12 text-blue-500 mb-6" />
                         <h3 className="text-2xl md:text-3xl font-black mb-4">Inovação sem Fronteiras</h3>
                         <p className="text-slate-300 font-bold text-sm md:text-base leading-relaxed">Lideramos a integração de Inteligência Artificial Generativa no ecossistema laboral angolano.</p>
                      </div>
                   </div>
                </div>
            </div>
        </section>

        {/* Essential Info Cards */}
        <section className="py-24 px-6 md:px-12">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter">O que fazemos <span className="text-blue-500 font-black italic">Melhor</span>.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="p-10 bg-slate-900/20 rounded-[2.5rem] border border-white/5 hover:bg-slate-900/40 transition-all">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8">
                         <Globe className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-2xl font-black mb-4 tracking-tight">Job Hunter AI V5</h4>
                      <p className="text-slate-400 font-bold leading-relaxed">Nossa tecnologia varre a web em tempo real para encontrar as melhores oportunidades para você, filtrando apenas o que importa.</p>
                   </div>
                   <div className="p-10 bg-slate-900/20 rounded-[2.5rem] border border-white/5 hover:bg-slate-900/40 transition-all">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8">
                         <MessageSquare className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-2xl font-black mb-4 tracking-tight">Entrevistas de Elite</h4>
                      <p className="text-slate-400 font-bold leading-relaxed">Simuladores que falam como recrutadores reais, fornecendo feedback imediato em português e inglês.</p>
                   </div>
                   <div className="p-10 bg-slate-900/20 rounded-[2.5rem] border border-white/5 hover:bg-slate-900/40 transition-all">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-8">
                         <Target className="h-6 w-6 text-blue-500" />
                      </div>
                      <h4 className="text-2xl font-black mb-4 tracking-tight">Otimização Profissional</h4>
                      <p className="text-slate-400 font-bold leading-relaxed">Transformamos perfis comuns em ímãs de oportunidades através de análise de dados e padrões de sucesso do LinkedIn.</p>
                   </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-20">
            <div className="container mx-auto px-6 md:px-12">
               <div className="relative p-10 md:p-20 bg-[#2563EB] rounded-[3rem] overflow-hidden text-center group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-125 duration-1000" />
                  <div className="relative z-10 space-y-6">
                     <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white">Pronto para o Próximo Passo?</h2>
                     <p className="text-blue-100 text-lg font-bold max-w-xl mx-auto opacity-90">Junte-se à revolução profissional e deixe que a IA trabalhe pelo seu futuro.</p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/register">
                           <Button className="bg-white text-[#2563EB] hover:bg-blue-50 px-12 h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3">
                              Começar Agora <ChevronRight className="h-5 w-5" />
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
        </section>
      </main>

      {/* Footer (Matching Reference) */}
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
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white underline underline-offset-8 decoration-[#2563EB]">Informações</h4>
             <ul className="space-y-4">
                <li><Link href="/about" className="text-xs font-bold text-[#2563EB]">Sobre Nós</Link></li>
                <li><Link href="/#pricing" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Planos</Link></li>
                <li><Link href="/contact" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Contacto</Link></li>
             </ul>
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">© 2026 NextStep Angola. Todos os direitos reservados.</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Powered by AI Elite Technology</p>
        </div>
      </footer>
    </div>
  )
}
