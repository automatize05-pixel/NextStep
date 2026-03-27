"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Loader2, Copy, CheckCircle2, Sparkles, Tag } from "lucide-react"

export default function LinkedinPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copiedField, setCopiedField] = useState("")
  const [profile, setProfile] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const [{ data: p }, { data: s }] = await Promise.all([
        supabase.from('profiles').select('full_name, title, bio').eq('id', user.id).single(),
        supabase.from('skills').select('name').eq('profile_id', user.id)
      ])
      setProfile(p)
      setSkills(s?.map((sk: any) => sk.name) || [])
    }
    load()
  }, [])

  const optimize = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/ai/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: profile?.title, bio: profile?.bio, skills, yearsExperience: 0 })
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message || data.error); return }
      setResult(data)
    } finally { setLoading(false) }
  }

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(""), 2000)
  }

  const CopyBtn = ({ text, field }: { text: string; field: string }) => (
    <button onClick={() => copyText(text, field)} className="text-slate-400 hover:text-primary transition-colors p-1 rounded">
      {copiedField === field ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
          <Linkedin className="h-8 w-8 text-[#0077B5]" /> LinkedIn IA Optimizer
        </h1>
        <p className="text-slate-500 mt-1">Otimize o seu perfil LinkedIn para ser encontrado por recrutadores em Angola e no mundo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Seu Perfil Atual</CardTitle><CardDescription>Dados extraídos automaticamente.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-slate-400">Título Atual</label>
              <p className="text-sm font-bold text-slate-900 mt-1">{profile?.title || <span className="italic text-slate-400">Não definido no perfil</span>}</p>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-400">Bio/Sobre</label>
              <p className="text-sm text-slate-600 mt-1 line-clamp-4">{profile?.bio || <span className="italic text-slate-400">Não definido no perfil</span>}</p>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-400">Skills ({skills.length})</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.slice(0, 8).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-xs rounded-md font-bold text-slate-600">{s}</span>
                ))}
                {skills.length === 0 && <p className="text-xs italic text-slate-400">Adicione skills no seu perfil.</p>}
              </div>
            </div>
            <Button className="w-full bg-[#0077B5] hover:bg-[#006097]" onClick={optimize} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />A otimizar...</> : <><Sparkles className="h-4 w-4 mr-2" />Otimizar com IA</>}
            </Button>
            {!profile?.title && <p className="text-xs text-amber-600 font-bold text-center">⚠️ Complete seu perfil para melhores resultados.</p>}
          </CardContent>
        </Card>

        {result && (
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-[#0077B5]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#0077B5]">Headline Otimizada</CardTitle>
                  <CopyBtn text={result.optimized_headline} field="headline" />
                </div>
              </CardHeader>
              <CardContent><p className="font-bold text-slate-800 text-lg">{result.optimized_headline}</p></CardContent>
            </Card>

            <Card className="border-[#0077B5]/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#0077B5]">Secção "Sobre" Otimizada</CardTitle>
                  <CopyBtn text={result.optimized_about} field="about" />
                </div>
              </CardHeader>
              <CardContent><pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{result.optimized_about}</pre></CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Tag className="h-4 w-4 text-primary" />Keywords Principais</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {result.top_keywords?.map((kw: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold">{kw}</span>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Skills a Adicionar</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {result.skills_to_add?.map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">{s}</span>
                  ))}
                </CardContent>
              </Card>
            </div>

            {result.tips && (
              <Card>
                <CardHeader><CardTitle className="text-base">💡 Dicas Estratégicas</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {result.tips.map((tip: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm text-slate-600 p-3 bg-slate-50 rounded-lg">
                      <span className="font-black text-primary">{i + 1}.</span>{tip}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
        {!result && !loading && (
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center space-y-4 text-slate-300 p-16">
              <Linkedin className="h-16 w-16 mx-auto" />
              <p className="font-black text-xl">Clique em "Otimizar com IA"</p>
              <p className="text-sm">para receber sugestões personalizadas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
