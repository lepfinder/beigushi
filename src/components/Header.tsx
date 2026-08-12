import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  Sparkles,
  Plus,
  GraduationCap,
  BarChart2,
  Menu,
  X,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { EducationStage, FilterState } from '../types';

interface HeaderProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  masteredCount: number;
  favoriteCount: number;
  onOpenStats: () => void;
  onOpenAddModal: () => void;
  onOpenAiDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  setFilters,
  totalCount,
  masteredCount,
  favoriteCount,
  onOpenStats,
  onOpenAddModal,
  onOpenAiDrawer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stages: { id: EducationStage | 'all'; label: string; countBadge?: string }[] = [
    { id: 'primary', label: '小学 (1-6年级)', countBadge: '113首+课文' },
    { id: 'junior', label: '初中 (7-9年级)', countBadge: '拓展' },
    { id: 'senior', label: '高中 (必修/选修)', countBadge: '扩展' },
    { id: 'all', label: '全部学段' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E5E2D9] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#8B4513] text-white flex items-center justify-center rounded-sm font-serif text-xl font-bold shrink-0">
              詩
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-[#2C2C2C] flex items-center gap-2">
                中华经典古诗词
                <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] font-bold font-sans uppercase tracking-widest bg-[#F5F2EA] text-[#8B4513] rounded-full">
                  典藏版
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-sans hidden sm:block">
                中小学必背古诗词与典藏课文大汇总
              </p>
            </div>
          </div>

          {/* Search bar on Tablet/Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="搜索古诗、课文标题、作者、诗句、朝代..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E5E2D9] rounded-full text-[#2C2C2C] placeholder-gray-400 focus:outline-none focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513]/20 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-[#E5E2D9] rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Learning Stats Button */}
            <button
              onClick={onOpenStats}
              id="header-stats-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2C2C2C] bg-[#F5F2EA] hover:bg-[#E5E2D9] border border-[#E5E2D9] rounded-full transition-colors"
              title="背诵进度看板"
            >
              <BarChart2 className="w-4 h-4 text-[#8B4513]" />
              <span className="hidden sm:inline">进度</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#8B4513] text-white rounded-full">
                {masteredCount}/{totalCount}
              </span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiDrawer}
              id="header-ai-btn"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8B4513] hover:bg-[#72380f] rounded-full transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span className="hidden sm:inline">AI诗词导师</span>
            </button>

            {/* Add Custom Poem/Text */}
            <button
              onClick={onOpenAddModal}
              id="header-add-btn"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8B4513] border border-[#8B4513] hover:bg-[#F5F2EA] rounded-full transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>添加课文</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="header-mobile-toggle"
              className="md:hidden p-2 text-gray-600 hover:bg-[#F5F2EA] rounded-lg"
              aria-label="切换导航菜单"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar on Mobile */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="搜索诗词、课文、作者、名句..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF9F6] border border-[#E5E2D9] rounded-full text-[#2C2C2C] placeholder-gray-400 focus:outline-none focus:border-[#8B4513]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs bg-[#E5E2D9] rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Education Stage Tabs (Primary, Junior, Senior) */}
        <div className="flex items-center gap-3 overflow-x-auto py-2.5 no-scrollbar border-t border-[#F0EDE6] text-xs font-medium uppercase tracking-wider">
          <span className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            学段分类:
          </span>
          {stages.map(st => {
            const isActive = filters.stage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setFilters(prev => ({ ...prev, stage: st.id, grade: 'all' }))}
                className={`px-3.5 py-1 rounded-full shrink-0 transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#F5F2EA] text-[#8B4513] border-b-2 border-[#8B4513] pb-1'
                    : 'text-gray-400 hover:text-gray-600 border border-transparent'
                }`}
              >
                {st.label}
                {st.countBadge && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full ${
                    isActive ? 'bg-[#8B4513] text-white' : 'bg-[#E5E2D9] text-gray-600'
                  }`}>
                    {st.countBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#E5E2D9] space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-mono">
              <span>背诵进度: {masteredCount}/{totalCount} 篇</span>
              <span>收藏: {favoriteCount} 篇</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onOpenAddModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold bg-[#8B4513] text-white rounded-full tracking-wider"
              >
                <Plus className="w-4 h-4" />
                添加自定义课文
              </button>

              <button
                onClick={() => {
                  onOpenStats();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold bg-[#F5F2EA] text-[#8B4513] border border-[#E5E2D9] rounded-full tracking-wider"
              >
                <BarChart2 className="w-4 h-4 text-[#8B4513]" />
                背诵进度统计
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
