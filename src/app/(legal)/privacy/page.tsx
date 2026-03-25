export default function PrivacyPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Jurídico</p>
        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight mb-2">Política de Privacidade</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Última atualização: 25 de Março de 2026</p>
      </div>

      <div className="max-w-none">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Introdução</h2>
            <p className="text-[#334155] text-lg leading-relaxed font-medium">
              O NextStep ("nós", "nosso") está comprometido em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações de acordo com a <strong>Lei da Proteção de Dados de Angola (Lei n.º 22/11)</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. Informações que Coletamos</h2>
            <p className="text-[#334155] text-lg leading-relaxed mb-6 font-medium">
              Coletamos informações que você nos fornece diretamente ao criar uma conta, preencher seu perfil profissional ou gerar currículos:
            </p>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-3 text-[#1e293b] text-lg font-bold items-start">
                <span className="text-primary mt-1.5">•</span>
                <span>Dados de identidade (nome, título profissional, localização).</span>
              </li>
              <li className="flex gap-3 text-[#1e293b] text-lg font-bold items-start">
                <span className="text-primary mt-1.5">•</span>
                <span>Dados de contacto (e-mail verificado).</span>
              </li>
              <li className="flex gap-3 text-[#1e293b] text-lg font-bold items-start">
                <span className="text-primary mt-1.5">•</span>
                <span>Histórico profissional e educacional detalhado.</span>
              </li>
              <li className="flex gap-3 text-[#1e293b] text-lg font-bold items-start">
                <span className="text-primary mt-1.5">•</span>
                <span>Dados de uso das ferramentas de IA e pesquisas web.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Uso da Inteligência Artificial</h2>
            <div className="p-6 bg-slate-50 border-l-4 border-primary rounded-r-xl">
              <p className="text-[#0f172a] text-lg leading-relaxed font-black italic">
                Utilizamos Inteligência Artificial para analisar seu perfil e fornecer recomendações de carreira e simulações de entrevista. Seus dados são processados de forma segura e não são compartilhados com terceiros para fins publicitários.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Seus Direitos</h2>
            <p className="text-[#334155] text-lg leading-relaxed font-medium">
              Como usuário, você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através das configurações do seu perfil no Dashboard. Valorizamos a sua autonomia sobre seus dados sob a égide da legislação angolana.
            </p>
          </section>

          <section className="pt-8 border-t">
            <h2 className="text-2xl font-bold text-[#111827] mb-4">5. Contacto</h2>
            <p className="text-[#475569] text-lg leading-relaxed font-bold">
              Para dúvidas sobre sua privacidade, entre em contacto com nossa equipe de suporte através do portal oficial do NextStep.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
