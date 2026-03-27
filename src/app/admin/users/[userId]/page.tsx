import { createClient } from "@/lib/supabase/server"
import { 
  ArrowLeft, Mail, MapPin, Calendar, Shield, 
  TrendingUp, Briefcase, MessageSquare, Award,
  AlertTriangle, Trash2, Ban, CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

export default async function UserDetailsPage({ params }: { params: { userId: string } }) {
  const supabase = await createClient()
  const { userId } = params

  // Fetch user profile and subscription details
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !profile) return notFound()

  const stats = [
    { label: "Candidaturas", value: "0", icon: Briefcase, color: "text-blue-500" },
    { label: "Buscas IA", value: "0", icon: TrendingUp, color: "text-green-500" },
    { label: "Entrevistas", value: "0", icon: MessageSquare, color: "text-purple-500" },
    { label: "Cartas", value: "0", icon: Award, color: "text-orange-500" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-500">
      <Link href="/admin/users" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft className="h-4 w-4" /> Voltar à lista
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                {profile.full_name?.[0] || 'U'}
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{profile.full_name || 'Usuário Sem Nome'}</h1>
                <p className="text-primary font-bold text-lg">{profile.title || 'Sem título profissional'}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <Mail className="h-4 w-4" /> {profile.email || 'Sem email'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <MapPin className="h-4 w-4" /> {profile.location || 'Sem localização'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <Calendar className="h-4 w-4" /> Registrado em {new Date(profile.created_at).toLocaleDateString('pt-AO')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bio / Sobre</p>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    {profile.bio || "Este usuário ainda não preencheu a sua biografia."}
                  </p>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Interesse Principal</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-600 text-[10px] font-black uppercase tracking-widest italic">
                     <CheckCircle2 className="h-3 w-3" /> {profile.field_of_interest || "Geral / Tecnologia"}
                  </div>
               </div>
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-100">
               <Button className="w-full md:w-auto px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-primary transition-all shadow-lg">Ver Portfólio Público</Button>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl overflow-hidden group">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" /> Engajamento na Plataforma
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-slate-200 hover:bg-white transition-all text-center space-y-3">
                  <div className={`w-10 h-10 ${s.color} bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{s.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          {/* Plan Info */}
          <div className="bg-slate-900 border border-white/5 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full -mr-16 -mt-16" />
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 italic">
              <Award className="h-5 w-5 text-primary" /> Plano Actual
            </h3>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between mb-8 group-hover:border-primary/50 transition-colors">
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Nível</span>
               <Badge className="bg-primary text-black font-black uppercase text-[10px] px-4 py-1">Gratuito</Badge>
            </div>
            <div className="space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Alterar Plano (Manual)</p>
               <select className="w-full bg-slate-800 border border-white/10 rounded-xl h-12 px-4 text-xs font-bold outline-none focus:border-primary">
                  <option>Gratuito</option>
                  <option>Essencial</option>
                  <option>Premium</option>
                  <option>Elite</option>
               </select>
               <Button className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg">Actualizar Plano</Button>
            </div>
          </div>

          {/* Risk Zone */}
          <div className="bg-red-50/50 border border-red-100 p-8 rounded-[3rem] space-y-6 shadow-sm">
             <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
                <Shield className="h-4 w-4" /> Zona de Risco
             </div>
             <p className="text-xs text-red-800/60 font-medium leading-relaxed">Ações irreversíveis que afectam permanentemente o acesso deste usuário.</p>
             <div className="space-y-3">
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl h-12 font-black uppercase text-[10px] transition-all flex items-center gap-2">
                   <Ban className="h-3 w-3" /> Suspender Conta
                </Button>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl h-12 font-black uppercase text-[10px] transition-all flex items-center gap-2">
                   <Trash2 className="h-3 w-3" /> Apagar Utilizador
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
