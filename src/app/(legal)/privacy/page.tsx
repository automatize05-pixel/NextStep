import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar para o Início
          </Button>
        </Link>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-black mb-4">Política de Privacidade</h1>
        <p className="text-slate-700 mb-8 italic font-medium">Última atualização: 25 de Março de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">1. Introdução</h2>
            <p className="text-slate-900 text-lg leading-relaxed">O NextStep ("nós", "nosso") está comprometido em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações de acordo com a <strong>Lei da Proteção de Dados de Angola (Lei n.º 22/11)</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">2. Informações que Coletamos</h2>
            <p className="text-slate-900 text-lg leading-relaxed">Coletamos informações que você nos fornece diretamente ao criar uma conta, preencher seu perfil profissional ou gerar currículos, incluindo:</p>
            <ul className="list-disc pl-6 space-y-3 text-slate-900 text-lg font-medium">
              <li>Dados de identidade (nome, título profissional, localização).</li>
              <li>Dados de contato (e-mail).</li>
              <li>Histórico profissional e educacional.</li>
              <li>Dados de uso das ferramentas de IA e pesquisas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">3. Uso da Inteligência Artificial</h2>
            <p className="text-slate-900 text-lg leading-relaxed font-medium">Utilizamos Inteligência Artificial para analisar seu perfil e fornecer recomendações de carreira e simulações de entrevista. Seus dados são processados de forma segura e não são compartilhados com terceiros para fins publicitários sem o seu consentimento explícito.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">4. Seus Direitos</h2>
            <p className="text-slate-900 text-lg leading-relaxed">Como usuário, você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através das configurações do seu perfil no Dashboard.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-3">5. Contacto</h2>
            <p className="text-slate-900 text-lg leading-relaxed">Para dúvidas sobre sua privacidade, entre em contacto com nossa equipe de suporte.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
