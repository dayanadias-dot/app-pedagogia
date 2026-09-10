import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  Baby,
  Palette,
  MessageSquareQuote,
  Activity,
  Heart,
  Shield,
  AlertOctagon,
  Sparkles,
  Save,
  FileSpreadsheet,
  HelpCircle,
  Brain,
  Info,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { AssessmentRecord, EducationStage, RiskLevel, Student } from '../types';
import { COMPREHENSIVE_INDICATORS, STAGE_DESCRIPTIONS } from '../services/indicatorsData';
import { calculateRiskLevel, generateOfflineExpertPlan, requestAIEvaluation } from '../services/clinicalEngine';

interface AssessmentFormProps {
  students: Student[];
  preselectedStudentId?: string;
  onSaveAssessment: (assessment: AssessmentRecord) => void;
  onPlanGenerated: (studentId: string) => void;
  maskNames: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  students,
  preselectedStudentId,
  onSaveAssessment,
  onPlanGenerated,
  maskNames,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    preselectedStudentId || (students[0]?.id ?? '')
  );

  const currentStudent = students.find((s) => s.id === selectedStudentId);
  const stage = currentStudent?.educationStage || 'anos_iniciais';

  const [evaluatorRole, setEvaluatorRole] = useState<AssessmentRecord['evaluatorRole']>('psicologo_escolar');
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [playBehaviorNotes, setPlayBehaviorNotes] = useState('');
  const [drawingArtNotes, setDrawingArtNotes] = useState('');
  const [verbalQuotesInput, setVerbalQuotesInput] = useState('');
  const [somatizationsInput, setSomatizationsInput] = useState('');
  const [selfHarmObservedInput, setSelfHarmObservedInput] = useState('');
  const [immediateRiskTriggersInput, setImmediateRiskTriggersInput] = useState('');
  const [protectiveFactorsInput, setProtectiveFactorsInput] = useState('Vínculo com professora regente, apoio dos avós');
  const [clinicalPedagogicalSummary, setClinicalPedagogicalSummary] = useState('');

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // When student changes, update defaults or load existing
  useEffect(() => {
    if (currentStudent) {
      if (currentStudent.educationStage === 'anos_iniciais') {
        setSelectedIndicators([
          'ludico_brincadeira_morte',
          'grafico_desenhos_morbidos',
          'falas_virar_estrelinha',
        ]);
        setPlayBehaviorNotes('Encena acidentes com bonequinhos onde ninguém sobrevive.');
        setDrawingArtNotes('Desenhos monocromáticos escuros com figuras humanas sem braços ou mãos.');
        setVerbalQuotesInput('Queria virar uma estrelinha; Minha barriga dói todo dia para vir à escola');
        setSomatizationsInput('Cefaleia e dores abdominais matinais na hora da entrada');
      } else {
        setSelectedIndicators([]);
        setPlayBehaviorNotes('');
        setDrawingArtNotes('');
        setVerbalQuotesInput('');
        setSomatizationsInput('');
      }
    }
  }, [selectedStudentId]);

  const toggleIndicator = (id: string) => {
    setSelectedIndicators((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Convert inputs to array
  const verbalQuotes = verbalQuotesInput
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const somatizations = somatizationsInput
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const selfHarmObserved = selfHarmObservedInput
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const immediateRiskTriggers = immediateRiskTriggersInput
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const protectiveFactors = protectiveFactorsInput
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Calculate live clinical risk
  const riskCalculation = calculateRiskLevel(
    stage,
    selectedIndicators,
    somatizations,
    verbalQuotes,
    selfHarmObserved,
    protectiveFactors
  );

  const handleSaveAndGeneratePlan = async (useAi: boolean = false) => {
    if (!currentStudent) return;

    const assessment: AssessmentRecord = {
      id: `ass_${Date.now()}`,
      studentId: currentStudent.id,
      evaluatedAt: new Date().toISOString(),
      evaluatorRole,
      educationStage: currentStudent.educationStage,
      selectedIndicators,
      playBehaviorNotes,
      drawingArtNotes,
      verbalQuotes,
      somatizations,
      selfHarmObserved,
      immediateRiskTriggers,
      protectiveFactors,
      riskLevel: riskCalculation.riskLevel,
      clinicalPedagogicalSummary:
        clinicalPedagogicalSummary.trim() || riskCalculation.reasoning,
      aiAssisted: useAi,
    };

    onSaveAssessment(assessment);

    if (useAi) {
      setIsAiLoading(true);
      setAiError(null);
      try {
        const aiPlanPatch = await requestAIEvaluation(currentStudent, assessment);
        const basePlan = generateOfflineExpertPlan(currentStudent, assessment);
        const mergedPlan = aiPlanPatch ? { ...basePlan, ...aiPlanPatch } : basePlan;
        onPlanGenerated(currentStudent.id);
      } catch (err: any) {
        console.warn('Erro na IA, usando gerador offline de protocolo:', err);
        setAiError('IA externa indisponível. Plano gerado com sucesso pelo motor clínico local de protocolos.');
        generateOfflineExpertPlan(currentStudent, assessment);
        onPlanGenerated(currentStudent.id);
      } finally {
        setIsAiLoading(false);
      }
    } else {
      generateOfflineExpertPlan(currentStudent, assessment);
      onPlanGenerated(currentStudent.id);
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'critico_imediato':
        return (
          <span className="px-4 py-1.5 rounded-xl bg-red-600 text-white font-black text-sm flex items-center gap-1.5 shadow-md animate-pulse">
            <AlertOctagon className="w-5 h-5 text-amber-300" />
            RISCO CRÍTICO IMEDIATO
          </span>
        );
      case 'alto':
        return (
          <span className="px-4 py-1.5 rounded-xl bg-amber-500 text-blue-950 font-black text-sm flex items-center gap-1.5 shadow-md">
            <AlertOctagon className="w-5 h-5 text-blue-950" />
            RISCO ALTO (ACOLHIMENTO PRIORITÁRIO)
          </span>
        );
      case 'moderado':
        return (
          <span className="px-4 py-1.5 rounded-xl bg-yellow-400 text-blue-950 font-bold text-sm flex items-center gap-1.5">
            <Heart className="w-5 h-5 text-blue-950" />
            RISCO MODERADO (INTERVENÇÃO PREVENTIVA)
          </span>
        );
      case 'baixo':
        return (
          <span className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center gap-1.5">
            <Shield className="w-5 h-5 text-emerald-200" />
            RISCO BAIXO (OBSERVAÇÃO E SUPORTE)
          </span>
        );
    }
  };

  const isEarlyElementary = stage === 'anos_iniciais';

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
              <ClipboardCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-blue-950 font-display">
                Instrumento de Avaliação Multidimensional Escolar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Rastreamento clínico-pedagógico focado em equivalentes depressivos, simbolismo gráfico e ideação.
              </p>
            </div>
          </div>

          {/* Student Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Aluno em Avaliação:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-blue-950 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {maskNames ? st.anonymousCode : st.fullNameOrInitials} ({st.schoolGrade})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Focus note for Anos Iniciais */}
        {isEarlyElementary && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Baby className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900 text-sm block mb-0.5">
                Especificidade dos Anos Iniciais do Fundamental (1º ao 5º ano / 6 a 10 anos):
              </strong>
              Crianças nessa fase manifestam depressão e ideação de modo indireto. Atente-se com rigor redobrado a:
              brincadeiras de enterro ou acidentes fatais sem salvação; desenhos monocromáticos ou figuras sem mãos/braços;
              queixas de dor de barriga no portão da escola; e falas de <em>"querer virar estrelinha"</em> ou <em>"dormir para sempre"</em>.
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Multidimensional Indicator Checklist */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2 font-display">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                <span>Rastreamento de Sinais de Alerta Observados</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {selectedIndicators.length} indicadores marcados
              </span>
            </div>

            {/* Indicator category groups */}
            <div className="space-y-4">
              {/* Category 1: Lúdico & Desenhos */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    1. Aspectos Lúdicos, Criativos e Desenhos (Crucial nos Anos Iniciais)
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {COMPREHENSIVE_INDICATORS.filter((i) => i.category === 'ludico_criativo').map((ind) => (
                    <label
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndicators.includes(ind.id)
                          ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndicators.includes(ind.id)}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">{ind.label}</span>
                        <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                          {ind.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category 2: Falas e Ideação */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareQuote className="w-4 h-4 text-blue-700" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Falas de Alerta & Equivalentes de Ideação
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {COMPREHENSIVE_INDICATORS.filter((i) => i.category === 'falas_ideacao').map((ind) => (
                    <label
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndicators.includes(ind.id)
                          ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndicators.includes(ind.id)}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">{ind.label}</span>
                        <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                          {ind.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category 3: Somatizações & Corpo */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-rose-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Somatizações & Queixas Corporais na Escola
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {COMPREHENSIVE_INDICATORS.filter((i) => i.category === 'somatizacao').map((ind) => (
                    <label
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndicators.includes(ind.id)
                          ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndicators.includes(ind.id)}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">{ind.label}</span>
                        <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                          {ind.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category 4: Autolesão / Automutilação */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    4. Autolesão Infantil e Lesões Corporais
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {COMPREHENSIVE_INDICATORS.filter((i) => i.category === 'autolesao').map((ind) => (
                    <label
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndicators.includes(ind.id)
                          ? 'bg-red-50 border-red-300 ring-1 ring-red-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndicators.includes(ind.id)}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">{ind.label}</span>
                        <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                          {ind.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category 5 & 6: Afeto e Relacional */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    5. Afeto, Humor e Convivência no Recreio / Sala
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {COMPREHENSIVE_INDICATORS.filter(
                    (i) => i.category === 'afetivo_emocional' || i.category === 'relacional_escolar'
                  ).map((ind) => (
                    <label
                      key={ind.id}
                      onClick={() => toggleIndicator(ind.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndicators.includes(ind.id)
                          ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIndicators.includes(ind.id)}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-blue-950 block">{ind.label}</span>
                        <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                          {ind.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Notes Box */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2 font-display border-b pb-3">
              <Palette className="w-5 h-5 text-blue-700" />
              <span>Registros Qualitativos Especializados (Brincar, Desenhos e Falas)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Observações sobre o Brincar e Dinâmica Lúdica:
                </label>
                <textarea
                  rows={2}
                  value={playBehaviorNotes}
                  onChange={(e) => setPlayBehaviorNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Como brinca no recreio? Há temas de destruição, agressividade ou recusa total?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Produções Gráficas e Desenhos no Caderno:
                </label>
                <textarea
                  rows={2}
                  value={drawingArtNotes}
                  onChange={(e) => setDrawingArtNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Cores predominantes, ausência de partes do corpo humano, garatujas com força..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Falas Literais ou Metáforas Registradas (separadas por ponto e vírgula):
                </label>
                <input
                  type="text"
                  value={verbalQuotesInput}
                  onChange={(e) => setVerbalQuotesInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder='Ex: "Queria virar estrelinha"; "Queria sumir"'
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Queixas Somáticas Registradas na Escola:
                </label>
                <input
                  type="text"
                  value={somatizationsInput}
                  onChange={(e) => setSomatizationsInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Cefaleia matinal; Dor de barriga antes de entrar"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Gatilhos de Estresse Recente / Situações Familiares:
                </label>
                <input
                  type="text"
                  value={immediateRiskTriggersInput}
                  onChange={(e) => setImmediateRiskTriggersInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Separação dos pais, luto na família, bullying"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Fatores Protetivos Conhecidos (Vínculos, Hobbies):
                </label>
                <input
                  type="text"
                  value={protectiveFactorsInput}
                  onChange={(e) => setProtectiveFactorsInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Apego com professora de artes, gosta de desenhar animais"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Risk Calculation & Plan Generation Panel */}
        <div className="space-y-5">
          {/* Risk Level Output Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-blue-900" />
              <h3 className="text-base font-black text-blue-950 font-display">
                Avaliação de Risco Clínico-Pedagógico
              </h3>
            </div>

            <div className="my-4 flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nível de Risco Calculado:
              </span>
              {getRiskBadge(riskCalculation.riskLevel)}
              <span className="text-xs text-slate-400 mt-2">
                Escore ponderado: {riskCalculation.score} pontos
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed mb-4">
              <strong className="font-bold text-blue-950 block mb-1">Fundamentação Técnica:</strong>
              {riskCalculation.reasoning}
            </div>

            {aiError && (
              <div className="p-3 mb-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900">
                {aiError}
              </div>
            )}

            {/* Action Buttons to Generate Plan */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleSaveAndGeneratePlan(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm shadow-md transition-all active:scale-95"
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span>Gerar Plano de Intervenção (PIP)</span>
              </button>

              <button
                onClick={() => handleSaveAndGeneratePlan(true)}
                disabled={isAiLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs shadow-sm transition-all"
                title="Consulta com inteligência especialista para enriquecer o plano pedagógico"
              >
                {isAiLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Processando Parecer Especialista...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Consultar com IA Especialista</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-tight">
                Garante total conformidade com a LGPD e o Código de Ética Profissional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
