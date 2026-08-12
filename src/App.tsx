/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PoemItem, FilterState, StudyStatus } from './types';
import { initialPoemsData } from './data/poemsData';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PoemCard } from './components/PoemCard';
import { PoemDetailModal } from './components/PoemDetailModal';
import { StudyStatsModal } from './components/StudyStatsModal';
import { AddCustomItemModal } from './components/AddCustomItemModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { RecitePracticeModal } from './components/RecitePracticeModal';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Plus,
  Search,
  RotateCcw,
  GraduationCap,
  Bookmark,
  CheckCircle2
} from 'lucide-react';

const LOCAL_STORAGE_STATUS_KEY = 'gushi_study_status_v1';
const LOCAL_STORAGE_FAV_KEY = 'gushi_favorites_v1';
const LOCAL_STORAGE_CUSTOM_KEY = 'gushi_custom_poems_v1';

export default function App() {
  // 1. Storage States
  const [statusMap, setStatusMap] = useState<Record<string, StudyStatus>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_STATUS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAV_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customPoems, setCustomPoems] = useState<PoemItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_STATUS_KEY, JSON.stringify(statusMap));
  }, [statusMap]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(customPoems));
  }, [customPoems]);

  // Combine initial built-in poems with user-added custom poems
  const allPoems = useMemo(() => {
    return [...initialPoemsData, ...customPoems];
  }, [customPoems]);

  // 2. Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    stage: 'primary', // Default to Primary School (小学)
    grade: 'all',
    category: 'all',
    dynasty: 'all',
    tag: 'all',
    status: 'all'
  });

  // 3. Modal / Drawer Toggle States
  const [selectedPoem, setSelectedPoem] = useState<PoemItem | null>(null);
  const [recitePoem, setRecitePoem] = useState<PoemItem | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  // Filter poems according to active options
  const filteredPoems = useMemo(() => {
    return allPoems.filter(item => {
      // Filter Stage
      if (filters.stage !== 'all' && item.stage !== filters.stage) {
        return false;
      }

      // Filter Grade
      if (filters.grade !== 'all' && item.grade !== filters.grade) {
        return false;
      }

      // Filter Category
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Filter Dynasty
      if (filters.dynasty !== 'all' && filters.dynasty !== '全朝代' && item.dynasty !== filters.dynasty) {
        return false;
      }

      // Filter Tag / Theme
      if (filters.tag !== 'all' && filters.tag !== '全部主题' && !item.tags.includes(filters.tag)) {
        return false;
      }

      // Filter Mastery Status / Favorites
      if (filters.status === 'favorite') {
        if (!favorites[item.id]) return false;
      } else if (filters.status !== 'all') {
        const itemStatus = statusMap[item.id] || 'unlearned';
        if (itemStatus !== filters.status) return false;
      }

      // Filter Search Keyword
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const titleMatch = item.title.toLowerCase().includes(q);
        const authorMatch = item.author.toLowerCase().includes(q);
        const dynastyMatch = item.dynasty.toLowerCase().includes(q);
        const contentMatch = item.content.some(line => line.toLowerCase().includes(q));
        const pinyinMatch = item.pinyinTitle?.toLowerCase().includes(q);

        if (!titleMatch && !authorMatch && !dynastyMatch && !contentMatch && !pinyinMatch) {
          return false;
        }
      }

      return true;
    });
  }, [allPoems, filters, favorites, statusMap]);

  // Handlers for Favorite & Status toggles
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleStatus = (id: string, newStatus: StudyStatus, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStatusMap(prev => ({ ...prev, [id]: newStatus }));
  };

  const handleAddCustomPoem = (newItem: PoemItem) => {
    setCustomPoems(prev => [newItem, ...prev]);
    setSelectedPoem(newItem);
  };

  // Export / Import Data
  const handleExportData = () => {
    const data = {
      statusMap,
      favorites,
      customPoems,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `古诗词学习背诵备份_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.statusMap) setStatusMap(parsed.statusMap);
        if (parsed.favorites) setFavorites(parsed.favorites);
        if (parsed.customPoems) setCustomPoems(parsed.customPoems);
        alert('复原背诵数据与自定义名篇成功！');
      } catch (err) {
        alert('解析文件失败，请确保格式正确。');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (confirm('确定要清空全部背诵进度与记录吗？')) {
      setStatusMap({});
      setFavorites({});
    }
  };

  // Calculate counts for header
  const totalCount = allPoems.length;
  const masteredCount = Object.values(statusMap).filter(s => s === 'mastered').length;
  const favoriteCount = Object.values(favorites).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] font-sans flex flex-col antialiased selection:bg-[#8B4513]/20">
      
      {/* Top Navigation Bar */}
      <Header
        filters={filters}
        setFilters={setFilters}
        totalCount={totalCount}
        masteredCount={masteredCount}
        favoriteCount={favoriteCount}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />

      {/* Filter Control Bar */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        totalMatching={filteredPoems.length}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Hero Greeting */}
        <div className="mb-8 p-6 bg-[#FDFBF7] rounded-lg border border-[#E5E2D9] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#8B4513] rounded-full"></span>
              ELEMENTARY & SECONDARY CLASSIC POETRY COLLECTION
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] flex items-center justify-center sm:justify-start gap-2">
              <GraduationCap className="w-6 h-6 text-[#8B4513]" />
              {filters.stage === 'primary' && '小学统编版古诗词 113 首与背诵课文典藏'}
              {filters.stage === 'junior' && '初中必备古诗文名篇选集'}
              {filters.stage === 'senior' && '高中必备必修与选修古诗文精选'}
              {filters.stage === 'all' && '全学段经典古诗词与课文全集'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-serif">
              搭载拼音点查、语音朗读、后半句掩码背诵测验及 Gemini AI 名师解诗，全屏优雅对齐展示。
            </p>
          </div>

          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="px-6 py-2.5 bg-[#8B4513] hover:bg-[#72380f] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-2xs flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            问问AI诗词导师
          </button>
        </div>

        {/* Poem Grid */}
        {filteredPoems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredPoems.map(poem => (
              <PoemCard
                key={poem.id}
                item={poem}
                status={statusMap[poem.id] || 'unlearned'}
                isFavorite={!!favorites[poem.id]}
                onSelect={(item) => setSelectedPoem(item)}
                onToggleFavorite={handleToggleFavorite}
                onToggleStatus={handleToggleStatus}
                onStartRecite={(item, e) => {
                  e.stopPropagation();
                  setRecitePoem(item);
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter Result */
          <div className="py-16 p-8 text-center space-y-4 max-w-md mx-auto bg-[#FDFBF7] rounded-lg border border-[#E5E2D9]">
            <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#8B4513] mx-auto flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif text-[#2C2C2C]">
              未找到符合条件的古诗或课文
            </h3>
            <p className="text-xs text-gray-500">
              您可以尝试更换搜索关键字，重置年级/主题筛选条件，或者亲自添加新的课文。
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setFilters({
                  searchQuery: '',
                  stage: 'primary',
                  grade: 'all',
                  category: 'all',
                  dynasty: 'all',
                  tag: 'all',
                  status: 'all'
                })}
                className="px-5 py-2 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#2C2C2C] text-xs font-bold uppercase tracking-wider rounded-full border border-[#E5E2D9] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重置筛选条件
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2 bg-[#8B4513] hover:bg-[#72380f] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                添加此课文
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto h-14 bg-white border-t border-[#E5E2D9] flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-[10px] text-gray-400 font-bold tracking-widest uppercase gap-2 py-2 sm:py-0">
        <span>中华经典古诗词 · 部编版必背典藏</span>
        <div className="flex gap-6 text-gray-500">
          <span>古诗词模块</span>
          <span>文言文模块</span>
          <span>语音与AI智能解析</span>
        </div>
        <span>2026 EDITORIAL EDITION</span>
      </footer>

      {/* Floating Bottom Bar for Mobile Quick Actions */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="p-3 bg-[#8B4513] text-white rounded-full shadow-lg hover:bg-[#72380f] transition-all flex items-center justify-center"
          title="AI诗词助手"
        >
          <Sparkles className="w-5 h-5 text-amber-200" />
        </button>
        <button
          onClick={() => setIsStatsOpen(true)}
          className="p-3 bg-[#F5F2EA] text-[#8B4513] border border-[#E5E2D9] rounded-full shadow-lg hover:bg-[#E5E2D9] transition-all flex items-center justify-center"
          title="背诵进度看板"
        >
          <Trophy className="w-5 h-5" />
        </button>
      </div>

      {/* MODALS & DRAWERS */}
      
      {/* Detail & Reader Modal */}
      <PoemDetailModal
        item={selectedPoem}
        allPoems={filteredPoems}
        statusMap={statusMap}
        favorites={favorites}
        onClose={() => setSelectedPoem(null)}
        onSelectPoem={(item) => setSelectedPoem(item)}
        onToggleFavorite={handleToggleFavorite}
        onToggleStatus={handleToggleStatus}
      />

      {/* Recite Drill Modal */}
      <RecitePracticeModal
        item={recitePoem}
        onClose={() => setRecitePoem(null)}
        onMarkMastered={(id) => handleToggleStatus(id, 'mastered')}
      />

      {/* Learning Stats Modal */}
      {isStatsOpen && (
        <StudyStatsModal
          poems={allPoems}
          statusMap={statusMap}
          favorites={favorites}
          onClose={() => setIsStatsOpen(false)}
          onSelectPoem={(item) => setSelectedPoem(item)}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onResetProgress={handleResetProgress}
        />
      )}

      {/* Add Custom Item Modal */}
      {isAddModalOpen && (
        <AddCustomItemModal
          onClose={() => setIsAddModalOpen(false)}
          onAddPoem={handleAddCustomPoem}
        />
      )}

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />

    </div>
  );
}
