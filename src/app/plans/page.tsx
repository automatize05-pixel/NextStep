import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, Zap, Crown, Star, Lock } from "lucide-react"

export const dynamic = 'force-dynamic'

const PLANS = [
  {
    id: 'free',
    name: 'Explora',
    price: 0,
    icon: <Star className="h-6 w-6 text-slate-500" />,
    color: 'border-slate-200',
    badge: null,
    description: 'Senta e explora o futuro da tua carreira',
    features: [
      { text: 'Teste inicial de IA (3/dia)', included: true },
      { text: 'Busca básica de vagas (4/dia)', included: true },
      { text: 'Explorar oportunidades (3/dia)', included: true },
      { text: 'Criador de CV básico', included: true },
      { text: 'Gestor de Candidaturas', included: true },
      { text: 'Passar em entrevistas reais', included: false },
      { text: 'LinkedIn que vende o teu perfil', included: false },
      { text: 'CV que chama a atenção', included: false },
    ]
  },
  {
    id: 'starter',
    name: 'Primeiro Passo',
    price: 1500,
    icon: <Zap className="h-6 w-6 text-green-500" />,
    color: 'border-green-400/50',
    badge: 'ENTRADA',
    badgeColor: 'bg-green-600',
    description: 'Para quem quer começar a sério',
    features: [
      { text: 'Treina para a primeira entrevista (7/dia)', included: true },
      { text: 'Encontra 2x mais vagas (8/dia)', included: true },
      { text: 'Carta que abre portas (2/dia)', included: true },
      { text: 'Otimização de perfil básica', included: true },
      { text: 'Descobre o teu valor de mercado', included: true },
      { text: 'Análise de Soft Skills IA', included: true },
      { text: 'LinkedIn que vende o teu perfil', included: false },
    ]
  },
  {
    id: 'essential',
    name: 'Preparação Pro',
    price: 3500,
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    color: 'border-blue-400',
    badge: 'RECOMENDADO',
    badgeColor: 'bg-blue-600',
    description: 'Para quem precisa de um emprego agora',
    features: [
      { text: 'Treina até estares pronto (20/dia)', included: true },
      { text: 'Busca de vagas avançada (20/dia)', included: true },
      { text: 'Pesquisa Job Hunter PRO (15/dia)', included: true },
      { text: 'CV que obriga recrutadores a ligar', included: true },
      { text: 'LinkedIn Optimizer Profissional', included: true },
      { text: 'CV em Inglês para multinacionais', included: true },
      { text: 'Análise de Soft Skills Profunda', included: true },
    ]
  },
  {
    id: 'premium',
    name: 'Aceleração Total',
    price: 8500,
    icon: <Crown className="h-6 w-6 text-purple-600" />,
    color: 'border-purple-400',
    badge: 'MAIS RESULTADO',
    badgeColor: 'bg-purple-600',
    description: 'Acelera 3x o tempo de contratação',
    features: [
      { text: 'Treino ilimitado para entrevistas', included: true },
      { text: 'Pesquisas de vagas ilimitadas', included: true },
      { text: 'Job Hunter em 50 fontes/dia', included: true },
      { text: 'Cartas de impacto ilimitadas', included: true },
      { text: 'Portfólio Público Premium', included: true },
      { text: 'Alertas de vagas em tempo real', included: true },
      { text: 'Estratégia VIP de LinkedIn', included: true },
    ]
  },
  {
    id: 'elite',
    name: 'Elite VIP',
    price: 15000,
    icon: <Crown className="h-6 w-6 text-yellow-500" />,
    color: 'border-yellow-400',
    badge: 'LUXO & CARREIRA',
    badgeColor: 'bg-yellow-500',
    description: 'Para líderes e executivos de elite',
    features: [
      { text: 'Tudo do Aceleração, mais:', included: true },
      { text: 'Uso ILIMITADO de todas as IAs', included: true },
      { text: 'Alertas de Vagas por WhatsApp', included: true },
      { text: 'CV em PT, EN e FR', included: true },
      { text: 'Acesso VIP a mentores', included: true },
      { text: 'Badge Elite no Perfil Público', included: true },
      { text: 'Suporte Prioritário 24/7', included: true },
    ]
  }
]

export default async function PlansPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let currentPlan = 'free'
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
    currentPlan = profile?.plan || 'free'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-black mb-4">
            <Crown className="h-4 w-4" /> Planos & Preços
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Invista na Sua <span className="text-yellow-400">Carreira</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Escolha o plano que se adequa ao seu ritmo. Todos os planos incluem acesso imediato à plataforma.
          </p>
          <p className="text-slate-500 text-sm">Pagamento via transferência bancária (IBAN KWik). Aprovação em até 24h.</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map(plan => (
            <div key={plan.id} className={`relative flex flex-col rounded-2xl border-2 ${plan.color} bg-slate-900/80 backdrop-blur overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl duration-300`}>
              {plan.badge && (
                <div className={`absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-black text-white ${plan.badgeColor}`}>
                  {plan.badge}
                </div>
              )}
              <div className={`p-6 ${plan.badge ? 'pt-10' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-800 rounded-xl">{plan.icon}</div>
                  <div>
                    <h2 className="font-black text-white text-xl">{plan.name}</h2>
                    <p className="text-slate-400 text-xs">{plan.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  {plan.price === 0
                    ? <p className="text-3xl font-black text-white">Grátis</p>
                    : <div>
                        <span className="text-3xl font-black text-white">{plan.price.toLocaleString('pt-AO')} Kz</span>
                        <span className="text-slate-400 text-sm">/mês</span>
                      </div>
                  }
                </div>

                {currentPlan === plan.id ? (
                  <div className="w-full py-2.5 text-center text-sm font-black text-green-400 border border-green-500/30 bg-green-500/10 rounded-xl mb-6">
                    ✓ Plano Atual
                  </div>
                ) : plan.price === 0 ? (
                  user ? (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full mb-6 border-slate-600 text-slate-300 hover:text-white">Ir ao Dashboard</Button>
                    </Link>
                  ) : (
                    <Link href="/register">
                      <Button variant="outline" className="w-full mb-6 border-slate-600 text-slate-300 hover:text-white">Criar Conta Grátis</Button>
                    </Link>
                  )
                ) : (
                  <Link href={user ? `/checkout?plan=${plan.id}` : '/register'}>
                    <Button className={`w-full mb-6 font-black ${plan.id === 'premium' ? 'bg-purple-600 hover:bg-purple-700' : plan.id === 'elite' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-primary hover:bg-primary/90'}`}>
                      Contratar {plan.name}
                    </Button>
                  </Link>
                )}

                <div className="space-y-2.5">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      {feature.included
                        ? <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                        : <Lock className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                      }
                      <span className={`text-xs ${feature.included ? 'text-slate-300' : 'text-slate-600'}`}>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IBAN Payment Info */}
        <div className="mt-16 p-8 bg-slate-900/60 border border-slate-700 rounded-2xl text-center space-y-4">
          <h3 className="text-xl font-black text-white">💳 Como Funciona o Pagamento?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Após selecionar um plano, utilize a **Entidade 10116** e **Referência 947005277** para pagamento via Multicaixa, ou faça a transferência bancária para o **IBAN KWik** oficial. A activação é feita em até 24 horas úteis.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-6">
            {['1. Escolha o seu plano', '2. Pague por Referência ou IBAN', '3. Envie o comprovativo'].map((step, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700">
                <p className="text-white font-black text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        {user && (
          <div className="text-center mt-8">
            <Link href="/dashboard" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Voltar ao Dashboard</Link>
          </div>
        )}
      </div>
    </div>
  )
}
