export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Briefcase, GraduationCap, Star, Download, Globe, Crown, ExternalLink } from "lucide-react"

const PLAN_DISPLAY: Record<string, { label: string; color: string; icon: string }> = {
  free: { label: 'Membro', color: 'bg-slate-700 text-slate-300', icon: '◆' },
  essential: { label: 'Essencial', color: 'bg-blue-900 text-blue-300', icon: '⚡' },
  premium: { label: 'Premium', color: 'bg-purple-900 text-purple-300', icon: '👑' },
  elite: { label: 'Elite', color: 'bg-yellow-900 text-yellow-300', icon: '🏆' },
}

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const supabase = await createClient()
  const { username } = params

  // Fetch profile by username
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) notFound()

  // Fetch all public data
  const [{ data: experiences }, { data: education }, { data: skills }] = await Promise.all([
    supabase.from('experiences').select('*').eq('profile_id', profile.id).order('start_date', { ascending: false }),
    supabase.from('education').select('*').eq('profile_id', profile.id).order('start_year', { ascending: false }),
    supabase.from('skills').select('*').eq('profile_id', profile.id),
  ])

  const planInfo = PLAN_DISPLAY[profile.plan || 'free']

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Top Nav */}
      <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between backdrop-blur-xl bg-[#0B0F19]/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-white text-base">N</div>
          <span className="font-black text-xl tracking-tighter">Next<span className="text-[#2563EB] italic">Step</span></span>
        </Link>
        <Link href="/register" className="px-5 py-2 bg-[#2563EB] text-white text-xs font-black rounded-full uppercase tracking-wider hover:bg-blue-700 transition-colors">
          Criar Conta Grátis
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Profile Header */}
        <div className="p-8 bg-slate-900/60 border border-white/5 rounded-3xl backdrop-blur">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2563EB] to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/20">
                {profile.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className={`absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-black rounded-full ${planInfo.color}`}>
                {planInfo.icon} {planInfo.label}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-black tracking-tight">{profile.full_name || 'Utilizador NextStep'}</h1>
              {profile.title && <p className="text-[#2563EB] font-black text-lg mt-1">{profile.title}</p>}
              <div className="flex flex-wrap gap-4 mt-3">
                {profile.location && (
                  <span className="flex items-center gap-1.5 text-slate-400 text-sm font-bold"><MapPin className="h-4 w-4" />{profile.location}</span>
                )}
              </div>
              {profile.bio && (
                <p className="text-slate-400 font-bold text-sm leading-relaxed mt-4 max-w-2xl">{profile.bio}</p>
              )}
            </div>

            {/* CTA */}
            <div className="shrink-0 flex flex-col gap-3">
              <a href={`/api/cv/download?userId=${profile.id}`} target="_blank"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-xs font-black rounded-xl uppercase tracking-wider hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" /> Baixar CV
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                <Globe className="h-3 w-3" />
                <span>nextstep.app/u/{username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Star className="h-4 w-4" /> Competências
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: any) => (
                <span key={skill.id} className="px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-sm font-bold text-slate-300 hover:border-[#2563EB]/40 transition-all">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Experiência Profissional
            </h2>
            <div className="space-y-3">
              {experiences.map((exp: any) => (
                <div key={exp.id} className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-white text-lg">{exp.title}</h3>
                      <p className="text-[#2563EB] font-bold text-sm">{exp.company}</p>
                      {exp.location && <p className="text-slate-500 text-xs font-bold mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{exp.location}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-slate-400 text-xs font-bold">
                        {exp.start_date && new Date(exp.start_date).getFullYear()} — {exp.current ? 'Presente' : exp.end_date && new Date(exp.end_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-slate-400 text-sm font-bold mt-3 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Formação Académica
            </h2>
            <div className="space-y-3">
              {education.map((edu: any) => (
                <div key={edu.id} className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black text-white">{edu.degree}</h3>
                      <p className="text-purple-400 font-bold text-sm">{edu.institution}</p>
                      {edu.field_of_study && <p className="text-slate-500 text-xs font-bold mt-1">{edu.field_of_study}</p>}
                    </div>
                    <p className="text-slate-400 text-xs font-bold shrink-0">
                      {edu.start_year} — {edu.current ? 'A decorrer' : edu.end_year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <div className="p-8 bg-gradient-to-br from-[#2563EB]/20 to-purple-900/20 border border-[#2563EB]/20 rounded-3xl text-center space-y-4">
          <p className="text-slate-400 font-bold text-sm">Este perfil foi criado com</p>
          <Link href="/" className="inline-flex items-center gap-2 font-black text-xl">
            <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center text-white text-base">N</div>
            Next<span className="text-[#2563EB] italic">Step</span>
          </Link>
          <p className="text-slate-500 text-xs">A plataforma de carreira líder em Angola</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white text-xs font-black rounded-xl uppercase tracking-wider hover:bg-blue-700 transition-colors">
            Criar o Meu Portfólio Grátis <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </main>
    </div>
  )
}
