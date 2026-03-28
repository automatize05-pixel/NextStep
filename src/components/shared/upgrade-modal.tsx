"use client"

import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle2, Crown, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function UpgradeModal({ 
  isOpen, 
  onClose, 
  title = "Limite Atingido", 
  description = "Você atingiu o limite de uso diário do seu plano atual."
} : UpgradeModalProps) {
  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-800 text-white rounded-[2.5rem] overflow-hidden p-0 gap-0 shadow-2xl">
        {/* Header Decorator */}
        <div className="h-28 bg-gradient-to-br from-primary to-blue-900 relative flex items-center justify-center overflow-hidden">
           <Zap className="h-12 w-12 text-white/10 absolute -right-2 -bottom-2 rotate-12" />
           <div className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 group-hover:scale-[2] transition-transform duration-700" />
              <Crown className="h-10 w-10 text-white relative z-10 drop-shadow-2xl" />
           </div>
        </div>

        <div className="p-8 space-y-6">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-2xl font-black tracking-tight">{title}</DialogTitle>
            <DialogDescription className="text-slate-400 font-bold text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Vantagens do Upgrade</p>
             <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs font-bold text-slate-200">
                   <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                   </div>
                   Simulações de Entrevista ilimitadas
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-200">
                   <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                   </div>
                   CV Profissional com padrão ATS
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-slate-200">
                   <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                   </div>
                   Suporte e rede de Mentores de Elite
                </li>
             </ul>
          </div>

          <div className="flex flex-col gap-3 pt-2">
             <Button 
               onClick={() => { onClose(); router.push('/dashboard/plans'); }}
               className="h-14 bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl shadow-primary/20 group transition-all active:scale-95"
             >
                Ver Planos e Preços <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Button>
             <Button 
               variant="ghost" 
               onClick={onClose}
               className="h-10 text-slate-500 hover:text-white font-bold text-[10px] uppercase tracking-widest"
             >
                Talvez mais tarde
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
