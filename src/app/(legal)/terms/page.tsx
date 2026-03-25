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
        
        <h1 className="text-4xl font-extrabold tracking-tight text-black mb-4">Termos de Serviço</h1>
        <p className="text-slate-700 mb-8 italic font-medium">Última atualização: 25 de Março de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. Aceitação dos Termos</h2>
            <p className="text-slate-900 text-lg leading-relaxed">Ao acessar e usar o NextStep, você concorda em cumprir e ser regido por estes Termos de Serviço.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Descrição do Serviço</h2>
            <p className="text-slate-900 text-lg leading-relaxed font-medium">O NextStep fornece ferramentas de criação de currículos, simulação de entrevistas com IA e busca de oportunidades profissionais. Alguns serviços possuem limites de uso diário nas contas gratuitas e acesso ilimitado em planos pagos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Pagamentos e Assinaturas</h2>
            <p className="text-slate-900 text-lg leading-relaxed">As assinaturas (Essencial, Premium e Elite) são faturadas em Kwanzas (Kz). O acesso aos recursos pagos é liberado após a confirmação do pagamento. Cancelamentos podem ser feitos a qualquer momento, perdendo o acesso aos recursos premium ao final do período pago.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Uso Responsável da IA</h2>
            <p className="text-slate-900 text-lg leading-relaxed font-medium">A IA do NextStep é uma ferramenta de auxílio. Não garantimos contratações ou resultados específicos em processos seletivos. O usuário é responsável pela veracidade das informações inseridas em seu currículo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Jurisdição</h2>
            <p className="text-slate-900 text-lg leading-relaxed">Estes termos são regidos pelas leis da República de Angola.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
