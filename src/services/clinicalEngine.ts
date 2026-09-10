import { AssessmentRecord, EducationStage, InterventionPlan, RiskLevel, Student } from '../types';
import { COMPREHENSIVE_INDICATORS } from './indicatorsData';

export function calculateRiskLevel(
  stage: EducationStage,
  selectedIndicatorIds: string[],
  somatizations: string[],
  verbalQuotes: string[],
  selfHarmObserved: string[],
  protectiveFactors: string[]
): {
  riskLevel: RiskLevel;
  score: number;
  reasoning: string;
} {
  let score = 0;

  // Tally indicator weights
  for (const id of selectedIndicatorIds) {
    const ind = COMPREHENSIVE_INDICATORS.find((i) => i.id === id);
    if (ind) {
      score += ind.riskWeight;
    }
  }

  // Check critical flags
  const hasDirectSuicideSpeech = verbalQuotes.some(
    (q) =>
      q.toLowerCase().includes('matar') ||
      q.toLowerCase().includes('morrer') ||
      q.toLowerCase().includes('suicid') ||
      q.toLowerCase().includes('acabar com tudo')
  );

  const hasEarlyChildhoodDeathMetaphor =
    stage === 'anos_iniciais' &&
    (selectedIndicatorIds.includes('falas_virar_estrelinha') ||
      verbalQuotes.some(
        (q) =>
          q.toLowerCase().includes('estrelinha') ||
          q.toLowerCase().includes('dormir para sempre') ||
          q.toLowerCase().includes('sumir') ||
          q.toLowerCase().includes('não nascido')
      ));

  const hasSelfHarm = selfHarmObserved.length > 0 || selectedIndicatorIds.includes('autolesao_infantil_mordidas_arranhões') || selectedIndicatorIds.includes('autolesao_cortes_escondidos');

  const hasDrawingWarning = selectedIndicatorIds.includes('grafico_desenhos_morbidos');
  const hasPlayWarning = selectedIndicatorIds.includes('ludico_brincadeira_morte');

  // Protective factors discount up to 3 points
  const protectiveBonus = Math.min(protectiveFactors.length, 3);
  score = Math.max(0, score - protectiveBonus);

  // Critical immediate conditions
  if (hasDirectSuicideSpeech && hasSelfHarm) {
    return {
      riskLevel: 'critico_imediato',
      score,
      reasoning: 'Presença concomitante de ideação verbalizada explícita e lesões corporais ativas/autolesão. Risco iminente que exige acompanhamento sem interrupção e acionamento da rede de urgência.',
    };
  }

  if (hasEarlyChildhoodDeathMetaphor && (hasSelfHarm || hasDrawingWarning || hasPlayWarning)) {
    return {
      riskLevel: 'alto',
      score,
      reasoning: 'Anos Iniciais: Presença de ideação infantil com equivalentes depressivos severos (falas de desaparecer/virar estrelinha associadas a produções gráficas fúnebres ou autolesão). Exige plano de proteção escolar imediato e acolhimento conjunto com os responsáveis.',
    };
  }

  if (score >= 9 || hasDirectSuicideSpeech || hasSelfHarm) {
    return {
      riskLevel: 'alto',
      score,
      reasoning: 'Múltiplos indicadores convergentes de sofrimento psíquico severo e quebra da rotina habitual.',
    };
  }

  if (score >= 4 || somatizations.length >= 2 || selectedIndicatorIds.includes('relacional_isolamento_recreio')) {
    return {
      riskLevel: 'moderado',
      score,
      reasoning: 'Sinais consistentes de desconforto emocional, somatizações recorrentes ou retraimento social na escola. Indicada intervenção pedagógica preventiva e acolhimento individualizado.',
    };
  }

  return {
    riskLevel: 'baixo',
    score,
    reasoning: 'Alterações pontuais sem ideação ou autolesão expressa. Manter observação atenta, fortalecimento dos fatores de proteção e vínculo com educadores.',
  };
}

export function generateOfflineExpertPlan(
  student: Student,
  assessment: AssessmentRecord
): InterventionPlan {
  const isEarly = student.educationStage === 'anos_iniciais';
  const isKindergarten = student.educationStage === 'educacao_infantil';
  const isHighSchool = student.educationStage === 'ensino_medio';

  const risk = assessment.riskLevel;

  return {
    id: `plan_${Date.now()}`,
    studentId: student.id,
    assessmentId: assessment.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    riskLevel: risk,

    classroomStrategies: {
      adaptationPedagogical: isEarly
        ? [
            'Fracionamento de atividades longas em etapas lúdicas com validação imediata do esforço da criança.',
            'Cartão de Acolhimento: permitir que o estudante use um objeto de apego ou cartão discreto na mesa para sinalizar cansaço sem precisar falar em voz alta.',
            'Designação de papel com sentido afetivo: Ajudante do dia na organização de materiais ou cuidado das plantinhas da sala.',
            'Flexibilização do tempo para entrega de lições durante períodos de maior somatização ou choro.',
          ]
        : isKindergarten
        ? [
            'Atividades de aconchego e expressão corporal na roda de histórias.',
            'Cantinho macio com almofadas e bichinhos de pelúcia para momentos de desregulação sensorial.',
            'Respeito ao tempo do brincar livre sem forçar interações quando demonstrar retraimento.',
          ]
        : [
            'Pactuação individual de metas pedagógicas sem cobranças punitivas na frente da turma.',
            'Disponibilização de espaço calmo para realizar avaliações em caso de crise de pânico.',
            'Combate e monitoramento rigoroso de piadas, zombarias ou isolamento social em grupos da classe.',
          ],
      stressReduction: [
        'Evitar exposições orais públicas obrigatórias enquanto o estudante estiver em fase aguda de vulnerabilidade.',
        'Previsibilidade de rotina: comunicar com antecedência qualquer mudança no horário ou professor substituto.',
        'Feedback corretivo sempre em tom sereno e privado, destacando primeiro os acertos e potencialidades.',
      ],
      welcomingRoutines: [
        'Saudação matinal afetuosa e contato visual caloroso na chegada à sala de aula.',
        'Uso diário do Termômetro das Emoções (cartazes ou carinhas coloridas) para autoidentificação de sentimentos.',
        'Momento de escuta ativa de 5 minutos ao término da aula para verificar como foi o dia do estudante.',
      ],
      whatToDoInCrisis: isEarly
        ? 'Se houver choro intenso, desespero ou falas como "quero sumir": aproximar-se na altura dos olhos da criança, falar com voz suave e calma, nunca puxar ou gritar. Oferecer água, conduzir com ternura à sala da orientação e aplicar a respiração "cheira a florzinha e sopra a velinha".'
        : 'Em caso de crise aguda ou choro descompensado: convidar o estudante com respeito para um local reservado e arejado, sem plateia de colegas. Permanecer ao lado dele em silêncio solidário até o alívio motor e chamar a equipe de apoio.',
    },

    psychologicalWelcoming: {
      dailyCheckInSchedule: 'Acolhimento diário de 10 a 15 minutos pela Orientação Pedagógica/Psicologia Escolar no início do turno.',
      safeSpaceProtocol: 'Disponibilização da Sala de Apoio/Orientação como refúgio seguro com materiais expressivos (papel, lápis de cor, massinha e livros infantojuvenis).',
      listeningContract: 'Pacto de Escuta Qualificada: O estudante sabe que seus sentimentos são respeitados e válidos. É explicado com clareza ética que se houver perigo de se ferir, os adultos que o amam serão envolvidos para protegê-lo.',
      emotionalThermometer: true,
    },

    schoolSafetyProtocol: {
      trustedAdultsInSchool: student.trustedAdults.length > 0 ? student.trustedAdults : ['Orientador Pedagógico', 'Professor Regente'],
      bathroomAndRecessSupervision: isEarly
        ? 'Ida aos banheiros sempre acompanhada de um colega parceiro de confiança; supervisão visual atenta e discreta dos inspetores de pátio durante todo o recreio.'
        : 'Vigilância discreta nos intervalos e banheiros, sem parecer perseguição ou vigilância ostensiva.',
      removalOfRiskObjects: true,
      discreteCompanionPolicy: 'Protocolo de não-solidão: Em dias de maior tristeza ou agitação, o estudante não deve permanecer desacompanhado em áreas isoladas da escola.',
    },

    familyGuide: {
      approachTone: 'Profundamente empático, colaborativo e desprovido de juízos de valor. A escola se coloca como parceira protetiva e não acusadora.',
      talkingPoints: [
        'Apresentar as mudanças observadas na escola (queda de rendimento, queixas corporais, desenhos e falas de sofrimento).',
        'Desmistificar o estigma: explicar que crianças pequenas também sofrem e que falar de "virar estrelinha" ou "dormir para sempre" é um sinal legítimo de pedido de ajuda.',
        'Ouvir como o estudante tem se comportado em casa (sono, apetite, queixas).',
        'Orientar a busca de suporte especializado na rede de saúde mental infantojuvenil (CAPSi/UBS).',
      ],
      homeSafetyChecklist: [
        'Guardar sob chave todos os medicamentos domésticos, produtos químicos e objetos cortantes (facas, tesouras, lâminas).',
        'Evitar discussões conjugais ou familiares acaloradas na presença da criança.',
        'Reservar um momento diário de atenção exclusiva (ler uma história, conversar sobre brincadeiras, sem telas).',
      ],
      meetingScheduledFor: undefined,
    },

    intersectoralReferral: {
      urgency:
        risk === 'critico_imediato'
          ? 'imediata_samu'
          : risk === 'alto'
          ? 'urgente_caps_24h'
          : 'eletiva_ubs_cras',
      priorityDestination:
        risk === 'critico_imediato'
          ? 'SAMU 192 / UPA de Emergência Pediátrica'
          : 'CAPSi - Centro de Atenção Psicossocial Infantojuvenil',
      confidentialReportReady: false,
      notifiedGuardianshipCouncil: false,
    },

    doList: [
      'Validar o sofrimento do estudante: "Eu vejo que você está sofrendo e você não está sozinho".',
      'Manter a calma e postura de acolhimento protetivo sem julgamento moral ou religioso.',
      'Manter a rotina com o máximo de previsibilidade e afeto.',
      'Avisar a equipe escolar chave de forma estritamente sigilosa.',
    ],
    dontList: [
      'NUNCA dizer que "é manha, birra ou para chamar atenção".',
      'NUNCA jurar segredo se houver risco à vida do estudante.',
      'NUNCA expor o sofrimento, desenhos ou marcas da criança perante a turma.',
      'NUNCA minimizar dizendo: "Você tem tudo, não tem motivo para ficar triste".',
    ],
    evolutionNotes: [
      {
        date: new Date().toISOString(),
        author: 'Sistema de Acolhimento',
        note: `Plano de Intervenção Personalizado estruturado com nível de risco ${risk.toUpperCase()}.`,
        statusEvolution: 'estavel',
      },
    ],
  };
}

export async function requestAIEvaluation(
  student: Student,
  assessment: AssessmentRecord
): Promise<Partial<InterventionPlan> | null> {
  try {
    const response = await fetch('/api/specialist/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        educationStage: student.educationStage,
        studentAge: student.age,
        observedSigns: assessment.selectedIndicators,
        drawingNotes: assessment.drawingArtNotes,
        playBehaviorNotes: assessment.playBehaviorNotes,
        somatizations: assessment.somatizations,
        verbalizations: assessment.verbalQuotes,
        selfHarmSigns: assessment.selfHarmObserved,
        immediateRiskTriggers: assessment.immediateRiskTriggers,
        protectiveFactors: assessment.protectiveFactors,
        additionalNotes: assessment.clinicalPedagogicalSummary,
      }),
    });

    if (!response.ok) {
      throw new Error(`Servidor retornou status ${response.status}`);
    }

    const data = await response.json();
    if (data.pedagogicalStrategies && data.psychologicalWelcomingPlan) {
      return {
        riskLevel: data.riskLevel || assessment.riskLevel,
        classroomStrategies: {
          adaptationPedagogical: data.pedagogicalStrategies || [],
          stressReduction: [
            'Redução planejada de sobrecarga avaliativa e flexibilização de prazos.',
            'Feedback individual e afetuoso sem exposição pública.',
          ],
          welcomingRoutines: [
            'Recepção calorosa no início de cada aula.',
            'Monitoramento pelo termômetro de bem-estar.',
          ],
          whatToDoInCrisis: 'Acolhimento imediato, escuta empática, sem repreensão e acionamento da equipe protetiva escolar.',
        },
        psychologicalWelcoming: {
          dailyCheckInSchedule: 'Acolhimento diário de 10 minutos com o profissional de referência na escola.',
          safeSpaceProtocol: 'Espaço calmo com materiais expressivos e lúdicos.',
          listeningContract: 'Escuta respeitosa e sem julgamento, esclarecendo os limites éticos de proteção à vida.',
          emotionalThermometer: true,
        },
        schoolSafetyProtocol: {
          trustedAdultsInSchool: student.trustedAdults.length > 0 ? student.trustedAdults : ['Orientador Pedagógico', 'Professor'],
          bathroomAndRecessSupervision: 'Supervisão atenta e cuidadosa em momentos livres de pátio e banheiros.',
          removalOfRiskObjects: true,
          discreteCompanionPolicy: 'Manutenção de companhia empática e não invasiva.',
        },
        familyGuide: {
          approachTone: data.familyApproachGuide?.recommendedTone || 'Acolhedor e protetivo, sem culpabilização.',
          talkingPoints: data.familyApproachGuide?.talkingPoints || [],
          homeSafetyChecklist: data.familyApproachGuide?.homeSafetyRecommendations || [
            'Retirada de medicamentos e objetos cortantes do alcance da criança.',
            'Supervisão atenciosa e diálogo diário afetuoso.',
          ],
        },
        intersectoralReferral: {
          urgency: data.intersectoralReferral?.urgencyTiming?.toLowerCase().includes('imediato')
            ? 'imediata_samu'
            : data.intersectoralReferral?.urgencyTiming?.toLowerCase().includes('24h')
            ? 'urgente_caps_24h'
            : 'eletiva_ubs_cras',
          priorityDestination: data.intersectoralReferral?.priorityService || 'CAPSi - Centro de Atenção Psicossocial Infantojuvenil',
          confidentialReportReady: false,
          notifiedGuardianshipCouncil: false,
        },
        doList: data.doList || [],
        dontList: data.dontList || [],
      };
    }
    return null;
  } catch (err) {
    console.warn('Fallback para motor local devido a:', err);
    return null;
  }
}
