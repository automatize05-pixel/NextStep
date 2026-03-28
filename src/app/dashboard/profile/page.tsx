"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Briefcase, GraduationCap, Award, Globe, Zap } from "lucide-react"

export default function ProfilePage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  
  // Basic Info State
  const [fullName, setFullName] = useState("")
  const [title, setTitle] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const [alertFrequency, setAlertFrequency] = useState("daily")

  // Lists State
  const [experiences, setExperiences] = useState<any[]>([])
  const [educations, setEducations] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])

  // Form Visibility
  const [showExpForm, setShowExpForm] = useState(false)
  const [showEduForm, setShowEduForm] = useState(false)
  const [showSkillForm, setShowSkillForm] = useState(false)

  // New Item States
  const [newExp, setNewExp] = useState({ company: "", position: "", description: "" })
  const [newEdu, setNewEdu] = useState({ institution: "", course: "", degree: "" })
  const [newSkill, setNewSkill] = useState({ name: "", level: "Intermediário", category: "technical" })

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Load Profile
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (profileData) {
          setProfile(profileData)
          setFullName(profileData.full_name || "")
          setTitle(profileData.title || "")
          setBio(profileData.bio || "")
          setLocation(profileData.location || "")
          setGithub(profileData.github_url || "")
          setLinkedin(profileData.linkedin_url || "")
          setWhatsapp(profileData.phone_number || "")
          setWhatsappEnabled(profileData.whatsapp_enabled || false)
          setAlertFrequency(profileData.alert_frequency || "daily")
        }

        // Load Related
        const [expRes, eduRes, skillRes] = await Promise.all([
          supabase.from('experiences').select('*').order('created_at', { ascending: false }),
          supabase.from('education').select('*').order('created_at', { ascending: false }),
          supabase.from('skills').select('*').order('created_at', { ascending: false }),
        ])

        if (expRes.data) setExperiences(expRes.data)
        if (eduRes.data) setEducations(eduRes.data)
        if (skillRes.data) setSkills(skillRes.data)
      }
      setLoading(false)
    }
    loadData()
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
        linkedin_url: linkedin,
        phone_number: whatsapp,
        whatsapp_enabled: whatsappEnabled,
        alert_frequency: alertFrequency
      }).eq('id', user.id)
      alert("Perfil atualizado!")
    }
    setSaving(false)
  }

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase.from('experiences').insert([{
        ...newExp,
        profile_id: user.id
      }]).select()
      
      if (data) {
        setExperiences([data[0], ...experiences])
        setNewExp({ company: "", position: "", description: "" })
        setShowExpForm(false)
      }
    }
  }

  const handleDeleteExperience = async (id: string) => {
    const { error } = await supabase.from('experiences').delete().eq('id', id)
    if (!error) setExperiences(experiences.filter(e => e.id !== id))
  }

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase.from('education').insert([{
        ...newEdu,
        profile_id: user.id
      }]).select()
      
      if (data) {
        setEducations([data[0], ...educations])
        setNewEdu({ institution: "", course: "", degree: "" })
        setShowEduForm(false)
      }
    }
  }

  const handleDeleteEducation = async (id: string) => {
    const { error } = await supabase.from('education').delete().eq('id', id)
    if (!error) setEducations(educations.filter(e => e.id !== id))
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase.from('skills').insert([{
        ...newSkill,
        profile_id: user.id
      }]).select()
      
      if (data) {
        setSkills([data[0], ...skills])
        setNewSkill({ name: "", level: "Intermediário", category: "technical" })
        setShowSkillForm(false)
      }
    }
  }

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (!error) setSkills(skills.filter(s => s.id !== id))
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Minha Jornada Profissional</h1>
          <p className="text-white text-lg font-bold max-w-2xl leading-relaxed opacity-100 italic">
            Mantenha seu perfil atualizado para que a IA possa guiar sua carreira e gerar currículos assertivos.
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
        <CardHeader className="border-b border-slate-800 bg-slate-900 p-8">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-white">
            <Award className="h-6 w-6 text-primary" />
            Informações Básicas
          </CardTitle>
          <CardDescription className="text-slate-200 font-bold text-base mt-2">Estes dados são o cartão de visita do seu currículo.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveBasicInfo}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Nome Completo</label>
                <Input value={fullName} onChange={e => setFullName(e.target.value)} required className="bg-slate-800 border-slate-700 text-white font-black h-12" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Título Profissional</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Desenvolvedor Front-end Júnior" className="bg-slate-800 border-slate-700 text-white font-black h-12" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Localização</label>
                <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Luanda, Angola" className="bg-slate-800 border-slate-700 text-white font-black h-12" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-white tracking-[0.2em]">LinkedIn URL</label>
                <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className="bg-slate-800 border-slate-700 text-white font-black h-12" />
              </div>
            </div>
            <div className="space-y-3 mt-6">
              <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Resumo Profissional / Bio</label>
              <textarea 
                className="flex w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white text-base font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[150px]"
                value={bio} 
                onChange={e => setBio(e.target.value)}
                placeholder="Conte quem você é, o que faz de melhor e quais seus objetivos."
              />
            </div>

            {/* WhatsApp Notifications Section */}
            <div className="mt-10 pt-10 border-t border-slate-800 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center">
                   <Globe className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">Alertas via WhatsApp</h3>
                  <p className="text-slate-400 text-sm font-bold">Receba vagas reais e dicas diretamente no seu telemóvel.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Telemóvel (WhatsApp)</label>
                  <Input 
                    value={whatsapp} 
                    onChange={e => setWhatsapp(e.target.value)} 
                    placeholder="Ex: +244 9..." 
                    className="bg-slate-800 border-slate-700 text-white font-black h-12" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-white tracking-[0.2em]">Frequência de Alertas</label>
                  <select 
                    value={alertFrequency} 
                    onChange={e => setAlertFrequency(e.target.value)} 
                    className="w-full h-12 border border-slate-700 rounded-xl px-4 text-sm bg-slate-800 text-white focus:outline-primary font-black appearance-none"
                  >
                    <option value="realtime">Tempo Real (Imediato)</option>
                    <option value="daily">Diário (Resumo)</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-2xl cursor-pointer hover:border-green-500/50 transition-all" onClick={() => setWhatsappEnabled(!whatsappEnabled)}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${whatsappEnabled ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                     <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-black text-white uppercase">Ativar Notificações</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-all ${whatsappEnabled ? 'bg-green-500' : 'bg-slate-700'}`}>
                  <div className={`h-4 w-4 bg-white rounded-full transition-all transform ${whatsappEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-950/50 border-t border-slate-800 p-6">
            <Button type="submit" disabled={saving} className="bg-primary hover:bg-blue-600 text-white font-black h-12 px-8 shadow-lg shadow-primary/20">
              {saving ? "Guardando..." : "Guardar Alterações"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Experiences Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Experiência Profissional</CardTitle>
                <CardDescription>Trabalhos, estágios e projetos relevantes.</CardDescription>
              </div>
            </div>
            {!showExpForm && (
              <Button onClick={() => setShowExpForm(true)} size="sm" variant="default" className="gap-1">
                <Plus className="h-4 w-4" /> Adicionar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {showExpForm && (
            <div className="mb-8 p-4 border rounded-xl bg-muted/30 animate-in slide-in-from-top duration-300">
              <form onSubmit={handleAddExperience} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Empresa" 
                    value={newExp.company} 
                    onChange={e => setNewExp({...newExp, company: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Cargo" 
                    value={newExp.position} 
                    onChange={e => setNewExp({...newExp, position: e.target.value})}
                    required 
                  />
                </div>
                <textarea 
                  placeholder="Descrição das suas responsabilidades e conquistas"
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={newExp.description} 
                  onChange={e => setNewExp({...newExp, description: e.target.value})}
                />
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowExpForm(false)}>Cancelar</Button>
                  <Button type="submit">Adicionar Experiência</Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {experiences.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">Nenhuma experiência registada.</p>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="flex items-start justify-between p-4 rounded-xl border hover:border-primary/30 transition-colors bg-card">
                  <div>
                    <h4 className="font-bold text-lg">{exp.position}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{exp.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Formação Acadêmica</CardTitle>
                <CardDescription>Seus estudos e certificações.</CardDescription>
              </div>
            </div>
            {!showEduForm && (
              <Button onClick={() => setShowEduForm(true)} size="sm" variant="default" className="gap-1">
                <Plus className="h-4 w-4" /> Adicionar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {showEduForm && (
            <div className="mb-8 p-4 border rounded-xl bg-muted/30">
              <form onSubmit={handleAddEducation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input 
                    placeholder="Instituição" 
                    value={newEdu.institution} 
                    onChange={e => setNewEdu({...newEdu, institution: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Curso" 
                    value={newEdu.course} 
                    onChange={e => setNewEdu({...newEdu, course: e.target.value})}
                    required 
                  />
                  <Input 
                    placeholder="Grau (Ex: Licenciatura)" 
                    value={newEdu.degree} 
                    onChange={e => setNewEdu({...newEdu, degree: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setShowEduForm(false)}>Cancelar</Button>
                  <Button type="submit">Adicionar Formação</Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {educations.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">Nenhuma formação registada.</p>
            ) : (
              educations.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between p-4 rounded-xl border hover:border-primary/30 bg-card">
                  <div>
                    <h4 className="font-bold">{edu.course}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution} • {edu.degree}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Competências e Habilidades</CardTitle>
                <CardDescription>Seus pontos fortes técnicos e interpessoais.</CardDescription>
              </div>
            </div>
            {!showSkillForm && (
              <Button onClick={() => setShowSkillForm(true)} size="sm" variant="default" className="gap-1">
                <Plus className="h-4 w-4" /> Adicionar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {showSkillForm && (
            <div className="mb-8 p-4 border rounded-xl bg-orange-50/20">
              <form onSubmit={handleAddSkill} className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px] space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nome da Habilidade</label>
                  <Input 
                    placeholder="Ex: React, Figma, Inglês..." 
                    value={newSkill.name} 
                    onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nível</label>
                  <select 
                    title="Nível de experiência"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={newSkill.level}
                    onChange={e => setNewSkill({...newSkill, level: e.target.value})}
                  >
                    <option>Iniciante</option>
                    <option>Intermediário</option>
                    <option>Avançado</option>
                    <option>Especialista</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => setShowSkillForm(false)}>Cancelar</Button>
                  <Button type="submit">Adicionar</Button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {skills.length === 0 ? (
              <p className="w-full text-center py-4 text-muted-foreground text-sm italic">Nenhuma habilidade adicionada ainda.</p>
            ) : (
              skills.map((skill) => (
                <div key={skill.id} className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border rounded-full shadow-sm hover:border-primary transition-all">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{skill.level}</span>
                  <button 
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

