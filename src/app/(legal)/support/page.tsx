export default function SupportPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Ajuda e Suporte</p>
        <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight mb-2">Como podemos ajudar?</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Atendimento Prioritário - Disponível 24/7</p>
      </div>

      <div className="max-w-none space-y-16">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl">
              <h3 className="text-xl font-black mb-2 tracking-tight">Suporte via WhatsApp</h3>
              <p className="text-slate-400 text-sm mb-6">Resposta imediata para planos PRO e Elite.</p>
              <button className="w-full bg-primary py-3 rounded-full font-bold hover:bg-primary/90 transition-all">Abrir Whatsapp</button>
            </div>
            <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm">
              <h3 className="text-xl font-black mb-2 tracking-tight">E-mail Corporativo</h3>
              <p className="text-slate-500 text-sm mb-6">Para parcerias e questões institucionais.</p>
              <p className="font-mono text-primary font-bold">suporte@nextstep.ao</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-8 pb-2 border-b-2 border-slate-100">Perguntas Frequentes (FAQ)</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-black text-slate-800 mb-2">Como funciona a inteligência artificial?</h3>
              <p className="text-slate-600 font-medium">Nossa IA analisa seu perfil contra padrões globais de contratação e sugere melhorias específicas para o mercado angolano.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-black text-slate-800 mb-2">Posso baixar meu currículo em PDF no plano gratuito?</h3>
              <p className="text-slate-600 font-medium">Sim! No NextStep, o download do CV em PDF é gratuito para todos os usuários.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-black text-slate-800 mb-2">Como ativo o plano ELITE?</h3>
              <p className="text-slate-600 font-medium">Você pode ativar diretamente no Dashboard via transferência bancária ou pagamentos online integrados.</p>
            </div>
          </div>
        </section>

        <section className="pt-8 border-t text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Ainda tem dúvidas?</p>
            <h2 className="text-2xl font-black mb-8">Estamos aqui para o seu próximo passo.</h2>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-bold">
               Status do Sistema: Operacional
            </div>
        </section>
      </div>
    </div>
  )
}
