"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, CreditCard, BrainCircuit, RefreshCw, Smartphone } from "lucide-react"

// Recharts components will fail if not rendered defensively in Next.js Server Side, but since this is use client, we are good.
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscribers: 0,
    totalRevenue: 0,
    aiSearches: 0
  })

  const [revenueData, setRevenueData] = useState<any[]>([])
  const [featureUsageData, setFeatureUsageData] = useState<any[]>([])
  const [planTypesData, setPlanTypesData] = useState<any[]>([])

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient()
      
      // Fetch all profiles to calculate plan distribution and MRR
      const { data: profiles } = await supabase.from('profiles').select('plan')
      
      let uCount = 0
      let activeSubCount = 0
      let mrr = 0
      
      const planCounts: Record<string, number> = { free: 0, starter: 0, essential: 0, premium: 0, elite: 0 }
      const planPrices: Record<string, number> = {
        free: 0,
        starter: 1500,
        essential: 3500,
        premium: 8500,
        elite: 15000
      }
      
      const colorMap: Record<string, string> = {
        free: '#94a3b8',
        starter: '#22c55e',
        essential: '#3b82f6',
        premium: '#a855f7',
        elite: '#eab308'
      }

      if (profiles) {
        uCount = profiles.length
        profiles.forEach((p: { plan: string | null }) => {
           let planId = p.plan || 'free'
           // Some legacy users might have different string formats, safeguard it
           if (!planCounts[planId] && planCounts[planId] !== 0) planId = 'free'
           
           planCounts[planId] += 1
           
           if (planId !== 'free') {
             activeSubCount++
             mrr += planPrices[planId] || 0
           }
        })
      }
      
      const formattedPlanData = Object.keys(planCounts).filter(k => planCounts[k] > 0).map(k => ({
         name: k.toUpperCase(),
         value: planCounts[k],
         color: colorMap[k] || '#8884d8'
      }))
      
      setPlanTypesData(formattedPlanData)

      // Fetch user actions for AI usage
      const { data: actions } = await supabase.from('user_actions').select('action_type')
      let searches = 0
      const actionCounts: Record<string, number> = {}
      
      if (actions) {
         searches = actions.length
         actions.forEach((a: { action_type: string | null }) => {
            const t = a.action_type || 'unknown'
            actionCounts[t] = (actionCounts[t] || 0) + 1
         })
      }
      
      const formattedUsage = Object.keys(actionCounts).map(k => ({
         name: k.replace('_', ' ').toUpperCase(),
         count: actionCounts[k]
      }))
      setFeatureUsageData(formattedUsage)

      // Fetch REAL revenue history from payments_history via RPC
      const { data: paymentsData, error: paymentsError } = await supabase.rpc('get_payments_summary')
      
      if (paymentsData && paymentsData.length > 0) {
        // Real data from payments_history table
        setRevenueData(paymentsData.map((row: { month: string; total_revenue: number; total_count: number }) => ({
          name: row.month,
          revenue: row.total_revenue,
          count: row.total_count,
        })))
      } else {
        // Fallback: proportional estimate (only shows if payments_history table is still empty)
        setRevenueData([
          { name: 'Dez', revenue: mrr * 0.4 },
          { name: 'Jan', revenue: mrr * 0.6 },
          { name: 'Fev', revenue: mrr * 0.7 },
          { name: 'Mar', revenue: mrr * 0.8 },
          { name: 'Abr', revenue: mrr * 0.95 },
          { name: 'Hoje', revenue: mrr },
        ])
      }
      
      setStats({
        totalUsers: uCount,
        activeSubscribers: activeSubCount,
        totalRevenue: mrr,
        aiSearches: searches,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  if (loading) {
     return <div className="min-h-[500px] flex items-center justify-center animate-pulse"><RefreshCw className="w-10 h-10 animate-spin text-primary opacity-50" /></div>
  }

  return (
    <div className="space-y-8 pb-10 fade-in zoom-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Data Center C-Level</h1>
            <p className="text-muted-foreground font-bold text-sm">Monitorização em tempo real do ecossistema NextStep.</p>
         </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-xl hover:shadow-2xl transition-all rounded-[2rem]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Total de Utilizadores</p>
            <h3 className="text-3xl font-black text-foreground">{stats.totalUsers.toLocaleString()}</h3>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl hover:shadow-2xl transition-all rounded-[2rem]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+34%</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Ações IA Computadas</p>
            <h3 className="text-3xl font-black text-foreground">{stats.aiSearches.toLocaleString()}</h3>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl hover:shadow-2xl transition-all rounded-[2rem]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Assinantes Ativos</p>
            <h3 className="text-3xl font-black text-foreground">{stats.activeSubscribers.toLocaleString()}</h3>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl hover:shadow-2xl transition-all rounded-[2rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-background/50 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-primary/20">
                <Activity className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">MRR Estimada (Kz)</p>
            <h3 className="text-3xl font-black text-primary">{stats.totalRevenue.toLocaleString()}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts area */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <Card className="bg-card border-border shadow-xl rounded-[2rem]">
          <CardHeader>
            <CardTitle className="font-black">Crescimento de Assinaturas</CardTitle>
            <CardDescription className="font-bold">Evolução do faturamento nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-xl rounded-[2rem]">
          <CardHeader>
            <CardTitle className="font-black">Distribuição de Planos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[200px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {planTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '1rem', border: 'none', fontWeight: 900 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3">
               {planTypesData.map((plan) => (
                 <div key={plan.name} className="flex justify-between items-center bg-muted/30 p-2 rounded-xl">
                   <div className="flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></span>
                     <span className="text-xs font-black">{plan.name}</span>
                   </div>
                   <span className="text-xs font-bold text-muted-foreground">{plan.value.toLocaleString()}</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

       <Card className="bg-card border-border shadow-xl rounded-[2rem]">
          <CardHeader>
            <CardTitle className="font-black">Utilização das Inteligências Artificiais</CardTitle>
            <CardDescription className="font-bold">Comparação do consumo do processamento por produto.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureUsageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                  <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '1rem', border: 'none', fontWeight: 900 }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

    </div>
  )
}
