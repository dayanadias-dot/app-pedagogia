import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, Check } from 'lucide-react';

interface PinLockModalProps {
  correctPin: string;
  onUnlock: () => void;
}

export const PinLockModal: React.FC<PinLockModalProps> = ({ correctPin, onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      if (newPin === correctPin) {
        onUnlock();
      } else if (newPin.length === correctPin.length) {
        setError(true);
        setTimeout(() => setPin(''), 600);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border-4 border-amber-400 text-center animate-in zoom-in-95 duration-150">
        <div className="w-16 h-16 rounded-3xl bg-blue-900 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-amber-300/40">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-black text-blue-950 font-display">Acesso Restrito & Sigiloso</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Digite o código PIN do profissional para desbloquear os prontuários escolares protegidos.
        </p>

        {/* PIN Indicators */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {Array.from({ length: correctPin.length || 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                i < pin.length
                  ? error
                    ? 'bg-red-500 border-red-500 scale-110'
                    : 'bg-blue-900 border-blue-900 scale-110'
                  : 'border-slate-300 bg-slate-100'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-xs font-bold text-red-600 mb-4 animate-shake">
            Código PIN incorreto. Tente novamente.
          </p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="w-full py-3.5 rounded-2xl bg-slate-50 hover:bg-amber-100 active:bg-amber-200 text-blue-950 font-black text-lg shadow-sm border border-slate-200 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200"
          >
            Apagar
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="w-full py-3.5 rounded-2xl bg-slate-50 hover:bg-amber-100 text-blue-950 font-black text-lg shadow-sm border border-slate-200"
          >
            0
          </button>
          <div className="flex items-center justify-center text-[10px] text-slate-400 font-mono">
            {pin.length}/{correctPin.length}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Em caso de esquecimento, o PIN padrão de fábrica é <code>1234</code>.
        </p>
      </div>
    </div>
  );
};
