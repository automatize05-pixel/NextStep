"use client"

import Link from "next/link"
import { Handshake, Target, ShieldCheck, Globe, Menu, X, ChevronRight, Briefcase, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function PartnersPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-primary/20">
      <header className="px-6 md:px-12 h-20 flex items-center justify-between sticky top-0 bg-[#0B0F19]/90 backdrop-blur-2xl z-[100] border-b border-white/5">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex gap-10 items-center">
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/">Início</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/about">Sobre</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/collaborators">Colaboradores</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors text-primary font-bold" href="/partners">Parceiros</Link>
        </nav>
        <div className="hidden md:block">
          <Link href="/login">
              <Button className="bg-[#2563EB] hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider px-8 rounded-xl h-11">Entrar</Button>
          </Link>
        </div>
        <button className="md:hidden p-2 text-white z-[210] relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0F19] z-[200] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-300 md:hidden">
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB]" href="/">Início</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB]" href="/about">Sobre</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB]" href="/collaborators">Colaboradores</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] text-primary transition-all" href="/partners">Parceiros</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/login">
            <Button className="bg-[#2563EB] text-white font-black text-xs uppercase tracking-widest px-12 h-16 rounded-2xl mt-6">Entrar</Button>
          </Link>
        </div>
      )}

      <main className="flex-grow">
        <section className="py-24 px-6 md:px-12">
            <div className="container mx-auto text-center max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-500 mb-8 font-black uppercase tracking-wider text-[10px]">
                   <Briefcase className="h-4 w-4" /> B2B & Corporate Relations
                </div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-10">
                  Impulsione o <span className="text-blue-500 italic">Talento</span> da sua Empresa.
                </h1>
                <p className="text-slate-400 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
                  Conecte sua organização à plataforma de IA líder em preparação profissional em Angola. Recrute os melhores perfis com dados e inteligência.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                   <Button className="bg-[#2563EB] hover:bg-blue-700 px-10 h-16 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3">
                      Seja um Parceiro <Handshake className="h-5 w-5" />
                   </Button>
                </div>
            </div>
        </section>

        <section className="py-24 bg-slate-950/40 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="p-10 bg-slate-900/30 rounded-[3rem] border border-white/5 space-y-6">
                   <Target className="h-10 w-10 text-blue-500" />
                   <h3 className="text-2xl font-black">Acesso Prioritário</h3>
                   <p className="text-slate-400 font-bold text-sm">Acesse nosso banco de talentos pré-avaliados pela IA e encontre o fit perfeito antes de todos.</p>
                </div>
                <div className="p-10 bg-slate-900/30 rounded-[3rem] border border-white/5 space-y-6">
                   <ShieldCheck className="h-10 w-10 text-blue-500" />
                   <h3 className="text-2xl font-black">Branding de Elite</h3>
                   <p className="text-slate-400 font-bold text-sm">Posicione sua empresa como uma marca inovadora que apoia o crescimento tecnológico do país.</p>
                </div>
                <div className="p-10 bg-slate-900/30 rounded-[3rem] border border-white/5 space-y-6">
                   <Rocket className="h-10 w-10 text-blue-500" />
                   <h3 className="text-2xl font-black">API customizada</h3>
                   <p className="text-slate-400 font-bold text-sm">Integre nossa tecnologia de rastreio de competências diretamente no seu sistema de HR.</p>
                </div>
            </div>
        </section>

        <section className="py-24 px-6 md:px-12">
           <div className="container mx-auto max-w-2xl bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 space-y-10">
              <div className="text-center space-y-4">
                 <h2 className="text-3xl font-black">Fale com nosso Gestor</h2>
                 <p className="text-slate-500 font-bold text-sm">Preencha os dados e entramos em contacto em menos de 24 horas.</p>
              </div>
              <form className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nome da Organização</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl h-14 px-6 outline-none focus:border-blue-500 transition-colors" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">E-mail Profissional</label>
                    <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl h-14 px-6 outline-none focus:border-blue-500 transition-colors" />
                 </div>
                 <Button className="w-full bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl font-black uppercase tracking-widest">Enviar Proposta de Parceria</Button>
              </form>
           </div>
        </section>
      </main>

      <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-16 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
             <Logo />
             <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs">Connecting elite organizations with the future of Angolan talent.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
