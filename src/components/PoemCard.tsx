import React from 'react';
import { PoemItem, StudyStatus } from '../types';
import { Bookmark, CheckCircle2, Clock, BookOpen, Volume2, Sparkles } from 'lucide-react';

interface PoemCardProps {
  item: PoemItem;
  status: StudyStatus;
  isFavorite: boolean;
  onSelect: (item: PoemItem) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onToggleStatus: (id: string, newStatus: StudyStatus, e: React.MouseEvent) => void;
  onStartRecite: (item: PoemItem, e: React.MouseEvent) => void;
  showPinyinPreview?: boolean;
}

export const PoemCard: React.FC<PoemCardProps> = ({
  item,
  status,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onToggleStatus,
  onStartRecite,
  showPinyinPreview = true
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            已背诵
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-700" />
            背诵中
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-[#F5F2EA] border border-[#E5E2D9]">
            待学习
          </span>
        );
    }
  };

  // Preview lines (first 2 lines)
  const previewLines = item.content.slice(0, 2);

  return (
    <div
      onClick={() => onSelect(item)}
      id={`poem-card-${item.id}`}
      className="group relative bg-white hover:bg-[#FDFBF7] border border-[#E5E2D9] border-l-4 border-l-[#8B4513] rounded-r-md p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Top Bar: Grade Badge & Favorite / Status */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F5F2EA] text-[#8B4513] rounded-full">
            {item.grade}
          </span>
          {item.rhythm && (
            <span className="px-2 py-0.5 text-[10px] text-gray-500 bg-transparent border border-[#E5E2D9] rounded-full">
              {item.rhythm}
            </span>
          )}
          {item.category === 'prose' && (
            <span className="px-2 py-0.5 text-[10px] text-[#8B4513] bg-[#F5F2EA] font-bold rounded-full">
              古文/课文
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {getStatusBadge()}
          <button
            onClick={(e) => onToggleFavorite(item.id, e)}
            id={`fav-btn-${item.id}`}
            className={`p-1.5 rounded-full transition-colors ${
              isFavorite
                ? 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                : 'text-gray-400 hover:text-amber-800 hover:bg-[#F5F2EA]'
            }`}
            title={isFavorite ? '取消收藏' : '收藏此篇'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Title & Author */}
      <div className="my-1">
        {showPinyinPreview && item.pinyinTitle && (
          <p className="text-[11px] text-gray-400 font-mono tracking-wider mb-0.5">
            {item.pinyinTitle}
          </p>
        )}
        <h3 className="text-lg sm:text-xl font-bold font-serif text-[#2C2C2C] group-hover:text-[#8B4513] transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-[#8B4513] font-serif italic mt-0.5">
          〔{item.dynasty}〕{item.author}
        </p>
      </div>

      {/* Excerpt Body */}
      <div className="my-3 p-3 bg-[#FAF9F6] rounded-md border border-[#F0EDE6] font-serif text-sm text-gray-700 leading-relaxed">
        {previewLines.map((line, idx) => (
          <p key={idx} className="truncate">
            {line}
          </p>
        ))}
        {item.content.length > 2 && (
          <p className="text-[11px] text-gray-400 mt-1 font-sans font-normal">
            …… （共{item.content.length}句）
          </p>
        )}
      </div>

      {/* Bottom Tags & Action Bar */}
      <div className="pt-2 border-t border-[#F0EDE6] flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-gray-500 bg-[#F5F2EA] px-2 py-0.5 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Recite Practice Button */}
          <button
            onClick={(e) => onStartRecite(item, e)}
            className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#8B4513] hover:bg-[#72380f] rounded-full transition-colors flex items-center gap-1"
            title="背诵冲刺与填空练习"
          >
            <Sparkles className="w-3 h-3 text-amber-200" />
            背诵测试
          </button>

          {/* Quick Mark Status */}
          <button
            onClick={(e) => {
              const nextStatus: StudyStatus = status === 'mastered' ? 'unlearned' : 'mastered';
              onToggleStatus(item.id, nextStatus, e);
            }}
            className={`p-1.5 rounded-full text-xs transition-colors ${
              status === 'mastered'
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-[#F5F2EA] text-[#8B4513] hover:bg-[#E5E2D9]'
            }`}
            title={status === 'mastered' ? '标记为未掌握' : '一键标记为已背诵'}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
