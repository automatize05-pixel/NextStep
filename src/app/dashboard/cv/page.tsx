"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CVBuilderPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [experiences, setExperiences] = useState<any[]>([])
  const [educations, setEducations] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  
  const [exporting, setExporting] = useState(false)
  
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const [profileRes, expRes, eduRes, skillRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('experiences').select('*').order('created_at', { ascending: false }),
          supabase.from('education').select('*').order('created_at', { ascending: false }),
          supabase.from('skills').select('*').order('created_at', { ascending: false }),
        ])

        if (profileRes.data) {
          setProfile(profileRes.data)
          if (!profileRes.data.has_resume) {
            await supabase.from('profiles').update({ has_resume: true }).eq('id', user.id)
          }
        }
        if (expRes.data) setExperiences(expRes.data)
        if (eduRes.data) setEducations(eduRes.data)
        if (skillRes.data) setSkills(skillRes.data)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      const element = document.getElementById('cv-preview')
      if (!element) return

      // Dynamic import to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default
      
      const opt = {
        margin: 0,
        filename: `Curriculo_${profile?.full_name?.replace(/\s+/g, '_') || 'NextStep'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await (html2pdf() as any).from(element).set(opt).save()
    } catch (error) {
      console.error("PDF Export Error:", error)
      // Fallback to print if library fails
      window.print()
    } finally {
      setExporting(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground animate-pulse">Gerando seu currículo profissional...</p>
    </div>
  )

  return (
    <div className="space-y-8 print:m-0 print:p-0">
      <div className="flex items-center justify-between no-print">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Gerador de Currículo</h1>
          <p className="text-muted-foreground">Otimizado para ATS e recrutadores. Clique em exportar para salvar em PDF.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/profile">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Editar Perfil
            </Button>
          </Link>
          <Button 
            onClick={handleExportPDF} 
            className="bg-primary hover:bg-primary/90"
            disabled={exporting}
          >
            {exporting ? (
              <><span className="animate-spin mr-2">...</span> Gerando...</>
            ) : (
              <><FileDown className="h-4 w-4 mr-2" /> Exportar PDF</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 print:block">
        <div className="md:col-span-1 space-y-4 no-print">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Modelo Atual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start text-primary">
                <FileText className="h-4 w-4 mr-2" /> Profissional Clássico
              </Button>
              <Button variant="ghost" className="w-full justify-start disabled:opacity-50" disabled>
                Moderno Clean (Em breve)
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm">Feedback IA</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p>✅ Cabeçalho completo.</p>
              {experiences.length === 0 && <p className="text-orange-600 font-medium">⚠️ Adicione experiências para destacar seu perfil.</p>}
              {skills.length < 5 && <p className="text-blue-600">💡 Liste pelo menos 5 habilidades para melhor indexação.</p>}
            </CardContent>
          </Card>
        </div>

        {/* CV Preview Section */}
        <div className="md:col-span-3">
          <div 
            id="cv-preview" 
            className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm min-h-[1100px] font-serif print:shadow-none print:p-0 print:border-none w-full"
          >
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-8 mb-8">
              <h1 className="text-4xl font-bold uppercase tracking-[0.1em]">{profile?.full_name || "Seu Nome Completo"}</h1>
              <p className="text-xl text-gray-700 mt-2 font-medium tracking-wide">{profile?.title || "Seu Cargo / Área de Atuação"}</p>
              
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 text-sm text-gray-600 italic">
                {profile?.location && <span>{profile.location}</span>}
                {profile?.linkedin_url && <span>LinkedIn: {profile.linkedin_url.split('/in/')[1] || "perfil"}</span>}
                {profile?.github_url && <span>GitHub: {profile.github_url.split('.com/')[1] || "perfil"}</span>}
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-10">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-4">Resumo Profissional</h2>
              <p className="leading-relaxed text-gray-800 text-justify italic px-1">
                {profile?.bio || "Complete seu resumo no seu perfil para aparecer aqui."}
              </p>
            </div>

            {/* Experiences */}
            <div className="mb-10">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-4">Experiência Profissional</h2>
              <div className="space-y-6">
                {experiences.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">Nenhuma experiência registrada.</p>
                ) : (
                  experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-lg">{exp.company}</h3>
                        <span className="text-sm font-medium">{exp.position}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education */}
            <div className="mb-10">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-4">Formação Acadêmica</h2>
              <div className="space-y-4">
                {educations.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">Nenhuma formação registrada.</p>
                ) : (
                  educations.map((edu) => (
                    <div key={edu.id} className="flex justify-between">
                      <div>
                        <span className="font-bold">{edu.course}</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span>{edu.institution}</span>
                      </div>
                      <span className="text-sm italic">{edu.degree}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-4">Competências Técnicas e Habilidades</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8 px-2">
                {skills.length === 0 ? (
                  <p className="text-gray-400 italic text-sm col-span-full">Nenhuma habilidade listada.</p>
                ) : (
                  skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="font-bold">{skill.name}</span>
                      <span className="text-gray-500 text-[10px] uppercase">[{skill.level}]</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print\:block { display: block !important; }
          .print\:p-0 { padding: 0 !important; }
          .print\:m-0 { margin: 0 !important; }
          .print\:shadow-none { shadow: none !important; }
          .print\:border-none { border: none !important; }
        }
      `}</style>
    </div>
  )
}

