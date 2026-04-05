import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Crown, ExternalLink, User, Mail, Phone, Calendar, ArrowRight } from "lucide-react"
import { approvePayment, rejectPayment } from "./actions"

export const dynamic = 'force-dynamic'

export default async function AdminPaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'automatize05@gmail.com') redirect('/')

  const [{ data: pending }, { data: approved }, { data: rejected }] = await Promise.all([
    supabase.from('subscriptions').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
    supabase.from('subscriptions').select('*').eq('status', 'approved').order('updated_at', { ascending: false }).limit(10),
    supabase.from('subscriptions').select('*').eq('status', 'rejected').order('updated_at', { ascending: false }).limit(10),
  ])

  const planBadge: Record<string, string> = {
    starter: 'bg-green-100 text-green-700 border-green-200',
    essential: 'bg-blue-100 text-blue-700 border-blue-200',
    premium: 'bg-purple-100 text-purple-700 border-purple-200',
    elite: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10 px-6">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">💳 Pagamentos Reforçados</h1>
          <p className="text-slate-500 font-medium">Verificação inteligente de comprovativos e dados de clientes.</p>
        </div>
        <div className="flex gap-3">
            <a href="/admin/mfa">
              <Button variant="outline" className="h-10 px-4 rounded-xl border-blue-100 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2">
                 <ShieldCheck className="h-4 w-4" /> Ativar Proteção MFA
              </Button>
            </a>
            <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-400 flex items-center">
               Total Pendentes: <span className="ml-1 text-yellow-600">{pending?.length || 0}</span>
            </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Aguardando', count: pending?.length || 0, color: 'text-yellow-600 bg-yellow-50 border-yellow-100', icon: <Clock className="h-6 w-6" /> },
          { label: 'Confirmados', count: approved?.length || 0, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 className="h-6 w-6" /> },
          { label: 'Recusados', count: rejected?.length || 0, color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <XCircle className="h-6 w-6" /> },
        ].map(s => (
          <div key={s.label} className={`p-8 rounded-3xl border-2 ${s.color} flex items-center justify-between shadow-sm`}>
            <div>
              <p className="text-3xl font-black">{s.count}</p>
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mt-1">{s.label}</p>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl">
                {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Pending Payments - New Side-by-Side Verification */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <h2 className="text-xl font-black text-slate-900">Verificação Pendente</h2>
        </div>

        {!pending?.length ? (
          <div className="p-20 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-4">
                <CheckCircle2 className="h-8 w-8" />
             </div>
             <p className="text-slate-400 font-bold">Nenhum pagamento pendente para processar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {pending.map((sub: any) => (
              <Card key={sub.id} className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden group hover:scale-[1.01] transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                   {/* Left Component: Client Details */}
                   <div className="lg:col-span-5 p-10 space-y-8 border-r border-slate-50 bg-slate-50/30">
                      <div className="flex items-center justify-between">
                        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${planBadge[sub.plan_type] || 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                           <Crown className="h-3 w-3 inline-block -mt-1 mr-1.5" /> {sub.plan_type}
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{new Date(sub.created_at).toLocaleDateString('pt-AO')}</span>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                               <User className="h-3 w-3" /> Cliente
                            </label>
                            <p className="text-xl font-black text-slate-900">{sub.user_name || 'Usuário s/ Nome'}</p>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Mail className="h-3 w-3" /> Email
                               </label>
                               <p className="text-xs font-bold text-slate-600 truncate">{sub.user_email || '—'}</p>
                            </div>
                            <div className="space-y-1">
                               <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Phone className="h-3 w-3" /> Telefone
                               </label>
                               <p className="text-xs font-bold text-slate-600">{sub.user_phone || '—'}</p>
                            </div>
                         </div>

                         <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-3">
                            <div className="flex justify-between items-center text-sm">
                               <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Valor do Plano</span>
                               <span className="font-black text-slate-900">{sub.amount_kz?.toLocaleString('pt-AO')} Kz</span>
                            </div>
                            {sub.notes && (
                              <div className="pt-2 border-t border-slate-50">
                                 <p className="text-[10px] italic text-slate-400 font-medium">Obs: {sub.notes}</p>
                              </div>
                            )}
                         </div>
                      </div>
                   </div>

                   {/* Right Component: Receipt Preview & Actions */}
                   <div className="lg:col-span-7 p-10 flex flex-col justify-between space-y-8 bg-white relative">
                      <div className="space-y-4">
                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Comprovativo de Pagamento</h3>
                         
                         {sub.receipt_url ? (
                           <div className="group/receipt relative rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center min-h-[300px]">
                              {sub.receipt_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img src={sub.receipt_url} alt="Comprovativo" className="max-w-full max-h-[400px] object-contain group-hover/receipt:scale-105 transition-transform duration-700" />
                              ) : (
                                <div className="flex flex-col items-center gap-3">
                                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-xl">
                                      <ExternalLink className="h-8 w-8" />
                                   </div>
                                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Documento PDF / Outro</span>
                                </div>
                              )}
                              <a href={sub.receipt_url} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white hover:scale-110 transition-transform opacity-0 group-hover/receipt:opacity-100 duration-300">
                                 <ExternalLink className="h-5 w-5 text-[#002D5B]" />
                              </a>
                           </div>
                         ) : (
                           <div className="rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50 flex items-center justify-center min-h-[250px] italic text-slate-300 text-sm font-bold">
                              Nenhum comprovativo anexado
                           </div>
                         )}
                      </div>

                      <div className="flex gap-4 pt-6 border-t border-slate-50 lg:justify-end">
                         <form action={rejectPayment}>
                            <input type="hidden" name="subscriptionId" value={sub.id} />
                            <Button variant="ghost" type="submit" className="h-14 px-8 rounded-2xl bg-white border border-rose-100 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2">
                               <XCircle className="h-4 w-4" /> Rejeitar
                            </Button>
                         </form>
                         <form action={approvePayment}>
                            <input type="hidden" name="subscriptionId" value={sub.id} />
                            <input type="hidden" name="userId" value={sub.user_id} />
                            <input type="hidden" name="planType" value={sub.plan_type} />
                            <Button type="submit" className="h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-3">
                               <CheckCircle2 className="h-5 w-5" /> Confirmar Pagamento
                            </Button>
                         </form>
                      </div>
                   </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Historical Records Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Approved - Table view is fine for history */}
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
             <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Últimos Aprovados</span>
                   </div>
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                      <thead className="bg-slate-50/50">
                         <tr className="border-b border-slate-100 text-[9px] font-black uppercase text-slate-400">
                            <th className="text-left py-4 px-8">Cliente</th>
                            <th className="text-left py-4 px-6 md:table-cell hidden">Plano</th>
                            <th className="text-left py-4 px-6">Valor</th>
                            <th className="text-right py-4 px-8">Data</th>
                         </tr>
                      </thead>
                      <tbody>
                        {approved?.map((s: any) => (
                           <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                              <td className="py-4 px-8 font-bold text-slate-700 text-xs truncate max-w-[150px]">{s.user_name || s.user_id}</td>
                              <td className="py-4 px-6 md:table-cell hidden">
                                 <span className={`px-2 py-0.5 rounded-full text-[9px] font-black capitalize border ${planBadge[s.plan_type]}`}>{s.plan_type}</span>
                              </td>
                              <td className="py-4 px-6 font-black text-emerald-600 text-xs">{s.amount_kz?.toLocaleString('pt-AO')} Kz</td>
                              <td className="py-4 px-8 text-right text-slate-400 text-[10px] font-bold">{new Date(s.updated_at).toLocaleDateString()}</td>
                           </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>

          {/* Recent Rejected */}
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
             <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 rounded-lg text-rose-600"><XCircle className="h-4 w-4" /></div>
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Histórico Recusados</span>
                   </div>
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                      <thead className="bg-slate-50/50">
                         <tr className="border-b border-slate-100 text-[9px] font-black uppercase text-slate-400">
                            <th className="text-left py-4 px-8">Cliente</th>
                            <th className="text-left py-4 px-6">Valor</th>
                            <th className="text-right py-4 px-8">Motivo / Data</th>
                         </tr>
                      </thead>
                      <tbody>
                        {rejected?.map((s: any) => (
                           <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                              <td className="py-4 px-8 font-bold text-slate-700 text-xs">{s.user_name || s.user_id}</td>
                              <td className="py-4 px-6 font-black text-rose-500 text-xs">{s.amount_kz?.toLocaleString('pt-AO')} Kz</td>
                              <td className="py-4 px-8 text-right space-y-0.5">
                                 <p className="text-[10px] font-black text-slate-400">{new Date(s.updated_at).toLocaleDateString()}</p>
                                 <p className="text-[9px] italic text-slate-300 font-medium truncate max-w-[120px]">{s.notes || 'Sem observação'}</p>
                              </td>
                           </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>
      </div>
    </div>
  )
}
