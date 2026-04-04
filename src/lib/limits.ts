export type PlanType = 'free' | 'primeiro_passo' | 'preparacao_pro' | 'aceleracao' | 'elite_vip';

interface PlanLimits {
  ai_test_daily: number;        // Teste inicial do IA (3/dia no grátis)
  interview_sim_total: number;  // Simulações de entrevista (1 no Primeiro Passo)
  cv_builder_type: 'basic' | 'pro_ats';
  whatsapp_alerts: boolean;
  job_matching_daily: number;
  scholarships_search: number;
}

export const NEXTSTEP_PLANS: Record<PlanType, PlanLimits> = {
  free: {
    ai_test_daily: 3,
    interview_sim_total: 0,
    cv_builder_type: 'basic',
    whatsapp_alerts: false,
    job_matching_daily: 2,
    scholarships_search: 3,
  },
  primeiro_passo: {
    ai_test_daily: 10,
    interview_sim_total: 1,
    cv_builder_type: 'basic',
    whatsapp_alerts: false,
    job_matching_daily: 5,
    scholarships_search: 5,
  },
  preparacao_pro: {
    ai_test_daily: 30,
    interview_sim_total: 999, // "Até estares pronto"
    cv_builder_type: 'pro_ats',
    whatsapp_alerts: false,
    job_matching_daily: 20,
    scholarships_search: 20,
  },
  aceleracao: {
    ai_test_daily: 999, // Ilimitado
    interview_sim_total: 999,
    cv_builder_type: 'pro_ats',
    whatsapp_alerts: false,
    job_matching_daily: 999,
    scholarships_search: 999,
  },
  elite_vip: {
    ai_test_daily: 999,
    interview_sim_total: 999,
    cv_builder_type: 'pro_ats',
    whatsapp_alerts: true,
    job_matching_daily: 999,
    scholarships_search: 999,
  }
};
