"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, User, FileText, Map, MessageSquare, Briefcase, LogOut, Clipboard, DollarSign, Linkedin, FileEdit, Search, Crown, Users, GraduationCap, Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { RealTimeClock } from "@/components/shared/real-time-clock"
import { Logo } from "@/components/shared/logo"
import { ModeToggle } from "@/components/shared/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (!user || error) {
        window.location.href = "/login"
      }
    }
    checkUser()
  }, [])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Job Hunter IA", href: "/dashboard/jobs", icon: Search, highlight: true },
    { name: "Meu Perfil", href: "/dashboard/profile", icon: User },
    { name: "Meu Currículo", href: "/dashboard/cv", icon: FileText },
    { name: "Trilhas", href: "/dashboard/tracks", icon: Map },
    { name: "Bolsas IA", href: "/dashboard/scholarships", icon: Globe, highlight: true },
    { name: "Fórum NextStep", href: "/dashboard/community", icon: Users },
    { name: "Mentores de Elite", href: "/dashboard/mentorship", icon: GraduationCap },
    { name: "Entrevistas IA", href: "/dashboard/interviews", icon: MessageSquare },
    { name: "Oportunidades", href: "/dashboard/career", icon: Briefcase },
    { name: "Candidaturas", href: "/dashboard/applications", icon: Clipboard },
    { name: "Carta de Apresentação", href: "/dashboard/cover-letter", icon: FileEdit },
    { name: "Análise Salarial", href: "/dashboard/salary", icon: DollarSign },
    { name: "LinkedIn IA", href: "/dashboard/linkedin", icon: Linkedin },
    { name: "Ver Planos", href: "/plans", icon: Crown },
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground selection:bg-primary/20 transition-colors">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden animate-in fade-in duration-300 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-background border-r flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b shrink-0">
          <Link href="/dashboard">
            <Logo className="scale-75 origin-left" />
          </Link>
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item: any, index: number) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={`nav-${index}-${item.name}`} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  item.highlight && !isActive
                    ? "text-primary font-black bg-primary/5 hover:bg-primary/10 border border-primary/20 shadow-sm shadow-primary/5"
                    : isActive 
                      ? "bg-primary/10 text-primary font-black shadow-sm shadow-primary/5 border border-primary/10" 
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground font-bold"
                }`}
              >
                <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                <span className="text-[13px] tracking-tight">{item.name}</span>
                {item.highlight && !isActive && <span className="ml-auto text-[9px] font-black px-2 py-0.5 bg-primary text-primary-foreground rounded-full uppercase tracking-widest shadow-lg shadow-primary/20 animate-pulse">IA</span>}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t bg-muted/20">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all active:scale-95"
          >
            <LogOut className="h-4 w-4" />
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full relative">
        <header className="h-20 border-b bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40 transition-colors">
          <div className="flex items-center gap-6 flex-1">
             <button 
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-all active:scale-90"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="hidden md:flex items-center bg-muted/30 hover:bg-muted/50 rounded-2xl px-5 py-2.5 w-full max-w-md border border-border transition-all focus-within:ring-2 focus-within:ring-primary/20 group">
              <Search className="h-4 w-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar ferramentas, cursos ou vagas..." 
                className="bg-transparent border-none text-sm outline-none w-full font-bold placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          <RealTimeClock className="hidden lg:flex flex-col items-center text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground" />

          <div className="flex items-center gap-4 flex-1 justify-end">
            <ModeToggle />
            <div className="flex items-center gap-3 p-1.5 pr-5 bg-muted/40 hover:bg-muted/60 rounded-full border border-border transition-all cursor-pointer group">
               <div className="w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-primary-foreground font-black text-xs group-hover:scale-105 transition-transform">U</div>
               <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">Painel Elite</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background relative transition-colors">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
