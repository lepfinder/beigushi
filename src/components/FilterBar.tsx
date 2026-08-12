import React from 'react';
import { FilterState, ItemCategory, StudyStatus } from '../types';
import { CATEGORY_OPTIONS, DYNASTY_OPTIONS, GRADE_OPTIONS, TAG_OPTIONS } from '../data/poemsData';
import { Bookmark, CheckCircle2, Clock, Sparkles, Filter, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatching: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, totalMatching }) => {
  const isFiltered =
    filters.grade !== 'all' ||
    filters.category !== 'all' ||
    filters.dynasty !== 'all' ||
    filters.tag !== 'all' ||
    filters.status !== 'all' ||
    filters.searchQuery !== '';

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      stage: filters.stage, // retain active stage
      grade: 'all',
      category: 'all',
      dynasty: 'all',
      tag: 'all',
      status: 'all'
    });
  };

  return (
    <div className="bg-[#FAF9F6] border-b border-[#E5E2D9] py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Row 1: Grade Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs uppercase tracking-wider">
          <span className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest shrink-0 mr-1.5">年级指引:</span>
          {GRADE_OPTIONS.map(g => {
            const isActive = filters.grade === g.value;
            return (
              <button
                key={g.value}
                onClick={() => setFilters(prev => ({ ...prev, grade: g.value }))}
                className={`px-3 py-1 rounded-full shrink-0 transition-all text-xs ${
                  isActive
                    ? 'bg-[#8B4513] text-white font-bold shadow-2xs'
                    : 'bg-[#F5F2EA] text-[#2C2C2C] hover:bg-[#E5E2D9] border border-[#E5E2D9] font-medium'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Category, Status, Theme, Dynasty Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F0EDE6]">
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Category Pill Buttons */}
            <div className="flex items-center bg-[#F5F2EA] p-0.5 rounded-full border border-[#E5E2D9]">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setFilters(prev => ({ ...prev, category: cat.value as ItemCategory | 'all' }))}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    filters.category === cat.value
                      ? 'bg-white text-[#8B4513] font-bold shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center bg-[#F5F2EA] p-0.5 rounded-full border border-[#E5E2D9]">
              <button
                onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
                className={`px-3 py-1 rounded-full transition-all ${
                  filters.status === 'all'
                    ? 'bg-white text-[#2C2C2C] font-bold shadow-2xs'
                    : 'text-gray-600'
                }`}
              >
                全部状态
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, status: 'mastered' }))}
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all ${
                  filters.status === 'mastered'
                    ? 'bg-emerald-700 text-white font-bold shadow-2xs'
                    : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                已熟练
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, status: 'favorite' }))}
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all ${
                  filters.status === 'favorite'
                    ? 'bg-amber-800 text-white font-bold shadow-2xs'
                    : 'text-amber-900 hover:bg-amber-50'
                }`}
              >
                <Bookmark className="w-3 h-3 fill-current" />
                收藏
              </button>
            </div>

            {/* Dynasty Dropdown */}
            <select
              value={filters.dynasty}
              onChange={(e) => setFilters(prev => ({ ...prev, dynasty: e.target.value }))}
              className="bg-[#F5F2EA] text-[#2C2C2C] border border-[#E5E2D9] rounded-full px-3 py-1 text-xs focus:outline-none focus:border-[#8B4513]"
            >
              {DYNASTY_OPTIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Tag / Theme Dropdown */}
            <select
              value={filters.tag}
              onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
              className="bg-[#F5F2EA] text-[#2C2C2C] border border-[#E5E2D9] rounded-full px-3 py-1 text-xs focus:outline-none focus:border-[#8B4513]"
            >
              {TAG_OPTIONS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

          </div>

          {/* Right side: Count & Reset */}
          <div className="flex items-center gap-3 text-xs text-gray-500 ml-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2C2C]">
              选出 <strong className="text-[#8B4513] font-bold text-sm">{totalMatching}</strong> 篇
            </span>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#8B4513] hover:underline font-bold text-[10px] uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" />
                重置筛选
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
