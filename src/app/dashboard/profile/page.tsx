"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  
  // Form State
  const [fullName, setFullName] = useState("")
  const [title, setTitle] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (data) {
          setProfile(data)
          setFullName(data.full_name || "")
          setTitle(data.title || "")
          setBio(data.bio || "")
          setLocation(data.location || "")
          setGithub(data.github_url || "")
          setLinkedin(data.linkedin_url || "")
        }
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  const handleSaveBasicInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase.from('profiles').update({
        full_name: fullName,
        title,
        bio,
        location,
        github_url: github,
        linkedin_url: linkedin
      }).eq('id', user.id)
      
      alert("Perfil atualizado com sucesso!")
    }
    setSaving(false)
  }

  if (loading) return <div>Carregando perfil...</div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações profissionais para gerar currículos melhores.</p>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Estes dados serão usados no cabeçalho do seu currículo.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveBasicInfo}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Completo</label>
                <Input value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Título Profissional</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Desenvolvedor Front-end Júnior" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Localização</label>
                <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: São Paulo, SP" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Resumo Profissional</label>
              <textarea 
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                value={bio} 
                onChange={e => setBio(e.target.value)}
                placeholder="Um breve resumo sobre você, suas habilidades e objetivos."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar Informações"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Placeholder for Experiences, Education, Skills */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Experiência Profissional</CardTitle>
              <Button variant="outline" size="sm">+ Adicionar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Nenhuma experiência cadastrada. Adicione suas experiências anteriores para enriquecer seu currículo.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Formação Acadêmica</CardTitle>
              <Button variant="outline" size="sm">+ Adicionar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Nenhuma formação cadastrada.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Habilidades</CardTitle>
              <Button variant="outline" size="sm">+ Adicionar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Adicione suas ferramentas, linguagens e soft skills aqui.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
