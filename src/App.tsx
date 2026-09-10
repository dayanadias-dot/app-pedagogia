import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentsList } from './components/StudentsList';
import { AssessmentForm } from './components/AssessmentForm';
import { InterventionPlanView } from './components/InterventionPlanView';
import { ClinicalPedagogicalGuide } from './components/ClinicalPedagogicalGuide';
import { CrisisProtocolModal } from './components/CrisisProtocolModal';
import { SettingsView } from './components/SettingsView';
import { PinLockModal } from './components/PinLockModal';
import { localDb, DEFAULT_SETTINGS } from './services/localDb';
import { AppSettings, AssessmentRecord, InterventionPlan, Student } from './types';
import { generateOfflineExpertPlan } from './services/clinicalEngine';
import { Database, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [plans, setPlans] = useState<InterventionPlan[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const [activeTab, setActiveTab] = useState<string>('students');
  const [selectedStudentIdForAssessment, setSelectedStudentIdForAssessment] = useState<string | undefined>();
  const [selectedStudentIdForPlan, setSelectedStudentIdForPlan] = useState<string | undefined>();

  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isAppLocked, setIsAppLocked] = useState(false);

  // Initialize Local Database on startup
  useEffect(() => {
    async function loadData() {
      await localDb.init();
      const loadedStudents = await localDb.getStudents();
      const loadedAssessments = await localDb.getAssessments();
      const loadedPlans = await localDb.getPlans();
      const loadedSettings = await localDb.getSettings();

      setStudents(loadedStudents);
      setAssessments(loadedAssessments);
      setPlans(loadedPlans);
      setSettings(loadedSettings);

      if (loadedStudents.length > 0) {
        setSelectedStudentIdForAssessment(loadedStudents[0].id);
        setSelectedStudentIdForPlan(loadedStudents[0].id);
      }

      if (loadedSettings.pinLockEnabled) {
        setIsAppLocked(true);
      }

      setIsDbReady(true);
    }

    loadData();
  }, []);

  // Handlers for Students
  const handleAddStudent = async (
    newStudentData: Omit<Student, 'id' | 'registeredAt' | 'updatedAt'>
  ) => {
    const student: Student = {
      ...newStudentData,
      id: `std_${Date.now()}`,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await localDb.saveStudent(student);
    const updated = await localDb.getStudents();
    setStudents(updated);
    setSelectedStudentIdForAssessment(student.id);
  };

  const handleDeleteStudent = async (studentId: string) => {
    await localDb.deleteStudent(studentId);
    const updated = await localDb.getStudents();
    setStudents(updated);
    if (selectedStudentIdForAssessment === studentId) {
      setSelectedStudentIdForAssessment(updated[0]?.id);
    }
    if (selectedStudentIdForPlan === studentId) {
      setSelectedStudentIdForPlan(updated[0]?.id);
    }
  };

  // Handlers for Assessment & Plan
  const handleSaveAssessment = async (assessment: AssessmentRecord) => {
    await localDb.saveAssessment(assessment);
    const updatedAssessments = await localDb.getAssessments();
    setAssessments(updatedAssessments);

    // Update student status if risk changed
    const student = students.find((s) => s.id === assessment.studentId);
    if (student) {
      const updatedStudent: Student = {
        ...student,
        status:
          assessment.riskLevel === 'critico_imediato'
            ? 'em_crise'
            : assessment.riskLevel === 'alto'
            ? 'em_intervencao'
            : 'em_observacao',
        updatedAt: new Date().toISOString(),
      };
      await localDb.saveStudent(updatedStudent);
      const refreshedStudents = await localDb.getStudents();
      setStudents(refreshedStudents);

      // Also generate/update plan
      const newPlan = generateOfflineExpertPlan(updatedStudent, assessment);
      await localDb.savePlan(newPlan);
      const refreshedPlans = await localDb.getPlans();
      setPlans(refreshedPlans);
    }
  };

  const handlePlanGenerated = (studentId: string) => {
    setSelectedStudentIdForPlan(studentId);
    setActiveTab('plans');
  };

  const handleSavePlan = async (updatedPlan: InterventionPlan) => {
    await localDb.savePlan(updatedPlan);
    const refreshedPlans = await localDb.getPlans();
    setPlans(refreshedPlans);
  };

  // Settings Handlers
  const handleSaveSettings = async (newSettings: AppSettings) => {
    await localDb.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleToggleMask = async () => {
    const updated: AppSettings = {
      ...settings,
      maskStudentNames: !settings.maskStudentNames,
    };
    await localDb.saveSettings(updated);
    setSettings(updated);
  };

  const handleExportBackup = async () => {
    return await localDb.exportDatabaseJSON();
  };

  const handleImportBackup = async (jsonString: string) => {
    const success = await localDb.importDatabaseJSON(jsonString);
    if (success) {
      const s = await localDb.getStudents();
      const a = await localDb.getAssessments();
      const p = await localDb.getPlans();
      const cfg = await localDb.getSettings();
      setStudents(s);
      setAssessments(a);
      setPlans(p);
      setSettings(cfg);
    }
    return success;
  };

  const handleClearData = async () => {
    await localDb.clearAllData();
  };

  // Pre-selected objects
  const activePlanStudent = students.find((s) => s.id === selectedStudentIdForPlan) || students[0] || null;
  const activePlan = plans.find((p) => p.studentId === activePlanStudent?.id) || null;

  if (!isDbReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-amber-400 text-blue-950 flex items-center justify-center mx-auto shadow-xl ring-4 ring-amber-300/40 animate-spin">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-blue-950 font-display">
            Guardião da Vida
          </h2>
          <p className="text-xs text-slate-500">
            Inicializando banco de dados local confidencial com segurança...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* PIN Lock Screen if active */}
      {isAppLocked && (
        <PinLockModal
          correctPin={settings.pinCode || '1234'}
          onUnlock={() => setIsAppLocked(false)}
        />
      )}

      {/* Header with Blue & Yellow Identity and Quick Action Icons */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'crisis') {
            setIsCrisisModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        settings={settings}
        onToggleMask={handleToggleMask}
        onLockApp={() => setIsAppLocked(true)}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeTab === 'students' && (
          <StudentsList
            students={students}
            onSelectStudentForAssessment={(id) => {
              setSelectedStudentIdForAssessment(id);
              setActiveTab('assessment');
            }}
            onSelectStudentForPlan={(id) => {
              setSelectedStudentIdForPlan(id);
              setActiveTab('plans');
            }}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            maskNames={settings.maskStudentNames}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentForm
            students={students}
            preselectedStudentId={selectedStudentIdForAssessment}
            onSaveAssessment={handleSaveAssessment}
            onPlanGenerated={handlePlanGenerated}
            maskNames={settings.maskStudentNames}
          />
        )}

        {activeTab === 'plans' && (
          <InterventionPlanView
            plan={activePlan}
            student={activePlanStudent}
            onSavePlan={handleSavePlan}
            maskNames={settings.maskStudentNames}
            onNavigateToAssessment={() => setActiveTab('assessment')}
          />
        )}

        {activeTab === 'guide' && <ClinicalPedagogicalGuide />}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onSaveSettings={handleSaveSettings}
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
            onClearData={handleClearData}
          />
        )}
      </main>

      {/* Emergency Crisis Fast Modal */}
      <CrisisProtocolModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        settings={settings}
      />

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200 border-t border-blue-900 py-6 px-4 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="font-bold text-white">Guardião da Vida</span>
            <span>— Psicologia & Pedagogia Escolar pela Vida</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-blue-300">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Banco de Dados Local Ativo
            </span>
            <span>•</span>
            <span>Prevenção ao Suicídio e Saúde Mental</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">Setembro Amarelo & Ano Todo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
