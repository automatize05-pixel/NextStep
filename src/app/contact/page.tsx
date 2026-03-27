"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Send, Menu, X, Globe, MessageSquare, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Logo } from "@/components/shared/logo"

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

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
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#2563EB] transition-colors" href="/partners">Parceiros</Link>
            <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-primary font-bold transition-colors" href="/contact">Contacto</Link>
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
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/">Início</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/about">Sobre</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/collaborators">Colaboradores</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] hover:text-[#2563EB] transition-all" href="/partners">Parceiros</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-[0.4em] text-primary transition-all" href="/contact">Contacto</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/login">
            <Button className="bg-[#2563EB] text-white font-black text-xs uppercase tracking-widest px-12 h-16 rounded-2xl mt-6">Entrar</Button>
          </Link>
        </div>
      )}

      <main className="flex-grow">
        <section className="py-24 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                   <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black uppercase tracking-widest text-[10px]">
                         <MessageSquare className="h-4 w-4" /> Suporte 24/7
                      </div>
                      <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
                        Estamos aqui para <br /><span className="text-blue-500 italic">Conversar</span>.
                      </h1>
                      <p className="text-slate-400 text-lg font-bold leading-relaxed max-w-lg italic">
                        "Tem alguma dúvida, proposta de parceria ou feedback? Nossa equipe está pronta para ajudar você a dar o próximo passo."
                      </p>
                   </div>

                   <div className="space-y-8">
                      <div className="flex gap-6 items-center group">
                         <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl group-hover:border-blue-500/50 transition-all">
                            <Mail className="h-6 w-6 text-blue-500" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">E-mail Oficial</p>
                            <a href="mailto:nextstep.ao@outlook.pt" className="text-lg font-black hover:text-blue-500 transition-colors">nextstep.ao@outlook.pt</a>
                         </div>
                      </div>
                      <div className="flex gap-6 items-center group">
                         <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl group-hover:border-blue-500/50 transition-all">
                            <MapPin className="h-6 w-6 text-blue-500" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Localização</p>
                            <p className="text-lg font-black">Luanda, Angola</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4 pt-4">
                      <Link href="#" className="p-3 bg-slate-900 rounded-xl border border-white/5 hover:bg-blue-600 transition-all"><Linkedin className="h-5 w-5" /></Link>
                      <Link href="#" className="p-3 bg-slate-900 rounded-xl border border-white/5 hover:bg-pink-600 transition-all"><Instagram className="h-5 w-5" /></Link>
                   </div>
                </div>

                <div className="bg-slate-900/50 border border-white/5 p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                   
                   {submitted ? (
                     <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                           <Send className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black">Mensagem Enviada!</h3>
                        <p className="text-slate-400 font-bold max-w-xs mx-auto text-sm">Obrigado pelo contacto. Nossa equipe responderá em até 24 horas.</p>
                        <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl font-black uppercase tracking-widest text-xs h-12">Enviar Outra</Button>
                     </div>
                   ) : (
                     <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Seu Nome</label>
                              <input required type="text" className="w-full bg-slate-950/50 border border-white/10 rounded-2xl h-14 px-6 outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 hover:border-white/20" placeholder="Ex: João Manuel" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
                              <input required type="email" className="w-full bg-slate-950/50 border border-white/10 rounded-2xl h-14 px-6 outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 hover:border-white/20" placeholder="joao@email.com" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Assunto</label>
                           <select className="w-full bg-slate-950/50 border border-white/10 rounded-2xl h-14 px-6 outline-none focus:border-blue-500 transition-all font-bold text-slate-300 appearance-none hover:border-white/20">
                              <option>Suporte Técnico</option>
                              <option>Parcerias Comerciais</option>
                              <option>Imprensa e Media</option>
                              <option>Outros Assuntos</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Sua Mensagem</label>
                           <textarea required rows={5} className="w-full bg-slate-950/50 border border-white/10 rounded-3xl p-6 outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 hover:border-white/20 resize-none" placeholder="Como podemos ajudar você hoje?" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-900/20 group">
                           Enviar Mensagem <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                     </form>
                   )}
                </div>
            </div>
        </section>
      </main>

      <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-16 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-6">
             <div className="flex justify-center md:justify-start">
                <Logo />
             </div>
             <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs mx-auto md:mx-0">Redefinindo o futuro do recrutamento e preparação laboral em Angola através de IA generativa.</p>
          </div>
          <div className="space-y-6 md:col-start-4">
             <h4 className="font-black uppercase tracking-widest text-[10px] text-white">Próximo Passo</h4>
             <p className="text-xs text-slate-500 font-bold italic">"Seja o herói da sua própria carreira."</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
