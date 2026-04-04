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
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Stats
  const displayUserCount = 1650

  return (
    <div className="flex flex-col min-h-screen bg-[#050A15] text-white font-sans selection:bg-primary/20 overflow-x-hidden">
      
      {/* Navigation */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between fixed top-0 w-full bg-[#050A15]/80 backdrop-blur-xl z-[100] border-b border-white/5">
        <Link href="/">
          <Logo />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all" href="/">Início</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all" href="/about">Sobre</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all" href="/collaborators">Colaboradores</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all" href="/contact">Contacto</Link>
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all" href="#pricing">Planos</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all">
            Entrar
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-blue-600 text-white rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 border-none transition-all active:scale-95">
              Começar Agora
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-white z-[210] relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#050A15] z-[200] flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300 md:hidden">
          <Link onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-[0.3em] text-slate-300" href="/">Início</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-[0.3em] text-slate-300" href="/about">Sobre</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-[0.3em] text-slate-300" href="/collaborators">Colaboradores</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-[0.3em] text-slate-300" href="#pricing">Planos</Link>
          <div className="flex flex-col w-full px-12 gap-4 mt-8">
            <Link onClick={() => setIsMenuOpen(false)} href="/login">
              <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest">
                Entrar
              </Button>
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/register">
              <Button className="w-full h-14 rounded-xl bg-primary hover:bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1 pt-20">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full py-16 lg:py-32 flex items-center justify-center overflow-hidden">
          {/* Ambient Backgrounds */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full -ml-64 -mb-32 pointer-events-none" />
          
          <div className="container relative z-10 px-6 md:px-12 mx-auto text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Plataforma feita para jovens em Angola 🇦🇴
             </div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 max-w-5xl mx-auto">
               Cria teu CV com IA e consegue <span className="text-primary italic">emprego mais rápido</span>
             </h1>
             
             <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-bold leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
               Tudo que precisas para encontrar vagas, preparar-te e ser contratado — num só lugar.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
               <Link href="/register" className="w-full sm:w-auto">
                 <Button className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-primary/40 group">
                   Começar Grátis
                   <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
               <Link href="#how-it-works" className="w-full sm:w-auto">
                 <Button variant="outline" className="w-full sm:w-auto h-16 px-12 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase text-sm tracking-widest">
                   Ver como funciona
                 </Button>
               </Link>
             </div>
          </div>
        </section>

        {/* 2. COMO FUNCIONA */}
        <section id="how-it-works" className="w-full py-24 bg-white/5 border-y border-white/5">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4 uppercase">Caminho para o Sucesso</h2>
                 <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">O processo é simples e direto</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                   { step: '01', title: 'Cria teu CV com IA', desc: 'Gera um currículo otimizado para o mercado angolano em minutos.', icon: <FileText className="h-6 w-6 text-primary" /> },
                   { step: '02', title: 'Encontra vagas', desc: 'IA rastreia as melhores oportunidades reais para o teu perfil.', icon: <Search className="h-6 w-6 text-primary" /> },
                   { step: '03', title: 'Treina Entrevistas', desc: 'Pratica com a nossa IA que responde como um recrutador real.', icon: <MessageSquare className="h-6 w-6 text-primary" /> },
                   { step: '04', title: 'Consegue Emprego', desc: 'Candidata-te com confiança e destaca-te da concorrência.', icon: <Briefcase className="h-6 w-6 text-primary" /> }
                 ].map((item, i) => (
                   <div key={i} className="relative p-8 bg-[#0A1224] border border-white/5 rounded-3xl group hover:border-primary/30 transition-all">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-primary/20 rotate-12 group-hover:rotate-0 transition-transform">{item.step}</div>
                      <div className="mt-4 mb-6">{item.icon}</div>
                      <h3 className="text-xl font-black mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-sm font-bold leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 3. O PROBLEMA */}
        <section className="w-full py-24 bg-[#050A15]">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="max-w-4xl mx-auto bg-red-500/5 border border-red-500/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-10">
                    <AlertCircle className="w-40 h-40 text-red-500 -rotate-12" />
                 </div>
                 <div className="relative z-10 text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Muitos jovens têm talento…</h2>
                    <p className="text-xl md:text-2xl font-bold text-red-400 italic">mas não conseguem emprego porque:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                       <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                          <p className="text-sm font-black uppercase tracking-widest text-white mb-2">01</p>
                          <p className="text-base font-bold text-slate-300 italic">Não têm um bom CV</p>
                       </div>
                       <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                          <p className="text-sm font-black uppercase tracking-widest text-white mb-2">02</p>
                          <p className="text-base font-bold text-slate-300 italic">Não sabem onde encontrar vagas</p>
                       </div>
                       <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                          <p className="text-sm font-black uppercase tracking-widest text-white mb-2">03</p>
                          <p className="text-base font-bold text-slate-300 italic">Não estão preparados para entrevistas</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. A SOLUÇÃO */}
        <section className="w-full py-24 bg-[#050A15]">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                       <Image 
                         src="/solutions.png" 
                         alt="NextStep Solution" 
                         fill 
                         className="object-cover opacity-80"
                         onError={(e) => {
                           // Fallback to a placeholder style if image doesn't exist
                           e.currentTarget.style.display = 'none';
                         }}
                       />
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-primary/10 backdrop-blur-sm">
                          <Rocket className="w-20 h-20 text-white mb-6 animate-bounce" />
                          <h3 className="text-3xl font-black text-center text-white uppercase tracking-tighter">A NextStep resolve tudo isso num só lugar.</h3>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">Tu mereces <span className="text-primary italic">evoluir</span></h2>
                    <p className="text-lg text-slate-400 font-bold leading-relaxed">
                       Unimos inteligência artificial de ponta com o conhecimento real do mercado angolano para criar a ponte que faltava entre o teu talento e a tua próxima vaga.
                    </p>

                    <div className="space-y-4">
                       {[
                         { title: 'CV Profissional em minutos', icon: <CheckCircle2 className="h-5 w-5 text-primary" /> },
                         { title: 'Vagas reais todos os dias', icon: <CheckCircle2 className="h-5 w-5 text-primary" /> },
                         { title: 'Preparação completa para entrevistas', icon: <CheckCircle2 className="h-5 w-5 text-primary" /> },
                         { title: 'Ferramentas com IA avançada', icon: <CheckCircle2 className="h-5 w-5 text-primary" /> }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all">
                            {item.icon}
                            <span className="font-black text-sm uppercase tracking-widest text-slate-200">{item.title}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. FUNCIONALIDADES SIMPLIFICADAS */}
        <section className="w-full py-24 bg-white/5 border-y border-white/5">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-4">Teu arsenal de <span className="text-primary italic">carreira</span></h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 {[
                   { name: 'CV IA', icon: <FileText /> },
                   { name: 'Job Hunter', icon: <Search /> },
                   { name: 'Bolsas IA', icon: <Globe /> },
                   { name: 'Entrevistas IA', icon: <MessageSquare /> },
                   { name: 'Cartas IA', icon: <ClipboardCheck /> },
                   { name: 'Perfil Profissional', icon: <UserCircle /> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center justify-center p-8 bg-[#0A1224] border border-white/5 rounded-[2rem] group hover:bg-primary transition-all cursor-default">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:scale-110 transition-all">
                         <div className="text-primary group-hover:text-white transition-colors">{item.icon}</div>
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-center">{item.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 6. PROVA SOCIAL */}
        <section className="w-full py-24 bg-[#050A15]">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="flex flex-col items-center text-center space-y-8">
                 <div className="p-6 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-4 animate-pulse">
                    <Globe className="h-8 w-8 text-primary" />
                    <span className="text-3xl md:text-5xl font-black tracking-widest">+{displayUserCount}</span>
                 </div>
                 <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase max-w-3xl">Plataforma em crescimento constante em Angola</h2>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Utilizada por jovens que querem evoluir na carreira</p>
              </div>
           </div>
        </section>

        {/* 7. PLANOS SIMPLIFICADOS */}
        <section id="pricing" className="w-full py-24 bg-white/5">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-20 space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Planos <span className="text-primary italic">Acessíveis</span></h2>
                 <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] opacity-60">Invista em si mesmo a partir de Luanda</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 {/* Grátis */}
                 <div className="p-10 bg-[#0A1224] border border-white/5 rounded-[2.5rem] flex flex-col justify-between hover:border-primary/20 transition-all group">
                    <div className="space-y-8">
                       <div>
                          <Star className="h-10 w-10 text-slate-500 mb-4" />
                          <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Grátis</h3>
                          <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-widest">Para quem quer explorar</p>
                       </div>
                       <div className="text-4xl font-black uppercase">Grátis</div>
                       <ul className="space-y-4">
                          {['3 Testes de IA / dia', '4 Buscas de vagas / dia', 'Criador de CV básico'].map((f, fi) => (
                            <li key={fi} className="text-xs font-bold text-slate-400 flex items-center gap-3 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-slate-600" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=free" className="mt-12">
                       <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest">Escolher Plano</Button>
                    </Link>
                 </div>

                 {/* Pro (Destacado) */}
                 <div className="p-10 bg-primary border-4 border-primary shadow-2xl shadow-primary/20 rounded-[2.5rem] flex flex-col justify-between scale-105 z-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                       <Zap className="w-32 h-32 text-white" />
                    </div>
                    <div className="space-y-8 relative z-10">
                       <div>
                          <Zap className="h-10 w-10 text-white mb-4" />
                          <h3 className="text-2xl font-black tracking-tight mb-2 uppercase text-white">Preparação Pro</h3>
                          <p className="text-sm font-black text-white/70 leading-relaxed uppercase tracking-widest">O Mais Recomendado</p>
                       </div>
                       <div>
                          <span className="text-4xl font-black text-white">3.500</span>
                          <span className="text-white/70 text-xs font-black uppercase tracking-widest ml-2">Kz/mês</span>
                       </div>
                       <ul className="space-y-4">
                          {['Treino Entrevista (20/dia)', 'Job Hunter Pro', 'CV Otimizado Completo', 'LinkedIn Optimizer'].map((f, fi) => (
                            <li key={fi} className="text-xs font-black text-white flex items-center gap-3 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-white" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=essential" className="mt-12 relative z-10">
                       <Button className="w-full h-14 rounded-xl bg-white text-primary hover:bg-white/90 font-black text-[10px] uppercase tracking-widest shadow-xl">Acelerar Carreira</Button>
                    </Link>
                 </div>

                 {/* Elite */}
                 <div className="p-10 bg-[#0A1224] border border-white/5 rounded-[2.5rem] flex flex-col justify-between hover:border-primary/20 transition-all group">
                    <div className="space-y-8">
                       <div>
                          <Crown className="h-10 w-10 text-yellow-500 mb-4" />
                          <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Elite VIP</h3>
                          <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-widest">Para quem quer o Topo</p>
                       </div>
                       <div>
                          <span className="text-4xl font-black text-white">8.500</span>
                          <span className="text-slate-500 text-xs font-black uppercase tracking-widest ml-2">Kz/mês</span>
                       </div>
                       <ul className="space-y-4">
                          {['Tudo Ilimitado', 'Alerta WhatsApp', 'Suporte VIP 24/7', 'Badge de Elite'].map((f, fi) => (
                            <li key={fi} className="text-xs font-bold text-slate-400 flex items-center gap-3 uppercase tracking-widest">
                               <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <Link href="/register?plan=elite" className="mt-12">
                       <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest group-hover:bg-primary transition-colors">Seja Elite</Button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. CTA FINAL */}
        <section className="w-full py-24 lg:py-32 bg-[#050A15] relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
           
           <div className="container px-6 md:px-12 mx-auto text-center relative z-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight mb-12">O teu futuro <br /> começa <span className="text-primary italic text-8xl md:text-9xl block mt-4">Agora</span></h2>
              <Link href="/register">
                 <Button size="lg" className="h-20 px-16 rounded-[2rem] bg-primary hover:bg-blue-600 text-white font-black uppercase text-base tracking-[0.2em] transition-all shadow-[0_0_60px_rgba(37,99,235,0.4)] group">
                    👉 Criar meu CV grátis
                 </Button>
              </Link>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#050A15] border-t border-white/5 py-24 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <Logo />
            <p className="text-slate-400 font-bold text-base leading-relaxed max-w-md">Redefinindo o futuro do trabalho em Angola através da inteligência artificial e excelência tecnológica.</p>
            <div className="flex gap-10">
               <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">+{displayUserCount}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Usuários Ativos</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-2xl font-black text-white">100%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cloud Angolana</span>
               </div>
            </div>
          </div>
          
          <div className="space-y-8 text-center md:text-left">
              <h4 className="font-black uppercase tracking-[0.3em] text-xs text-primary">Plataforma</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-sm font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Nossa Missão</Link></li>
                <li><Link href="/contact" className="text-sm font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Contacto</Link></li>
                <li><Link href="#pricing" className="text-sm font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Planos</Link></li>
              </ul>
          </div>

          <div className="space-y-8 text-center md:text-left">
              <h4 className="font-black uppercase tracking-[0.3em] text-xs text-primary">Social</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">Instagram</Link></li>
                <li><Link href="#" className="text-sm font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest">LinkedIn</Link></li>
              </ul>
          </div>
        </div>
        
        <div className="container mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">© 2026 NEXTSTEP TECHNOLOGIES. LUANDA, ANGOLA.</p>
           <div className="flex gap-8">
              <Link href="/terms" className="text-[10px] font-black hover:text-white uppercase tracking-[0.3em]">Termos</Link>
              <Link href="/privacy" className="text-[10px] font-black hover:text-white uppercase tracking-[0.3em]">Privacidade</Link>
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
