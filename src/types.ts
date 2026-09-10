export type EducationStage =
  | 'educacao_infantil'
  | 'anos_iniciais'
  | 'anos_finais'
  | 'ensino_medio';

export type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'critico_imediato';

export interface Student {
  id: string;
  anonymousCode: string; // e.g., "EST-2026-01" or initials
  fullNameOrInitials: string;
  age: number;
  educationStage: EducationStage;
  schoolGrade: string; // e.g., "3º Ano B", "1º Ano A"
  shift: 'manha' | 'tarde' | 'integral';
  status: 'em_observacao' | 'em_intervencao' | 'em_crise' | 'estavel';
  trustedAdults: string[]; // 2 adults of trust in school
  registeredAt: string;
  updatedAt: string;
  observationsSummary?: string;
}

export interface BehavioralIndicator {
  id: string;
  category:
    | 'ludico_criativo'
    | 'afetivo_emocional'
    | 'somatizacao'
    | 'falas_ideacao'
    | 'autolesao'
    | 'relacional_escolar';
  label: string;
  description: string;
  applicableStages: EducationStage[];
  riskWeight: number; // 1 (mild) to 4 (critical)
  isEarlyElementaryFocus?: boolean; // Flag for Anos Iniciais do Fundamental
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  evaluatedAt: string;
  evaluatorRole: 'psicologo_escolar' | 'orientador_pedagogico' | 'professor' | 'equipe_multidisciplinar';
  educationStage: EducationStage;
  selectedIndicators: string[]; // IDs of BehavioralIndicator
  playBehaviorNotes: string; // Crucial for Anos Iniciais
  drawingArtNotes: string; // Drawings, drawings with dark tones, death/isolated themes
  verbalQuotes: string[]; // Explicit or disguised phrases
  somatizations: string[]; // "dor de cabeça", "dor de barriga no recreio", etc.
  selfHarmObserved: string[];
  immediateRiskTriggers: string[];
  protectiveFactors: string[];
  riskLevel: RiskLevel;
  clinicalPedagogicalSummary: string;
  aiAssisted?: boolean;
}

export interface InterventionPlan {
  id: string;
  studentId: string;
  assessmentId?: string;
  createdAt: string;
  updatedAt: string;
  riskLevel: RiskLevel;
  
  // Eixo 1: Sala de Aula & Professores (Pedagógico)
  classroomStrategies: {
    adaptationPedagogical: string[];
    stressReduction: string[];
    welcomingRoutines: string[];
    whatToDoInCrisis: string;
  };

  // Eixo 2: Orientação Educacional & Psicologia Escolar (Socioemocional)
  psychologicalWelcoming: {
    dailyCheckInSchedule: string; // e.g. "Checagem de acolhimento matinal 10 min"
    safeSpaceProtocol: string;
    listeningContract: string;
    emotionalThermometer: boolean;
  };

  // Eixo 3: Plano de Proteção e Segurança no Ambiente Escolar
  schoolSafetyProtocol: {
    trustedAdultsInSchool: string[];
    bathroomAndRecessSupervision: string;
    removalOfRiskObjects: boolean;
    discreteCompanionPolicy: string;
  };

  // Eixo 4: Articulação com a Família
  familyGuide: {
    approachTone: string;
    talkingPoints: string[];
    homeSafetyChecklist: string[];
    meetingScheduledFor?: string;
  };

  // Eixo 5: Rede de Atenção Psicossocial (Intersetorialidade)
  intersectoralReferral: {
    urgency: 'imediata_samu' | 'urgente_caps_24h' | 'eletiva_ubs_cras' | 'monitoramento_interno';
    priorityDestination: string; // e.g., "CAPSi Esperança"
    confidentialReportReady: boolean;
    notifiedGuardianshipCouncil: boolean; // Conselho Tutelar (apenas se houver violação de direitos/negligência grave)
  };

  doList: string[];
  dontList: string[];
  evolutionNotes: Array<{
    date: string;
    author: string;
    note: string;
    statusEvolution: 'melhora' | 'estavel' | 'atencao_redobrada';
  }>;
}

export interface CrisisProtocolAction {
  step: number;
  title: string;
  actionText: string;
  whoActs: string;
  criticalWarning?: string;
}

export interface AppSettings {
  pinLockEnabled: boolean;
  pinCode: string;
  maskStudentNames: boolean; // Mode for public/shared displays
  capsiContact: string;
  conselhoTutelarContact: string;
  ubsContact: string;
  schoolNurseContact: string;
  directorPhone: string;
  themePreference: 'azul_amarelo_padrao' | 'azul_suave';
  lastBackupDate?: string;
}
