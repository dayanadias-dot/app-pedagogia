import { BehavioralIndicator, EducationStage } from '../types';

export const COMPREHENSIVE_INDICATORS: BehavioralIndicator[] = [
  // --- ANOS INICIAIS: LÚDICO E CRIATIVO ---
  {
    id: 'ludico_brincadeira_morte',
    category: 'ludico_criativo',
    label: 'Brincadeiras repetitivas com temas de morte, enterro ou catástrofe',
    description: 'A criança encena repetidamente temas fúnebres, acidentes fatais ou personagens indefesos que são abandonados ou destruídos sem socorro.',
    applicableStages: ['anos_iniciais', 'educacao_infantil'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'ludico_perda_prazer',
    category: 'ludico_criativo',
    label: 'Anedonia lúdica (perda total de prazer no brincar)',
    description: 'Desinteresse por brincadeiras antes favoritas; recusa sistemática em participar de jogos com pares durante o recreio.',
    applicableStages: ['anos_iniciais', 'educacao_infantil'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'grafico_desenhos_morbidos',
    category: 'ludico_criativo',
    label: 'Produções gráficas com temas de sofrimento, isolamento ou mutilação',
    description: 'Desenhos com predomínio de cores fúnebres, figuras humanas sem mãos/braços (impotência), figuras chorando, isoladas ou caindo de alturas.',
    applicableStages: ['anos_iniciais', 'anos_finais'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'grafico_mensagens_escritas',
    category: 'ludico_criativo',
    label: 'Frases espontâneas nos cadernos ("quero sumir", "ninguém me ama")',
    description: 'Anotações em cantos de página, redações com forte conteúdo de desamparo, despedida ou sentimento de ser um fardo.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },

  // --- FALAS E EQUIVALENTES DE IDEAÇÃO ---
  {
    id: 'falas_virar_estrelinha',
    category: 'falas_ideacao',
    label: 'Falas infantis de desaparecimento ("queria virar estrelinha", "dormir para sempre")',
    description: 'Expressão indireta de ideação: expressa desejo de não mais existir, de ir embora para nunca mais voltar ou descansar sem fim.',
    applicableStages: ['anos_iniciais', 'educacao_infantil'],
    riskWeight: 4,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'falas_fardo_familiar',
    category: 'falas_ideacao',
    label: 'Sentimento de culpa severo ("se eu não existisse a família seria melhor")',
    description: 'A criança assume culpa desmedida por problemas dos pais ou da escola, verbalizando que sua ausência traria alívio aos outros.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'falas_despedida_doacao',
    category: 'falas_ideacao',
    label: 'Doação de brinquedos favoritos ou bilhetes de despedida',
    description: 'Distribuição inesperada de pertences queridos a colegas ("leva para você, não vou mais precisar"), acompanhada de despedidas incomuns.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 4,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'falas_ideacao_direta',
    category: 'falas_ideacao',
    label: 'Verbalização direta de ideação suicida ("quero me matar")',
    description: 'Declaração explícita sobre dar fim à própria vida ou cogitação de métodos.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 4,
    isEarlyElementaryFocus: true,
  },

  // --- SOMATIZAÇÕES E CORPO ---
  {
    id: 'somatizacao_dor_abdominal_cabeca',
    category: 'somatizacao',
    label: 'Queixas somáticas recorrentes sem causa clínica (cefaleia, dor de barriga)',
    description: 'Visitas frequentes à enfermaria ou secretaria escolar nos horários de entrada, provas ou recreio, com dores reais mas sem base orgânica.',
    applicableStages: ['anos_iniciais', 'educacao_infantil', 'anos_finais'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'somatizacao_regressao_enurese',
    category: 'somatizacao',
    label: 'Regressão de marcos de desenvolvimento (enurese diurna/noturna, encoprese)',
    description: 'Perda do controle dos esfíncteres na escola em crianças já desfraldadas há anos, após estressores severos.',
    applicableStages: ['anos_iniciais', 'educacao_infantil'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'somatizacao_alteracao_sono_apetite',
    category: 'somatizacao',
    label: 'Sonolência excessiva em aula ou recusa persistente da merenda',
    description: 'Criança chega exausta, dorme em cima da carteira, relata pesadelos frequentes ou deixa toda a refeição escolar intocada.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },

  // --- AUTOLESÃO / AUTOMUTILAÇÃO ---
  {
    id: 'autolesao_infantil_mordidas_arranhões',
    category: 'autolesao',
    label: 'Autolesão infantil: arranhões, mordidas nos braços ou bater a cabeça',
    description: 'Manifestação impulsiva de dor psíquica intensa frente à frustração ou tristeza: bater a cabeça na parede ou carteira, unhas cravadas na pele.',
    applicableStages: ['anos_iniciais', 'educacao_infantil'],
    riskWeight: 4,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'autolesao_cortes_escondidos',
    category: 'autolesao',
    label: 'Cortes intencionais nos braços/pernas e uso de casacos no calor',
    description: 'Marcas lineares com objetos cortantes (apontadores, tesouras), insistência em usar blusas de frio mesmo em temperaturas elevadas.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 4,
    isEarlyElementaryFocus: false,
  },
  {
    id: 'autolesao_queimaduras_pancadas',
    category: 'autolesao',
    label: 'Queimaduras intencionais ou busca deliberada por situações de perigo',
    description: 'Comportamentos de risco extremo, desafios perigosos no pátio ou marcas suspeitas no corpo.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 4,
    isEarlyElementaryFocus: true,
  },

  // --- AFETIVO E EMOCIONAL ---
  {
    id: 'afetivo_disforia_irritabilidade',
    category: 'afetivo_emocional',
    label: 'Disforia e irritabilidade atípica (equivalente depressivo infantojuvenil)',
    description: 'Em vez de tristeza visível, a depressão infantil frequentemente surge como reatividade excessiva, explosões de fúria e intolerância à frustração.',
    applicableStages: ['anos_iniciais', 'anos_finais'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'afetivo_choro_frequente',
    category: 'afetivo_emocional',
    label: 'Crises de choro aparentemente desmotivadas ou por correções simples',
    description: 'Dificuldade de regulação emocional; desaba ao menor feedback do professor ou em tarefas cotidianas.',
    applicableStages: ['anos_iniciais', 'educacao_infantil', 'anos_finais'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'afetivo_desesperanca_cronica',
    category: 'afetivo_emocional',
    label: 'Desesperança profunda e visão negativa do futuro',
    description: 'Certeza de que as coisas nunca vão melhorar, sentimento de vazio e desesperança existencial.',
    applicableStages: ['anos_finais', 'ensino_medio'],
    riskWeight: 3,
    isEarlyElementaryFocus: false,
  },

  // --- RELACIONAL E ESCOLAR ---
  {
    id: 'relacional_isolamento_recreio',
    category: 'relacional_escolar',
    label: 'Isolamento crônico no recreio e recusa de convívio social',
    description: 'Permanece encostado aos muros ou sozinho nas mesas; evita contato visual e não interage com colegas nem professores.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'relacional_queda_rendimento',
    category: 'relacional_escolar',
    label: 'Declínio cognitivo súbito, desatenção e tarefas incompletas',
    description: 'Estudante antes participativo passa a esquecer materiais, não concluir atividades e demonstrar olhar vago/distante durante as aulas.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 2,
    isEarlyElementaryFocus: true,
  },
  {
    id: 'relacional_vitima_bullying',
    category: 'relacional_escolar',
    label: 'Vítima recorrente de bullying, humilhação ou exclusão pelos pares',
    description: 'Alvo de zombarias, perseguições no intervalo ou exclusão intencional em trabalhos de grupo.',
    applicableStages: ['anos_iniciais', 'anos_finais', 'ensino_medio'],
    riskWeight: 3,
    isEarlyElementaryFocus: true,
  },
];

export const STAGE_DESCRIPTIONS: Record<
  EducationStage,
  {
    title: string;
    ageRange: string;
    focusNotes: string;
    depressionManifestation: string;
    colorBadge: string;
  }
> = {
  educacao_infantil: {
    title: 'Educação Infantil',
    ageRange: '0 a 5 anos',
    focusNotes: 'Foco em regressões de desenvolvimento, alterações no brincar lúdico e vínculo com cuidadores.',
    depressionManifestation: 'Manifesta-se principalmente por retraimento no brincar, crises de choro inconsolável, enurese regressiva e recusa alimentar.',
    colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  anos_iniciais: {
    title: 'Anos Iniciais do Ensino Fundamental (1º ao 5º ano)',
    ageRange: '6 a 10 anos',
    focusNotes: 'FAIXA PRIORITÁRIA DESTE SISTEMA: Equivalentes depressivos infantis, produção de desenhos, queixas somáticas e falas indiretas de desaparecimento.',
    depressionManifestation: 'Raramente verbalizada como "tristeza": aparece como extrema irritabilidade, brincadeiras de morte/destruição, cefaleia/dor de barriga na escola, doação de brinquedos e frases como "queria virar estrelinha".',
    colorBadge: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  anos_finais: {
    title: 'Anos Finais do Ensino Fundamental (6º ao 9º ano)',
    ageRange: '11 a 14 anos',
    focusNotes: 'Autolesão não suicida, isolamento social, pressões de pertencimento em grupo e cyberbullying.',
    depressionManifestation: 'Cortes escondidos por agasalhos no calor, queda abrupta de rendimento, crises de ansiedade em sala, retraimento e desesperança.',
    colorBadge: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  ensino_medio: {
    title: 'Ensino Médio',
    ageRange: '15 a 18 anos',
    focusNotes: 'Ideação suicida estruturada, desesperança quanto ao futuro e vestibulares/trabalho, despedidas explícitas.',
    depressionManifestation: 'Anedonia severa, verbalizações diretas de suicídio, busca por isolamento total, abuso de substâncias e entrega de pertences pessoais.',
    colorBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  },
};
