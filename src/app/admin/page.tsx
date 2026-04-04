"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
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

  // Mock data for initial real-time chart (In production, replace with real RPC from Supabase)
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Fev', revenue: 9000 },
    { name: 'Mar', revenue: 20000 },
    { name: 'Abr', revenue: 27800 },
    { name: 'Mai', revenue: 18900 },
    { name: 'Jun', revenue: 35000 },
  ]

  const featureUsageData = [
    { name: 'Mock Interviews', count: 400 },
    { name: 'Job Hunter', count: 800 },
    { name: 'CV Otimization', count: 1200 },
    { name: 'Scholarship Scout', count: 250 },
  ]

  const planTypesData = [
    { name: 'Free', value: 5000, color: '#94a3b8' },
    { name: 'Aceleração', value: 800, color: '#3b82f6' },
    { name: 'Elite VIP', value: 300, color: '#10b981' },
  ]

  useEffect(() => {
    async function loadStats() {
      // Basic fetch to give real base stats without lagging the DB
      const supabase = createClient()
      
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      
      setStats({
        totalUsers: usersCount || 0,
        activeSubscribers: Math.floor((usersCount || 0) * 0.15), // Mock for visualization
        totalRevenue: Math.floor((usersCount || 0) * 12.5),
        aiSearches: Math.floor((usersCount || 0) * 4.3),
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
