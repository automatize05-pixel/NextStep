import { createClient } from "@/lib/supabase/server"
import { Users, Activity, Database, ShieldAlert } from "lucide-react"

interface RecentUser {
  id: string;
  full_name: string | null;
  created_at: string;
}

export default async function AdminOverview() {
  const supabase = await createClient()

  // Fetch real statistics
  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { data: recentUsersRaw } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const recentUsers = (recentUsersRaw as unknown as RecentUser[]) || []

  const stats = [
    { 
      label: "Usuários Totais", 
      value: userCount?.toString() || "0", 
      sub: "Registrados no DB",
      icon: Users, 
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      label: "Oportunidades", 
      value: "Ativo", 
      sub: "Auto-Scraping AI",
      icon: Database, 
      color: "text-green-600",
      bg: "bg-green-50"
    },
    { 
      label: "Alertas V5", 
      value: "On", 
      sub: "Push & WhatsApp",
      icon: Activity, 
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    { 
      label: "Segurança", 
      value: "100%", 
      sub: "Protocolo 22/11",
      icon: ShieldAlert, 
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ]

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">Visão Geral</h2>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-[0.2em] text-xs">Métricas da Plataforma em Tempo Real</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black text-xs uppercase tracking-wider hover:border-primary transition-all shadow-sm">Relatório Semanal</button>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-primary transition-all shadow-lg">Exportar Tudo</button>
        </div>
      </div>

      {/* Stats Grid - Fixed Spacing and Overflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`p-4 rounded-2xl ${stat.bg} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                 <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                <p className="text-4xl font-black tracking-tighter text-slate-900 truncate">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-2 italic">{stat.sub}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="xl:col-span-2 bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700 opacity-50" />
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
               <Users className="h-6 w-6 text-primary" />
               Novas Inscrições
            </h3>
            <div className="space-y-6 relative z-10">
               {recentUsers.length > 0 ? (
                 recentUsers.map((u) => (
                   <div key={u.id} className="flex items-center justify-between p-6 bg-slate-50/80 backdrop-blur-sm rounded-[2rem] border border-white hover:border-primary/20 hover:bg-white transition-all">
                      <div className="flex items-center gap-5">
                         <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-primary/20">
                            {u.full_name?.[0] || 'U'}
                         </div>
                         <div>
                            <p className="font-extrabold text-slate-900 text-lg">{u.full_name || 'Usuário Anónimo'}</p>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                              Inscrito em: {new Date(u.created_at).toLocaleDateString('pt-AO', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                         </div>
                      </div>
                      <button className="h-10 px-6 rounded-full bg-white border border-slate-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">Detalhes</button>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-16 text-slate-300 font-black text-xl italic uppercase tracking-widest">Nenhum dado ativo</div>
               )}
            </div>
         </div>

         <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border border-white/5 rounded-full rotate-45 pointer-events-none" />
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
               <Activity className="h-6 w-6 text-primary" />
               Status IA V5
            </h3>
            <div className="space-y-10 relative z-10">
               <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                     <span>OpenAI Cota</span>
                     <span className="text-primary italic">45.2%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-[2px]">
                     <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" style={{ width: '45%' }} />
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                     <span>Matching Flow</span>
                     <span className="text-green-400 italic">Estável</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-[2px]">
                     <div className="h-full bg-green-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,94,0.5)]" style={{ width: '88%' }} />
                  </div>
               </div>

               <div className="mt-12 p-8 bg-slate-800/50 rounded-[2.5rem] border border-white/5 group hover:border-primary/30 transition-all">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-[0.3em]">Deployment Status</p>
                  <p className="font-mono text-xs text-green-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    Vercel Edge: Active
                  </p>
                  <p className="font-mono text-[10px] text-slate-600 mt-2">Commit: ba57ce7 (stable)</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
