import Link from "next/link"
import { Shield, FileText, ChevronLeft, HelpCircle, BookOpen } from "lucide-react"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717]">
      {/* Top Header */}
      <header className="h-16 bg-white border-b sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-primary font-bold text-xl tracking-tight">NextStep</Link>
          <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>
          <span className="text-slate-500 font-medium text-sm hidden md:block">Central de Ajuda</span>
        </div>
        <Link href="/">
          <button className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Sair
          </button>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 md:h-[calc(100vh-64px)] md:sticky md:top-16 border-r bg-white p-4">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-4">Jurídico e Privacidade</p>
            
            <Link href="/privacy" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#475569] hover:bg-slate-50 transition-colors">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold">Política de Privacidade</span>
            </Link>
            
            <Link href="/terms" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-primary border-r-2 border-primary">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-bold">Termos de Uso</span>
            </Link>

            <div className="pt-4 mt-4 border-t border-slate-100">
               <Link href="/community" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#475569] hover:bg-slate-50 transition-colors">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-semibold">Diretrizes da Comunidade</span>
              </Link>
               <Link href="/support" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#475569] hover:bg-slate-50 transition-colors">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">Suporte</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 md:p-12 lg:p-20 text-[#171717]">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
