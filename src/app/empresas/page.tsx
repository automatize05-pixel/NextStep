export const dynamic = 'force-dynamic'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Search, Zap, ShieldCheck, ArrowRight, Activity, Users } from "lucide-react"

export default function EmpresasPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Top Nav */}
      <header className="h-20 border-b border-white/5 flex items-center px-6 md:px-12 justify-between backdrop-blur-xl bg-[#0B0F19]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-xl">N</div>
          <span className="font-black text-2xl tracking-tighter">Next<span className="text-[#2563EB] italic">Step</span></span>
          <span className="ml-2 px-2 py-0.5 bg-white/10 text-white rounded text-[10px] font-black uppercase tracking-widest hidden md:inline-block">Para Empresas</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white hidden md:block">Para Profissionais</Link>
          <Button className="bg-white text-black hover:bg-slate-200 font-black px-6 rounded-full text-xs uppercase tracking-widest">
            Falar com Vendas
          </Button>
        </div>
      </header>

      <main>
        {/* B2B Hero */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container px-6 md:px-12 mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-[10px] font-black uppercase tracking-widest">
                <Building2 className="h-3 w-3" /> Recrutamento IA
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                Contrate os <span className="text-[#FFD700]">Melhores</span> Talentos de Angola.
              </h1>
              <p className="text-xl text-slate-400 font-bold max-w-xl">
                Aceda a uma base de dados curada pela Inteligência Artificial. Encontre candidatos pré-validados e que encaixam perfeitamente na cultura da sua empresa.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg" action="/api/leads" method="POST">
                <Input required type="email" name="email" placeholder="O seu email corporativo" className="h-14 rounded-xl border-white/10 bg-slate-900/50 text-white font-bold" />
                <Button type="button" className="h-14 px-8 rounded-xl bg-[#2563EB] hover:bg-blue-700 font-black uppercase tracking-widest text-xs shrink-0 shadow-lg shadow-blue-500/20">
                  Aderir Agora
                </Button>
              </form>
              <p className="text-xs text-slate-500 font-bold">Acesso beta exclusivo para empresas registadas em Angola.</p>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-200">
              <div className="w-full aspect-[4/3] bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-slate-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 p-6 space-y-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/30 via-slate-900 to-[#0B0F19]">
                   {/* Mock candidate card */}
                   <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-xl">JD</div>
                       <div>
                         <p className="font-black text-white">João Dias</p>
                         <p className="text-[10px] text-slate-400 font-bold">Engenheiro de Software • Luanda</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="inline-flex py-1 px-2 rounded bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest mb-1">98% Match</div>
                       <p className="text-[10px] font-bold text-slate-500">Avaliado por IA</p>
                     </div>
                   </div>

                   {/* Mock candidate card 2 */}
                   <div className="p-4 bg-slate-950/80 border border-white/5 rounded-2xl flex items-center justify-between opacity-70">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-xl">MV</div>
                       <div>
                         <p className="font-black text-white">Maria Vaz</p>
                         <p className="text-[10px] text-slate-400 font-bold">Gestora de Projetos • Benguela</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="inline-flex py-1 px-2 rounded bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1">85% Match</div>
                       <p className="text-[10px] font-bold text-slate-500">Avaliada por IA</p>
                     </div>
                   </div>

                   <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                     <div className="flex-1 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                       <p className="text-2xl font-black text-blue-500">1.2K</p>
                       <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Talentos Ativos</p>
                     </div>
                     <div className="flex-1 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                       <p className="text-2xl font-black text-purple-500">100%</p>
                       <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Validação IA</p>
                     </div>
                   </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 p-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                       <Zap className="h-5 w-5 text-black" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tempo de Contratação</p>
                       <p className="text-xl font-black text-white">-60% Média</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="w-full py-32 bg-slate-950/50">
           <div className="container px-6 md:px-12 mx-auto">
              <div className="text-center mb-20 space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black tracking-tighter">A vantagem <span className="text-[#2563EB]">NextStep</span></h2>
                 <p className="text-slate-400 font-bold max-w-xl mx-auto">Porquê as empresas mais inovadoras escolhem a nossa plataforma.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-colors">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                       <Search className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-black mb-3">Pesquisa Precisa via IA</h3>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">Não perca tempo com currículos irrelevantes. O nosso algoritmo faz o pre-screening técnico e comportamental por si.</p>
                 </div>
                 
                 <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                       <Activity className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-black mb-3">Insights Comportamentais</h3>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">Avalie soft skills criticamente. Trazemos dados gerados pelo simulador de entrevistas dos nossos candidatos.</p>
                 </div>

                 <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-[#FFD700]/30 transition-colors">
                    <div className="w-14 h-14 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center mb-6">
                       <ShieldCheck className="h-6 w-6 text-[#FFD700]" />
                    </div>
                    <h3 className="text-xl font-black mb-3">Talentos Verificados</h3>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">Candidatos reais, com competências validadas. A comunidade NextStep foca no crescimento contínuo de carreira.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>
      
      {/* Short Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
         <div className="container mx-auto text-center flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">© 2026 NEXTSTEP TECHNOLOGIES. LUANDA, ANGOLA.</p>
         </div>
      </footer>
    </div>
  )
}
