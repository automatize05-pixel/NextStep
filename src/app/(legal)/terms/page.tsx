import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar para o Início
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Termos de Serviço</h1>
        <p className="text-slate-500 mb-8 italic">Última atualização: 25 de Março de 2026</p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-800">1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar o NextStep, você concorda em cumprir e ser regido por estes Termos de Serviço.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800">2. Descrição do Serviço</h2>
            <p>O NextStep fornece ferramentas de criação de currículos, simulação de entrevistas com IA e busca de oportunidades profissionais. Alguns serviços possuem limites de uso diário nas contas gratuitas e acesso ilimitado em planos pagos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800">3. Pagamentos e Assinaturas</h2>
            <p>As assinaturas (Essencial, Premium e Elite) são faturadas em Kwanzas (Kz). O acesso aos recursos pagos é liberado após a confirmação do pagamento. Cancelamentos podem ser feitos a qualquer momento, perdendo o acesso aos recursos premium ao final do período pago.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800">4. Uso Responsável da IA</h2>
            <p>A IA do NextStep é uma ferramenta de auxílio. Não garantimos contratações ou resultados específicos em processos seletivos. O usuário é responsável pela veracidade das informações inseridas em seu currículo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800">5. Jurisdição</h2>
            <p>Estes termos são regidos pelas leis da República de Angola.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
