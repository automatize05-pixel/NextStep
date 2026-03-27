import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Users, Settings, BarChart3, ShieldAlert, CreditCard } from "lucide-react"


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // STRICT ACCESS CONTROL
  if (!user || user.email !== "automatize05@gmail.com") {
    redirect("/")
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: BarChart3 },
    { label: "Gestão de Usuários", href: "/admin/users", icon: Users },
    { label: "Pagamentos", href: "/admin/payments", icon: CreditCard },
    { label: "Configurações", href: "/admin/settings", icon: Settings },
  ]


  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] selection:bg-primary selection:text-white">
      {/* Sidebar Admin */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-slate-900 text-white p-8 hidden lg:flex flex-col shadow-2xl z-50">
        <div className="mb-12">
          <Link href="/admin" className="block">
            <h1 className="text-3xl font-black tracking-tighter text-white">NextStep <span className="text-primary italic">Admin</span></h1>
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-500 mt-1">Control Hub V5</p>
          </Link>
        </div>
        
        <nav className="space-y-2 flex-grow">
           {navItems.map((item) => (
             <Link 
               key={item.href} 
               href={item.href}
               className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group"
             >
                <item.icon className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
             </Link>
           ))}
        </nav>
        
        <div className="mt-auto pt-8 border-t border-slate-800">
           <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-black text-white">A</div>
              <div>
                 <p className="text-xs font-black truncate max-w-[140px] uppercase italic">Administrador</p>
                 <p className="text-[10px] text-slate-500 font-bold truncate max-w-[140px]">{user.email}</p>
              </div>
           </div>
           <div className="flex items-center gap-2 mt-4 px-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-mono">System Live</span>
           </div>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <header className="sticky top-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 px-8 flex items-center justify-between">
           <div className="lg:hidden font-black text-xl italic text-primary">NS-ADMIN</div>
           <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hidden lg:block">Quarta-feira, 25 de Março de 2026</div>
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />)}
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors relative">
                 <ShieldAlert className="h-5 w-5 text-slate-400" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
           </div>
        </header>

        <main className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
