export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, User, MapPin, Briefcase, Mail, Calendar, CreditCard, ShieldAlert, Award, TrendingUp, Cpu } from "lucide-react"

export default async function AdminUserDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch complete profile and subscription data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!profile) return notFound()

  // Fetch usage stats
  const { data: usage } = await supabase
    .from('user_usage')
    .select('*')
    .eq('user_id', id)
    .single()

  // Fetch job applications
  const { count: appsCount } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)

  // Fetch active subscriptions if any
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', id)
    .eq('status', 'active')
    .single()

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
           <ArrowLeft className="h-5 w-5 text-slate-500" />
        </Link>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Detalhes do Usuário</h2>
          <p className="text-slate-500 font-bold mt-1 text-sm">{profile.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center font-black text-white text-4xl shadow-xl shrink-0 border-4 border-white">
                {profile.full_name?.[0] || 'U'}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-900">{profile.full_name || 'Usuário NS'}</h3>
                  <p className="text-primary font-bold text-lg">{profile.title || 'Sem título profissional'}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
                    <Mail className="h-4 w-4 text-slate-400" /> {profile.email || 'Sem email'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
                    <MapPin className="h-4 w-4 text-slate-400" /> {profile.location || 'Sem localização'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
                    <Briefcase className="h-4 w-4 text-slate-400" /> {profile.field_of_interest || 'Geral'}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
                    <Calendar className="h-4 w-4 text-slate-400" /> Registrado em {new Date(profile.created_at).toLocaleDateString('pt-AO')}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
               <a href={`/u/${profile.username || id}`} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary transition-all shadow-md">
                 Ver Portfólio Público
               </a>
            </div>
          </div>

          {/* Platform Usage Stats */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
             <h3 className="text-xl font-black mb-6 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /> Engajamento na Plataforma</h3>
             
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-2xl font-black text-slate-900">{appsCount || 0}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Candidaturas</p>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                   <p className="text-2xl font-black text-blue-600">{usage?.ai_searches_used || 0}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Buscas IA (Hoje)</p>
                </div>
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                   <p className="text-2xl font-black text-purple-600">{usage?.interviews_used || 0}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Entrevistas (Hoje)</p>
                </div>
                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                   <p className="text-2xl font-black text-orange-600">{usage?.cover_letters_used || 0}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Cartas (Hoje)</p>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Plan Management */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0B0F19] text-white rounded-[2.5rem] p-8 shadow-xl border border-slate-800">
             <h3 className="text-xl font-black mb-6 flex items-center gap-2"><CrownIcon className="h-5 w-5 text-yellow-500" /> Plano Atual</h3>
             
             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-black uppercase tracking-widest text-slate-400">Nível</span>
                   <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest rounded-full">{profile.plan || 'Free'}</span>
                </div>
                {subscription && (
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-black uppercase tracking-widest text-slate-400">Expira em</span>
                     <span className="text-sm font-bold">{new Date(subscription.end_date).toLocaleDateString('pt-AO')}</span>
                  </div>
                )}
             </div>

             <form action="/api/admin/users/update-plan" method="POST" className="space-y-4">
                <input type="hidden" name="user_id" value={profile.id} />
                <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-slate-400">Alterar Plano (Manual)</label>
                   <select name="new_plan" className="w-full h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-sm font-bold outline-none focus:border-primary">
                     <option value="free" className="text-black">Free</option>
                     <option value="essential" className="text-black">Essential</option>
                     <option value="premium" className="text-black">Premium</option>
                     <option value="elite" className="text-black">Elite</option>
                   </select>
                </div>
                <button type="submit" className="w-full py-3 bg-primary hover:bg-blue-600 font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Atualizar Plano
                </button>
             </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 rounded-[2.5rem] border border-red-100 p-8">
             <h3 className="text-xl font-black text-red-900 mb-4 flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Zona de Risco</h3>
             <p className="text-sm font-bold text-red-700/80 mb-6">Ações irreversíveis que afetam permanentemente o acesso deste usuário.</p>
             
             <div className="space-y-3">
               <button className="w-full py-3 bg-white border border-red-200 text-red-600 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all">
                 Suspender Conta
               </button>
               <button className="w-full py-3 bg-red-600 px-4 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all opacity-50 cursor-not-allowed" title="Apenas via API do Supabase Auth no painel root.">
                 Apagar Utilizador
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CrownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  )
}
