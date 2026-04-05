"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, ArrowLeft, Loader2, Sparkles, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { UpgradeModal } from "@/components/shared/upgrade-modal"
import { getUserQuotaStatus } from "@/lib/security/quota"

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
  
  // Quota & Modal States
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [quotaStatus, setQuotaStatus] = useState<any>(null)
  const [quotaMessage, setQuotaMessage] = useState("")

  const fetchQuota = async (userId: string) => {
    try {
      const res = await fetch('/api/user/quota?feature=cv_ats_total')
      if (res.ok) {
        const data = await res.json()
        setQuotaStatus(data)
      }
    } catch (e) { console.error("Quota fetch failed") }
  }

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

        if (profileRes.data) setProfile(profileRes.data)
        if (expRes.data) setExperiences(expRes.data)
        if (eduRes.data) setEducations(eduRes.data)
        if (skillRes.data) setSkills(skillRes.data)
        
        // Load initial quota status
        await fetchQuota(user.id)
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
      
      if (res.status === 429) {
        const errData = await res.json()
        setQuotaMessage(errData.message || "Você atingiu seu limite de otimizações de IA.")
        setUpgradeModalOpen(true)
        setOptimizing(false)
        return
      }

      const data = await res.json()
      if (data.error) throw new Error(data.error)
      
      setOptimizedData(data)
      
      // Update quota after success
      const { data: { user } } = await supabase.auth.getUser()
      if (user) await fetchQuota(user.id)
      
    } catch (err) {
      console.error(err)
    } finally {
      setOptimizing(false)
    }
  }

  const handleExportPDF = async () => {
    setExporting(true)
    try {
      // Ensure the element is rendered and accessible
      const element = document.getElementById('cv-preview')
      if (!element) {
        console.error("CV Preview element not found")
        return
      }

      // Dynamic import to keep bundle size small
      const html2pdf = (await import('html2pdf.js')).default
      
      const fileName = `Curriculo_${profile?.full_name?.replace(/\s+/g, '_') || 'NextStep'}.pdf`
      
      const opt = {
        margin: [0, 0, 0, 0],
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, // 2x is plenty for a crisp PDF and more stable than 3x
          useCORS: true, 
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      }

      // Execute PDF generation and download
      await (html2pdf() as any).from(element).set(opt).save()
      console.log("PDF Exported Successfully")
      
    } catch (error) {
      console.error("PDF Export Error:", error)
      // Fallback only if download fails
      alert("Houve um pequeno erro ao gerar o download direto. Abrindo assistente de impressão...")
      window.print()
    } finally {
      setExporting(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <p className="text-muted-foreground animate-pulse font-black uppercase text-xs tracking-widest text-white">Sintonizando seu Sucesso...</p>
    </div>
  )

  const activeProfile = optimizedData ? { ...profile, bio: optimizedData.optimized_summary } : profile
  const activeExperiences = optimizedData ? optimizedData.optimized_experiences : experiences

  const cvAtsStatus = quotaStatus?.status?.cv_ats_total

  return (
    <div className="space-y-8 print:m-0 print:p-0 pb-20 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Motor de Carreira Ativo</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Gerador de CV Elite</h1>
          <p className="text-slate-400 text-sm font-bold opacity-80">Design minimalista e conteúdo estratégico para aprovação imediata.</p>
        </div>
        <div className="flex flex-wrap gap-3 relative z-10">
          <div className="hidden md:flex flex-col items-end justify-center mr-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status de IA</span>
             <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${cvAtsStatus?.remaining > 0 ? 'text-green-500' : 'text-primary'}`}>
                  {cvAtsStatus?.remaining || 0} Créditos Restantes
                </span>
             </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleOptimizeAI}
            disabled={optimizing}
            className="border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 font-black h-12 px-6 rounded-xl transition-all active:scale-95"
          >
            {optimizing ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Otimizando...</>
            ) : (
              <><Sparkles className="h-4 w-4 mr-2" /> Otimizar com IA</>
            )}
          </Button>
          <Button 
            onClick={handleExportPDF} 
            className="bg-primary hover:bg-blue-600 font-black h-12 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            disabled={exporting}
          >
            {exporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Sidebar Settings */}
        <div className="lg:col-span-3 space-y-6 no-print">
          <Card className="bg-slate-900 border-slate-800 rounded-3xl shadow-xl overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-slate-800">
              <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Templates Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <Button variant="secondary" className="w-full justify-between text-[11px] font-black h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl group px-4">
                <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" /> Harvard Elite
                </div>
                <ShieldCheck className="h-4 w-4" />
              </Button>
              
              <div className="relative group grayscale">
                <Button variant="ghost" disabled className="w-full justify-between text-[11px] font-black h-12 text-slate-500 border border-slate-800/50 rounded-xl px-4">
                  <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4" /> Moderno Creative
                  </div>
                  <Lock className="h-3 w-3" />
                </Button>
                <div className="absolute top-0 right-0 -mt-2 -mr-1 px-2 py-0.5 bg-primary text-[8px] font-black text-white rounded-full uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                   Premium
                </div>
              </div>

              <div className="relative group grayscale">
                <Button variant="ghost" disabled className="w-full justify-between text-[11px] font-black h-12 text-slate-500 border border-slate-800/50 rounded-xl px-4">
                  <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4" /> Minimalist ATS
                  </div>
                  <Lock className="h-3 w-3" />
                </Button>
                <div className="absolute top-0 right-0 -mt-2 -mr-1 px-2 py-0.5 bg-primary text-[8px] font-black text-white rounded-full uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                   Premium
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-800 rounded-3xl shadow-xl p-2">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                 <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Dicas de Especialista</h4>
                 <p className="text-[12px] text-slate-300 font-bold leading-relaxed">
                   O template **Harvard Elite** tem o maior índice de aprovação em sistemas ATS corporativos.
                 </p>
              </div>
              <div className="h-px bg-slate-800 w-full" />
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[11px] font-bold text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  Evite fotos ou ícones muito coloridos.
                </li>
                <li className="flex items-start gap-3 text-[11px] font-bold text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                  Mantenha as experiências em ordem cronológica inversa.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CV Preview Section */}
        <div className="lg:col-span-9 bg-slate-950 rounded-[2.5rem] p-4 md:p-8 border border-slate-800 shadow-inner">
          <div 
            id="cv-preview" 
            className="bg-white text-[#1a1a1a] p-12 md:p-20 shadow-2xl rounded-sm min-h-[1100px] print:shadow-none print:p-0 print:border-none w-full max-w-[800px] mx-auto select-none overflow-hidden ring-1 ring-slate-200"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            {/* CV content remains stable - focusing on Harvard style */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold uppercase tracking-tight leading-none mb-2 text-black border-transparent">
                {activeProfile?.full_name || "Seu Nome Completo"}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-3 text-[13px] font-medium text-gray-700">
                {activeProfile?.location && <span>{activeProfile.location}</span>}
                <span className="text-gray-400">|</span>
                <span>{activeProfile?.email || "seuemail@exemplo.com"}</span>
                {activeProfile?.phone && (
                   <><span className="text-gray-400">|</span><span>{activeProfile.phone}</span></>
                )}
                {activeProfile?.linkedin_url && (
                   <><span className="text-gray-400">|</span><span>LinkedIn</span></>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-[15px] font-bold uppercase border-b border-black pb-0.5 mb-2 leading-none">Resumo Profissional</h2>
              <p className="text-[12.5px] leading-relaxed text-justify italic">
                {activeProfile?.bio || "Use a Otimização de IA acima para gerar um resumo de alto impacto."}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-[15px] font-bold uppercase border-b border-black pb-0.5 mb-4 leading-none">Experiência Profissional</h2>
              <div className="space-y-6">
                {activeExperiences.length === 0 ? (
                  <p className="text-gray-400 italic text-xs">Nenhuma experiência adicionada.</p>
                ) : (
                  activeExperiences.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-[14px]">{exp.company}</span>
                        <span className="text-[12.5px] font-bold">{exp.start_date || "2023"} – {exp.end_date || "Presente"}</span>
                      </div>
                      <div className="flex justify-between items-baseline mb-2 italic text-[13px]">
                        <span>{exp.position}</span>
                        <span className="text-gray-600">{exp.location || "Luanda, AO"}</span>
                      </div>
                      <ul className="list-disc ml-5 space-y-1">
                        {exp.bullet_points ? (
                           exp.bullet_points.map((pt: string, pi: number) => (
                             <li key={pi} className="text-[12.5px] leading-snug pl-1">{pt}</li>
                           ))
                        ) : (
                          <li className="text-[12.5px] leading-snug pl-1">{exp.description}</li>
                        )}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education & Skills sections as before but polished */}
            <div className="mb-8">
              <h2 className="text-[15px] font-bold uppercase border-b border-black pb-0.5 mb-4 leading-none">Educação e Formação</h2>
              <div className="space-y-3">
                {educations.length === 0 ? (
                   <p className="text-gray-400 italic text-xs">Aguardando dados...</p>
                ) : (
                  educations.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                      <div className="text-[13px]">
                        <span className="font-bold">{edu.institution}</span>, {edu.course}
                      </div>
                      <span className="text-[12.5px] italic">{edu.degree || "Licenciatura"}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-[15px] font-bold uppercase border-b border-black pb-0.5 mb-3 leading-none">Habilidades e Linguagens</h2>
              <div className="grid grid-cols-1 gap-1 text-[12.5px]">
                {optimizedData?.skill_groups ? (
                   optimizedData.skill_groups.map((group: any, i: number) => (
                    <div key={i}><span className="font-bold">{group.category}:</span> {group.skills.join(', ')}</div>
                   ))
                ) : (
                  <div><span className="font-bold">Habilidades:</span> {skills.map(s => s.name).join(', ') || "A preencher"}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal 
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        description={quotaMessage}
      />

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print\:block { display: block !important; }
          #cv-preview { 
            width: 100% !important; 
            max-width: none !important; 
            box-shadow: none !important;
            padding: 0 !important;
            ring: 0 !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}
