export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react"

export default async function MentorshipPage() {
  const supabase = await createClient()

  // Fetch users who are mentors
  const { data: mentors, error } = await supabase
    .from('profiles')
    .select('id, full_name, title, location, mentor_bio, mentor_hourly_rate, plan')
    .eq('is_mentor', true)
    .limit(20)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-heading flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" /> Rede de Mentores
          </h1>
          <p className="text-slate-500 text-base">Acelere a sua evolução conectando-se com especialistas e executivos em Angola.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 shadow-md font-bold px-6 h-11 shrink-0">
          Tornar-me Mentor
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {mentors && mentors.length > 0 ? mentors.map((mentor: any) => (
          <div key={mentor.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group">
            {/* Top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between mb-4">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-2xl text-primary shadow-inner border border-white">
                 {mentor.full_name?.charAt(0) || 'M'}
               </div>
               <Badge className="bg-green-50 text-green-600 border-green-200 font-black uppercase tracking-widest text-[9px] px-2 py-1">
                 {mentor.mentor_hourly_rate === 0 ? 'Mentoria Grátis' : `${mentor.mentor_hourly_rate} Kz / hr`}
               </Badge>
            </div>

            <div className="space-y-1 mb-4">
               <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                 {mentor.full_name} 
                 {mentor.plan === 'elite' && <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />}
               </h3>
               <p className="text-sm font-bold text-[#2563EB] flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{mentor.title}</p>
               {mentor.location && <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{mentor.location}</p>}
            </div>

            <p className="text-sm font-bold text-slate-500 line-clamp-3 mb-6 flex-1">
               {mentor.mentor_bio || 'Profissional experiente, disposto a partilhar conhecimento e orientar carreiras no mercado angolano.'}
            </p>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
               <Button className="flex-1 bg-slate-900 hover:bg-slate-800 font-black text-xs uppercase tracking-widest rounded-xl">Solicitar Reunião</Button>
               <Button variant="outline" className="w-12 shrink-0 rounded-xl text-slate-400 hover:text-[#2563EB] border-slate-200"><Star className="h-4 w-4" /></Button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 rounded-3xl">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-10 w-10 text-slate-300" />
             </div>
             <h3 className="font-black text-xl mb-2">A preparar os melhores</h3>
             <p className="text-slate-500 font-bold max-w-sm mx-auto">Estamos a verificar o perfil dos nossos primeiros mentores de Elite. Volte em breve.</p>
          </div>
        )}
      </div>
    </div>
  )
}
