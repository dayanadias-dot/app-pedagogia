import React, { useState } from 'react';
import {
  HeartHandshake,
  BookOpen,
  GraduationCap,
  Shield,
  Home,
  Network,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Printer,
  Calendar,
  AlertTriangle,
  Clock,
  Sparkles,
  UserCheck,
  ChevronDown,
  MessageSquare,
  Baby,
} from 'lucide-react';
import { InterventionPlan, RiskLevel, Student } from '../types';

interface InterventionPlanViewProps {
  plan: InterventionPlan | null;
  student: Student | null;
  onSavePlan: (updatedPlan: InterventionPlan) => void;
  maskNames: boolean;
  onNavigateToAssessment: () => void;
}

export const InterventionPlanView: React.FC<InterventionPlanViewProps> = ({
  plan,
  student,
  onSavePlan,
  maskNames,
  onNavigateToAssessment,
}) => {
  const [newNoteAuthor, setNewNoteAuthor] = useState('Orientador Pedagógico');
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteStatus, setNewNoteStatus] = useState<'melhora' | 'estavel' | 'atencao_redobrada'>('estavel');

  if (!plan || !student) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto my-12">
        <HeartHandshake className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h3 className="text-xl font-black text-blue-950 font-display">
          Nenhum Plano de Intervenção Selecionado
        </h3>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Selecione um aluno na lista ou realize uma nova Avaliação Escolar para gerar o Plano de Intervenção Personalizado (PIP).
        </p>
        <button
          onClick={onNavigateToAssessment}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm shadow-md transition-all active:scale-95"
        >
          <GraduationCap className="w-5 h-5" />
          Realizar Nova Avaliação Diagnóstica
        </button>
      </div>
    );
  }

  const handleAddEvolutionNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const updatedPlan: InterventionPlan = {
      ...plan,
      updatedAt: new Date().toISOString(),
      evolutionNotes: [
        {
          date: new Date().toISOString(),
          author: newNoteAuthor.trim() || 'Profissional Escolar',
          note: newNoteText.trim(),
          statusEvolution: newNoteStatus,
        },
        ...plan.evolutionNotes,
      ],
    };

    onSavePlan(updatedPlan);
    setNewNoteText('');
  };

  const displayName = maskNames ? student.anonymousCode : student.fullNameOrInitials;

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'critico_imediato':
        return 'bg-red-600 text-white border-red-500';
      case 'alto':
        return 'bg-amber-500 text-blue-950 border-amber-400';
      case 'moderado':
        return 'bg-yellow-400 text-blue-950 border-yellow-300';
      case 'baixo':
        return 'bg-emerald-600 text-white border-emerald-500';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isEarlyElementary = student.educationStage === 'anos_iniciais';

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      {/* Plan Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black text-blue-950 font-display">
                  Plano de Intervenção Personalizado (PIP)
                </h2>
                <span className={`px-3 py-0.5 rounded-full text-xs font-black uppercase border ${getRiskBadge(plan.riskLevel)}`}>
                  Nível de Risco: {plan.riskLevel.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium mt-1">
                <span><strong>Estudante:</strong> {displayName}</span>
                <span>•</span>
                <span><strong>Turma:</strong> {student.schoolGrade}</span>
                <span>•</span>
                <span><strong>Idade:</strong> {student.age} anos</span>
                <span>•</span>
                <span><strong>Código:</strong> {student.anonymousCode}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs shadow-sm transition-colors"
              title="Imprimir relatório confidencial"
            >
              <Printer className="w-4 h-4 text-blue-900" />
              <span>Imprimir Ficha PIP</span>
            </button>
          </div>
        </div>

        {isEarlyElementary && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-center gap-3">
            <Baby className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Foco em Anos Iniciais do Fundamental:</strong> Este plano prioriza a linguagem lúdica, acolhimento de equivalentes depressivos (somatizações e brincadeiras), reforço de rotinas previsíveis e proteção discreta no pátio e banheiros.
            </span>
          </div>
        )}
      </div>

      {/* 5 Structural Axes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EIXO 1: SALA DE AULA E PROFESSORES (PEDAGÓGICO) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-300 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-blue-950 font-display">
                  Eixo 1: Ações Pedagógicas em Sala de Aula
                </h3>
                <p className="text-xs text-slate-500">Direcionado ao Professor Regente e Especialistas</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <strong className="font-bold text-blue-900 block mb-1.5 uppercase tracking-wider text-[11px]">
                  • Adaptações Didático-Pedagógicas:
                </strong>
                <ul className="space-y-1.5 pl-2">
                  {plan.classroomStrategies.adaptationPedagogical.map((strat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed">
                      <span className="text-amber-500 font-bold">✔</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="font-bold text-blue-900 block mb-1.5 uppercase tracking-wider text-[11px]">
                  • Redução de Estresse e Sobrecarga:
                </strong>
                <ul className="space-y-1.5 pl-2">
                  {plan.classroomStrategies.stressReduction.map((strat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed">
                      <span className="text-amber-500 font-bold">✔</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="font-bold text-blue-900 block mb-1.5 uppercase tracking-wider text-[11px]">
                  • Rotinas de Acolhimento Diário:
                </strong>
                <ul className="space-y-1.5 pl-2">
                  {plan.classroomStrategies.welcomingRoutines.map((strat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed">
                      <span className="text-amber-500 font-bold">✔</span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <strong>Manejo de Crise em Sala: </strong>
            {plan.classroomStrategies.whatToDoInCrisis}
          </div>
        </div>

        {/* EIXO 2: ACOLHIMENTO SOCIOEMOCIONAL & ORIENTAÇÃO */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-blue-950 font-display">
                  Eixo 2: Acolhimento Socioemocional Escolar
                </h3>
                <p className="text-xs text-slate-500">Orientação Educacional & Psicologia Escolar</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                <strong className="text-blue-950 font-bold block mb-1">
                  Horário e Frequência do Check-in de Acolhimento:
                </strong>
                <p className="text-slate-700">{plan.psychologicalWelcoming.dailyCheckInSchedule}</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                <strong className="text-blue-950 font-bold block mb-1">
                  Espaço Seguro / Cantinho da Calma Estruturado:
                </strong>
                <p className="text-slate-700">{plan.psychologicalWelcoming.safeSpaceProtocol}</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                <strong className="text-blue-950 font-bold block mb-1">
                  Pacto Ético de Escuta Qualificada:
                </strong>
                <p className="text-slate-700">{plan.psychologicalWelcoming.listeningContract}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-900 bg-slate-50 p-2.5 rounded-xl border">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Uso do Termômetro Visual das Emoções: ATIVADO</span>
          </div>
        </div>

        {/* EIXO 3: PLANO DE PROTEÇÃO E SEGURANÇA NO AMBIENTE ESCOLAR */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-blue-950 font-display">
                Eixo 3: Protocolo de Proteção e Segurança Escolar
              </h3>
              <p className="text-xs text-slate-500">Prevenção ativa sem rotulação ou estigmatização</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <strong className="text-blue-950 font-bold block mb-1">Adultos de Confiança na Escola:</strong>
              <div className="flex flex-wrap gap-1.5">
                {plan.schoolSafetyProtocol.trustedAdultsInSchool.map((ad, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                    {ad}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-blue-950 font-bold block mb-1">
                Supervisão de Banheiros e Recreio:
              </strong>
              <p className="text-slate-700">{plan.schoolSafetyProtocol.bathroomAndRecessSupervision}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-blue-950 font-bold block mb-1">
                Política de Não-Solidão (Companhia Discreta):
              </strong>
              <p className="text-slate-700">{plan.schoolSafetyProtocol.discreteCompanionPolicy}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Checagem preventiva de materiais de estojo (remoção de lâminas/estiletes) realizada com delicadeza.</span>
            </div>
          </div>
        </div>

        {/* EIXO 4: ARTICULAÇÃO COM A FAMÍLIA */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-blue-950 font-display">
                Eixo 4: Guia de Abordagem com a Família
              </h3>
              <p className="text-xs text-slate-500">Aliança protetiva sem culpa, julgamento ou alarme</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <strong className="text-blue-950 font-bold block mb-1">Postura e Tom Recomendado:</strong>
              <p className="text-slate-700 leading-relaxed">{plan.familyGuide.approachTone}</p>
            </div>

            <div>
              <strong className="text-blue-950 font-bold block mb-1">Pontos Principais de Diálogo:</strong>
              <ul className="space-y-1 pl-2">
                {plan.familyGuide.talkingPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-blue-950 font-bold block mb-1">Checklist de Segurança Doméstica:</strong>
              <ul className="space-y-1 pl-2">
                {plan.familyGuide.homeSafetyChecklist.map((chk, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EIXO 5: REDE DE ATENÇÃO PSICOSSOCIAL & ENCAMINHAMENTOS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b">
          <div className="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center font-bold">
            <Network className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-black text-blue-950 font-display">
              Eixo 5: Encaminhamentos e Rede Intersetorial de Saúde Mental
            </h3>
            <p className="text-xs text-slate-500">Articulação com serviços públicos especializados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Destino Prioritário:
            </span>
            <strong className="text-sm text-blue-950 block">{plan.intersectoralReferral.priorityDestination}</strong>
            <span className="text-slate-500 mt-1 block">Acompanhamento multiprofissional com psiquiatria e psicologia infantojuvenil.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Urgência do Encaminhamento:
            </span>
            <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-bold">
              {plan.intersectoralReferral.urgency.replace(/_/g, ' ').toUpperCase()}
            </span>
            <span className="text-slate-500 mt-2 block">Relatório técnico sigiloso elaborado para a equipe de saúde.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Conselho Tutelar:
            </span>
            <strong className="text-blue-950 block">
              {plan.intersectoralReferral.notifiedGuardianshipCouncil
                ? 'Notificado (Violação identificada)'
                : 'Não Notificado (Apenas se negligência grave/recusa dos pais)'}
            </strong>
            <span className="text-slate-500 mt-1 block">
              A notificação é obrigatória em caso de maus-tratos ou recusa parental deliberada de levar ao médico.
            </span>
          </div>
        </div>
      </div>

      {/* DO & DON'T GUIDE (REGRAS DE OURO PARA EDUCADORES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO LIST */}
        <div className="bg-emerald-50/80 rounded-3xl p-6 border-2 border-emerald-300 shadow-sm">
          <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2 mb-3 font-display">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>O Que os Educadores e Profissionais DEVEM Fazer</span>
          </h3>
          <ul className="space-y-2 text-xs text-emerald-950">
            {plan.doList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-700 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DONT LIST */}
        <div className="bg-red-50/80 rounded-3xl p-6 border-2 border-red-300 shadow-sm">
          <h3 className="text-base font-extrabold text-red-950 flex items-center gap-2 mb-3 font-display">
            <XCircle className="w-5 h-5 text-red-600" />
            <span>O Que NUNCA Deve Ser Feito ou Dito</span>
          </h3>
          <ul className="space-y-2 text-xs text-red-950">
            {plan.dontList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-red-700 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TIMELINE DE EVOLUÇÃO E ACOMPANHAMENTO */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-blue-950 font-display">
                Diário de Evolução e Monitoramento do Caso
              </h3>
              <p className="text-xs text-slate-500">Histórico de observações registradas localmente</p>
            </div>
          </div>
        </div>

        {/* Add Evolution Note Form */}
        <form onSubmit={handleAddEvolutionNote} className="p-4 bg-slate-50 rounded-2xl border mb-5 space-y-3 print:hidden">
          <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
            Registrar Nova Evolução / Observação de Acompanhamento:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newNoteAuthor}
              onChange={(e) => setNewNoteAuthor(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Profissional / Cargo"
            />
            <select
              value={newNoteStatus}
              onChange={(e) => setNewNoteStatus(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-bold text-slate-800"
            >
              <option value="melhora">Demonstrou Melhora / Participação Positiva</option>
              <option value="estavel">Estável / Sem alterações relevantes</option>
              <option value="atencao_redobrada">Atenção Redobrada / Episódio de Sofrimento</option>
            </select>
          </div>
          <textarea
            rows={2}
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Relate o que ocorreu: como foi a aula, reunião com a família, ida ao CAPSi, brincadeiras no recreio..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Gravar Nota de Evolução</span>
            </button>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-3">
          {plan.evolutionNotes.map((note, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-950">{note.author}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400">
                    {new Date(note.date).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(note.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{note.note}</p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 self-start ${
                  note.statusEvolution === 'melhora'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : note.statusEvolution === 'atencao_redobrada'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                }`}
              >
                {note.statusEvolution === 'melhora'
                  ? 'Evolução Positiva'
                  : note.statusEvolution === 'atencao_redobrada'
                  ? 'Atenção Redobrada'
                  : 'Quadro Estável'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
