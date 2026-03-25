export default function TermsPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Jurídico</p>
        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-2">Termos de Uso</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Última atualização: 25 de Março de 2026</p>
      </div>

      <div className="max-w-none">
        <div className="space-y-12 text-[#171717]">
          <section>
            <p className="text-xl font-black text-[#0f172a] mb-8 leading-snug">
              Boas-vindas ao NextStep! Estes termos regem seu acesso e uso da plataforma e fornecem informações sobre o serviço descrito abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Aceitação dos Termos</h2>
            <p className="text-[#1e293b] text-lg leading-relaxed font-medium">
              Ao acessar e usar o NextStep, você concorda em cumprir e ser regido por estes Termos de Serviço. Caso não concorde, por favor, não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. Descrição do Serviço</h2>
            <p className="text-[#1e293b] text-lg leading-relaxed font-bold capitalize-first">
              O NextStep é uma ferramenta profissional de alta performance que fornece geradores de currículos, simuladores de entrevistas via IA e busca ativa de vagas no mercado angolano. O acesso gratuito possui limites diários para garantir a estabilidade do sistema.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Pagamentos e Assinaturas</h2>
            <div className="p-6 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-4 shadow-sm">
              <p className="text-[#0f172a] text-lg leading-relaxed font-black">
                As assinaturas profissionais (Essencial, Premium e Elite) são faturadas em Kwanzas (Kz).
              </p>
              <p className="text-[#1e293b] text-base leading-relaxed font-medium">
                O acesso aos recursos pagos é liberado após a confirmação. O NextStep opera sob as leis comerciais da República de Angola.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Uso Responsável da IA</h2>
            <p className="text-[#1e293b] text-lg leading-relaxed italic font-black bg-slate-50 p-4 rounded-lg">
              Nossa Inteligência Artificial é um assistente estratégico. Não garantimos contratações imediatas, mas fornecemos as melhores trilhas e técnicas para que você se destaque. O usuário é o detentor integral da veracidade dos dados em seu CV.
            </p>
          </section>

          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-[#111827] mb-4">5. Jurisdição</h2>
            <p className="text-[#0f172a] text-lg leading-relaxed font-black">
              Estes termos são regidos e interpretados de acordo com a legislação vigente na República de Angola.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
