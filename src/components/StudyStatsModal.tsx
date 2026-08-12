import React from 'react';
import { PoemItem, StudyStatus } from '../types';
import { GRADE_OPTIONS } from '../data/poemsData';
import { X, CheckCircle2, Bookmark, BarChart2, Download, Upload, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface StudyStatsModalProps {
  poems: PoemItem[];
  statusMap: Record<string, StudyStatus>;
  favorites: Record<string, boolean>;
  onClose: () => void;
  onSelectPoem: (item: PoemItem) => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetProgress: () => void;
}

export const StudyStatsModal: React.FC<StudyStatsModalProps> = ({
  poems,
  statusMap,
  favorites,
  onClose,
  onSelectPoem,
  onExportData,
  onImportData,
  onResetProgress
}) => {
  const totalCount = poems.length;
  const masteredCount = Object.values(statusMap).filter(s => s === 'mastered').length;
  const learningCount = Object.values(statusMap).filter(s => s === 'learning').length;
  const favoriteItems = poems.filter(p => favorites[p.id]);

  const percentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Grade Breakdown
  const gradeStats = GRADE_OPTIONS.filter(g => g.value !== 'all').map(g => {
    const gradePoems = poems.filter(p => p.grade === g.value);
    const gradeMastered = gradePoems.filter(p => statusMap[p.id] === 'mastered').length;
    const rate = gradePoems.length > 0 ? Math.round((gradeMastered / gradePoems.length) * 100) : 0;

    return {
      grade: g.label,
      total: gradePoems.length,
      mastered: gradeMastered,
      rate
    };
  }).filter(gs => gs.total > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#FAF9F6] border border-[#E5E2D9] w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative text-[#2C2C2C]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#8B4513]" />
            <h2 className="text-base font-bold font-serif text-[#2C2C2C] tracking-tight">
              古诗词与课文背诵学习看板
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#2C2C2C] hover:bg-[#F5F2EA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overall Score Card */}
          <div className="p-6 bg-white rounded-lg border border-[#F0EDE6] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest font-sans block">
                OVERALL MASTERY RATE / 总体背诵掌握率
              </span>
              <div className="text-4xl sm:text-5xl font-bold font-serif text-[#2C2C2C]">
                {percentage}%
              </div>
              <p className="text-xs text-gray-500 font-sans pt-1">
                已熟练背诵 <strong className="text-emerald-700 font-bold">{masteredCount}</strong> 篇 / 共 {totalCount} 篇
              </p>
            </div>

            {/* Progress Circle Visual */}
            <div className="w-24 h-24 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#F5F2EA"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="#8B4513"
                  strokeWidth="8"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 - (238.7 * percentage) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <Sparkles className="w-6 h-6 text-[#8B4513] absolute" />
            </div>
          </div>

          {/* Grade Breakdown Progress Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#8B4513] font-sans uppercase tracking-widest flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />
              分年级背诵进度
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gradeStats.map(gs => (
                <div key={gs.grade} className="p-3.5 bg-white rounded-lg border border-[#F0EDE6] text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-[#2C2C2C] font-serif">{gs.grade}</span>
                    <span className="text-[#8B4513] font-mono font-bold">{gs.mastered}/{gs.total} ({gs.rate}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F5F2EA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#8B4513] rounded-full transition-all duration-500"
                      style={{ width: `${gs.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Items List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#8B4513] font-sans uppercase tracking-widest flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 fill-current text-[#8B4513]" />
              我的收藏名篇 ({favoriteItems.length}篇)
            </h3>

            {favoriteItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                {favoriteItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectPoem(item);
                      onClose();
                    }}
                    className="p-3 text-left bg-white hover:bg-[#F5F2EA] border border-[#F0EDE6] hover:border-[#E5E2D9] rounded-lg text-xs truncate transition-colors"
                  >
                    <span className="font-bold text-[#2C2C2C] font-serif block truncate">{item.title}</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-0.5">〔{item.dynasty}〕{item.author}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic py-2">暂无收藏的课文，点击课文卡片右上角书签图标即可收藏。</p>
            )}
          </div>

          {/* Backup Data & Export/Import */}
          <div className="pt-4 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={onExportData}
                className="px-3.5 py-1.5 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#2C2C2C] border border-[#E5E2D9] rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                导出背诵记录
              </button>

              <label className="px-3.5 py-1.5 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#2C2C2C] border border-[#E5E2D9] rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                导入备份
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={onResetProgress}
              className="text-[#8B4513] hover:underline font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              清空背诵进度
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
