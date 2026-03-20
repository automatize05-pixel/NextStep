"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  
  // Profile Form State
  const [currentLevel, setCurrentLevel] = useState("")
  const [fieldOfInterest, setFieldOfInterest] = useState("")
  const [mainGoal, setMainGoal] = useState("")

  const handleComplete = async () => {
    setLoading(true)
    
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
        router.push("/login")
        return
    }

    // Update profile
    const { error } = await supabase
      .from("profiles")
      .update({
        current_level: currentLevel,
        field_of_interest: fieldOfInterest,
        main_goal: mainGoal,
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Bem-vindo ao NextStep!</h1>
          <p className="text-muted-foreground">Vamos configurar seu perfil para personalizar sua experiência.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Passo {step} de 2: Seus Objetivos</CardTitle>
            <CardDescription>Nos conte um pouco sobre seu momento profissional atual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Qual é o seu nível profissional atual?</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <label className="text-sm font-medium leading-none">Qual é a sua área de interesse?</label>
                  <Input 
                    placeholder="Ex: Desenvolvimento de Software, Marketing, Design..." 
                    value={fieldOfInterest}
                    onChange={(e) => setFieldOfInterest(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Qual seu principal objetivo com o NextStep?</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={mainGoal}
                    onChange={(e) => setMainGoal(e.target.value)}
                  >
                    <option value="" disabled>Selecione um objetivo</option>
                    <option value="find_job">Conseguir um emprego</option>
                    <option value="find_internship">Conseguir um estágio</option>
                    <option value="improve_cv">Melhorar meu currículo</option>
                    <option value="prepare_interviews">Me preparar para entrevistas</option>
                    <option value="freelance">Começar como freelancer</option>
                    <option value="career_transition">Mudar de carreira</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Voltar</Button>
            ) : (
              <div></div>
            )}
            
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!currentLevel || !fieldOfInterest}>
                Próximo Passo
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={loading || !mainGoal}>
                {loading ? "Salvando..." : "Concluir Onboarding"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
