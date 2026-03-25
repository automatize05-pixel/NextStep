export default function CommunityPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Engajamento Seguro</p>
        <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight mb-2">Diretrizes da Comunidade</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Código de Conduta - Versão 1.0 (Março 2026)</p>
      </div>

      <div className="max-w-none space-y-16">
        <section>
          <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
            <p className="text-2xl font-black text-[#0f172a] leading-tight mb-4 tracking-tight">
              Construindo o futuro de Angola juntos.
            </p>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">
              O NextStep é um espaço de crescimento. Para garantir que todos tenham a melhor experiência, estabelecemos estas diretrizes invioláveis.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">1. Respeito e Profissionalismo</h2>
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed font-bold">Respeite a jornada de cada um. Não permitimos:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
               <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-sm">Discurso de ódio ou discriminação.</li>
               <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-sm">Assédio ou bullying profissional.</li>
               <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-sm">Comentários depreciativos sobre instituições.</li>
               <li className="p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-sm">Divulgação de informações privadas (doxing).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">2. Autenticidade</h2>
          <p className="text-slate-800 text-lg leading-relaxed font-medium mb-6">
            A integridade é a base do sucesso. Esperamos que você seja 100% honesto sobre suas conquistas e habilidades. 
          </p>
          <div className="p-6 border-l-4 border-primary bg-slate-50 italic font-bold">
            "Sua reputação digital no NextStep é seu maior ativo. Proteja-a com a verdade."
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">3. Spam e Autopromoção</h2>
          <p className="text-slate-700 leading-relaxed">O NextStep não é um quadro de anúncios. Utilize as áreas designadas para networking e evite saturar outros usuários com mensagens não solicitadas.</p>
        </section>

        <section className="pt-8 border-t">
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">Compromisso Final</h2>
          <p className="text-slate-900 text-lg leading-relaxed font-black mb-10">
            A violação destas diretrizes pode resultar na suspensão imediata da conta, sem direito a reembolso para planos PRO/ELITE.
          </p>
        </section>
      </div>
    </div>
  )
}
