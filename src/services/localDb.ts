import { Student, AssessmentRecord, InterventionPlan, AppSettings, RiskLevel } from '../types';

const DB_NAME = 'GuardiaoDaVida_LocalDB';
const DB_VERSION = 1;

// Default Application Settings
export const DEFAULT_SETTINGS: AppSettings = {
  pinLockEnabled: false,
  pinCode: '1234',
  maskStudentNames: false,
  capsiContact: '(11) 3256-0000 / capsi.infancia@saude.gov.br',
  conselhoTutelarContact: '(11) 3255-0000 / Plantão 24h',
  ubsContact: 'UBS Central / Referência da Região Escolar',
  schoolNurseContact: 'Setor de Acolhimento e Primeiros Socorros',
  directorPhone: 'Coordenação Pedagógica / Direção Geral',
  themePreference: 'azul_amarelo_padrao',
  lastBackupDate: undefined,
};

// Realistic initial pre-seeded students highlighting Anos Iniciais
export const SEED_STUDENTS: Student[] = [
  {
    id: 'std_demo_1',
    anonymousCode: 'ALUNO-AI-01',
    fullNameOrInitials: 'L. M. S. (Lucas)',
    age: 8,
    educationStage: 'anos_iniciais',
    schoolGrade: '3º Ano Fundamental I',
    shift: 'manha',
    status: 'em_intervencao',
    trustedAdults: ['Profª Marina (Regente)', 'Tia Cláudia (Inspetora de Pátio)'],
    registeredAt: '2026-03-01T09:00:00.000Z',
    updatedAt: '2026-03-08T14:30:00.000Z',
    observationsSummary: 'Anos Iniciais: Professor relatou desenhos mórbidos no caderno, choro imotivado e falas de querer "virar estrelinha" após queixas constantes de dor de barriga.',
  },
  {
    id: 'std_demo_2',
    anonymousCode: 'ALUNO-AI-02',
    fullNameOrInitials: 'B. R. T. (Beatriz)',
    age: 10,
    educationStage: 'anos_iniciais',
    schoolGrade: '5º Ano Fundamental I',
    shift: 'tarde',
    status: 'em_observacao',
    trustedAdults: ['Prof. André (Educação Física)', 'Orientadora Sandra'],
    registeredAt: '2026-03-04T11:00:00.000Z',
    updatedAt: '2026-03-09T10:15:00.000Z',
    observationsSummary: 'Anos Iniciais: Isolamento no recreio encostada no muro, marcas de unhas nos braços (autolesão infantil) e doação de estojo e brinquedos para colegas.',
  },
  {
    id: 'std_demo_3',
    anonymousCode: 'ALUNO-AF-03',
    fullNameOrInitials: 'G. O. V. (Gabriel)',
    age: 13,
    educationStage: 'anos_finais',
    schoolGrade: '8º Ano Fundamental II',
    shift: 'manha',
    status: 'em_crise',
    trustedAdults: ['Prof. Marcelo (História)', 'Coord. Regina'],
    registeredAt: '2026-03-07T08:00:00.000Z',
    updatedAt: '2026-03-10T11:45:00.000Z',
    observationsSummary: 'Anos Finais: Uso de casaco no calor intenso com cortes superficiais no antebraço, desânimo severo, vítima de cyberbullying na turma.',
  },
];

export const SEED_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'ass_demo_1',
    studentId: 'std_demo_1',
    evaluatedAt: '2026-03-01T10:00:00.000Z',
    evaluatorRole: 'psicologo_escolar',
    educationStage: 'anos_iniciais',
    selectedIndicators: [
      'ludico_brincadeira_morte',
      'grafico_desenhos_morbidos',
      'falas_virar_estrelinha',
      'somatizacao_dor_abdominal_cabeca',
      'afetivo_disforia_irritabilidade',
    ],
    playBehaviorNotes: 'Brincadeiras de massinha onde constrói túmulos repetidamente e esmaga bonequinhos dizendo que "ninguém pode salvá-los".',
    drawingArtNotes: 'Caderno de artes com figuras humanas sem braços pintadas totalmente de preto e garatujas com a frase "queria sumir".',
    verbalQuotes: ['Queria virar uma estrelinha lá no céu para descansar', 'Minha cabeça e minha barriga doem todo dia na entrada'],
    somatizations: ['Dores abdominais intensas no portão da escola', 'Cefaleia matinal frequente'],
    selfHarmObserved: [],
    immediateRiskTriggers: ['Separação conturbada dos pais recente com brigas verbais'],
    protectiveFactors: ['Vínculo afetuoso com a professora regente Marina', 'Gosto por cuidar da horta da escola'],
    riskLevel: 'alto',
    clinicalPedagogicalSummary: 'Quadro compatível com depressão infantil reativa com ideação de desaparecimento ("virar estrelinha"). Não há planejamento letal estruturado, mas a dor psíquica intensa e os equivalentes depressivos exigem acolhimento imediato, plano de segurança e articulação com a família.',
    aiAssisted: true,
  },
];

export const SEED_PLANS: InterventionPlan[] = [
  {
    id: 'plan_demo_1',
    studentId: 'std_demo_1',
    assessmentId: 'ass_demo_1',
    createdAt: '2026-03-01T11:30:00.000Z',
    updatedAt: '2026-03-08T15:00:00.000Z',
    riskLevel: 'alto',
    classroomStrategies: {
      adaptationPedagogical: [
        'Fracionamento de tarefas complexas em etapas menores com reforço positivo imediato.',
        'Permissão para ida ao "Espaço de Acolhimento / Cantinho da Calma" com cartão verde discreto quando sentir sobrecarga emocional.',
        'Atribuição de papel de destaque positivo: Ajudante oficial da horta da escola e responsável por regar as plantas.',
      ],
      stressReduction: [
        'Evitar correções com caneta vermelha chamativa em público; feedbacks sempre individuais e afetuosos.',
        'Previsibilidade de rotina: escrever a ordem das atividades do dia no canto do quadro para reduzir ansiedade.',
      ],
      welcomingRoutines: [
        'Saudação matinal calorosa e individual no portão de entrada.',
        'Uso do "Termômetro Emocional das Emoções" com carinhas na chegada para aferir o estado de ânimo.',
      ],
      whatToDoInCrisis: 'Em caso de choro convulsivo ou fala de desespero: conduzir com calma e sem alarde à sala da orientação, sem tocar bruscamente, oferecendo um copo de água e respiração guiada (cheirar a florzinha e assoprar a velinha).',
    },
    psychologicalWelcoming: {
      dailyCheckInSchedule: 'Acolhimento diário de 10 minutos às 07h50 pela orientadora Sandra antes do início da aula regular.',
      safeSpaceProtocol: 'Sala de Recursos/Orientação estruturada com almofadas, papéis para desenho livre e massinhas coloridas.',
      listeningContract: 'Pacto de escuta afetuosa e não julgadora: "Aqui você pode falar o que sente e não vamos brigar com você". Explicado com ternura que se houver risco de se machucar, os adultos de confiança serão avisados para protegê-lo.',
      emotionalThermometer: true,
    },
    schoolSafetyProtocol: {
      trustedAdultsInSchool: ['Profª Marina', 'Tia Cláudia (Inspetora)'],
      bathroomAndRecessSupervision: 'Ida ao banheiro sempre acompanhado de um colega tutor amigo; monitoramento visual discreto no recreio perto da horta.',
      removalOfRiskObjects: true,
      discreteCompanionPolicy: 'Nunca deixar a criança sozinha no pátio, corredores ou salas vazias.',
    },
    familyGuide: {
      approachTone: 'Acolhedor, empático, sem tom punitivo ou acusatório. Ressaltar que a escola ama a criança e deseja caminhar junto.',
      talkingPoints: [
        'Apresentar os sinais de sofrimento e as queixas físicas como pedidos de socorro emocional.',
        'Orientar que a fala de "virar estrelinha" não é frescura nem chantagem, mas manifestação de dor genuína da infância.',
        'Propor parceria de acolhimento e compromisso conjunto de proteção.',
      ],
      homeSafetyChecklist: [
        'Guardar medicamentos e produtos de limpeza em armários trancados no alto.',
        'Retirar tesouras pontiagudas e estiletes do alcance fácil da criança.',
        'Estabelecer momento de escuta diária de 15 minutos sem telas antes de dormir.',
      ],
      meetingScheduledFor: '2026-03-03T14:00:00.000Z',
    },
    intersectoralReferral: {
      urgency: 'urgente_caps_24h',
      priorityDestination: 'CAPSi Infantojuvenil da Região Central',
      confidentialReportReady: true,
      notifiedGuardianshipCouncil: false,
    },
    doList: [
      'Ouvir a criança com total paciência quando ela quiser falar.',
      'Validar o sentimento: "Eu entendo que você está triste, estou aqui com você".',
      'Manter a rotina estável e com previsibilidade.',
      'Manter contato diário e discreto entre professora e orientadora.',
    ],
    dontList: [
      'NUNCA dizer: "Você é muito novo para querer sumir, tem a vida toda pela frente".',
      'NUNCA prometer sigilo absoluto se a integridade física estiver em risco.',
      'NUNCA ralhar ou envergonhar a criança por chorar ou não conseguir fazer a lição.',
      'NUNCA ignorar desenhos escuros ou falas sobre a morte.',
    ],
    evolutionNotes: [
      {
        date: '2026-03-08T14:00:00.000Z',
        author: 'Orientadora Sandra',
        note: 'Família compareceu à reunião muito receptiva. Já agendaram acolhimento inicial no CAPSi na próxima terça-feira. Em sala, Lucas sorriu ao cuidar das mudas de alface da horta.',
        statusEvolution: 'melhora',
      },
    ],
  },
];

class LocalDatabase {
  private db: IDBDatabase | null = null;
  private isFallbackMode = false;

  async init(): Promise<void> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      this.isFallbackMode = true;
      this.seedFallbackStorage();
      return;
    }

    return new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          if (!db.objectStoreNames.contains('students')) {
            const studentStore = db.createObjectStore('students', { keyPath: 'id' });
            studentStore.createIndex('anonymousCode', 'anonymousCode', { unique: false });
            studentStore.createIndex('educationStage', 'educationStage', { unique: false });
          }

          if (!db.objectStoreNames.contains('assessments')) {
            const assStore = db.createObjectStore('assessments', { keyPath: 'id' });
            assStore.createIndex('studentId', 'studentId', { unique: false });
          }

          if (!db.objectStoreNames.contains('plans')) {
            const planStore = db.createObjectStore('plans', { keyPath: 'id' });
            planStore.createIndex('studentId', 'studentId', { unique: false });
          }

          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'id' });
          }
        };

        request.onsuccess = async (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          await this.ensureSeedData();
          resolve();
        };

        request.onerror = (err) => {
          console.warn('IndexedDB error, falling back to LocalStorage:', err);
          this.isFallbackMode = true;
          this.seedFallbackStorage();
          resolve();
        };
      } catch (err) {
        console.warn('Exception opening IndexedDB, falling back:', err);
        this.isFallbackMode = true;
        this.seedFallbackStorage();
        resolve();
      }
    });
  }

  private seedFallbackStorage() {
    if (!localStorage.getItem('gv_students')) {
      localStorage.setItem('gv_students', JSON.stringify(SEED_STUDENTS));
    }
    if (!localStorage.getItem('gv_assessments')) {
      localStorage.setItem('gv_assessments', JSON.stringify(SEED_ASSESSMENTS));
    }
    if (!localStorage.getItem('gv_plans')) {
      localStorage.setItem('gv_plans', JSON.stringify(SEED_PLANS));
    }
    if (!localStorage.getItem('gv_settings')) {
      localStorage.setItem('gv_settings', JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  private async ensureSeedData(): Promise<void> {
    const students = await this.getStudents();
    if (students.length === 0) {
      for (const s of SEED_STUDENTS) {
        await this.saveStudent(s);
      }
      for (const a of SEED_ASSESSMENTS) {
        await this.saveAssessment(a);
      }
      for (const p of SEED_PLANS) {
        await this.savePlan(p);
      }
      await this.saveSettings(DEFAULT_SETTINGS);
    }
  }

  // --- STUDENTS ---
  async getStudents(): Promise<Student[]> {
    if (this.isFallbackMode || !this.db) {
      const data = localStorage.getItem('gv_students');
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('students', 'readonly');
      const store = tx.objectStore('students');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getStudentById(id: string): Promise<Student | null> {
    const students = await this.getStudents();
    return students.find((s) => s.id === id) || null;
  }

  async saveStudent(student: Student): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      const students = await this.getStudents();
      const index = students.findIndex((s) => s.id === student.id);
      if (index >= 0) {
        students[index] = student;
      } else {
        students.unshift(student);
      }
      localStorage.setItem('gv_students', JSON.stringify(students));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('students', 'readwrite');
      const store = tx.objectStore('students');
      const request = store.put(student);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteStudent(id: string): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      const students = (await this.getStudents()).filter((s) => s.id !== id);
      localStorage.setItem('gv_students', JSON.stringify(students));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('students', 'readwrite');
      const store = tx.objectStore('students');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- ASSESSMENTS ---
  async getAssessments(): Promise<AssessmentRecord[]> {
    if (this.isFallbackMode || !this.db) {
      const data = localStorage.getItem('gv_assessments');
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('assessments', 'readonly');
      const store = tx.objectStore('assessments');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getAssessmentByStudentId(studentId: string): Promise<AssessmentRecord | null> {
    const assessments = await this.getAssessments();
    return assessments.find((a) => a.studentId === studentId) || null;
  }

  async saveAssessment(assessment: AssessmentRecord): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      const assessments = await this.getAssessments();
      const index = assessments.findIndex((a) => a.id === assessment.id);
      if (index >= 0) {
        assessments[index] = assessment;
      } else {
        assessments.unshift(assessment);
      }
      localStorage.setItem('gv_assessments', JSON.stringify(assessments));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('assessments', 'readwrite');
      const store = tx.objectStore('assessments');
      const request = store.put(assessment);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- INTERVENTION PLANS ---
  async getPlans(): Promise<InterventionPlan[]> {
    if (this.isFallbackMode || !this.db) {
      const data = localStorage.getItem('gv_plans');
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('plans', 'readonly');
      const store = tx.objectStore('plans');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getPlanByStudentId(studentId: string): Promise<InterventionPlan | null> {
    const plans = await this.getPlans();
    return plans.find((p) => p.studentId === studentId) || null;
  }

  async savePlan(plan: InterventionPlan): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      const plans = await this.getPlans();
      const index = plans.findIndex((p) => p.id === plan.id);
      if (index >= 0) {
        plans[index] = plan;
      } else {
        plans.unshift(plan);
      }
      localStorage.setItem('gv_plans', JSON.stringify(plans));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('plans', 'readwrite');
      const store = tx.objectStore('plans');
      const request = store.put(plan);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- SETTINGS ---
  async getSettings(): Promise<AppSettings> {
    if (this.isFallbackMode || !this.db) {
      const data = localStorage.getItem('gv_settings');
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    }

    return new Promise((resolve) => {
      const tx = this.db!.transaction('settings', 'readonly');
      const store = tx.objectStore('settings');
      const request = store.get('app_config');
      request.onsuccess = () => {
        if (request.result && request.result.data) {
          resolve(request.result.data);
        } else {
          resolve(DEFAULT_SETTINGS);
        }
      };
      request.onerror = () => resolve(DEFAULT_SETTINGS);
    });
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      localStorage.setItem('gv_settings', JSON.stringify(settings));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('settings', 'readwrite');
      const store = tx.objectStore('settings');
      const request = store.put({ id: 'app_config', data: settings });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // --- BACKUP & RESTORE ---
  async exportDatabaseJSON(): Promise<string> {
    const students = await this.getStudents();
    const assessments = await this.getAssessments();
    const plans = await this.getPlans();
    const settings = await this.getSettings();

    const payload = {
      app: 'Guardião da Vida',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      data: {
        students,
        assessments,
        plans,
        settings,
      },
    };

    return JSON.stringify(payload, null, 2);
  }

  async importDatabaseJSON(jsonString: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.data || !parsed.data.students) {
        throw new Error('Arquivo de backup inválido.');
      }

      for (const s of parsed.data.students) {
        await this.saveStudent(s);
      }
      if (parsed.data.assessments) {
        for (const a of parsed.data.assessments) {
          await this.saveAssessment(a);
        }
      }
      if (parsed.data.plans) {
        for (const p of parsed.data.plans) {
          await this.savePlan(p);
        }
      }
      if (parsed.data.settings) {
        await this.saveSettings(parsed.data.settings);
      }

      return true;
    } catch (e) {
      console.error('Erro importando banco de dados local:', e);
      return false;
    }
  }

  async clearAllData(): Promise<void> {
    if (this.isFallbackMode || !this.db) {
      localStorage.removeItem('gv_students');
      localStorage.removeItem('gv_assessments');
      localStorage.removeItem('gv_plans');
      localStorage.setItem('gv_settings', JSON.stringify(DEFAULT_SETTINGS));
      return;
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['students', 'assessments', 'plans', 'settings'], 'readwrite');
      tx.objectStore('students').clear();
      tx.objectStore('assessments').clear();
      tx.objectStore('plans').clear();
      tx.objectStore('settings').clear();
      tx.oncomplete = () => {
        this.saveSettings(DEFAULT_SETTINGS).then(() => resolve());
      };
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const localDb = new LocalDatabase();
