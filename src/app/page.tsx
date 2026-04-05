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
    <div className="flex flex-col min-h-screen text-white font-sans selection:bg-primary/20 overflow-x-hidden relative">
      
      {/* Background Animation - Managed via Canvas for performance */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <header className={`px-6 md:px-12 h-20 flex items-center justify-between fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-[#050A15]/60 backdrop-blur-xl border-b border-white/5 h-16" : "bg-transparent"
      }`}>
        <Link href="/">
          <Logo className="scale-90 md:scale-100" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10 items-center">
          {["Início", "Sobre", "Colaboradores", "Contacto", "Planos"].map((item) => (
            <Link 
              key={item}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all relative group" 
              href={item === "Planos" ? "#pricing" : item === "Início" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all">
            Login
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-blue-600 text-white rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest border-none transition-all active:scale-95">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="lg:hidden p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white z-[210] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#050A15]/98 backdrop-blur-2xl z-[200] flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300 lg:hidden px-8">
          {["Início", "Sobre", "Colaboradores", "Contacto", "Planos"].map((item) => (
            <Link 
              key={item}
              onClick={() => setIsMenuOpen(false)} 
              className="text-2xl font-black uppercase tracking-[0.3em] text-slate-300 hover:text-primary transition-all" 
              href={item === "Planos" ? "#pricing" : item === "Início" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col w-full gap-4 mt-8">
            <Link onClick={() => setIsMenuOpen(false)} href="/login">
              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest">
                Entrar
              </Button>
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/register">
              <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="container relative z-10 px-6 md:px-12 mx-auto text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8 shadow-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Plataforma feita para jovens em Angola 🇦🇴
             </div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
               Cria teu CV com IA e consegue <span className="text-primary italic">emprego mais rápido</span>
             </h1>
             
             <p className="max-w-2xl mx-auto text-slate-300 text-lg md:text-xl font-bold leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 opacity-80">
               Tudo que precisas para encontrar vagas, preparar-te e ser contratado — num só lugar.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
               <Link href="/register" className="w-full sm:w-auto">
                 <Button className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-primary/40 group relative overflow-hidden transition-all duration-300 hover:scale-[1.03]">
                   <div className="relative z-10 flex items-center">
                     Começar Grátis
                     <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                   </div>
                 </Button>
               </Link>
               <Link href="#how-it-works" className="w-full sm:w-auto">
                 <Button variant="outline" className="w-full sm:w-auto h-16 px-12 rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-white/10 text-white font-black uppercase text-sm tracking-widest transition-all">
                   Ver como funciona
                 </Button>
               </Link>
             </div>
          </div>
        </section>

        {/* 2. COMO FUNCIONA */}
        <section id="how-it-works" className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-20 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4 uppercase">Caminho para o Sucesso</h2>
                 <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs opacity-60">Simples e direto para quem quer evoluir</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { step: '01', title: 'Cria teu CV com IA', desc: 'Gera um currículo otimizado para o mercado angolano em minutos.', icon: <FileText className="h-6 w-6 text-primary" /> },
                   { step: '02', title: 'Encontra vagas', desc: 'IA rastreia as melhores oportunidades reais para o teu perfil.', icon: <Search className="h-6 w-6 text-primary" /> },
                   { step: '03', title: 'Treina Entrevistas', desc: 'Pratica com a nossa IA que responde como um recrutador real.', icon: <MessageSquare className="h-6 w-6 text-primary" /> },
                   { step: '04', title: 'Consegue Emprego', desc: 'Candidata-te com confiança e destaca-te da concorrência.', icon: <Briefcase className="h-6 w-6 text-primary" /> }
                 ].map((item, i) => (
                   <div key={i} className="relative p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] group hover:border-primary/40 transition-all duration-500">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-white shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-500">{item.step}</div>
                      <div className="mb-8 p-4 bg-primary/10 rounded-2xl inline-block group-hover:bg-primary group-hover:text-white transition-all duration-500">{item.icon}</div>
                      <h3 className="text-xl font-black mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-slate-400 text-sm font-bold leading-relaxed opacity-70">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 3. O PROBLEMA */}
        <section className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="max-w-5xl mx-auto bg-red-500/5 backdrop-blur-2xl border border-red-500/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <AlertCircle className="w-40 h-40 text-red-500 -rotate-12" />
                 </div>
                 <div className="relative z-10 text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">A muitos falta o passo certo…</h2>
                    <p className="text-xl md:text-2xl font-bold text-red-400 italic opacity-80">Por que muitos não conseguem emprego?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                       {[
                         "Não têm um bom CV",
                         "Vagas difíceis de achar",
                         "Medo das entrevistas"
                       ].map((prob, i) => (
                         <div key={i} className="p-6 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl">
                            <p className="text-base font-bold text-slate-200 italic leading-tight">{prob}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. A SOLUÇÃO */}
        <section className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="relative group">
                    <div className="absolute inset-[-10px] bg-primary/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all duration-1000" />
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-[#0A1224]">
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-md">
                          <div className="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/10 mb-6 shadow-2xl">
                            <Rocket className="w-10 h-10 text-primary animate-bounce duration-[2000ms]" />
                          </div>
                          <h3 className="text-3xl md:text-4xl font-black text-center text-white uppercase tracking-tighter leading-none">A NextStep resolve tudo num só lugar.</h3>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9]">Tu mereces <span className="text-primary italic">evoluir</span></h2>
                    <p className="text-lg text-slate-300 font-bold leading-relaxed opacity-70">
                       Unimos IA de ponta com o mercado angolano para criar a ponte real entre o teu talento e o sucesso.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {[
                         { title: 'CV Profissional IA', icon: <FileText className="h-4 w-4 text-primary" /> },
                         { title: 'Vagas Reais Diárias', icon: <Search className="h-4 w-4 text-primary" /> },
                         { title: 'Treino de Entrevistas', icon: <MessageSquare className="h-4 w-4 text-primary" /> },
                         { title: 'IA de Bolsas', icon: <Globe className="h-4 w-4 text-primary" /> }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-primary/40 transition-all duration-300">
                            {item.icon}
                            <span className="font-black text-[10px] uppercase tracking-widest text-slate-200">{item.title}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. FUNCIONALIDADES (ARSENAL) */}
        <section className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-20 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Teu arsenal de <span className="text-primary italic">carreira</span></h2>
                 <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-[10px] opacity-60">Elite simplificada</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 {[
                   { name: 'CV IA', icon: <FileText className="h-6 w-6" /> },
                   { name: 'Job Hunter', icon: <Search className="h-6 w-6" /> },
                   { name: 'Bolsas IA', icon: <Globe className="h-6 w-6" /> },
                   { name: 'Entrevistas IA', icon: <MessageSquare className="h-6 w-6" /> },
                   { name: 'Cartas IA', icon: <ClipboardCheck className="h-6 w-6" /> },
                   { name: 'Perfil Público', icon: <UserCircle className="h-6 w-6" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] group hover:bg-primary transition-all duration-500 cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-105 transition-all duration-500">
                         <div className="text-primary group-hover:text-primary transition-colors">{item.icon}</div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-center opacity-70 group-hover:opacity-100 transition-all">{item.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 6. PROVA SOCIAL */}
        <section className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="flex flex-col items-center text-center space-y-10">
                 <div className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-4 shadow-xl">
                    <Globe className="h-8 w-8 text-primary" />
                    <span className="text-4xl md:text-6xl font-black tracking-widest text-primary">+{displayUserCount}</span>
                 </div>
                 <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase max-w-3xl leading-tight opacity-90">Crescimento constante em toda Angola</h2>
                 <div className="flex items-center gap-2">
                   {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}
                 </div>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Mais de 1650 jovens a evoluir a carreira</p>
              </div>
           </div>
        </section>

        {/* 7. PLANOS */}
        <section id="pricing" className="w-full py-24 relative z-10">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-20 space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Nossos <span className="text-primary italic">Planos</span></h2>
                 <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] opacity-60">Invista em si mesmo</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 {/* Grátis */}
                 <div className="p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col justify-between hover:border-white/20 transition-all duration-500">
                    <div className="space-y-10">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6"><Star className="h-6 w-6 text-slate-500" /></div>
                          <h3 className="text-xl font-black tracking-tight mb-2 uppercase">Grátis</h3>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Para explorar</p>
                       </div>
                       <div className="text-4xl font-black uppercase text-center">Grátis</div>
                       <ul className="space-y-4">
                          {['3 Testes de IA / dia', '4 Buscas de vagas / dia', 'Criador de CV básico'].map((f, fi) => (
                            <li key={fi} className="text-[10px] font-bold text-slate-400 flex items-center gap-4 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-slate-600" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=free" className="mt-12">
                       <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest">Selecionar</Button>
                    </Link>
                 </div>

                 {/* Pro (Destacado) */}
                 <div className="p-10 bg-primary border border-primary shadow-2xl rounded-[2.5rem] flex flex-col justify-between scale-105 z-10 relative overflow-hidden group transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12">
                       <Zap className="w-40 h-40 text-white" />
                    </div>
                    <div className="space-y-10 relative z-10">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-3xl rounded-2xl flex items-center justify-center mb-6 shadow-xl"><Zap className="h-8 w-8 text-white" /></div>
                          <h3 className="text-xl font-black tracking-tight mb-2 uppercase text-white">Preparação Pro</h3>
                          <p className="text-[9px] font-black text-white/80 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Recomendado em Luanda</p>
                       </div>
                       <div className="text-center">
                          <span className="text-5xl font-black text-white">3.500</span>
                          <span className="text-white/70 text-xs font-black uppercase tracking-widest ml-3">Kz/mês</span>
                       </div>
                       <ul className="space-y-4">
                          {['Treino Entrevista (20/dia)', 'Job Hunter Pro (IA)', 'CV Otimizado Completo', 'LinkedIn Optimizer'].map((f, fi) => (
                            <li key={fi} className="text-[10px] font-black text-white flex items-center gap-4 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-white" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=essential" className="mt-12 relative z-10">
                       <Button className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-xl transition-all duration-300 active:scale-95">Passo em Frente</Button>
                    </Link>
                 </div>

                 {/* Elite */}
                 <div className="p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col justify-between hover:border-primary/20 transition-all duration-500">
                    <div className="space-y-10">
                       <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6"><Crown className="h-6 w-6 text-yellow-500" /></div>
                          <h3 className="text-xl font-black tracking-tight mb-2 uppercase text-white">Elite VIP</h3>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">O Plano de Elite</p>
                       </div>
                       <div className="text-center">
                          <span className="text-5xl font-black text-white">8.500</span>
                          <span className="text-slate-500 text-xs font-black uppercase tracking-widest ml-3">Kz/mês</span>
                       </div>
                       <ul className="space-y-4">
                          {['Tudo Ilimitado', 'Alerta WhatsApp', 'Suporte VIP Individual', 'Badge Elite VIP'].map((f, fi) => (
                            <li key={fi} className="text-[10px] font-bold text-slate-300 flex items-center gap-4 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=elite" className="mt-12">
                       <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all duration-500">Upgrade</Button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. CTA FINAL */}
        <section className="w-full py-40 relative overflow-hidden">
           <div className="container px-6 md:px-12 mx-auto text-center relative z-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-16 opacity-90">O teu futuro <br /><span className="text-primary italic block mt-4">começa agora</span></h2>
              <Link href="/register">
                 <Button size="lg" className="h-20 px-16 rounded-3xl bg-primary hover:bg-blue-600 text-white font-black uppercase text-base tracking-[0.2em] transition-all duration-300 shadow-2xl group hover:scale-105">
                    🚀 Criar agora grátis
                 </Button>
              </Link>
           </div>
           
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_60%)] pointer-events-none" />
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-20 px-6 md:px-12 relative z-10 border-t border-white/5 bg-[#050A15]/80 backdrop-blur-xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <Logo className="scale-100" />
            <p className="text-slate-400 font-bold text-base leading-relaxed max-w-md opacity-70">Redefinindo o trabalho em Angola através da IA e excelência tecnológica.</p>
            <div className="flex gap-10 opacity-80">
               <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">+{displayUserCount}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Usuários Ativos</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">100%</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Tech Angolana</span>
               </div>
            </div>
          </div>
          
          <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary">Plataforma</h4>
              <ul className="space-y-4">
                {["Sobre", "Colaboradores", "Contacto", "Planos"].map(item => (
                  <li key={item}><Link href={item === "Planos" ? "#pricing" : `/${item.toLowerCase()}`} className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">{item}</Link></li>
                ))}
              </ul>
          </div>

          <div className="space-y-8">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-primary">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/terms" className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Termos</Link></li>
                <li><Link href="/privacy" className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Privacidade</Link></li>
              </ul>
          </div>
        </div>
        
        <div className="container mx-auto mt-20 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">© 2026 NEXTSTEP TECHNOLOGIES. LUANDA, ANGOLA.</p>
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
