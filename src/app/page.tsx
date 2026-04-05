"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Zap, Globe, MessageSquare, CheckCircle2, 
  Star, Menu, X, Rocket, ChevronRight, ArrowRight,
  Search, FileText, ClipboardCheck, GraduationCap, Briefcase,
  AlertCircle, Crown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Logo } from "@/components/shared/logo"
import { BackgroundAnimation } from "@/components/shared/BackgroundAnimation"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const displayUserCount = 1650

  return (
    <div className="flex flex-col min-h-screen bg-[#050A15] text-white font-sans selection:bg-primary/20 overflow-x-hidden relative">
      
      {/* Background Animation Managed via Canvas for performance */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <header className={`px-6 md:px-12 h-24 flex items-center justify-between fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "bg-[#050A15]/80 backdrop-blur-xl border-b border-white/5 h-20" : "bg-transparent"
      }`}>
        <Link href="/">
          <Logo className="scale-110" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-12 items-center">
          {["Início", "Sobre", "Colaboradores", "Contacto"].map((item) => (
            <Link 
              key={item}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all relative group" 
              href={item === "Início" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all relative group" href="#pricing">
            Planos
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all">
            Login
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-blue-600 text-white rounded-2xl px-10 h-14 font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-primary/20 border-none transition-all active:scale-95">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="lg:hidden p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white z-[210] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#050A15]/95 backdrop-blur-2xl z-[200] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-500 lg:hidden px-8 text-center">
          {["Início", "Sobre", "Colaboradores", "Contacto", "Planos"].map((item) => (
            <Link 
              key={item}
              onClick={() => setIsMenuOpen(false)} 
              className="text-3xl font-black uppercase tracking-[0.4em] text-slate-300 hover:text-primary transition-all" 
              href={item === "Planos" ? "#pricing" : item === "Início" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col w-full gap-5 mt-10">
            <Link onClick={() => setIsMenuOpen(false)} href="/login">
              <Button variant="outline" className="w-full h-18 rounded-[2rem] border-white/10 bg-white/5 text-white font-black text-sm uppercase tracking-widest py-6">
                Entrar
              </Button>
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/register">
              <Button className="w-full h-18 rounded-[2rem] bg-primary hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 py-6">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container relative z-10 px-6 md:px-12 mx-auto text-center">
             <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[12px] font-black uppercase tracking-[0.3em] text-primary mb-12 animate-in fade-in slide-in-from-bottom-2 duration-1000 shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Plataforma feita para jovens em Angola 🇦🇴
             </div>

             <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.82] mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 max-w-[90rem] mx-auto drop-shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
               Cria teu CV com IA e consegue <span className="text-primary italic">emprego mais rápido</span>
             </h1>
             
             <p className="max-w-4xl mx-auto text-slate-300 text-xl md:text-3xl font-bold leading-relaxed mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 opacity-80 drop-shadow-lg">
               Tudo que precisas para encontrar vagas, preparar-te e ser contratado — num só lugar.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
               <Link href="/register" className="w-full sm:w-auto">
                 <Button className="w-full sm:w-auto h-24 px-20 rounded-[2.5rem] bg-primary hover:bg-blue-600 text-white font-black uppercase text-lg tracking-[0.2em] shadow-[0_0_80px_rgba(37,99,235,0.5)] group relative overflow-hidden transition-all duration-500 hover:scale-105">
                   <div className="relative z-10 flex items-center">
                     Começar Grátis
                     <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-3 transition-transform duration-500" />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[800ms]" />
                 </Button>
               </Link>
               <Link href="#how-it-works" className="w-full sm:w-auto">
                 <Button variant="outline" className="w-full sm:w-auto h-24 px-20 rounded-[2.5rem] border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/10 text-white font-black uppercase text-lg tracking-[0.2em] transition-all duration-500">
                   Ver como funciona
                 </Button>
               </Link>
             </div>
          </div>
        </section>

        {/* 2. COMO FUNCIONA */}
        <section id="how-it-works" className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-32 max-w-4xl mx-auto">
                 <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase">Caminho para o Sucesso</h2>
                 <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-sm opacity-60">O processo é simples e direto para quem quer evoluir</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 {[
                   { step: '01', title: 'Cria teu CV com IA', desc: 'Gera um currículo otimizado para o mercado angolano em minutos.', icon: <FileText className="h-8 w-8 text-primary" /> },
                   { step: '02', title: 'Encontra vagas', desc: 'IA rastreia as melhores oportunidades reais para o teu perfil.', icon: <Search className="h-8 w-8 text-primary" /> },
                   { step: '03', title: 'Treina Entrevistas', desc: 'Pratica com a nossa IA que responde como um recrutador real.', icon: <MessageSquare className="h-8 w-8 text-primary" /> },
                   { step: '04', title: 'Consegue Emprego', desc: 'Candidata-te com confiança e destaca-te da concorrência.', icon: <Briefcase className="h-8 w-8 text-primary" /> }
                 ].map((item, i) => (
                   <div key={i} className="relative p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] group hover:border-primary/50 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl">
                      <div className="absolute -top-7 -left-7 w-16 h-16 bg-primary rounded-3xl flex items-center justify-center font-black text-white shadow-2xl shadow-primary/40 rotate-12 group-hover:rotate-0 transition-all duration-700 text-xl">{item.step}</div>
                      <div className="mb-10 p-5 bg-primary/10 rounded-2xl inline-block group-hover:bg-primary group-hover:text-white transition-all duration-700">{item.icon}</div>
                      <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight">{item.title}</h3>
                      <p className="text-slate-400 text-lg font-bold leading-relaxed opacity-70">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 3. O PROBLEMA */}
        <section className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="max-w-6xl mx-auto bg-red-500/5 backdrop-blur-3xl border border-red-500/10 rounded-[4rem] p-16 md:p-32 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                    <AlertCircle className="w-80 h-80 text-red-500 -rotate-12" />
                 </div>
                 <div className="relative z-10 text-center space-y-12">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">Muitos jovens têm talento…</h2>
                    <p className="text-2xl md:text-4xl font-bold text-red-400 italic opacity-80 uppercase tracking-widest">mas não conseguem emprego porque:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
                       {[
                         "Não têm um bom CV",
                         "Não sabem onde encontrar vagas",
                         "Não estão preparados para entrevistas"
                       ].map((prob, i) => (
                         <div key={i} className="p-10 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-[2rem] hover:bg-red-500/20 transition-all duration-500 group">
                            <p className="text-xl font-bold text-slate-200 italic leading-tight">{prob}</p>
                            <div className="mt-6 w-12 h-1 bg-red-500/30 group-hover:w-full transition-all duration-700" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. A SOLUÇÃO */}
        <section className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                 <div className="relative group">
                    <div className="absolute inset-[-20px] bg-primary/20 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all duration-1000" />
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] aspect-[4/3] bg-[#0A1224]">
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-16 bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-md">
                          <div className="w-32 h-32 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-white/10 mb-10 shadow-3xl">
                            <Rocket className="w-16 h-16 text-primary animate-bounce duration-[2000ms]" />
                          </div>
                          <h3 className="text-4xl md:text-5xl font-black text-center text-white uppercase tracking-tighter leading-none mt-4 shadow-text">A NextStep resolve tudo no mesmo lugar.</h3>
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050A15] to-transparent" />
                    </div>
                 </div>

                 <div className="space-y-12">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85]">Tu mereces <br /><span className="text-primary italic">evoluir</span></h2>
                    <p className="text-xl text-slate-300 font-bold leading-relaxed opacity-70">
                       Unimos inteligência artificial de ponta com o conhecimento real do mercado angolano para criar a ponte que faltava entre o teu talento e o sucesso.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       {[
                         { title: 'CV Profissional IA', icon: <FileText className="text-primary" /> },
                         { title: 'Vagas Reais Diárias', icon: <Search className="text-primary" /> },
                         { title: 'Treino de Entrevistas', icon: <MessageSquare className="text-primary" /> },
                         { title: 'IA de Bolsas', icon: <Globe className="text-primary" /> }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-5 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-primary/40 transition-all duration-500 hover:scale-105">
                            <div className="p-3 bg-primary/10 rounded-xl">{item.icon}</div>
                            <span className="font-black text-xs uppercase tracking-[0.2em] text-slate-200">{item.title}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. FUNCIONALIDADES (ARSENAL) */}
        <section className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-32 max-w-4xl mx-auto">
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">Teu arsenal de <span className="text-primary italic">carreira</span></h2>
                 <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs opacity-60">Ferramentas de elite simplificadas</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                 {[
                   { name: 'CV IA', icon: <FileText /> },
                   { name: 'Job Hunter', icon: <Search /> },
                   { name: 'Bolsas IA', icon: <Globe /> },
                   { name: 'Entrevistas IA', icon: <MessageSquare /> },
                   { name: 'Cartas IA', icon: <ClipboardCheck /> },
                   { name: 'Perfil Público', icon: <UserCircle /> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] group hover:bg-primary transition-all duration-1000 cursor-pointer hover:-translate-y-4 shadow-xl">
                      <div className="w-20 h-20 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-700">
                         <div className="text-primary group-hover:text-primary transition-colors h-10 w-10 flex items-center justify-center">{item.icon}</div>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-center group-hover:tracking-[0.4em] transition-all duration-700">{item.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 6. PROVA SOCIAL */}
        <section className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="flex flex-col items-center text-center space-y-12">
                 <div className="relative">
                   <div className="absolute inset-[-30px] bg-primary/30 blur-[60px] rounded-full animate-pulse" />
                   <div className="relative p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center gap-6 shadow-3xl">
                      <Globe className="h-12 w-12 text-primary" />
                      <span className="text-5xl md:text-8xl font-black tracking-widest text-primary">+{displayUserCount}</span>
                   </div>
                 </div>
                 <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase max-w-5xl leading-tight">Plataforma em crescimento constante em Angola</h2>
                 <div className="flex items-center gap-3">
                   {[1,2,3,4,5].map(s => <Star key={s} className="h-6 w-6 text-yellow-500 fill-yellow-500" />)}
                 </div>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[11px]">Utilizada por jovens que querem evoluir na carreira</p>
              </div>
           </div>
        </section>

        {/* 7. PLANOS */}
        <section id="pricing" className="w-full py-40 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-32 space-y-6">
                 <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-none">Planos <span className="text-primary italic">Acessíveis</span></h2>
                 <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs opacity-60">Invista no seu futuro a partir de Luanda</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-[90rem] mx-auto">
                 {/* Grátis */}
                 <div className="p-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] flex flex-col justify-between hover:border-white/30 transition-all duration-700 group">
                    <div className="space-y-12">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-8"><Star className="h-10 w-10 text-slate-500" /></div>
                          <h3 className="text-4xl font-black tracking-tight mb-4 uppercase">Grátis</h3>
                          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Para quem quer explorar</p>
                       </div>
                       <div className="text-5xl font-black uppercase text-center">Grátis</div>
                       <ul className="space-y-6">
                          {['3 Testes de IA / dia', '4 Buscas de vagas / dia', 'Criador de CV básico', 'Gestor de Candidaturas'].map((f, fi) => (
                            <li key={fi} className="text-sm font-bold text-slate-400 flex items-center gap-5 uppercase tracking-widest">
                               <CheckCircle2 className="h-5 w-5 text-slate-600" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=free" className="mt-20">
                       <Button variant="outline" className="w-full h-20 rounded-[2rem] border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest transition-all hover:bg-white/10">Escolher Plano</Button>
                    </Link>
                 </div>

                 {/* Pro (Destacado) */}
                 <div className="p-16 bg-primary border-4 border-primary/20 shadow-[0_40px_100px_rgba(37,99,235,0.3)] rounded-[4rem] flex flex-col justify-between scale-110 z-10 relative overflow-hidden group transition-all duration-700">
                    <div className="absolute top-0 right-0 p-12 opacity-15 pointer-events-none rotate-12">
                       <Zap className="w-64 h-64 text-white" />
                    </div>
                    <div className="space-y-12 relative z-10">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 bg-white/20 backdrop-blur-3xl rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-700 group-hover:scale-110"><Zap className="h-12 w-12 text-white" /></div>
                          <h3 className="text-4xl font-black tracking-tight mb-4 uppercase text-white">Preparação Pro</h3>
                          <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.4em] bg-white/10 px-4 py-2 rounded-full">Mais Vendido em Luanda</p>
                       </div>
                       <div className="text-center">
                          <span className="text-7xl font-black text-white">3.500</span>
                          <span className="text-white/70 text-sm font-black uppercase tracking-widest ml-4">Kz/mês</span>
                       </div>
                       <ul className="space-y-6">
                          {['Treino Entrevista (20/dia)', 'Job Hunter Pro (IA)', 'CV Otimizado Completo', 'LinkedIn Optimizer Profissional', 'Cartas de Apresentação IA'].map((f, fi) => (
                            <li key={fi} className="text-sm font-black text-white flex items-center gap-5 uppercase tracking-widest">
                               <CheckCircle2 className="h-6 w-6 text-white" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=essential" className="mt-20 relative z-10">
                       <Button className="w-full h-20 rounded-[2rem] bg-white text-primary hover:bg-white/90 font-black text-sm uppercase tracking-widest shadow-2xl transition-all duration-500 hover:scale-[1.03]">Acelerar Carreira</Button>
                    </Link>
                 </div>

                 {/* Elite */}
                 <div className="p-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] flex flex-col justify-between hover:border-primary/30 transition-all duration-700 group">
                    <div className="space-y-12">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-8"><Crown className="h-10 w-10 text-yellow-500" /></div>
                          <h3 className="text-4xl font-black tracking-tight mb-4 uppercase">Elite VIP</h3>
                          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Para quem quer o Topo</p>
                       </div>
                       <div className="text-center">
                          <span className="text-7xl font-black text-white">8.500</span>
                          <span className="text-slate-500 text-sm font-black uppercase tracking-widest ml-4">Kz/mês</span>
                       </div>
                       <ul className="space-y-6">
                          {['Tudo Ilimitado', 'Alerta Vagas WhatsApp', 'Suporte VIP Individual', 'Badge Elite no Perfil', 'Consultoria de IA'].map((f, fi) => (
                            <li key={fi} className="text-sm font-bold text-slate-300 flex items-center gap-5 uppercase tracking-widest">
                               <CheckCircle2 className="h-5 w-5 text-primary" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=elite" className="mt-20">
                       <Button variant="outline" className="w-full h-20 rounded-[2rem] border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest group-hover:bg-primary group-hover:border-primary transition-all duration-700">Seja Elite</Button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. CTA FINAL */}
        <section className="w-full py-64 relative overflow-hidden">
           <div className="container px-6 md:px-12 mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter uppercase leading-[0.8] mb-20 animate-pulse-slow">O teu futuro <br /> começa <span className="text-primary italic block mt-10">Agora</span></h2>
              <Link href="/register">
                 <Button size="lg" className="h-28 px-24 rounded-[3rem] bg-primary hover:bg-blue-600 text-white font-black uppercase text-xl tracking-[0.3em] transition-all duration-500 shadow-[0_0_100px_rgba(37,99,235,0.6)] group hover:scale-110 active:scale-95">
                    👉 Criar meu CV grátis
                 </Button>
              </Link>
           </div>
           
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),transparent_60%)] pointer-events-none" />
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-40 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#050A15]/60 backdrop-blur-xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="space-y-12 col-span-1 md:col-span-2">
            <Logo className="scale-125 mb-10" />
            <p className="text-slate-400 font-bold text-xl leading-relaxed max-w-xl opacity-80">Redefinindo o futuro do trabalho em Angola através da inteligência artificial e excelência tecnológica.</p>
            <div className="flex gap-16 pt-10">
               <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black text-white">+{displayUserCount}</span>
                  <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Usuários Ativos</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black text-white">100%</span>
                  <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Cloud Angolana</span>
               </div>
            </div>
          </div>
          
          <div className="space-y-10">
              <h4 className="font-black uppercase tracking-[0.5em] text-sm text-primary">Plataforma</h4>
              <ul className="space-y-6">
                {["Sobre", "Colaboradores", "Contacto", "Planos"].map(item => (
                  <li key={item}><Link href={item === "Planos" ? "#pricing" : `/${item.toLowerCase()}`} className="text-base font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">{item}</Link></li>
                ))}
              </ul>
          </div>

          <div className="space-y-10">
              <h4 className="font-black uppercase tracking-[0.5em] text-sm text-primary">Social</h4>
              <ul className="space-y-6">
                <li><Link href="#" className="text-base font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Instagram</Link></li>
                <li><Link href="#" className="text-base font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">LinkedIn</Link></li>
              </ul>
          </div>
        </div>
        
        <div className="container mx-auto mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
           <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">© 2026 NEXTSTEP TECHNOLOGIES. LUANDA, ANGOLA.</p>
           <div className="flex gap-16">
              <Link href="/terms" className="text-[11px] font-black hover:text-white uppercase tracking-[0.4em]">Termos</Link>
              <Link href="/privacy" className="text-[11px] font-black hover:text-white uppercase tracking-[0.4em]">Privacidade</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}

function UserCircle(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}
