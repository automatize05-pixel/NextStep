export default function PrivacyPage() {
  return (
    <div className="animate-in fade-in duration-500 text-[#171717]">
      <div className="mb-10">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Central de Segurança</p>
        <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight mb-2">Política de Privacidade</h1>
        <p className="text-[#64748b] text-sm italic font-bold">Versão 5.0 - Última atualização: 25 de Março de 2026</p>
      </div>

      <div className="max-w-none space-y-16">
        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">1. Compromisso Global de Privacidade</h2>
          <p className="text-[#334155] text-lg leading-relaxed font-medium mb-4">
            Esta Política de Privacidade descreve como o NextStep protege sua privacidade e gere seus dados sob a <strong>Lei da Proteção de Dados de Angola (Lei n.º 22/11)</strong> e padrões internacionais de proteção (GDPR/APDP).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Transparência Total</h3>
              <p className="text-sm text-slate-600">Explicamos cada bit de dado que coletamos e por que precisamos dele para sua evolução.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Segurança de Elite</h3>
              <p className="text-sm text-slate-600">Criptografia de ponta a ponta para proteger seu histórico profissional e documentos.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">2. Mapeamento Exaustivo de Dados (100+ Pontos)</h2>
          <p className="text-[#334155] text-lg leading-relaxed mb-6 font-medium">Coletamos dados em quatro categorias principais para garantir o sucesso do seu matching profissional:</p>
          
          <div className="space-y-8">
            <div className="group">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">A</span>
                Dados de Identidade e Contacto
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 ml-10">
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Nome completo e apelidos profissionais</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Endereço de e-mail verificado</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Número de telefone (WhatsApp de alertas)</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Localização atual (Província/Município)</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Links de redes profissionais (LinkedIn/GitHub)</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Fotos de perfil (opcional/biométrico)</li>
              </ul>
            </div>

            <div className="group">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">B</span>
                Histórico e Trajetória Profissional
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 ml-10">
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Cronologia detalhada de experiências</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Habilidades técnicas e comportamentais</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Certificações e licenças profissionais</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Formação académica e instituições</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Portfólio de projetos e resultados</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Preferências salariais e benefícios</li>
              </ul>
            </div>

            <div className="group">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">C</span>
                Interações de IA e Performance
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 ml-10">
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Transcrições de simuladores de entrevista</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Pontuações de competências por IA</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Histórico de pesquisas de vagas web</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Feedback de evolução em trilhas</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Metadados de documentos gerados (PDF)</li>
                <li className="flex items-start gap-2 text-slate-700 text-sm font-bold">✓ Análise de gaps de mercado personalizada</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">3. Processamento de IA e Algoritmos</h2>
          <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <p className="text-[#0f172a] text-lg leading-relaxed font-bold mb-4 italic">
              Seus dados são o combustível para a sua evolução. Utilizamos processamento de linguagem natural (LLM) para:
            </p>
            <ul className="space-y-4 text-slate-800 font-medium list-disc pl-6">
              <li>Mapear suas habilidades contra 15.000+ perfis de mercado.</li>
              <li>Sugerir correções em tempo real no seu currículo.</li>
              <li>Prever quais empresas em Angola estão contratando perfis como o seu.</li>
              <li>Ajustar o nível de dificuldade dos simuladores de entrevista dinamicamente.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">4. Retenção e Segurança</h2>
          <div className="space-y-6">
            <p className="text-slate-700 text-lg leading-relaxed">
              Mantemos seus dados apenas pelo tempo necessário para cumprir os fins descritos. No NextStep, o "Direito ao Esquecimento" é real: se você deletar sua conta, seus dados são expurgados de nossos servidores de produção em até 30 dias.
            </p>
            <div className="bg-slate-900 text-white p-6 rounded-xl">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                🛡 Camadas de Proteção
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <li className="border border-slate-700 p-2 rounded">SSL/TLS 1.3</li>
                <li className="border border-slate-700 p-2 rounded">AES-256 Encryption</li>
                <li className="border border-slate-700 p-2 rounded">SOC-2 Compliance</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">6. Transferências Internacionais</h2>
          <p className="text-slate-700 leading-relaxed font-medium">
            O NextStep utiliza infraestruturas de nuvem globais para garantir alta disponibilidade. Seus dados podem ser processados em servidores localizados fora de Angola, garantindo sempre que o país de destino possua leis de proteção de dados equivalentes ou que existam cláusulas contratuais padrão aprovadas pela <strong>APD (Agência de Proteção de Dados)</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">7. Decisões Automatizadas</h2>
          <p className="text-slate-700 leading-relaxed font-medium">
            Utilizamos algoritmos para classificar sua compatibilidade com vagas. Você tem o direito de solicitar uma revisão humana de qualquer decisão automatizada que afete significativamente seu estatuto jurídico ou financeiro na plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">8. Cookies e Tecnologias de Rastreio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl">
              <p className="font-bold mb-1 italic">Essenciais</p>
              <p className="text-xs text-slate-500">Necessários para login e segurança da sessão.</p>
            </div>
            <div className="p-4 border rounded-xl">
              <p className="font-bold mb-1 italic">Performance</p>
              <p className="text-xs text-slate-500">Analisa como você usa a IA para melhorarmos o motor.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">9. Dados Biométricos e Audiovisuais</h2>
          <p className="text-slate-700 leading-relaxed">
            Ao utilizar o simulador de vídeo-entrevista (Planos Elite), processamos dados de voz e imagem unicamente para análise de oratória e feedback comportamental. Estes dados são criptografados e não são utilizados para identificação civil.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">10. Cronograma de Retenção</h2>
          <ul className="space-y-2 text-sm font-bold text-slate-600">
             <li>• Dados de Conta: Até 30 dias após exclusão.</li>
             <li>• Logs de Acesso: 1 ano (exigência legal).</li>
             <li>• Currículos Gerados: 6 meses após última interação.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">11. Privacidade de Menores</h2>
          <p className="text-slate-700 leading-relaxed">
            Nossos serviços são destinados a profissionais maiores de 18 anos. Não coletamos intencionalmente dados de menores sem consentimento parental explícito para programas de Jovem Aprendiz.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">12. Protocolo de Violação de Dados</h2>
          <p className="text-slate-700 leading-relaxed">
            Em caso de incidente de segurança, notificaremos os usuários afetados e a APD em até 72 horas após a confirmação da violação, descrevendo as medidas de mitigação tomadas.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">13. Uso de APIs de Terceiros</h2>
          <p className="text-slate-700 leading-relaxed font-bold">
             Integramos serviços da OpenAI, WhatsApp Business e Google Cloud. Cada provedor segue suas próprias políticas de segurança em conformidade com o NextStep.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">14. Segurança da Infraestrutura</h2>
          <p className="text-slate-700 leading-relaxed">
            Utilizamos firewalls de aplicação, monitoramento heurístico de ameaças e testes de intrusão trimestrais para garantir a integridade do seu plano de carreira.
          </p>
        </section>

        <section className="pt-8 border-t">
          <h2 className="text-3xl font-black text-[#111827] mb-6 pb-2 border-b-2 border-slate-100">15. Governança e Alterações</h2>
          <p className="text-slate-900 text-lg leading-relaxed font-black mb-10">
            Esta política pode ser alterada. Notificaremos sobre mudanças significativas via Dashboard. O uso continuado da plataforma implica na aceitação das novas diretrizes.
          </p>
          <div className="p-10 border-4 border-slate-900 rounded-none bg-slate-50 flex flex-col items-center justify-center gap-2">
             <p className="text-center font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Data Integrity Division</p>
             <p className="text-center font-black text-lg text-slate-900">NEXTSTEP ANGOLA</p>
          </div>
        </section>
      </div>
    </div>
  )
}
