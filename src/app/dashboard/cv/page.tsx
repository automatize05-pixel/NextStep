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
  const [optimizing, setOptimizing] = useState(false)
  const [optimizedData, setOptimizedData] = useState<any>(null)
  
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const [profileRes, expRes, eduRes, skillRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('experiences').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('education').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('skills').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        ])

        if (profileRes.data) {
          setProfile(profileRes.data)
        }
        if (expRes.data) setExperiences(expRes.data)
        if (eduRes.data) setEducations(eduRes.data)
        if (skillRes.data) setSkills(skillRes.data)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const handleOptimizeAI = async () => {
    if (!profile) return
    setOptimizing(true)
    try {
      const res = await fetch('/api/ai/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, experiences, educations, skills })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setOptimizedData(data)
    } catch (err) {
      console.error(err)
      alert("Falha ao otimizar com IA. Verifique sua quota.")
    } finally {
      setOptimizing(false)
    }
  }

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
          scale: 3, 
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await (html2pdf() as any).from(element).set(opt).save()
    } catch (error) {
      console.error("PDF Export Error:", error)
      window.print()
    } finally {
      setExporting(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground animate-pulse font-black uppercase text-xs tracking-widest">A carregar o laboratório de CVs...</p>
    </div>
  )

  const activeProfile = optimizedData ? { ...profile, bio: optimizedData.optimized_summary } : profile
  const activeExperiences = optimizedData ? optimizedData.optimized_experiences : experiences

  return (
    <div className="space-y-8 print:m-0 print:p-0 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print bg-slate-900/50 p-6 rounded-2xl border border-white/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Pronto a Exportar</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Gerador de CV Elite</h1>
          <p className="text-slate-400 text-sm font-medium">Otimizado por IA para passar por qualquer processo de recrutamento.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={handleOptimizeAI}
            disabled={optimizing}
            className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 font-black"
          >
            {optimizing ? "A Otimizar..." : "Otimizar com IA ✨"}
          </Button>
          <Button 
            onClick={handleExportPDF} 
            className="bg-primary hover:bg-primary/90 font-black"
            disabled={exporting}
          >
            {exporting ? "A Gerar..." : "Exportar PDF de Elite"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Sidebar Settings */}
        <div className="lg:col-span-3 space-y-4 no-print">
          <Card className="bg-slate-900 border-white/5">
            <CardHeader className="pb-3 text-center border-b border-white/5">
              <CardTitle className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Estilo do Documento</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Button variant="secondary" className="w-full justify-start text-xs font-black h-9 bg-primary/10 text-primary border border-primary/20">
                <FileText className="h-4 w-4 mr-2" /> Harvard Elite (Ativo)
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold h-9 text-slate-500 cursor-not-allowed opacity-50">
                <FileText className="h-4 w-4 mr-2" /> Moderno Creative
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs font-bold h-9 text-slate-500 cursor-not-allowed opacity-50">
                <FileText className="h-4 w-4 mr-2" /> Minimalist ATS
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-800 shadow-xl mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase text-blue-400 tracking-[0.2em]">Guia de Impacto</CardTitle>
            </CardHeader>
            <CardContent className="text-[12px] space-y-4 text-white font-bold">
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
                <span className="text-blue-500 font-black">✓</span> 
                <p>O seu currículo segue agora o **Método STAR** de descrição.</p>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex gap-3">
                <span className="text-blue-500 font-black">✓</span> 
                <p>Cabeçalho desenhado para máxima legibilidade (ATS Friendly).</p>
              </div>
              {optimizedData?.recommendation && (
                <div className="p-2 bg-primary/10 border border-primary/20 rounded text-primary">
                   💡 {optimizedData.recommendation}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CV Real Preview - Elite Harvard Style */}
        <div className="lg:col-span-9">
          <div 
            id="cv-preview" 
            className="bg-white text-[#1a1a1a] p-12 md:p-16 shadow-2xl rounded-sm min-h-[1100px] print:shadow-none print:p-0 print:border-none w-full max-w-[800px] mx-auto select-none overflow-hidden"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {/* Header - Centered & Bold */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-tight leading-none mb-1 text-black">
                {activeProfile?.full_name || "Seu Nome Completo"}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-2 text-[12px] font-medium text-gray-700">
                {activeProfile?.location && <span>{activeProfile.location}</span>}
                <span className="text-gray-300">•</span>
                <span>{activeProfile?.email || "seuemail@exemplo.com"}</span>
                {activeProfile?.phone && (
                   <><span className="text-gray-300">•</span><span>{activeProfile.phone}</span></>
                )}
                {activeProfile?.linkedin_url && (
                   <><span className="text-gray-300">•</span><span>linkedin.com/in/{activeProfile.linkedin_url.split('/in/')[1] || "perfil"}</span></>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-[14px] font-bold uppercase border-b-2 border-black pb-0.5 mb-2 leading-none">Resumo Profissional</h2>
              <p className="text-[12px] leading-relaxed text-justify">
                {activeProfile?.bio || "Defina o seu perfil profissional para gerar um resumo de alto impacto."}
              </p>
            </div>

            {/* Work Experience */}
            <div className="mb-6">
              <h2 className="text-[14px] font-bold uppercase border-b-2 border-black pb-0.5 mb-3 leading-none">Experiência Profissional</h2>
              <div className="space-y-5">
                {activeExperiences.length === 0 ? (
                  <p className="text-gray-400 italic text-xs">Nenhuma experiência adicionada.</p>
                ) : (
                  activeExperiences.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-[13px]">{exp.company}</span>
                        <span className="text-[12px] italic">{exp.start_date || "2023"} – {exp.end_date || "Presente"}</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="italic text-[12px]">{exp.position}</span>
                        <span className="text-[11px] text-gray-500">{exp.location || "Luanda, AO"}</span>
                      </div>
                      <ul className="list-disc ml-4 space-y-1">
                        {exp.bullet_points ? (
                           exp.bullet_points.map((pt: string, pi: number) => (
                             <li key={pi} className="text-[12px] leading-snug pl-1">{pt}</li>
                           ))
                        ) : (
                          <li className="text-[12px] leading-snug pl-1 text-justify">{exp.description}</li>
                        )}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-[14px] font-bold uppercase border-b-2 border-black pb-0.5 mb-3 leading-none">Educação e Formação</h2>
              <div className="space-y-3">
                {educations.length === 0 ? (
                  <p className="text-gray-400 italic text-xs">Nenhuma formação registrada.</p>
                ) : (
                  educations.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-[13px]">{edu.institution}</span>
                        <span className="text-[12px] italic">Grau: {edu.degree || "Licenciatura"}</span>
                      </div>
                      <div className="flex justify-between items-baseline leading-tight">
                        <span className="text-[12px] italic">{edu.course}</span>
                        <span className="text-[11px] text-gray-500">Concluído em: 2022</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Skills - Grouped */}
            <div>
              <h2 className="text-[14px] font-bold uppercase border-b-2 border-black pb-0.5 mb-2 leading-none">Habilidades e Linguagens</h2>
              
              {optimizedData?.skill_groups ? (
                <div className="space-y-1">
                  {optimizedData.skill_groups.map((group: any, i: number) => (
                    <div key={i} className="text-[12px]">
                      <span className="font-bold mr-1">{group.category}:</span>
                      <span>{group.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[12px]">
                  <span className="font-bold mr-1">Técnicas:</span>
                  <span>{skills.map(s => s.name).join(', ') || "A registrar"}</span>
                </div>
              )}
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
          .print\:shadow-none { shadow: none !important; box-shadow: none !important; }
          .print\:border-none { border: none !important; }
          #cv-preview { 
            width: 100% !important; 
            max-width: none !important; 
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

