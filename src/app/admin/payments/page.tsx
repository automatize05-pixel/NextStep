import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Crown, ExternalLink } from "lucide-react"
import { approvePayment, rejectPayment } from "./actions"

export const dynamic = 'force-dynamic'

export default async function AdminPaymentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'automatize05@gmail.com') redirect('/')

  const [{ data: pending }, { data: approved }, { data: rejected }] = await Promise.all([
    supabase.from('subscriptions').select('*, profiles(full_name, email:id)').eq('status', 'pending').order('created_at', { ascending: false }),
    supabase.from('subscriptions').select('*, profiles(full_name)').eq('status', 'approved').order('updated_at', { ascending: false }).limit(10),
    supabase.from('subscriptions').select('*, profiles(full_name)').eq('status', 'rejected').order('updated_at', { ascending: false }).limit(10),
  ])

  const planBadge: Record<string, string> = {
    essential: 'bg-blue-100 text-blue-700',
    premium: 'bg-purple-100 text-purple-700',
    elite: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900">💳 Gestão de Pagamentos</h1>
        <p className="text-slate-500 mt-1">Aprovar ou rejeitar comprovativos de pagamento dos utilizadores.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pendentes', count: pending?.length || 0, color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: <Clock className="h-5 w-5" /> },
          { label: 'Aprovados', count: approved?.length || 0, color: 'text-green-600 bg-green-50 border-green-200', icon: <CheckCircle2 className="h-5 w-5" /> },
          { label: 'Rejeitados', count: rejected?.length || 0, color: 'text-red-600 bg-red-50 border-red-200', icon: <XCircle className="h-5 w-5" /> },
        ].map(s => (
          <div key={s.label} className={`p-6 rounded-2xl border ${s.color} flex items-center gap-4`}>
            {s.icon}
            <div>
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-sm font-bold opacity-70">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-600" /> Pagamentos Pendentes ({pending?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!pending?.length ? (
            <p className="text-slate-400 py-8 text-center italic">Nenhum pagamento pendente.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((sub: any) => (
                <div key={sub.id} className="p-6 border rounded-2xl bg-yellow-50/30 border-yellow-200 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-black capitalize ${planBadge[sub.plan_type] || 'bg-slate-100 text-slate-600'}`}>
                          <Crown className="h-3 w-3 inline mr-1" />{sub.plan_type}
                        </div>
                        <span className="text-sm font-black text-slate-900">{sub.amount_kz?.toLocaleString('pt-AO')} Kz</span>
                      </div>
                      <p className="text-sm text-slate-600 font-bold">Utilizador ID: <span className="font-mono text-xs text-slate-400">{sub.user_id}</span></p>
                      <p className="text-xs text-slate-400">{new Date(sub.created_at).toLocaleString('pt-AO')}</p>
                      {sub.notes && <p className="text-xs italic text-slate-500 bg-slate-100 p-2 rounded-lg mt-2">{sub.notes}</p>}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {sub.receipt_url && (
                        <a href={sub.receipt_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl text-sm font-bold text-slate-700 hover:border-primary hover:text-primary transition-all">
                          <ExternalLink className="h-4 w-4" /> Ver Comprovativo
                        </a>
                      )}
                      <div className="flex gap-2">
                        <form action={approvePayment}>
                          <input type="hidden" name="subscriptionId" value={sub.id} />
                          <input type="hidden" name="userId" value={sub.user_id} />
                          <input type="hidden" name="planType" value={sub.plan_type} />
                          <button type="submit" className="px-5 py-2.5 bg-green-600 text-white text-sm font-black rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" /> Aprovar
                          </button>
                        </form>
                        <form action={rejectPayment}>
                          <input type="hidden" name="subscriptionId" value={sub.id} />
                          <button type="submit" className="px-5 py-2.5 bg-red-500 text-white text-sm font-black rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2">
                            <XCircle className="h-4 w-4" /> Rejeitar
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Approved */}
      {approved && approved.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-green-700"><CheckCircle2 className="h-5 w-5" /> Últimos Aprovados</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-xs font-black uppercase text-slate-400"><th className="text-left py-2">User ID</th><th className="text-left py-2">Plano</th><th className="text-left py-2">Valor</th><th className="text-left py-2">Data</th></tr></thead>
                <tbody>
                  {approved.map((s: any) => (
                    <tr key={s.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 font-mono text-xs text-slate-500 truncate max-w-[160px]">{s.user_id}</td>
                      <td><span className={`px-2 py-0.5 rounded-full text-xs font-black capitalize ${planBadge[s.plan_type] || ''}`}>{s.plan_type}</span></td>
                      <td className="font-black text-green-700">{s.amount_kz?.toLocaleString('pt-AO')} Kz</td>
                      <td className="text-slate-400 text-xs">{new Date(s.updated_at || s.created_at).toLocaleDateString('pt-AO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
