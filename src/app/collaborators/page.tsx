"use client"

import Link from "next/link"
import { Heart, Users, Zap, Award, Globe, MessageSquare, ChevronRight, Menu, X, DollarSign, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function CollaboratorsPage() {
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
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors text-primary font-bold" href="/collaborators">Colaboradores</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/partners">Parceiros</Link>
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
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] text-primary" href="/collaborators">Colaboradores</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB]" href="/partners">Parceiros</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/login">
            <Button className="bg-[#2563EB] text-white font-black text-xs uppercase tracking-widest px-12 h-16 rounded-2xl mt-6">Entrar</Button>
          </Link>
        </div>
      )}

      <main className="flex-grow">
        <section className="py-24 px-6 md:px-12 text-center">
            <div className="container mx-auto max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-500 mb-8">
                   <Heart className="h-4 w-4 fill-current" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Causa de Impacto Social</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
                  Apoie a Missão <br /><span className="text-blue-500 italic font-black">NextStep</span>.
                </h1>
                <p className="text-slate-400 text-lg font-bold leading-relaxed max-w-2xl mx-auto italic">
                  "Juntos podemos transformar o ecossistema laboral de Angola. Sua contribuição ajuda a manter nossa IA gratuita para estudantes e jovens em vulnerabilidade."
                </p>
            </div>
        </section>

        <section className="py-24 bg-slate-950/40">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                   <h2 className="text-3xl font-black tracking-tight">Por que apoiar?</h2>
                   <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                         <div className="p-3 bg-blue-500/10 rounded-2xl shrink-0"><Zap className="h-6 w-6 text-blue-500" /></div>
                         <div>
                            <h4 className="font-black text-xl">Inclusão Digital</h4>
                            <p className="text-slate-400 font-bold text-sm">Financiamos o processamento de IA para quem não pode pagar assinaturas premium.</p>
                         </div>
                      </div>
                      <div className="flex gap-4 items-start">
                         <div className="p-3 bg-blue-500/10 rounded-2xl shrink-0"><Award className="h-6 w-6 text-blue-500" /></div>
                         <div>
                            <h4 className="font-black text-xl">Educação e Treinamento</h4>
                            <p className="text-slate-400 font-bold text-sm">Realizamos workshops gratuitos de preparação para o primeiro emprego.</p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-10 bg-blue-600 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
                   <div className="relative z-10 space-y-6">
                      <DollarSign className="h-16 w-16 text-white mx-auto animate-bounce" />
                      <h3 className="text-3xl font-black text-white">Faça uma Doação</h3>
                      <p className="text-blue-100 font-bold">Aceitamos contribuições via IBAN, Multicaixa Express ou Cartão Internacional.</p>
                      <div className="bg-white/10 p-6 rounded-2xl border border-white/20 space-y-4">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Pagamento por Referência</p>
                            <div className="flex justify-between text-sm py-1 border-b border-white/10">
                               <span className="text-blue-200">Entidade:</span>
                               <span className="text-white font-black">10116</span>
                            </div>
                            <div className="flex justify-between text-sm py-1">
                               <span className="text-blue-200">Referência:</span>
                               <span className="text-white font-black">947005277</span>
                            </div>
                         </div>
                         <div className="pt-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">IBAN (NextStep Lda)</p>
                            <code className="text-sm md:text-base font-black text-white block bg-black/20 p-2 rounded-lg">AO06 0420 0000 0000 0006 1077 260</code>
                         </div>
                      </div>
                      <a href="mailto:apoio@nextstep.ao?subject=Comprovativo de Doação" className="block w-full">
                         <Button className="w-full bg-white text-[#2563EB] hover:bg-blue-50 h-16 rounded-2xl font-black uppercase tracking-widest">Enviar Comprovativo</Button>
                      </a>
                   </div>
                </div>
            </div>
        </section>

        <section className="py-24 px-6 md:px-12">
            <div className="container mx-auto text-center space-y-12">
                <h2 className="text-3xl font-black">Nossa Galeria de Heróis</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="space-y-4">
                        <div className="w-20 h-20 rounded-full bg-slate-800 mx-auto border-2 border-blue-500/30 flex items-center justify-center text-slate-500 font-black">?</div>
                        <h4 className="font-black text-sm uppercase tracking-widest">Colaborador {i}</h4>
                     </div>
                   ))}
                </div>
            </div>
        </section>
      </main>

      <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-16 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
             <Logo />
             <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs">Apoiando o crescimento profissional em Angola através da colaboração e tecnologia.</p>
          </div>
          <div className="space-y-6">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white underline underline-offset-8 decoration-[#2563EB]">Links</h4>
             <ul className="space-y-4">
                <li><Link href="/about" className="text-xs font-bold text-slate-500">Sobre</Link></li>
                <li><Link href="/partners" className="text-xs font-bold text-slate-500">Parceiros</Link></li>
             </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
