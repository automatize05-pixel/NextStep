export default function TermsPage() {
  return (
    <div className="animate-in fade-in duration-500 text-slate-100 bg-[#0B1120] min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">Central de Governança</p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">Termos de Uso</h1>
          <p className="text-slate-500 text-sm italic font-bold">Contrato de Utilização - Versão 3.0 (Abril 2026)</p>
        </div>

        <div className="space-y-20">
          <section>
            <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
              <p className="text-2xl font-black text-white leading-tight mb-6 tracking-tight">
                Boas-vindas ao NextStep! Este é um contrato vinculativo.
              </p>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Ao utilizar nossa plataforma, você concorda com 100% das cláusulas aqui descritas. O NextStep opera sob as leis da República de Angola e padrões globais de SaaS para aceleração de carreira.
              </p>
            </div>
          </section>

          <section id="payments">
            <h2 className="text-3xl font-black text-white mb-8 pb-4 border-b border-slate-800 flex items-center gap-4">
              <span className="p-3 bg-primary/10 rounded-2xl text-primary text-sm">16</span> Política de Pagamentos e Ativação
            </h2>
            <div className="space-y-8 bg-slate-900/20 p-8 rounded-[2rem] border border-slate-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-black text-white uppercase text-xs tracking-widest text-primary">A. Métodos e Referência</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Os pagamentos são processados via **Referência Multicaixa** (Entidade 10166) ou **Multicaixa Express**. É responsabilidade do utilizador garantir que o valor transferido corresponde exactamente ao plano seleccionado.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-black text-white uppercase text-xs tracking-widest text-primary">B. Comprovativo Obrigatório</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    A ativação do plano depende estritamente da submissão de um comprovativo legível em formato digital (JPG, PNG ou PDF) através da nossa zona de checkout segura.
                  </p>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-800/50 space-y-6">
                <h3 className="font-black text-white uppercase text-xs tracking-widest text-primary text-center">Protocolo de Ativação</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                      <p className="text-xl font-black text-white mb-1">24h</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Prazo de Verificação</p>
                   </div>
                   <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                      <p className="text-xl font-black text-white mb-1">Digital</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Entrega Imediata</p>
                   </div>
                   <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                      <p className="text-xl font-black text-white mb-1">Final</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sem Reembolsos IA</p>
                   </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed text-center font-medium px-10 italic">
                  Dado que os créditos de IA e acesso a conteúdos exclusivos são processados e consumidos imediatamente após a ativação, o NextStep não oferece reembolsos após a verificação do pagamento.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-white mb-6 pb-2 border-b border-slate-800">1. Natureza do Serviço e IA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-primary uppercase text-xs tracking-widest">Inteligência de Apoio</h3>
                <p className="text-slate-400 leading-relaxed font-medium">A IA do NextStep é um assistente qualitativo. Não garantimos contratações imediatas, mas fornecemos ferramentas de elite para aumentar suas chances exponencialmente.</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-primary uppercase text-xs tracking-widest">Web-Opportunity Search</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Nossa busca web é informativa. Verificamos a procedência, mas a candidatura final é de responsabilidade integral do usuário junto à empresa terceira.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-white mb-6 pb-2 border-b border-slate-800">2. Governança de Contas e Planos</h2>
            <div className="space-y-8">
              <div className="border border-slate-800 p-8 rounded-3xl bg-slate-900/20 shadow-sm">
                <h3 className="text-xl font-black mb-6 text-white">Níveis de Assinatura</h3>
                <div className="space-y-6">
                  <div className="flex border-b pb-4 border-slate-800/50 items-start gap-4">
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-500 mt-1">FREE</span>
                    <div>
                      <p className="font-bold text-white">Uso Exploratório</p>
                      <p className="text-sm text-slate-500">Limites diários para descoberta de ferramentas.</p>
                    </div>
                  </div>
                  <div className="flex border-b pb-4 border-slate-800/50 items-start gap-4">
                    <span className="px-2 py-1 bg-blue-900/30 rounded text-[10px] font-bold text-blue-400 mt-1 border border-blue-900/50">PRO</span>
                    <div>
                      <p className="font-bold text-white">Foco na Contratação</p>
                      <p className="text-sm text-slate-500">Acesso ampliado, suporte prioritário e exportação de CV.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="px-2 py-1 bg-yellow-900/30 rounded text-[10px] font-bold text-yellow-500 mt-1 border border-yellow-900/50">ELITE</span>
                    <div>
                      <p className="font-bold text-white">Nível VIP</p>
                      <p className="text-sm text-slate-500">IA Gerencial, Mentoria e Alertas Ilimitados.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-white">B. Obrigações do Usuário</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex gap-2 text-sm font-bold items-start text-slate-400">
                    <span className="text-rose-500">⚠</span> Proibido o uso de dados falsos no perfil.
                  </li>
                  <li className="flex gap-2 text-sm font-bold items-start text-slate-400">
                    <span className="text-rose-500">⚠</span> Proibido o login simultâneo abusivo.
                  </li>
                  <li className="flex gap-2 text-sm font-bold items-start text-slate-400">
                    <span className="text-rose-500">⚠</span> Proibida a extração automatizada de dados.
                  </li>
                  <li className="flex gap-2 text-sm font-bold items-start text-slate-400">
                    <span className="text-rose-500">⚠</span> Uso individual e intransmissível.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-white mb-6 pb-2 border-b border-slate-800">3. Propriedade Intelectual</h2>
            <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 shadow-xl">
              <p className="text-slate-400 text-lg leading-relaxed font-medium mb-8">
                Todos os algoritmos, design, marca e conteúdos do NextStep são propriedade intelectual exclusiva da <strong>Automatize Pixel / NextStep</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                 <span className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">© 2026 NEXTSTEP</span>
                 <span className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">MARCA REGISTRADA</span>
              </div>
            </div>
          </section>

          <footer className="pt-20 pb-10 border-t border-slate-800 text-center">
             <div className="w-16 h-[2px] bg-primary mx-auto mb-8 rounded-full" />
             <p className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-600">NextStep Platform Governance Module</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
