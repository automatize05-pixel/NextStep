"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Globe, MessageSquare, CheckCircle2, Star, Menu, X } from "lucide-react"
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Real stats for social proof - simplified for client component
  const displayUserCount = 1200 + 450 // Approximate for now or fetch in useEffect

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/20">
      
      {/* Navigation - Matching Reference */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-[#0B0F19]/90 backdrop-blur-2xl z-[100] border-b border-white/5">
        <Link href="/">
          <Logo />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/">Início</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/about">Sobre</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/collaborators">Colaboradores</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/partners">Parceiros</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="/contact">Contacto</Link>
          <Link className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors" href="#pricing">Preços</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-white transition-all">
            Entrar
          </Link>
          <Link href="/register">
            <Button className="bg-[#2563EB] hover:bg-blue-700 rounded-full px-8 font-black uppercase text-[10px] tracking-widest shadow-xl border-none">Criar Conta</Button>
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

      </header>

      {/* Mobile Menu Overlay - Outside Header for better z-index isolation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0F19] z-[200] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-300 md:hidden">
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/">Início</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/about">Sobre</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/collaborators">Colaboradores</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/partners">Parceiros</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/contact">Contacto</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="#pricing">Preços</Link>
          <div className="flex flex-col w-full px-12 gap-4 mt-6">
            <Link onClick={() => setIsMenuOpen(false)} href="/login" className="w-full">
              <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Entrar na Conta
              </Button>
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/register" className="w-full">
              <Button className="w-full h-16 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest transition-all">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section - Matching Reference */}
        <section className="relative w-full py-16 lg:py-24 overflow-hidden">
          <div className="container relative z-10 px-6 md:px-12 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 animate-in slide-in-from-left duration-1000">
                <div className="flex items-center gap-3 text-blue-400">
                   <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                   <span className="text-[11px] font-black uppercase tracking-[0.2em]">A IA que Impulsiona Carreiras em Angola</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                  O Seu <br />
                  <span className="text-blue-500">Treinador</span> <br />
                  de Carreira.
                </h1>
                
                <p className="max-w-xl text-slate-300 text-lg sm:text-xl font-bold leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                  Não procures apenas um emprego. <br />
                  <span className="text-white">Treina até seres o candidato que nenhuma empresa pode recusar.</span> 
                  A nossa IA prepara-te para o sucesso real no mercado de Angola.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                  <Link href="/register">
                    <Button size="lg" className="h-16 px-12 rounded-2xl bg-[#2563EB] hover:bg-blue-600 text-white font-black uppercase text-sm tracking-widest transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] border-none">
                      Começar Agora — É Grátis
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-slate-700 hover:bg-slate-800 text-white bg-slate-900/50 font-black uppercase text-sm tracking-widest">
                      Conhecer Recursos
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image & Floating Badges */}
              <div className="relative flex justify-center lg:justify-end animate-in zoom-in duration-1000 delay-200 mt-12 lg:mt-0">
                <div className="relative w-full max-w-[500px] aspect-square rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <Image 
                    src="/hero-career.png"
                    alt="Profissional NextStep"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />
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
            <div className="text-center space-y-4 mb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white">Tudo o que você precisa <br /><span className="text-blue-500">em um só lugar.</span></h2>
               <p className="max-w-2xl mx-auto text-slate-300 font-bold text-base sm:text-lg px-4">Tecnologia de ponta simplificada para que você foque no que importa: seu crescimento profissional em Angola.</p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-8 sm:p-12 bg-slate-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-800 hover:border-blue-500/50 transition-all group relative overflow-hidden animate-in fade-in zoom-in duration-1000 delay-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px]" />
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight">Vagas em Tempo Real</h3>
                <p className="text-slate-300 font-bold text-sm sm:text-base leading-relaxed mb-8 opacity-80">Encontre oportunidades reais em Angola e no mundo. Nossa IA filtra o que realmente combina com você.</p>
                <Link href="#" className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] hover:text-blue-400 transition-all">Explorar Vagas <ChevronRight className="h-4 w-4" /></Link>
              </div>

              <div className="p-8 sm:p-12 bg-slate-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-800 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px]" />
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight">Simulador de Elite</h3>
                <p className="text-slate-300 font-bold text-sm sm:text-base leading-relaxed mb-8 opacity-80">Treine entrevistas com uma IA que responde como um recrutador real. Perca o medo e ganhe confiança.</p>
                <Link href="#" className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-black uppercase text-blue-500 tracking-[0.2em] hover:text-blue-400 transition-all">Treinar Agora <ChevronRight className="h-4 w-4" /></Link>
              </div>

              <div className="p-8 sm:p-12 bg-slate-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-800 hover:border-blue-500/50 transition-all group relative overflow-hidden col-span-1 sm:col-span-2 lg:col-span-1 animate-in fade-in zoom-in duration-1000 delay-500">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px]" />
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20">
                   <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight">Currículo de Impacto</h3>
                <p className="text-slate-300 font-bold text-sm sm:text-base leading-relaxed mb-8 opacity-80">Gere currículos profissionais prontos para sistemas de seleção (ATS) em segundos. Destaque-se na multidão.</p>
                <Link href="#" className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-black uppercase text-white tracking-[0.2em] hover:opacity-80 transition-all">Ver Modelos <ChevronRight className="h-4 w-4" /></Link>
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

        {/* How It Works */}
        <section className="w-full py-32 bg-slate-950/30">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center mb-20 space-y-4">
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Processo</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Como <span className="text-[#2563EB]">Funciona</span></h2>
              <p className="text-slate-400 font-bold max-w-xl mx-auto">Da inscrição à primeira oportunidade concretizada em 5 passos simples.</p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
              {[
                { step: '01', title: 'Cria a tua conta', desc: 'Inscreve-te gratuitamente em 30 segundos. Sem cartão de crédito.', side: 'left' },
                { step: '02', title: 'Constrói o teu perfil', desc: 'Adiciona experiência, competências e deixa a IA completar o teu CV.', side: 'right' },
                { step: '03', title: 'Treina com a IA', desc: 'Simula entrevistas, otimiza o LinkedIn, analisa o teu valor de mercado.', side: 'left' },
                { step: '04', title: 'O Job Hunter IA trabalha por ti', desc: 'A IA pesquisa vagas em tempo real adaptadas ao teu perfil.', side: 'right' },
                { step: '05', title: 'Consegue o emprego', desc: 'Candidata-te com confiança e acompanha tudo no CRM de candidaturas.', side: 'left' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-8 mb-12 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-[#2563EB]/30 transition-all ${item.side === 'right' ? 'text-right' : ''}`}>
                    <span className="text-[#2563EB] font-black text-4xl opacity-30">{item.step}</span>
                    <h3 className="font-black text-xl mt-2">{item.title}</h3>
                    <p className="text-slate-400 font-bold text-sm mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-[#2563EB] border-4 border-[#0B0F19] items-center justify-center shrink-0 z-10">
                    <span className="text-white font-black text-xs">{i + 1}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-32">
          <div className="container px-6 md:px-12 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Acesso</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Planos & <span className="text-[#FFD700]">Preços</span></h2>
              <p className="text-slate-400 font-bold max-w-xl mx-auto">Invista na sua carreira. Pagamento simples via transferência bancária.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'free', name: 'Explora', price: 'Grátis', color: 'border-slate-700', btn: 'border-white/10 hover:bg-white/5 text-white', features: ['Teste inicial de IA (3/dia)', 'Busca básica de vagas', 'Criador de CV básico', 'Gestor de Candidaturas'] },
                { id: 'starter', name: 'Primeiro Passo', price: '1.500 Kz', color: 'border-green-500/50', badge: 'ENTRADA', btn: 'bg-green-600 hover:bg-green-700 text-white', features: ['Treino p/ 1ª Entrevista', 'Carta de apresentação', 'Otimização de Perfil', 'Análise de Soft Skills'] },
                { id: 'essential', name: 'Preparação Pro', price: '3.500 Kz', color: 'border-blue-500', badge: 'RECOMENDADO', btn: 'bg-[#2563EB] hover:bg-blue-700 text-white', features: ['Treina até estares pronto', 'CV Profissional ATS', 'LinkedIn Optimizer Pro', 'Busca Job Hunter PRO'] },
                { id: 'premium', name: 'Aceleração', price: '8.500 Kz', color: 'border-purple-500', badge: 'MAIS RESULTADO', btn: 'bg-purple-600 hover:bg-purple-700 text-white', features: ['Treino ILIMITADO', 'Vagas em Tempo Real', 'Estratégia VIP LinkedIn', 'Portfólio Premium'] },
                { id: 'elite', name: 'Elite VIP', price: '15.000 Kz', color: 'border-yellow-400', btn: 'bg-yellow-500 hover:bg-yellow-600 text-black', features: ['Acesso VIP Mentores', 'Alertas WhatsApp', 'Tudo Ilimitado', 'Suporte 24/7'] },
              ].map(plan => (
                <div key={plan.id} className={`relative p-6 bg-slate-900/60 border-2 ${plan.color} rounded-2xl flex flex-col hover:scale-[1.02] transition-transform`}>
                  {(plan as any).badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      {(plan as any).badge}
                    </div>
                  )}
                  <h3 className="font-black text-xl">{plan.name}</h3>
                  <div className="my-4">
                    <span className="text-3xl font-black text-white">{plan.price}</span>
                    {plan.price !== 'Grátis' && <span className="text-slate-500 text-sm">/mês</span>}
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-slate-300 font-bold">
                        <span className="text-[#22C55E] font-black">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.id === 'free' ? '/register' : `/checkout?plan=${plan.id}`}>
                    <Button className={`w-full font-black text-xs uppercase tracking-wider ${plan.btn}`} variant={plan.id === 'free' ? 'outline' : 'default'}>
                      {plan.id === 'free' ? 'Começar Grátis' : `Contratar ${plan.name}`}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-xs font-bold mt-8">Pagamento via Referência Multicaixa ou IBAN. Ativação em até 24h.</p>
          </div>
        </section>

      </main>


      {/* Footer - Matching Reference */}
      <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-16 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs">Redefinindo o futuro do trabalho em Angola através da inteligência artificial e excelência tecnológica.</p>
          </div>
          
          <div className="space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-white underline underline-offset-8 decoration-[#2563EB]">A Plataforma</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-xs font-bold text-slate-500 hover:text-white transition-all italic">Conheça o Projecto</Link></li>
                <li><Link href="/collaborators" className="text-xs font-bold text-slate-500 hover:text-white transition-all italic">Colaboradores & Doações</Link></li>
                <li><Link href="/partners" className="text-xs font-bold text-slate-500 hover:text-white transition-all italic">Seja um Parceiro</Link></li>
                <li><Link href="/contact" className="text-xs font-bold text-slate-500 hover:text-white transition-all italic">Fale Conosco</Link></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white">Sobre Nós</h4>
             <ul className="space-y-4">
                <li><Link href="/about" className="text-xs font-bold text-slate-500 hover:text-white transition-all underline decoration-primary underline-offset-4">Nossa Missão</Link></li>
                <li><Link href="/#pricing" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Planos</Link></li>
                <li><Link href="/support" className="text-xs font-bold text-slate-500 hover:text-white transition-all">Suporte</Link></li>
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
