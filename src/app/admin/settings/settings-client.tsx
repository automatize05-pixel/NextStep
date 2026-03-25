'use client'

import { useState, useTransition } from "react"
import { Shield, Sparkles, Database, Save, AlertTriangle, Zap, Loader2 } from "lucide-react"
import { toggleMaintenanceMode, updateDailyLimit } from "./actions"

export default function SettingsClient({ initialSettings }: { initialSettings: any }) {
  const [isPending, startTransition] = useTransition()
  const [maintenance, setMaintenance] = useState(initialSettings?.maintenance_mode || false)
  const [dailyLimit, setDailyLimit] = useState(initialSettings?.daily_ai_limit || 10)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleToggleMaintenance = () => {
    startTransition(async () => {
      try {
        const newState = await toggleMaintenanceMode(maintenance)
        setMaintenance(newState)
      } catch (err) {
        console.error(err)
        alert("Erro ao alterar modo manutenção")
      }
    })
  }

  const handleUpdateLimit = async () => {
    setSaveStatus('saving')
    try {
      await updateDailyLimit(dailyLimit)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      
      {/* AI & Innovation Settings */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-2xl">
               <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-black italic">IA & Inovação</h3>
         </div>
         
         <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
               <div>
                  <p className="font-extrabold text-slate-900">Motor Crawford</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Busca Web em Tempo Real</p>
               </div>
               <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
               </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
               <div>
                  <p className="font-extrabold text-slate-900">Playout V5 (WhatsApp)</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Alertas Automáticos</p>
               </div>
               <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-not-allowed opacity-50">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
               </div>
            </div>
         </div>
      </div>

      {/* Database & Platform Health */}
      <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl space-y-8">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 rounded-2xl">
               <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-black italic">Sitema & Dados</h3>
         </div>
         
         <div className="space-y-6">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-[0.2em]">OpenAI API Status</p>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm font-bold">CONECTADO: gpt-4o-mini</span>
               </div>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-white/5">
               <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-[0.2em]">Daily Limit (Global)</p>
               <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    value={dailyLimit} 
                    onChange={(e) => setDailyLimit(parseInt(e.target.value))}
                    className="bg-slate-950 border border-slate-700 px-4 py-2 rounded-xl font-black text-primary w-24 outline-none focus:border-primary transition-all"
                  />
                  <button 
                    onClick={handleUpdateLimit}
                    disabled={saveStatus === 'saving'}
                    className="px-4 py-2 bg-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                  >
                     {saveStatus === 'saving' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                     {saveStatus === 'success' ? 'Salvo!' : 'Salvar Limite'}
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Security & Access Mitigation */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-8 md:col-span-2">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-2xl">
               <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-black italic">Segurança & Mitigação</h3>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 flex items-center justify-between ${maintenance ? 'bg-red-600 border-red-700 text-white shadow-[0_20px_40px_rgba(220,38,38,0.2)]' : 'bg-red-50/50 border-red-100 text-slate-900 opacity-80'}`}>
               <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${maintenance ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                    <AlertTriangle className={`h-10 w-10 ${maintenance ? 'text-white' : 'text-red-500'}`} />
                  </div>
                  <div>
                     <p className={`font-black uppercase text-xs tracking-widest ${maintenance ? 'text-white/80' : 'text-red-900'}`}>Modo Manutenção</p>
                     <p className={`text-xl font-black mt-1 ${maintenance ? 'text-white' : 'text-red-950'}`}>
                        {maintenance ? 'PLATAFORMA BLOQUEADA' : 'SISTEMA ONLINE'}
                     </p>
                     <p className={`text-[10px] font-bold mt-2 ${maintenance ? 'text-white/60' : 'text-red-700/60'}`}>Afeta todos os usuários, excepto o Administrador.</p>
                  </div>
               </div>
               <button 
                 onClick={handleToggleMaintenance}
                 disabled={isPending}
                 className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl ${maintenance ? 'bg-white text-red-600 hover:scale-105' : 'bg-red-600 text-white hover:bg-red-700'}`}
               >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin text-center" /> : (maintenance ? 'DESATIVAR AGORA' : 'ATIVAR MANUTENÇÃO')}
               </button>
            </div>
            
            <div className="p-8 bg-orange-50/50 rounded-[2.5rem] border border-orange-100 flex items-center justify-between group">
               <div className="flex items-center gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">
                    <Zap className="h-10 w-10 text-orange-500" />
                  </div>
                  <div>
                     <p className="font-black text-orange-900 uppercase text-xs tracking-widest opacity-60">Limites de Cota</p>
                     <p className="text-xl font-black text-orange-950 mt-1">Gestão Dinâmica</p>
                     <p className="text-[10px] font-bold text-orange-700/60 mt-2">Atualmente: {dailyLimit} requisições/dia</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Active Guard</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
