import { Shield, Sparkles, Database, Save, AlertTriangle, Zap } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">Configurações</h2>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Parâmetros Estratégicos do Sistema NextStep</p>
        </div>
        <button className="px-8 py-4 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-2">
           <Save className="h-4 w-4" />
           Guardar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
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
                    <p className="font-extrabold text-slate-900">Análise de Vídeo-Entrevista</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Planos Elite / Premium</p>
                 </div>
                 <div className="w-12 h-6 bg-slate-300 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
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
                 <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-[0.2em]">Supabase Database</p>
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-mono text-sm font-bold">OPERACIONAL: AWS Cape Town (af-south-1)</span>
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
              <div className="p-6 bg-red-50/50 rounded-[2rem] border border-red-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div>
                       <p className="font-black text-red-900 uppercase text-xs tracking-widest">Modo Manutenção</p>
                       <p className="text-[10px] font-bold text-red-700/60 mt-1">Bloqueia acesso público à plataforma</p>
                    </div>
                 </div>
                 <button className="px-6 py-2 bg-white border border-red-200 rounded-full font-black text-[10px] uppercase text-red-600 hover:bg-red-600 hover:text-white transition-all">Ativar</button>
              </div>
              
              <div className="p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-orange-500" />
                    <div>
                       <p className="font-black text-orange-900 uppercase text-xs tracking-widest">Limites de Cota</p>
                       <p className="text-[10px] font-bold text-orange-700/60 mt-1">Gerencia requisições por usuário/dia</p>
                    </div>
                 </div>
                 <button className="px-6 py-2 bg-white border border-orange-200 rounded-full font-black text-[10px] uppercase text-orange-600 hover:bg-orange-600 hover:text-white transition-all">Configurar</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
