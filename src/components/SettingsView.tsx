import React, { useState, useRef } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Database,
  Download,
  Upload,
  Trash2,
  PhoneCall,
  Save,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileCheck,
} from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onExportBackup: () => Promise<string>;
  onImportBackup: (jsonString: string) => Promise<boolean>;
  onClearData: () => Promise<void>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
  onExportBackup,
  onImportBackup,
  onClearData,
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExport = async () => {
    const jsonStr = await onExportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardiao_da_vida_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = await onImportBackup(content);
        if (ok) {
          setImportStatus('Backup restaurado com sucesso!');
        } else {
          setImportStatus('Falha ao restaurar: arquivo JSON inválido.');
        }
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
            <SettingsIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-blue-950 font-display">
              Configurações, Sigilo & Privacidade
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Controle de proteção de dados locais, segurança por PIN e contatos de emergência escolar.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* PRIVACIDADE E SIGILO */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-blue-950 font-display">
                Segurança de Acesso e Sigilo Ético (LGPD & CFP)
              </h3>
              <p className="text-xs text-slate-500">
                Garantia de que os dados sensíveis nunca fiquem expostos a pessoas não autorizadas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mask Names */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div>
                <strong className="text-xs font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                  {formData.maskStudentNames ? <EyeOff className="w-4 h-4 text-amber-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
                  Ocultar Nomes na Tela (Modo Pseudônimo)
                </strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Substitui os nomes reais por códigos (ex: <code>ALUNO-AI-01</code>). Indispensável para uso em computadores compartilhados ou na presença de terceiros.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={formData.maskStudentNames}
                  onChange={(e) => setFormData({ ...formData, maskStudentNames: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* PIN Lock */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
              <div>
                <strong className="text-xs font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Bloqueio por Senha PIN Local
                </strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Exige uma senha de 4 dígitos para abrir o aplicativo, impedindo acesso de terceiros.
                </p>
                {formData.pinLockEnabled && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-700">Código PIN:</span>
                    <input
                      type="password"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-24 px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={formData.pinLockEnabled}
                  onChange={(e) => setFormData({ ...formData, pinLockEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>
          </div>
        </div>

        {/* CONTATOS DE EMERGÊNCIA INSTITUCIONAIS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-blue-950 font-display">
                Contatos Locais da Rede de Emergência & Saúde
              </h3>
              <p className="text-xs text-slate-500">
                Números que aparecerão nos alertas rápidos de crise e relatórios de encaminhamento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1">
                CAPSi (Centro de Atenção Psicossocial Infantojuvenil) da Região:
              </label>
              <input
                type="text"
                value={formData.capsiContact}
                onChange={(e) => setFormData({ ...formData, capsiContact: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1">
                Conselho Tutelar da Comarca / Plantão 24h:
              </label>
              <input
                type="text"
                value={formData.conselhoTutelarContact}
                onChange={(e) => setFormData({ ...formData, conselhoTutelarContact: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1">
                UBS de Referência da Escola:
              </label>
              <input
                type="text"
                value={formData.ubsContact}
                onChange={(e) => setFormData({ ...formData, ubsContact: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-blue-950 mb-1">
                Telefone da Direção / Gestão Escolar:
              </label>
              <input
                type="text"
                value={formData.directorPhone}
                onChange={(e) => setFormData({ ...formData, directorPhone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="flex items-center justify-between">
          {saveSuccess ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Configurações salvas com sucesso no banco local!
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Todas as alterações são salvas diretamente no armazenamento local.
            </span>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs shadow-md transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            Salvar Configurações
          </button>
        </div>
      </form>

      {/* BACKUP & BANCO DE DADOS LOCAL */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b">
          <div className="w-10 h-10 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-blue-950 font-display">
              Gerenciamento do Banco de Dados Local (Backup & Restauração)
            </h3>
            <p className="text-xs text-slate-500">
              Os dados nunca saem do seu navegador sem sua permissão. Exporte backups periódicos para guardar em local seguro.
            </p>
          </div>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-950">
            {importStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export button */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <strong className="text-xs font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                <Download className="w-4 h-4 text-blue-700" />
                Exportar Backup em Arquivo JSON
              </strong>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                Baixa uma cópia completa de todos os alunos, avaliações, planos de intervenção e notas locais.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors"
            >
              <Download className="w-4 h-4 text-amber-300" />
              Baixar Backup Seguro (.json)
            </button>
          </div>

          {/* Import button */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <strong className="text-xs font-bold text-blue-950 flex items-center gap-1.5 mb-1">
                <Upload className="w-4 h-4 text-amber-600" />
                Restaurar Dados de Backup
              </strong>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                Carrega registros de um arquivo de backup exportado anteriormente por este aplicativo.
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow-sm transition-colors"
              >
                <Upload className="w-4 h-4" />
                Selecionar Arquivo de Backup
              </button>
            </div>
          </div>
        </div>

        {/* Clear Data section */}
        <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <strong>Zona de Segurança:</strong> Permite redefinir os dados para o estado inicial.
          </div>
          <button
            onClick={async () => {
              if (
                confirm(
                  'ATENÇÃO: Deseja apagar todos os dados salvos localmente? Esta ação não pode ser desfeita.'
                )
              ) {
                await onClearData();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Limpar Banco de Dados Local
          </button>
        </div>
      </div>

      {/* LGPD and Professional Ethics Notice */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Conformidade Ética e Legal: </strong>
          Este sistema foi projetado em estrita observância à Lei Geral de Proteção de Dados (Lei nº 13.709/2018), ao Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005) e ao Estatuto da Criança e do Adolescente (ECA).
          Nenhum dado pessoal identificável é transmitido para servidores de terceiros ou comercializado. Todos os registros residem localmente na máquina do profissional responsável.
        </div>
      </div>
    </div>
  );
};
