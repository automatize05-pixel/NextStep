"use client"

export const dynamic = 'force-dynamic'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Users, Settings, Activity, BookOpen, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: Activity },
    { name: "Usuários", href: "/admin/users", icon: Users },
    { name: "Trilhas", href: "/admin/tracks", icon: BookOpen },
    { name: "Configurações", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/admin" className="text-xl font-bold text-white">NextStep Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-slate-800 text-white font-medium" : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-red-900/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair do Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white flex items-center px-6 justify-between">
          <div className="md:hidden font-bold">Admin Panel</div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Administrador</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  )
}
