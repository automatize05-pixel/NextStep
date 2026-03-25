export default function TermsPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Central Jurídica</p>
        <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight mb-2">Termos de Uso</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Contrato de Utilização - Versão 2.4 (Março 2026)</p>
      </div>

      <div className="max-none space-y-16 text-[#171717]">
        <section>
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
            <p className="text-2xl font-black text-[#0f172a] leading-tight mb-4 tracking-tight">
              Boas-vindas ao NextStep! Este é um contrato vinculativo.
            </p>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">
              Ao utilizar nossa plataforma, você concorda com 100% das cláusulas aqui descritas. O NextStep opera sob as leis da República de Angola e padrões globais de SaaS.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">1. Natureza do Serviço e IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-primary">Inteligência de Apoio</h3>
              <p className="text-slate-700 leading-relaxed font-medium">A IA do NextStep é um assistente qualitativo. Não garantimos contratações imediatas, mas fornecemos ferramentas de elite para aumentar suas chances exponenciamente.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-primary">Web-Opportunity Search</h3>
              <p className="text-slate-700 leading-relaxed font-medium">Nossa busca web é informativa. Verificamos a procedência, mas a candidatura final é de responsabilidade integral do usuário junto à empresa terceira.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">2. Governança de Contas e Planos (100+ Regras de Uso)</h2>
          <div className="space-y-8">
            <div className="border border-slate-100 p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="text-xl font-black mb-4 text-slate-800">A. Níveis de Assinatura</h3>
              <div className="space-y-6">
                <div className="flex border-b pb-4 border-slate-50 items-start gap-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 mt-1">FREE</span>
                  <div>
                    <p className="font-bold">Uso Limitado</p>
                    <p className="text-sm text-slate-500">4 buscas/dia, 5 simulações/dia, 2 alertas WhatsApp.</p>
                  </div>
                </div>
                <div className="flex border-b pb-4 border-slate-50 items-start gap-4">
                  <span className="px-2 py-1 bg-blue-100 rounded text-[10px] font-bold text-blue-600 mt-1">PRO</span>
                  <div>
                    <p className="font-bold">Essencial e Premium (5.000 Kz - 15.000 Kz)</p>
                    <p className="text-sm text-slate-500">Acesso ampliado, suporte prioritário e exportação de CV ilimitada.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="px-2 py-1 bg-purple-100 rounded text-[10px] font-bold text-purple-600 mt-1">ELITE</span>
                  <div>
                    <p className="font-bold">Nível Corporativo (25.000 Kz)</p>
                    <p className="text-sm text-slate-500">IA de Video-Pitch, Mentoria direta e Alertas em Tempo Real Ilimitados.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-800">B. Obrigações do Usuário</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                <li className="flex gap-2 text-sm font-bold items-start text-slate-700">
                  <span className="text-red-500">⚠</span> Proibido o uso de dados falsos ou enganosos no perfil.
                </li>
                <li className="flex gap-2 text-sm font-bold items-start text-slate-700">
                  <span className="text-red-500">⚠</span> Proibido o login simultâneo em mais de 3 dispositivos.
                </li>
                <li className="flex gap-2 text-sm font-bold items-start text-slate-700">
                  <span className="text-red-500">⚠</span> Proibida a extração automatizada (scraping) de nossa plataforma.
                </li>
                <li className="flex gap-2 text-sm font-bold items-start text-slate-700">
                  <span className="text-red-500">⚠</span> Proibido o compartilhamento de conta com terceiros (uso individual).
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">3. Propriedade Intelectual</h2>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <p className="text-slate-800 text-lg leading-relaxed font-medium mb-6">
              Todos os algoritmos, design, marca e conteúdos educativos do NextStep são propriedade da <strong>Automatize Pixel / NextStep</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 leading-none flex items-center">© 2026 NEXTSTEP</span>
               <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 leading-none flex items-center">MARCA REGISTRADA</span>
               <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 leading-none flex items-center">PATENTE PENDENTE</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">4. Pagamentos e Reembolsos</h2>
          <p className="text-slate-800 text-lg leading-relaxed font-bold mb-4">
            Em Angola, os pagamentos seguem as normas do BNA e SIBS.
          </p>
          <ul className="space-y-4 text-[#475569] font-medium leading-relaxed">
            <li><strong>Cancelamentos:</strong> Podem ser feitos a qualquer momento. O serviço continua ativo até o final do período faturado.</li>
            <li><strong>Reembolsos:</strong> Avaliados caso a caso, em conformidade com a Lei de Defesa do Consumidor angolana.</li>
            <li><strong>Moeda:</strong> A moeda base é o Kwanza (Kz).</li>
          </ul>
        </section>

        <section className="pt-8 border-t">
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">5. Foro e Jurisdição</h2>
          <p className="text-slate-900 text-lg leading-relaxed font-black mb-10">
            Para dirimir quaisquer questões oriundas deste contrato, fica eleito o <strong>Foro da Comarca de Luanda, Angola</strong>, com renúncia expressa a qualquer outro.
          </p>
          <div className="p-10 border-4 border-slate-900 rounded-none bg-slate-50 flex items-center justify-center">
             <p className="text-center font-black text-xs uppercase tracking-[0.2em] text-slate-400">NextStep Strategic Platform Evolution 2026</p>
          </div>
        </section>
      </div>
    </div>
  )
}
