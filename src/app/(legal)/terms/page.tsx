export default function TermsPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Jurídico</p>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Termos de Uso</h1>
        <p className="text-slate-500 text-sm italic font-medium">Última atualização: 25 de Março de 2026</p>
      </div>

      <div className="prose prose-slate max-w-none">
        <div className="space-y-12 text-slate-900">
          <section>
            <p className="text-xl font-bold text-slate-900 mb-8 leading-snug">
              Boas-vindas ao NextStep! Estes termos regem seu acesso e uso da plataforma e fornecem informações sobre o serviço descrito abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-slate-800 text-lg leading-relaxed">
              Ao acessar e usar o NextStep, você concorda em cumprir e ser regido por estes Termos de Serviço. Caso não concorde, por favor, não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-slate-800 text-lg leading-relaxed font-medium capitalize-first">
              O NextStep é uma ferramenta profissional de alta performance que fornece geradores de currículos, simuladores de entrevistas via IA e busca ativa de vagas no mercado angolano. O acesso gratuito possui limites diários para garantir a estabilidade do sistema.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Pagamentos e Assinaturas</h2>
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
              <p className="text-slate-800 text-lg leading-relaxed font-bold">
                As assinaturas profissionais (Essencial, Premium e Elite) são faturadas em Kwanzas (Kz).
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                O acesso aos recursos pagos é liberado após a confirmação. O NextStep opera sob as leis comerciais da República de Angola.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Uso Responsável da IA</h2>
            <p className="text-slate-800 text-lg leading-relaxed italic font-medium">
              Nossa Inteligência Artificial é um assistente estratégico. Não garantimos contratações imediatas, mas fornecemos as melhores trilhas e técnicas para que você se destaque. O usuário é o detentor integral da veracidade dos dados em seu CV.
            </p>
          </section>

          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Jurisdição</h2>
            <p className="text-slate-800 text-lg leading-relaxed font-bold">
              Estes termos são regidos e interpretados de acordo com a legislação vigente na República de Angola.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
