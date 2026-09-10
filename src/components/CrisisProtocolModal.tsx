import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  AlertTriangle,
  Heart,
  Users,
  CheckCircle2,
  XCircle,
  X,
  Lock,
} from 'lucide-react';
import { AppSettings } from '../types';

interface CrisisProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export const CrisisProtocolModal: React.FC<CrisisProtocolModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-red-500 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-lg">
              <ShieldAlert className="w-7 h-7 animate-pulse text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-red-700 font-display">
                  Protocolo de Ação Imediata para Crise Escolar
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase">
                  Urgência Iminente
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Para situações em que o estudante está em risco iminente ou em curso de atentar contra a própria vida.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 font-bold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Big Emergency Call Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <a
            href="tel:192"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md text-center"
          >
            <PhoneCall className="w-6 h-6 mb-1 text-amber-300" />
            <span className="text-xs uppercase font-bold text-red-200">Socorro Médico</span>
            <span className="text-base font-black">SAMU 192</span>
          </a>

          <a
            href="tel:188"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-400 text-blue-950 hover:bg-amber-300 transition-colors shadow-md text-center"
          >
            <PhoneCall className="w-6 h-6 mb-1 text-blue-950" />
            <span className="text-xs uppercase font-bold text-blue-900">Apoio Emocional</span>
            <span className="text-base font-black">CVV 188</span>
          </a>

          <a
            href="tel:193"
            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-md text-center"
          >
            <PhoneCall className="w-6 h-6 mb-1 text-red-400" />
            <span className="text-xs uppercase font-bold text-slate-300">Resgate</span>
            <span className="text-base font-black">BOMBEIROS 193</span>
          </a>
        </div>

        {/* Action Sequence */}
        <div className="space-y-4 text-xs">
          {/* Passo 1 */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong className="text-sm font-black text-red-950 block">
                NUNCA DEIXE O ESTUDANTE SOZINHO (Segurança Imediata)
              </strong>
              <p className="text-slate-700 mt-1 leading-relaxed">
                Permaneça com a criança ou adolescente em todo momento. Não faça movimentos bruscos. Mantenha distância segura e acolhedora. Se houver objetos cortantes, remédios ou risco de queda por perto, remova discretamente o perigo com voz calma e compassiva.
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-blue-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong className="text-sm font-black text-amber-950 block">
                DISPERSÃO RESPEITOSA DA PLATEIA (Sem Exposição)
              </strong>
              <p className="text-slate-700 mt-1 leading-relaxed">
                Peça com serenidade para outro professor conduzir os demais alunos para fora do ambiente (sala de aula ou pátio). Evite fofocas, filmagens de celulares ou julgamentos públicos. Preserve a dignidade e integridade da criança.
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong className="text-sm font-black text-blue-950 block">
                CHAMAR O ADULTO DE CONFIANÇA NA ESCOLA
              </strong>
              <p className="text-slate-700 mt-1 leading-relaxed">
                Avise discretamente o professor ou orientador a quem o aluno tem afeto. A presença de uma figura de apego conhecida regula o sistema nervoso e desativa o estado de luta ou fuga. Fale com tom calmo: <em>"Eu estou aqui com você e vou te proteger"</em>.
              </p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div>
              <strong className="text-sm font-black text-slate-900 block">
                ACIONAMENTO DOS RESPONSÁVEIS E DA REDE DE SAÚDE
              </strong>
              <p className="text-slate-700 mt-1 leading-relaxed">
                A direção ou coordenação deve comunicar os responsáveis imediatamente com clareza e empatia, solicitando seu comparecimento urgente. Se houver lesão física ou risco de vida iminente, o SAMU 192 deve ser acionado simultaneamente.
              </p>
            </div>
          </div>
        </div>

        {/* Local Emergency Contacts configured in app */}
        <div className="mt-5 p-4 rounded-2xl bg-blue-950 text-white text-xs">
          <strong className="text-amber-300 block mb-1 uppercase tracking-wider font-bold">
            Contatos Locais Cadastrados na Escola:
          </strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-100">
            <div><strong>CAPSi de Referência:</strong> {settings.capsiContact}</div>
            <div><strong>Conselho Tutelar:</strong> {settings.conselhoTutelarContact}</div>
            <div><strong>UBS de Referência:</strong> {settings.ubsContact}</div>
            <div><strong>Direção / Coordenação:</strong> {settings.directorPhone}</div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Fechar Janela de Emergência
          </button>
        </div>
      </div>
    </div>
  );
};
