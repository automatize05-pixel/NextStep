"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { 
  User, 
  MapPin, 
  Target, 
  Briefcase, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2,
  Rocket
} from "lucide-react"
import { Logo } from "@/components/shared/logo"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    bio: "",
    location: "",
    field_of_interest: "",
    current_level: "junior"
  })

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/login")
        } else {
          setAuthLoading(false)
        }
      } catch (err) {
        router.push("/login")
      }
    }
    checkUser()
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Sincronizando Sessão...</p>
        </div>
      </div>
    )
  }

  const handleComplete = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          has_onboarded: true
        })
        .eq('id', user.id)

      if (!error) {
        router.push("/dashboard")
      }
    }
    setLoading(false)
  }

  const progress = (step / 4) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-8 text-foreground transition-colors overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="flex justify-center mb-10 scale-110">
          <Logo />
        </div>

        {/* Progress Bar */}
        <div className="mb-12 space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            <span>Passo {step} de 4</span>
            <span>{Math.round(progress)}% Completo</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="bg-card border-border shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500">
          <CardContent className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    <User className="h-3 w-3" /> Boas-vindas
                  </div>
                  <h2 className="text-3xl font-black tracking-tight tracking-tighter">Quem é o próximo talento?</h2>
                  <p className="text-muted-foreground font-bold leading-relaxed">Começamos pelo básico. Como gostaria de ser chamado?</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nome Completo</Label>
                    <Input 
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      placeholder="Ex: Ageu Cristiniano" 
                      className="h-14 rounded-2xl border-border bg-muted/30 text-foreground font-bold focus:ring-2 focus:ring-primary/20 transition-all text-base"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!formData.full_name}
                  className="w-full h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                >
                  Continuar Jornada
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {step === 2 && ( step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest">
                    <Briefcase className="h-3 w-3" /> Foco Profissional
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter">Qual é o seu objetivo?</h2>
                  <p className="text-muted-foreground font-bold">Diga-nos o seu cargo atual ou o que aspira ser.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Cargo ou Título</Label>
                    <Input 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Desenvolvedor Fullstack" 
                      className="h-14 rounded-2xl border-border bg-muted/30 text-foreground font-bold text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Área de Interesse</Label>
                    <Input 
                      value={formData.field_of_interest}
                      onChange={(e) => setFormData({...formData, field_of_interest: e.target.value})}
                      placeholder="Ex: Tecnologia, Design, Marketing" 
                      className="h-14 rounded-2xl border-border bg-muted/30 text-foreground font-bold text-base"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(1)} className="h-14 px-6 rounded-2xl font-black text-xs uppercase text-muted-foreground hover:text-foreground">Voltar</Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!formData.title || !formData.field_of_interest}
                    className="flex-1 h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                  >
                    Próximo Passo
                  </Button>
                </div>
              </div>
            ))}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-500 text-[10px] font-black uppercase tracking-widest">
                    <MapPin className="h-3 w-3" /> Localização
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter">Onde você está?</h2>
                  <p className="text-muted-foreground font-bold">Isto ajuda-nos a encontrar oportunidades perto de si.</p>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Cidade / País</Label>
                    <Input 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Ex: Luanda, Angola" 
                      className="h-14 rounded-2xl border-border bg-muted/30 text-foreground font-bold text-base"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(2)} className="h-14 px-6 rounded-2xl font-black text-xs uppercase text-muted-foreground">Voltar</Button>
                  <Button 
                    onClick={() => setStep(4)} 
                    disabled={!formData.location}
                    className="flex-1 h-14 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                  >
                    Quase Lá
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-green-500/20 shadow-xl shadow-green-500/5">
                    <Rocket className="h-10 w-10 text-green-500 animate-bounce" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter">Tudo pronto!</h2>
                  <p className="text-muted-foreground font-bold text-lg leading-relaxed px-4">
                    Estamos prontos para impulsionar a sua carreira na NextStep.
                  </p>
                </div>
                
                <div className="p-6 rounded-3xl bg-muted/30 border border-border shadow-inner text-left space-y-3">
                   <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-bold">Perfil Base Criado</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-bold">Dashboard Personalizado</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-bold">Acesso às Ferramentas IA</span>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Button 
                    onClick={handleComplete} 
                    disabled={loading}
                    className="w-full h-16 bg-primary hover:bg-blue-600 text-primary-foreground font-black uppercase text-sm tracking-[0.25em] rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-95"
                  >
                    {loading ? "Sincronizando..." : "Começar Agora"}
                  </Button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                    Ao clicar, aceita os Termos e Condições da NextStep.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
