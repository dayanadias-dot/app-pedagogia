import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  AlertTriangle,
  Heart,
  ShieldCheck,
  Calendar,
  Sparkles,
  Baby,
  GraduationCap,
  ArrowRight,
  Trash2,
  Lock,
  UserCheck,
  School,
  FileSpreadsheet,
} from 'lucide-react';
import { EducationStage, RiskLevel, Student } from '../types';
import { STAGE_DESCRIPTIONS } from '../services/indicatorsData';

interface StudentsListProps {
  students: Student[];
  onSelectStudentForAssessment: (studentId: string) => void;
  onSelectStudentForPlan: (studentId: string) => void;
  onAddStudent: (student: Omit<Student, 'id' | 'registeredAt' | 'updatedAt'>) => void;
  onDeleteStudent: (studentId: string) => void;
  maskNames: boolean;
}

export const StudentsList: React.FC<StudentsListProps> = ({
  students,
  onSelectStudentForAssessment,
  onSelectStudentForPlan,
  onAddStudent,
  onDeleteStudent,
  maskNames,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal form state
  const [anonymousCode, setAnonymousCode] = useState('');
  const [fullNameOrInitials, setFullNameOrInitials] = useState('');
  const [age, setAge] = useState<number>(8);
  const [educationStage, setEducationStage] = useState<EducationStage>('anos_iniciais');
  const [schoolGrade, setSchoolGrade] = useState('3º Ano Fundamental I');
  const [shift, setShift] = useState<'manha' | 'tarde' | 'integral'>('manha');
  const [trustedAdultsInput, setTrustedAdultsInput] = useState('Profª Regente, Orientadora Escolar');
  const [observationsSummary, setObservationsSummary] = useState('');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.anonymousCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.fullNameOrInitials.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.schoolGrade.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = selectedStage === 'all' || s.educationStage === selectedStage;
    const matchesRisk = selectedRisk === 'all' || s.status === selectedRisk;

    return matchesSearch && matchesStage && matchesRisk;
  });

  const handleOpenAddModal = () => {
    // Generate an automatic anonymous code based on date
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setAnonymousCode(`EST-${new Date().getFullYear()}-${randomSuffix}`);
    setFullNameOrInitials('');
    setAge(8);
    setEducationStage('anos_iniciais');
    setSchoolGrade('3º Ano Fundamental I');
    setShift('manha');
    setTrustedAdultsInput('Profª Regente, Inspetor de Pátio');
    setObservationsSummary('');
    setIsAddModalOpen(true);
  };

  const handleSaveNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anonymousCode.trim()) return;

    const trusted = trustedAdultsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onAddStudent({
      anonymousCode: anonymousCode.trim().toUpperCase(),
      fullNameOrInitials: fullNameOrInitials.trim() || anonymousCode.trim(),
      age: Number(age) || 8,
      educationStage,
      schoolGrade,
      shift,
      status: 'em_observacao',
      trustedAdults: trusted.length > 0 ? trusted : ['Professor de Referência'],
      observationsSummary: observationsSummary.trim(),
    });

    setIsAddModalOpen(false);
  };

  const getDisplayName = (s: Student) => {
    if (maskNames) {
      return s.anonymousCode;
    }
    return s.fullNameOrInitials || s.anonymousCode;
  };

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'em_crise':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 border border-red-300 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Alerta Crítico
          </span>
        );
      case 'em_intervencao':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-400 font-bold text-xs">
            <Heart className="w-4 h-4 text-amber-600" />
            Em Intervenção
          </span>
        );
      case 'em_observacao':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs">
            <Users className="w-4 h-4 text-blue-600" />
            Em Observação
          </span>
        );
      case 'estavel':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Estável / Monitorado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Informative Banner Focused on Anos Iniciais */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-5 text-white shadow-md border-2 border-amber-400">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center shrink-0 shadow-lg">
              <Baby className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-white">
                  Acolhimento Especializado nos Anos Iniciais do Fundamental
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-blue-950 text-xs font-black uppercase">
                  1º ao 5º Ano
                </span>
              </div>
              <p className="mt-1 text-sm text-blue-100 max-w-3xl leading-relaxed">
                Nesta faixa etária (6 a 10 anos), a ideação suicida e a depressão raramente são expressas como nos adultos.
                A dor manifesta-se através de <strong>metáforas no brincar</strong>, <strong>desenhos escuros ou mutilados</strong>,{' '}
                <strong>queixas somáticas constantes (dor de barriga/cabeça)</strong>, doação repentina de brinquedos e frases de desaparecimento (
                <em>"queria virar estrelinha"</em>).
              </p>
            </div>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            <UserPlus className="w-5 h-5" />
            <span>Cadastrar Novo Aluno</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por código, nome ou turma..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Stage Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Etapa:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Todas as Etapas</option>
              <option value="anos_iniciais">★ Anos Iniciais (1º ao 5º ano)</option>
              <option value="educacao_infantil">Educação Infantil</option>
              <option value="anos_finais">Anos Finais (6º ao 9º ano)</option>
              <option value="ensino_medio">Ensino Médio</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="font-semibold">Situação:</span>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Todos os Status</option>
              <option value="em_crise">Alerta Crítico</option>
              <option value="em_intervencao">Em Intervenção</option>
              <option value="em_observacao">Em Observação</option>
              <option value="estavel">Estável</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">Nenhum registro encontrado</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Não foram encontrados alunos correspondentes aos filtros selecionados. Cadastre um novo aluno ou limpe a busca.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm"
          >
            <UserPlus className="w-4 h-4" />
            Cadastrar Aluno
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map((student) => {
            const isEarly = student.educationStage === 'anos_iniciais';
            const stageConfig = STAGE_DESCRIPTIONS[student.educationStage];

            return (
              <div
                key={student.id}
                className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  isEarly
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200'
                }`}
              >
                {/* Card Header with Stage and Status */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${stageConfig.colorBadge}`}
                    >
                      {isEarly && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                      {student.educationStage === 'anos_iniciais'
                        ? 'Anos Iniciais (1º-5º ano)'
                        : stageConfig.title.split('(')[0]}
                    </span>
                    {getStatusBadge(student.status)}
                  </div>

                  <div className="flex items-start justify-between gap-2 mt-2">
                    <div>
                      <h3 className="text-lg font-extrabold text-blue-950 font-display">
                        {getDisplayName(student)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {student.anonymousCode}
                        </span>
                        <span>•</span>
                        <span>{student.age} anos</span>
                        <span>•</span>
                        <span>{student.schoolGrade}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Deseja remover o registro de ${student.anonymousCode}?`)) {
                          onDeleteStudent(student.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Excluir aluno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Observations Summary */}
                  {student.observationsSummary && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <p className="line-clamp-3">
                        <strong className="text-blue-900 font-semibold">Observações: </strong>
                        {student.observationsSummary}
                      </p>
                    </div>
                  )}

                  {/* Trusted Adults In School */}
                  <div className="mt-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1 text-blue-900 font-semibold mb-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>Adultos de Confiança na Escola:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {student.trustedAdults.map((adult, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100"
                        >
                          {adult}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with Large Buttons */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectStudentForAssessment(student.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors"
                    title="Realizar avaliação de sinais comportamentais e de risco"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    <span>Avaliar Sinais</span>
                  </button>

                  <button
                    onClick={() => onSelectStudentForPlan(student.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow-sm transition-colors"
                    title="Acessar ou gerar Plano de Intervenção Personalizado (PIP)"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-950" />
                    <span>Plano PIP</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Creating New Student */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-blue-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-400 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-blue-950 font-bold">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-blue-950 font-display">
                    Cadastrar Novo Aluno para Acompanhamento
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dados protegidos por sigilo ético e gravados exclusivamente no banco local.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewStudent} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Orientações de Sigilo (LGPD / Conselho de Psicologia):</strong> Recomendamos o uso de
                código pseudonimizado (ex: <code>EST-2026-01</code>) ou apenas as iniciais do estudante na tela para
                assegurar a não identificação direta caso a tela seja vista por terceiros.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1">
                    Código Pseudonimizado (Identificador Seguro)*
                  </label>
                  <input
                    type="text"
                    required
                    value={anonymousCode}
                    onChange={(e) => setAnonymousCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Ex: EST-2026-01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1">
                    Iniciais ou Nome Completo (Sigiloso)
                  </label>
                  <input
                    type="text"
                    value={fullNameOrInitials}
                    onChange={(e) => setFullNameOrInitials(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Ex: L. M. S. ou Lucas"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1">Idade*</label>
                  <input
                    type="number"
                    min={3}
                    max={20}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-blue-950 mb-1">
                    Etapa da Educação Básica*
                  </label>
                  <select
                    value={educationStage}
                    onChange={(e) => {
                      const newStage = e.target.value as EducationStage;
                      setEducationStage(newStage);
                      if (newStage === 'anos_iniciais') setSchoolGrade('3º Ano Fundamental I');
                      else if (newStage === 'educacao_infantil') setSchoolGrade('Pré-escola II');
                      else if (newStage === 'anos_finais') setSchoolGrade('7º Ano Fundamental II');
                      else setSchoolGrade('1º Ano Ensino Médio');
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                  >
                    <option value="anos_iniciais">★ Anos Iniciais do Fundamental (1º ao 5º ano)</option>
                    <option value="educacao_infantil">Educação Infantil (0 a 5 anos)</option>
                    <option value="anos_finais">Anos Finais do Fundamental (6º ao 9º ano)</option>
                    <option value="ensino_medio">Ensino Médio (1º ao 3º ano)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1">Ano / Turma*</label>
                  <input
                    type="text"
                    required
                    value={schoolGrade}
                    onChange={(e) => setSchoolGrade(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Ex: 3º Ano B"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1">Turno</label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="manha">Matutino</option>
                    <option value="tarde">Vespertino</option>
                    <option value="integral">Integral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Adultos de Confiança na Escola (Separados por vírgula)
                </label>
                <input
                  type="text"
                  value={trustedAdultsInput}
                  onChange={(e) => setTrustedAdultsInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Ex: Profª Marina, Tia Cláudia (Pátio), Orientadora Sandra"
                />
                <span className="text-[11px] text-slate-500">
                  Fundamental para o Plano de Segurança: pessoas a quem o aluno recorre em momentos de angústia.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-950 mb-1">
                  Motivo Inicial da Observação / Relato do Educador
                </label>
                <textarea
                  rows={3}
                  value={observationsSummary}
                  onChange={(e) => setObservationsSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="Descreva brevemente o que chamou a atenção (desenhos, falas, queixas de dor, choro frequente)..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-sm shadow-md transition-all active:scale-95"
                >
                  Salvar Cadastro Local
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
