import { createClient } from "@/lib/supabase/server"
import { 
  User, 
  MapPin, 
  Target, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  ArrowLeft,
  Mail,
  Linkedin,
  Github,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch all user information in parallel
  const [
    { data: profile },
    { data: experiences },
    { data: education },
    { data: skills }
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).single(),
    supabase.from('experiences').select('*').eq('profile_id', id).order('created_at', { ascending: false }),
    supabase.from('education').select('*').eq('profile_id', id).order('created_at', { ascending: false }),
    supabase.from('skills').select('*').eq('profile_id', id).order('created_at', { ascending: false })
  ])

  if (!profile) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Navigation */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users" 
          className="p-3 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Detalhes do Usuário</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Gestão de Talentos NextStep</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden p-8 relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700 opacity-50" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] flex items-center justify-center font-black text-white text-4xl shadow-2xl shadow-primary/20 mb-6">
                {profile.full_name?.[0] || 'U'}
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-1">{profile.full_name || 'Usuário NS'}</h3>
              <p className="text-primary font-bold text-sm mb-6">{profile.title || 'Membro da Comunidade'}</p>
              
              <div className="w-full space-y-4 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{profile.location || 'Não informado'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <Target className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>{profile.field_of_interest || 'Geral'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <Calendar className="h-4 w-4 text-purple-500 shrink-0" />
                  <span>Desde {new Date(profile.created_at).toLocaleDateString('pt-AO')}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-xl hover:bg-primary transition-all shadow-lg">
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border border-white/5 rounded-full rotate-45 pointer-events-none" />
             <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Resumo Profissional
             </h4>
             <p className="text-slate-400 font-bold italic leading-relaxed text-sm relative z-10">
               {profile.bio || "Nenhum resumo profissional fornecido por este usuário."}
             </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experiences */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-10 relative overflow-hidden">
            <h3 className="text-xl font-black mb-10 flex items-center gap-3 text-slate-900">
               <Briefcase className="h-6 w-6 text-primary" />
               Experiência Profissional
            </h3>
            <div className="space-y-8 relative">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp: any, idx: number) => (
                  <div key={exp.id} className="relative pl-8 group">
                    {idx !== experiences.length - 1 && (
                      <div className="absolute left-[7px] top-10 bottom-[-32px] w-[2px] bg-slate-50 group-hover:bg-primary/20 transition-colors" />
                    )}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-primary bg-white z-10 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-primary transition-colors">{exp.position}</h4>
                      <p className="text-primary font-black text-xs uppercase tracking-wider mt-1">{exp.company}</p>
                      <p className="text-slate-500 font-bold text-sm mt-3 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 font-bold italic">Nenhuma experiência registrada.</p>
              )}
            </div>
          </section>

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8">
              <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-slate-900">
                 <GraduationCap className="h-6 w-6 text-purple-600" />
                 Formação
              </h3>
              <div className="space-y-6">
                {education && education.length > 0 ? (
                  education.map((edu: any) => (
                    <div key={edu.id} className="p-5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-purple-200 transition-all">
                      <h4 className="font-extrabold text-slate-900 text-sm">{edu.course}</h4>
                      <p className="text-purple-600 font-black text-[10px] uppercase tracking-wider mt-1">{edu.institution}</p>
                      {edu.degree && <p className="text-slate-500 font-bold text-[10px] mt-1 italic">{edu.degree}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 font-bold italic text-sm">Nenhuma formação registrada.</p>
                )}
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8">
              <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-slate-900">
                 <Award className="h-6 w-6 text-orange-500" />
                 Competências
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill: any) => (
                    <div key={skill.id} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full group hover:border-primary transition-all cursor-default">
                      <span className="text-slate-900 font-bold text-xs">{skill.name}</span>
                      <span className="ml-2 text-[10px] font-black uppercase text-slate-400 group-hover:text-primary transition-colors">{skill.level}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 font-bold italic text-sm">Nenhuma competência registrada.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
