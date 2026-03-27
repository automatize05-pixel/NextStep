"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Target, MapPin, UploadCloud, CheckCircle2, Loader2, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cvUploading, setCvUploading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  
  // Profile Form State
  const [currentLevel, setCurrentLevel] = useState("")
  const [fieldOfInterest, setFieldOfInterest] = useState("")
  const [mainGoal, setMainGoal] = useState("")
  const [location, setLocation] = useState("")
  const [title, setTitle] = useState("")

  const handleComplete = async () => {
    setLoading(true)
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        router.push("/login")
        return
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        current_level: currentLevel,
        field_of_interest: fieldOfInterest,
        main_goal: mainGoal,
        location: location,
        title: title
      })
      .eq("id", session.user.id)

    setLoading(false)
    
    if (!error) {
      router.push("/dashboard")
      router.refresh()
    } else {
      console.error(error)
      alert("Houve um erro ao salvar o perfil.")
    }
  }

  const simulateCVUpload = () => {
    setCvUploading(true)
    setTimeout(() => {
      setCvUploading(false)
      setStep(5) // Move to next step automatically
    }, 2000)
  }

  const stepIndicator = (
    <div className="flex gap-2 justify-center mb-12">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === step ? 'w-8 bg-[#2563EB]' : i < step ? 'w-4 bg-[#2563EB]/40' : 'w-4 bg-white/10'
          }`}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-4 text-white">
      <div className="w-full max-w-xl">
        {stepIndicator}

        <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
              <div className="w-16 h-16 bg-[#2563EB]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-[#2563EB]" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Bem-vindo ao NextStep</h1>
              <p className="text-slate-400 font-bold leading-relaxed max-w-sm mx-auto">
                Vamos configurar o seu perfil base. A nossa IA utilizará estes dados para encontrar as melhores vagas e criar um currículo imbatível para o mercado de Angola.
              </p>
              <Button onClick={() => setStep(2)} className="h-12 px-8 mt-4 bg-[#2563EB] hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest rounded-xl">
                Começar Jornada <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-black">O seu foco principal</h2>
              <p className="text-slate-400 text-sm font-bold">Onde está e para onde quer ir na sua carreira?</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Nível Profissional</label>
                  <select 
                    className="w-full h-12 rounded-xl border border-white/10 bg-slate-950/50 px-4 text-sm font-bold outline-none focus:border-[#2563EB] transition-colors"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                  >
                    <option value="" disabled>Selecione seu nível</option>
                    <option value="student">Estudante</option>
                    <option value="entry">Iniciante / Primeiro Emprego</option>
                    <option value="junior">Júnior</option>
                    <option value="mid">Pleno</option>
                    <option value="senior">Sênior</option>
                    <option value="transition">Em transição de carreira</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Área de Interesse</label>
                  <Input 
                    className="h-12 rounded-xl border-white/10 bg-slate-950/50 text-white font-bold"
                    placeholder="Ex: Desenvolvimento, Finanças, RH..." 
                    value={fieldOfInterest}
                    onChange={(e) => setFieldOfInterest(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                 <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400 font-bold hover:text-white hover:bg-white/5">Voltar</Button>
                 <Button onClick={() => setStep(3)} disabled={!currentLevel || !fieldOfInterest} className="bg-[#2563EB] hover:bg-blue-700 font-black h-10 px-6 rounded-xl">Próximo</Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-black">O que procura no NextStep?</h2>
              <p className="text-slate-400 text-sm font-bold">A inteligência artificial irá adaptar-se ao seu objetivo.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                 {[
                   { id: 'find_job', label: 'Conseguir Emprego', icon: <Briefcase className="h-5 w-5" /> },
                   { id: 'find_internship', label: 'Primeiro Estágio', icon: <Target className="h-5 w-5" /> },
                   { id: 'improve_cv', label: 'Otimizar Currículo', icon: <CheckCircle2 className="h-5 w-5" /> },
                   { id: 'prepare_interviews', label: 'Treinar Entrevistas', icon: <Briefcase className="h-5 w-5" /> },
                 ].map(goal => (
                   <button 
                     key={goal.id}
                     onClick={() => setMainGoal(goal.id)}
                     className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
                       mainGoal === goal.id ? 'bg-[#2563EB]/20 border-[#2563EB] text-[#2563EB]' : 'bg-slate-950/50 border-white/10 text-slate-400 hover:border-white/20'
                     }`}
                   >
                     {goal.icon}
                     <span className="font-black text-sm">{goal.label}</span>
                   </button>
                 ))}
              </div>

              <div className="flex justify-between pt-6">
                 <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400 font-bold hover:text-white hover:bg-white/5">Voltar</Button>
                 <Button onClick={() => setStep(4)} disabled={!mainGoal} className="bg-[#2563EB] hover:bg-blue-700 font-black h-10 px-6 rounded-xl">Próximo</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-black">A sua base</h2>
              <p className="text-slate-400 text-sm font-bold">Isto definirá o título do seu portfólio público.</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Cargo / Título Atual</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input 
                      className="h-12 pl-10 rounded-xl border-white/10 bg-slate-950/50 text-white font-bold"
                      placeholder="Ex: Engenheiro de Software Júnior" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Localização</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input 
                      className="h-12 pl-10 rounded-xl border-white/10 bg-slate-950/50 text-white font-bold"
                      placeholder="Ex: Luanda, Angola" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                 <Button variant="ghost" onClick={() => setStep(3)} className="text-slate-400 font-bold hover:text-white hover:bg-white/5">Voltar</Button>
                 <Button onClick={() => setStep(5)} disabled={!title || !location} className="bg-[#2563EB] hover:bg-blue-700 font-black h-10 px-6 rounded-xl">Último Passo</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-purple-400">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black">Extração IA Baseada em CV</h2>
              <p className="text-slate-400 text-sm font-bold max-w-sm mx-auto">
                Faça o upload do seu currículo atual (PDF) e a nossa IA preencherá automaticamente as suas experiências e competências no painel.
              </p>
              
              <div 
                className="mt-6 border-2 border-dashed border-white/10 hover:border-[#2563EB]/50 bg-slate-950/50 rounded-2xl p-8 cursor-pointer transition-colors"
                onClick={!cvUploading ? simulateCVUpload : undefined}
              >
                {cvUploading ? (
                  <div className="flex flex-col items-center gap-3 text-[#2563EB]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest">A Extrair Dados...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-black text-sm">Clique para anexar PDF</p>
                    <p className="text-xs font-bold text-slate-500">Tamanho máximo: 5MB</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-6">
                 <button onClick={handleComplete} className="text-xs font-bold text-slate-500 hover:text-white transition-colors underline underline-offset-4">
                   Saltar este passo (Preencher Manualmente)
                 </button>
                 <Button onClick={handleComplete} disabled={loading || cvUploading} className="bg-[#2563EB] hover:bg-blue-700 font-black h-10 px-6 rounded-xl">
                   {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Concluir
                 </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
