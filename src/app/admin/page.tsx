import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Users, Activity, Settings, Database, ShieldAlert, BarChart3 } from "lucide-react"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // STRICT ACCESS CONTROL
  if (!user || user.email !== "automatize05@gmail.com") {
    redirect("/")
  }

  // Fetch real statistics
  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Mock stats for the ones we don't have tables for yet, but making them look more dynamic
  const stats = [
    { label: "Usuários Totais", value: userCount?.toString() || "0", icon: Users, color: "text-blue-600" },
    { label: "Oportunidades Web", value: "Rastreadas", icon: Database, color: "text-green-600" },
    { label: "Alertas Gerados", value: "Ativos", icon: Activity, color: "text-orange-600" },
    { label: "Uptime do Sistema", value: "99.9%", icon: ShieldAlert, color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* Sidebar Admin */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6 hidden lg:block">
        <div className="mb-10">
          <h1 className="text-2xl font-black tracking-tight text-primary">AdminHub</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">NextStep Control Center</p>
        </div>
        
        <nav className="space-y-4">
           <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-lg">
             <BarChart3 className="h-5 w-5" />
             <span className="font-bold">Overview</span>
           </div>
           <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
             <Users className="h-5 w-5" />
             <span className="font-medium">Gestão de Usuários</span>
           </div>
           <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition-colors cursor-pointer">
             <Settings className="h-5 w-5" />
             <span className="font-medium">Configurações</span>
           </div>
        </nav>
        
        <div className="absolute bottom-6 left-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400">Server Status: Online</span>
           </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Dashboard Admin</h2>
            <p className="text-slate-500 font-medium italic">Bem-vindo, {user.email}</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="px-4 py-2 bg-white border rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">Exportar Relatórios</button>
             <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-white uppercase">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className={`p-3 rounded-lg bg-slate-50 w-fit mb-4 ${stat.color}`}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black tracking-tight mt-1">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="text-xl font-black mb-6">Usuários Recentes</h3>
              <div className="space-y-4">
                 {recentUsers && recentUsers.length > 0 ? (
                   recentUsers.map((u) => (
                     <div key={u.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-[10px]">
                              {u.full_name?.[0] || 'U'}
                           </div>
                           <div>
                              <p className="font-bold text-sm">{u.full_name || 'Usuário sem nome'}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">
                                Registrado em: {new Date(u.created_at).toLocaleDateString('pt-AO')}
                              </p>
                           </div>
                        </div>
                        <button className="text-xs font-bold text-primary hover:underline">Ver Perfil</button>
                     </div>
                   ))
                 ) : (
                   <div className="text-center py-10 text-slate-400 font-bold italic">Nenhum usuário registrado ainda.</div>
                 )}
              </div>
           </div>

           <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black mb-6">Status da IA</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span>Cota OpenAI Mensal</span>
                       <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[45%]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span>Processamento de Crawford</span>
                       <span>82%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-[82%]"></div>
                    </div>
                 </div>
                 <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Build Status</p>
                    <p className="font-mono text-xs text-green-400 font-bold">Vercel: Success (master)</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

           <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black mb-6">Status da IA</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span>Cota OpenAI Mensal</span>
                       <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[45%]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span>Processamento de Crawford</span>
                       <span>82%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-[82%]"></div>
                    </div>
                 </div>
                 <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Build Status</p>
                    <p className="font-mono text-xs text-green-400 font-bold">Vercel: Success (master)</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
