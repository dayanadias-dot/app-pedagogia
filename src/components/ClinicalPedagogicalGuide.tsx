import React, { useState } from 'react';
import {
  BookOpen,
  Baby,
  GraduationCap,
  Sparkles,
  Heart,
  Palette,
  MessageCircle,
  HelpCircle,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { STAGE_DESCRIPTIONS } from '../services/indicatorsData';

export const ClinicalPedagogicalGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'anos_iniciais' | 'etapas' | 'escuta' | 'mitos' | 'rede'>('anos_iniciais');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 text-white shadow-md border-2 border-amber-400">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-blue-950 flex items-center justify-center font-black shrink-0 shadow-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-display text-white">
              Guia Clínico & Pedagógico de Prevenção e Acolhimento
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-3xl">
              Manual técnico fundamentado pela Psicologia Clínica Infantojuvenil e Pedagogia Escolar para orientação de equipes docentes e gestoras.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-5 pt-3 border-t border-blue-800/60 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection('anos_iniciais')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSection === 'anos_iniciais'
                ? 'bg-amber-400 text-blue-950 shadow-md scale-102'
                : 'bg-blue-800/60 text-blue-200 hover:bg-blue-700/60'
            }`}
          >
            <Baby className="w-4 h-4" />
            ★ Foco: Anos Iniciais do Fundamental
          </button>

          <button
            onClick={() => setActiveSection('etapas')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSection === 'etapas'
                ? 'bg-amber-400 text-blue-950 shadow-md scale-102'
                : 'bg-blue-800/60 text-blue-200 hover:bg-blue-700/60'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Comparativo por Etapas de Ensino
          </button>

          <button
            onClick={() => setActiveSection('escuta')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSection === 'escuta'
                ? 'bg-amber-400 text-blue-950 shadow-md scale-102'
                : 'bg-blue-800/60 text-blue-200 hover:bg-blue-700/60'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Manual de Escuta Qualificada
          </button>

          <button
            onClick={() => setActiveSection('mitos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSection === 'mitos'
                ? 'bg-amber-400 text-blue-950 shadow-md scale-102'
                : 'bg-blue-800/60 text-blue-200 hover:bg-blue-700/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Mitos vs Verdades
          </button>

          <button
            onClick={() => setActiveSection('rede')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSection === 'rede'
                ? 'bg-amber-400 text-blue-950 shadow-md scale-102'
                : 'bg-blue-800/60 text-blue-200 hover:bg-blue-700/60'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Rede de Saúde e Intersetorialidade
          </button>
        </div>
      </div>

      {/* SECTION 1: ANOS INICIAIS DO FUNDAMENTAL */}
      {activeSection === 'anos_iniciais' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-blue-950 flex items-center gap-2 font-display mb-3">
              <Baby className="w-7 h-7 text-amber-500" />
              <span>Como a Depressão e a Ideação Suicida se Manifestam nos Anos Iniciais (6 a 10 anos)</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
              Diferente de adolescentes e adultos, crianças entre 6 e 10 anos de idade ainda estão construindo o conceito de irreversibilidade da morte e raramente usam a frase explícita "quero me suicidar". A dor psíquica se expressa através de <strong>equivalentes depressivos</strong> e de mensagens indiretas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {/* 1. O Brincar e Metáforas Lúdicas */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-2">
                  <Palette className="w-5 h-5 text-amber-700" />
                  <h4>1. Alteração Brusca no Brincar (Lúdico Mórbido)</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  O brincar é a linguagem natural da criança. Fique atento se a criança encena repetidamente enterros, acidentes catastróficos onde ninguém sobrevive, esmaga bonequinhos com raiva desmedida ou perde totalmente o interesse pelas brincadeiras antes favoritas (anedonia lúdica).
                </p>
              </div>

              {/* 2. Desenhos e Produções Gráficas */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 font-bold mb-2">
                  <Palette className="w-5 h-5 text-blue-700" />
                  <h4>2. Desenhos com Conteúdo de Sofrimento</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Desenhos com predomínio constante de preto ou marrom, figuras humanas sem membros superiores (braços e mãos representam a capacidade de agir e pedir ajuda), figuras chorando isoladas em cantos da página, ou frases espontâneas escritas no verso dos cadernos.
                </p>
              </div>

              {/* 3. Somatizações Recorrentes */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-blue-950 font-bold mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h4>3. Somatizações (Dores Físicas Reais sem Causa Clínica)</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  A criança não mente quando diz que dói: a dor é real. Cefaleias matinais na hora da entrada, cólicas abdominais intensas antes de provas ou no intervalo. Quando os exames médicos nada apontam, a dor de barriga é frequentemente a tradução corporal da angústia.
                </p>
              </div>

              {/* 4. Falas de Desaparecimento */}
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 text-red-950 font-bold mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4>4. Falas Infantis de Desaparecimento</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Frases como <em>"Queria virar uma estrelinha"</em>, <em>"Queria dormir e não acordar mais"</em>, <em>"A mamãe seria mais feliz sem mim"</em>, ou doação repentina de seus brinquedos favoritos a colegas ("toma, não vou mais precisar disso").
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: COMPARATIVO POR ETAPAS */}
      {activeSection === 'etapas' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(STAGE_DESCRIPTIONS).map(([key, item]) => (
              <div
                key={key}
                className={`bg-white rounded-3xl p-6 shadow-sm border ${
                  key === 'anos_iniciais' ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-blue-950 font-display">{item.title}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${item.colorBadge}`}>
                    {item.ageRange}
                  </span>
                </div>
                <p className="text-xs font-bold text-blue-900 mt-2 mb-1">Como a Depressão se Manifesta:</p>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border">
                  {item.depressionManifestation}
                </p>
                <p className="text-xs font-bold text-slate-600 mt-3 mb-1">Foco de Atenção para o Educador:</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.focusNotes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: ESCUTA QUALIFICADA */}
      {activeSection === 'escuta' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-black text-blue-950 font-display mb-2">
              Protocolo de Escuta Qualificada na Escola
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              O modo como o educador reage a um desabafo pode ser o fator determinante entre o isolamento fatal e a busca de ajuda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* O QUE FALAR */}
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
              <h4 className="text-sm font-black text-emerald-950 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Falas que Acolhem e Protegem (RECOMENDADO)
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950">
                <li className="p-2 rounded-lg bg-white/80 border border-emerald-200">
                  <strong>"Eu vejo que você está sofrendo muito, e você não está sozinho."</strong>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-emerald-200">
                  <strong>"O que você está sentindo dói, mas nós vamos encontrar um jeito de te ajudar."</strong>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-emerald-200">
                  <strong>"Você é muito importante para a nossa turma e para mim."</strong>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-emerald-200">
                  <strong>"Eu não posso guardar esse segredo sozinho porque a sua vida é a coisa mais preciosa para nós. Vamos chamar quem pode nos ajudar a te proteger."</strong>
                </li>
              </ul>
            </div>

            {/* O QUE NÃO FALAR */}
            <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-300">
              <h4 className="text-sm font-black text-red-950 flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-600" />
                Falas que Silenciam e Agravam a Dor (NUNCA DIZER)
              </h4>
              <ul className="space-y-2 text-xs text-red-950">
                <li className="p-2 rounded-lg bg-white/80 border border-red-200">
                  <span className="line-through text-red-700">"Você é muito criança para ter depressão, sua única obrigação é estudar."</span>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-red-200">
                  <span className="line-through text-red-700">"Isso é falta de limites, birra ou vontade de chamar atenção."</span>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-red-200">
                  <span className="line-through text-red-700">"Tanta gente passando fome e você triste com a vida boa que tem."</span>
                </li>
                <li className="p-2 rounded-lg bg-white/80 border border-red-200">
                  <span className="line-through text-red-700">"Pode deixar que eu prometo não contar para ninguém, nem para seus pais." (PROIBIDO: gera corresponsabilidade perigosa).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MITOS VS VERDADES */}
      {activeSection === 'mitos' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xl font-black text-blue-950 font-display mb-4">
            Mitos e Evidências Científicas sobre o Suicídio na Infância e Juventude
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">MITO POPULAR:</span>
              <p className="text-sm font-bold text-slate-800">"Criança pequena não tem depressão nem ideação suicida."</p>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mt-2">VERDADE CIENTÍFICA (OMS):</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crianças sofrem de depressão sim. Embora a prevalência aumente na adolescência, crianças no Fundamental I sofrem intensamente e podem apresentar comportamentos autolesivos e ideação quando submetidas a perdas, abusos, bullying ou sofrimento emocional crônico.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">MITO POPULAR:</span>
              <p className="text-sm font-bold text-slate-800">"Falar sobre suicídio na escola incentiva o ato (efeito contágio)."</p>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mt-2">VERDADE CIENTÍFICA:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Falar com sensibilidade, sem detalhar métodos ou romantizar, abre canal de alívio e pedido de socorro. O silêncio e o tabu alimentam o desamparo.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">MITO POPULAR:</span>
              <p className="text-sm font-bold text-slate-800">"Quem quer se matar não avisa, faz direto."</p>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mt-2">VERDADE CIENTÍFICA:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aproximadamente 8 em cada 10 pessoas dão sinais verbais ou comportamentais claros de sofrimento antes de uma tentativa. Na infância, as doações de pertences e queixas somáticas são avisos eloquentes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: REDE DE ATENÇÃO */}
      {activeSection === 'rede' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in duration-150">
          <h3 className="text-xl font-black text-blue-950 font-display mb-2">
            Rede Intersetorial de Proteção Infantojuvenil (SUS e SUAS)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            A escola não deve andar sozinha: o papel escolar é identificar, acolher e encaminhar para os equipamentos públicos competentes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center font-bold mb-2">
                CAPSi
              </div>
              <strong className="text-sm text-blue-950 block mb-1">CAPSi (Centro de Atenção Psicossocial Infantojuvenil)</strong>
              <p className="text-slate-600 leading-relaxed">
                Serviço público de porta aberta especializado em sofrimento psíquico grave e persistente para crianças e adolescentes até 18 anos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-blue-950 flex items-center justify-center font-bold mb-2">
                UBS
              </div>
              <strong className="text-sm text-blue-950 block mb-1">Unidade Básica de Saúde (Posto de Saúde)</strong>
              <p className="text-slate-600 leading-relaxed">
                Porta de entrada do SUS para avaliação clínica, descarte de patologias orgânicas nas somatizações e suporte de equipe multidisciplinar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
              <div className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center font-bold mb-2">
                CT
              </div>
              <strong className="text-sm text-rose-950 block mb-1">Conselho Tutelar</strong>
              <p className="text-slate-600 leading-relaxed">
                Deve ser acionado quando houver omissão deliberada da família, negligência grave, recusa expressa em buscar atendimento médico ou indício de abuso.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
