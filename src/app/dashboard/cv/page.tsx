"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, FileText } from "lucide-react"

export default function CVBuilderPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Load profile and related data
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        setProfile(profileData)
        // Set has_resume flag to true
        if (profileData && !profileData.has_resume) {
          await supabase.from('profiles').update({ has_resume: true }).eq('id', user.id)
        }
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div>Gerando seu currículo...</div>

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerador de Currículo</h1>
          <p className="text-muted-foreground">Visualize e exporte seu currículo otimizado.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline"><FileText className="h-4 w-4 mr-2" /> Editar Perfil</Button>
          <Button onClick={() => window.print()}><FileDown className="h-4 w-4 mr-2" /> Exportar PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modelos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">Profissional Clássico</Button>
              <Button variant="ghost" className="w-full justify-start">Moderno Clean</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dicas do Assistente</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Seu resumo profissional está muito curto. Currículos analisados por recrutadores se destacam quando o resumo destaca realizações principais.
            </CardContent>
          </Card>
        </div>

        {/* CV Preview - A4 aspect ratio approximation */}
        <div className="md:col-span-3 border bg-white rounded-lg shadow-lg p-10 min-h-[1100px] text-black">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-tight">{profile?.full_name || "Seu Nome Completo"}</h1>
            <p className="text-xl text-gray-600 mt-2">{profile?.title || "Seu Título Profissional"}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
              {profile?.email && <span>{profile.email}</span>}
              {profile?.phone && <span>{profile.phone}</span>}
              {profile?.location && <span>{profile.location}</span>}
              {profile?.linkedin_url && <span>LinkedIn</span>}
              {profile?.github_url && <span>GitHub</span>}
            </div>
          </div>

          {/* Resumo */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b pb-1 mb-3">Resumo Profissional</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {profile?.bio || "Escreva um resumo cativante sobre as suas principais habilidades, o seu objetivo e como você pode contribuir para as empresas."}
            </p>
          </div>

          {/* Experiências */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b pb-1 mb-3">Experiência Profissional</h2>
            <div className="text-gray-500 italic mt-2">Você ainda não adicionou experiências. Volte ao seu perfil para preencher.</div>
          </div>

          {/* Formação */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b pb-1 mb-3">Formação Acadêmica</h2>
            <div className="text-gray-500 italic mt-2">Você ainda não adicionou formações.</div>
          </div>

          {/* Habilidades */}
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b pb-1 mb-3">Habilidades</h2>
            <div className="text-gray-500 italic mt-2">Você ainda não adicionou habilidades (Skills).</div>
          </div>
        </div>
      </div>
    </div>
  )
}
