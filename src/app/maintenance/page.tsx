import { ShieldAlert, Timer, WifiOff } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white rounded-full animate-pulse" />
      </div>
      
      <div className="max-w-xl space-y-10 relative z-10 animate-in zoom-in duration-1000">
         <div className="flex justify-center">
            <div className="p-6 bg-primary/20 rounded-[2.5rem] border border-primary/30 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
               <ShieldAlert className="h-16 w-16 text-primary" />
            </div>
         </div>
         
         <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic">Evolução em <br /> <span className="text-primary italic">Tempo Real</span></h1>
            <p className="text-slate-400 font-bold text-lg uppercase tracking-[0.2em]">O NextStep está em Manutenção Estratégica</p>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-white/5 space-y-2">
               <Timer className="h-6 w-6 text-primary mx-auto" />
               <p className="font-extrabold text-sm uppercase">Prazos</p>
               <p className="text-[10px] text-slate-500 font-bold">Voltamos em breve</p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-white/5 space-y-2">
               <WifiOff className="h-6 w-6 text-orange-500 mx-auto" />
               <p className="font-extrabold text-sm uppercase">Upgrade</p>
               <p className="text-[10px] text-slate-500 font-bold">Base V5 Sendo Aplicada</p>
            </div>
         </div>

         <div className="pt-10 border-t border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">NextStep Angola Security Protocol</p>
            <p className="text-xs text-slate-400 mt-4 font-bold italic">"Preparando o seu próximo passo para o topo do mercado."</p>
         </div>
      </div>
    </div>
  )
}
