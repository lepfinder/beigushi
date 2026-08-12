import React, { useState } from 'react';
import { PoemItem } from '../types';
import { X, Sparkles, CheckCircle2, Eye, EyeOff, RotateCcw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecitePracticeModalProps {
  item: PoemItem | null;
  onClose: () => void;
  onMarkMastered: (id: string) => void;
}

export const RecitePracticeModal: React.FC<RecitePracticeModalProps> = ({
  item,
  onClose,
  onMarkMastered
}) => {
  if (!item) return null;

  const [revealedState, setRevealedState] = useState<Record<number, boolean>>({});
  const [drillMode, setDrillMode] = useState<'blanks' | 'cards'>('blanks');

  const toggleLine = (idx: number) => {
    setRevealedState(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCompleteMastery = () => {
    onMarkMastered(item.id);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#FAF9F6] border border-[#E5E2D9] w-full max-w-xl rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#2C2C2C]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B4513]" />
            <h3 className="font-bold font-serif text-[#2C2C2C] text-base tracking-tight">
              背诵冲刺演练 —— 《{item.title}》
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#2C2C2C] hover:bg-[#F5F2EA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Practice Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-serif text-[#2C2C2C]">{item.title}</h2>
            <p className="text-xs text-[#8B4513] font-serif">〔{item.dynasty}〕{item.author}</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#F0EDE6] space-y-3 font-serif text-lg text-center">
            {item.content.map((line, idx) => {
              const isRevealed = !!revealedState[idx];

              return (
                <div
                  key={idx}
                  onClick={() => toggleLine(idx)}
                  className={`p-3.5 rounded-lg cursor-pointer transition-all border select-none ${
                    isRevealed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-[#F5F2EA] border-[#E5E2D9] text-[#8B4513] hover:bg-[#E5E2D9]'
                  }`}
                >
                  {isRevealed ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {line}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#8B4513]">
                      <EyeOff className="w-4 h-4 text-[#8B4513]" />
                      第 {idx + 1} 句答案隐藏中 （点击揭晓答案）
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setRevealedState({})}
              className="px-4 py-2 text-xs bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#2C2C2C] rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-[#E5E2D9]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              重新遮挡全部
            </button>

            <button
              onClick={handleCompleteMastery}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              通关并打卡已掌握！
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
