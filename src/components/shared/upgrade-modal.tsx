"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, ShieldCheck, Rocket, Star } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
}

export function UpgradeModal({ isOpen, onClose, title, description }: UpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border text-foreground rounded-[2.5rem] overflow-hidden p-0 gap-0 shadow-2xl transition-colors">
        {/* Header Visual */}
        <div className="relative h-40 bg-primary flex items-center justify-center overflow-hidden">
           <Zap className="h-20 w-20 text-white/10 absolute -right-4 -bottom-4 rotate-12" />
           <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 opacity-90" />
           
           <div className="relative z-10 flex flex-col items-center text-center px-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-3 border border-white/30 shadow-2xl">
                <Crown className="h-10 w-10 text-white relative z-10 drop-shadow-lg" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest leading-none">Upgrade Premium</h2>
           </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-black tracking-tight">{title || "Atingiu o Limite Diário"}</h3>
            <p className="text-sm text-muted-foreground font-black leading-relaxed">
              {description || "O seu plano atual tem limites de uso da IA. Faça o upgrade para desbloquear todo o potencial da NextStep."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary text-center mb-4">Destaques do Plano Elite</h4>
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { text: "Entrevistas de IA Ilimitadas", icon: <MessageSquareIcon className="h-4 w-4" /> },
                { text: "Otimização ATS Master de CV", icon: <FileTextIcon className="h-4 w-4" /> },
                { text: "Suporte VIP via WhatsApp", icon: <Zap className="h-4 w-4" /> },
                { text: "Acesso a Mentores de Elite", icon: <Star className="h-4 w-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 group hover:bg-muted transition-colors">
                  <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-black tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
             <Button 
               onClick={() => window.location.href = '/plans'}
               className="h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-primary/20 group transition-all active:scale-95"
             >
               Ver Planos de Elite
               <Rocket className="ml-2 h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
             </Button>
             
             <Button 
               variant="ghost" 
               onClick={onClose}
               className="h-10 text-muted-foreground hover:text-foreground font-black text-[10px] uppercase tracking-widest transition-colors"
             >
               Talvez Mais Tarde
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y2="13" x1="8" y1="13" />
      <line x1="16" y2="17" x1="8" y1="17" />
      <line x1="10" y2="9" x1="8" y1="9" />
    </svg>
  )
}
