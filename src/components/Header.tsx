import React from 'react';
import {
  Users,
  ClipboardCheck,
  HeartHandshake,
  BookOpen,
  ShieldAlert,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  PhoneCall,
  Lock,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { AppSettings } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: AppSettings;
  onToggleMask: () => void;
  onLockApp?: () => void;
  onOpenCrisis: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  onToggleMask,
  onLockApp,
  onOpenCrisis,
}) => {
  const navItems = [
    { id: 'students', label: 'Alunos & Casos', icon: Users },
    { id: 'assessment', label: 'Avaliação Escolar', icon: ClipboardCheck },
    { id: 'plans', label: 'Planos de Intervenção', icon: HeartHandshake },
    { id: 'guide', label: 'Guia Especialista', icon: BookOpen },
    { id: 'crisis', label: 'Protocolo de Crise', icon: ShieldAlert, highlight: true },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#e2eefb] text-slate-800 shadow-md border-b-4 border-amber-400">
      {/* Top emergency & privacy bar */}
      <div className="bg-blue-950 px-4 py-1.5 border-b border-blue-900 text-xs sm:text-sm text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Privacy and DB Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30 text-xs">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Banco de Dados Local Seguro
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Sigilo Ético Escolar & LGPD Ativo
            </span>
          </div>

          {/* Quick Emergency Hotlines */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                Emergências:
              </span>
              <a
                href="tel:188"
                className="px-2 py-0.5 rounded bg-amber-400 text-blue-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-sm"
                title="Centro de Valorização da Vida - Ligação Gratuita 24h"
              >
                CVV 188
              </a>
              <a
                href="tel:192"
                className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-colors shadow-sm"
                title="SAMU - Emergência Médica 24h"
              >
                SAMU 192
              </a>
            </div>

            {/* Quick Privacy Mask Toggle */}
            <button
              onClick={onToggleMask}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all border ${
                settings.maskStudentNames
                  ? 'bg-amber-400 text-blue-950 border-amber-300'
                  : 'bg-blue-900 text-blue-100 hover:bg-blue-800 border-blue-700'
              }`}
              title="Ocultar nomes na tela para uso seguro em salas de professores ou presença de terceiros"
            >
              {settings.maskStudentNames ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Sigilo Máximo Ativado</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Mascarar Nomes</span>
                </>
              )}
            </button>

            {/* Quick Lock if PIN enabled */}
            {settings.pinLockEnabled && onLockApp && (
              <button
                onClick={onLockApp}
                className="p-1 rounded bg-blue-900 hover:bg-blue-800 text-amber-300 transition-colors border border-blue-700"
                title="Bloquear aplicativo com PIN"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Branding and Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 bg-[#e2eefb]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo with Yellow Ribbon */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 p-2 flex items-center justify-center text-blue-950 shadow-md shadow-amber-400/20 ring-2 ring-amber-300/80 shrink-0">
              {/* Yellow Ribbon SVG Silhouette */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-blue-950 drop-shadow-xs"
              >
                <path d="M12 2C8.5 2 6 4.5 6 7.5C6 9.8 7.3 11.8 9.2 13L4 21.5C3.7 22 4.1 22.7 4.7 22.6C5.1 22.5 5.4 22.3 5.6 22L10.5 14C11 14.1 11.5 14.2 12 14.2C12.5 14.2 13 14.1 13.5 14L18.4 22C18.6 22.3 18.9 22.5 19.3 22.6C19.9 22.7 20.3 22 20 21.5L14.8 13C16.7 11.8 18 9.8 18 7.5C18 4.5 15.5 2 12 2ZM12 4.5C13.9 4.5 15.5 6 15.5 7.5C15.5 8.9 14.5 10.2 13.2 10.8L12 11.3L10.8 10.8C9.5 10.2 8.5 8.9 8.5 7.5C8.5 6 10.1 4.5 12 4.5Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-blue-950 font-display">
                  Guardião da Vida
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/30 text-amber-950 border border-amber-400/60 text-xs font-bold uppercase tracking-wider">
                  Saúde Mental Escolar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-900/80 font-semibold">
                Psicologia & Pedagogia especializada em Anos Iniciais e Educação Básica
              </p>
            </div>
          </div>

          {/* Crisis Fast Action Button (High Visibility) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenCrisis}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-md shadow-red-950/20 border border-red-400/50 hover:scale-[1.02] transition-transform active:scale-95"
            >
              <ShieldAlert className="w-5 h-5 text-amber-300 animate-bounce" />
              <span>EMERGÊNCIA / CRISE IMEDIATA</span>
            </button>
          </div>
        </div>

        {/* Large Accessible Tab Navigation */}
        <nav className="mt-4 pt-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-blue-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-400 text-blue-950 shadow-md shadow-amber-400/25 scale-[1.02] border border-amber-500/50'
                    : 'bg-white/90 text-blue-950 hover:bg-white hover:text-blue-900 border border-blue-200/90 shadow-xs'
                }`}
              >
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${
                    isActive ? 'text-blue-950' : 'text-blue-700'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
