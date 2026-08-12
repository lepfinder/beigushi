import React, { useState, useEffect } from 'react';
import { PoemItem, ReaderSettings, StudyStatus } from '../types';
import {
  X,
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  FileText,
  MessageSquare,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  AArrowUp,
  AArrowDown,
  LayoutGrid
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PoemDetailModalProps {
  item: PoemItem | null;
  allPoems: PoemItem[];
  statusMap: Record<string, StudyStatus>;
  favorites: Record<string, boolean>;
  onClose: () => void;
  onSelectPoem: (item: PoemItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleStatus: (id: string, newStatus: StudyStatus) => void;
}

export const PoemDetailModal: React.FC<PoemDetailModalProps> = ({
  item,
  allPoems,
  statusMap,
  favorites,
  onClose,
  onSelectPoem,
  onToggleFavorite,
  onToggleStatus
}) => {
  if (!item) return null;

  // Active Tab: 'original' | 'notes' | 'appreciation' | 'recite' | 'ai'
  const [activeTab, setActiveTab] = useState<'original' | 'notes' | 'appreciation' | 'recite' | 'ai'>('original');

  // Reader Settings State
  const [showPinyin, setShowPinyin] = useState(true);
  const [readingLayout, setReadingLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl' | '2xl'>('xl');
  const [reciteMask, setReciteMask] = useState<'none' | 'hideAll' | 'hideKeywords' | 'hideEven'>('none');

  // Selected annotation popover
  const [selectedWordNote, setSelectedWordNote] = useState<{ word: string; meaning: string } | null>(null);

  // Audio Speech Synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentSpeechLineIndex, setCurrentSpeechLineIndex] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // AI Assistant inside Modal
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Recite Card Flip / Blank State
  const [revealedLines, setRevealedLines] = useState<Record<number, boolean>>({});

  const isFavorite = !!favorites[item.id];
  const currentStatus = statusMap[item.id] || 'unlearned';

  // Navigation: Find prev & next item in filtered list
  const currentIndex = allPoems.findIndex(p => p.id === item.id);
  const prevPoem = currentIndex > 0 ? allPoems[currentIndex - 1] : null;
  const nextPoem = currentIndex < allPoems.length - 1 ? allPoems[currentIndex + 1] : null;

  // Stop audio when modal closes or item changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setCurrentSpeechLineIndex(null);
    setRevealedLines({});
    setAiAnswer(null);
  }, [item.id]);

  // Handle Speech Synthesis
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的浏览器暂不支持语音朗读功能。');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setCurrentSpeechLineIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.title}。${item.dynasty}，${item.author}。${item.content.join('。')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'zh-CN';
    utterance.rate = speechRate;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setCurrentSpeechLineIndex(null);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setCurrentSpeechLineIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // AI Ask Query
  const handleAskAi = async () => {
    if (!aiQuestion.trim() && !aiAnswer) {
      setAiQuestion('这首诗表达了作者怎样的情感？有什么背诵技巧？');
    }
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          author: item.author,
          dynasty: item.dynasty,
          content: item.content.join('\n'),
          question: aiQuestion || '请解析这首诗词的艺术特征与学生背诵要点。'
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setAiAnswer(data.text);
      } else {
        setAiAnswer(`解析失败: ${data.error || '无法连接AI服务'}`);
      }
    } catch (err: any) {
      setAiAnswer('网络请求异常，请重试。');
    } finally {
      setAiLoading(false);
    }
  };

  // Celebrate Mastered Status
  const handleMarkMastered = () => {
    const newStatus: StudyStatus = currentStatus === 'mastered' ? 'unlearned' : 'mastered';
    onToggleStatus(item.id, newStatus);
    if (newStatus === 'mastered') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Font class mapping
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm sm:text-base';
      case 'base': return 'text-base sm:text-lg';
      case 'lg': return 'text-lg sm:text-xl';
      case 'xl': return 'text-xl sm:text-2xl';
      case '2xl': return 'text-2xl sm:text-3xl';
      default: return 'text-xl sm:text-2xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white border border-[#E5E2D9] w-full max-w-4xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative text-[#2C2C2C]">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F5F2EA] text-[#8B4513] rounded-full">
              {item.grade}
            </span>
            <span className="text-sm font-bold font-serif text-[#2C2C2C] truncate">
              《{item.title}》
            </span>
            <span className="text-xs text-[#8B4513] font-serif italic hidden sm:inline">
              〔{item.dynasty}〕{item.author}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev & Next Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-[#F5F2EA] p-0.5 rounded-full border border-[#E5E2D9]">
              <button
                disabled={!prevPoem}
                onClick={() => prevPoem && onSelectPoem(prevPoem)}
                className="p-1 text-gray-600 hover:text-[#8B4513] disabled:opacity-30"
                title="上一篇"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500 px-1 font-mono">
                {currentIndex + 1}/{allPoems.length}
              </span>
              <button
                disabled={!nextPoem}
                onClick={() => nextPoem && onSelectPoem(nextPoem)}
                className="p-1 text-gray-600 hover:text-[#8B4513] disabled:opacity-30"
                title="下一篇"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-full border transition-colors ${
                isFavorite
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-[#F5F2EA] text-gray-500 border-[#E5E2D9] hover:bg-[#E5E2D9]'
              }`}
              title={isFavorite ? '取消收藏' : '加入收藏'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current text-amber-800' : ''}`} />
            </button>

            {/* Mark Mastered Button */}
            <button
              onClick={handleMarkMastered}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all flex items-center gap-1 ${
                currentStatus === 'mastered'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                  : 'bg-[#F5F2EA] text-emerald-800 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentStatus === 'mastered' ? '已熟练背诵' : '标记为已背诵'}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              id="close-poem-modal-btn"
              className="p-1.5 text-gray-500 hover:text-[#8B4513] hover:bg-[#F5F2EA] rounded-full transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Toolbar (Pinyin toggle, Font size, Layout, TTS) */}
        <div className="px-5 py-2.5 bg-[#F5F2EA] border-b border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          
          <div className="flex items-center gap-3">
            {/* Pinyin Switcher */}
            <button
              onClick={() => setShowPinyin(!showPinyin)}
              className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                showPinyin
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-white text-gray-700 border border-[#E5E2D9] hover:bg-[#FAF9F6]'
              }`}
            >
              <span>拼音</span>
              <span className="text-[10px]">{showPinyin ? '开启' : '关闭'}</span>
            </button>

            {/* Reading Layout (Horizontal / Vertical) */}
            <button
              onClick={() => setReadingLayout(readingLayout === 'horizontal' ? 'vertical' : 'horizontal')}
              className="px-3 py-1 rounded-full border border-[#E5E2D9] text-gray-700 bg-white hover:bg-[#FAF9F6] hidden sm:flex items-center gap-1 text-xs font-medium"
              title="切换横排/古风竖排显示"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>{readingLayout === 'horizontal' ? '横排显示' : '古风竖排'}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center bg-white p-0.5 rounded-full border border-[#E5E2D9]">
              <button
                onClick={() => setFontSize('base')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${fontSize === 'base' ? 'bg-[#8B4513] font-bold text-white' : 'text-gray-600'}`}
              >
                标准字
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${fontSize === 'xl' ? 'bg-[#8B4513] font-bold text-white' : 'text-gray-600'}`}
              >
                大号字
              </button>
              <button
                onClick={() => setFontSize('2xl')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${fontSize === '2xl' ? 'bg-[#8B4513] font-bold text-white' : 'text-gray-600'}`}
              >
                超大字
              </button>
            </div>
          </div>

          {/* Audio TTS Player */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              id="tts-play-btn"
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-2xs ${
                isPlayingAudio
                  ? 'bg-amber-700 text-white animate-pulse'
                  : 'bg-[#8B4513] text-white hover:bg-[#72380f]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>停止朗读</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>语音朗读</span>
                </>
              )}
            </button>

            {/* TTS Speed */}
            <select
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="bg-white border border-[#E5E2D9] text-[#2C2C2C] rounded-full px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value={0.8}>0.8x 慢速</option>
              <option value={0.9}>0.9x 适合小学生</option>
              <option value={1.0}>1.0x 标准速</option>
              <option value={1.2}>1.2x 快速</option>
            </select>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="px-5 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-medium shrink-0">
          <button
            onClick={() => setActiveTab('original')}
            className={`px-4 py-3 border-b-2 font-serif flex items-center gap-1.5 transition-colors ${
              activeTab === 'original'
                ? 'border-[#8B4513] text-[#8B4513] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>原文与注音</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-3 border-b-2 font-serif flex items-center gap-1.5 transition-colors ${
              activeTab === 'notes'
                ? 'border-[#8B4513] text-[#8B4513] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>注释与译文</span>
            {item.notes && item.notes.length > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-[#F5F2EA] text-[#8B4513] font-bold rounded-full">
                {item.notes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('appreciation')}
            className={`px-4 py-3 border-b-2 font-serif flex items-center gap-1.5 transition-colors ${
              activeTab === 'appreciation'
                ? 'border-[#8B4513] text-[#8B4513] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#8B4513]" />
            <span>赏析与背景</span>
          </button>

          <button
            onClick={() => setActiveTab('recite')}
            className={`px-4 py-3 border-b-2 font-serif flex items-center gap-1.5 transition-colors ${
              activeTab === 'recite'
                ? 'border-[#8B4513] text-[#8B4513] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <EyeOff className="w-4 h-4 text-[#8B4513]" />
            <span>背诵冲刺模式</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ai');
              if (!aiAnswer) handleAskAi();
            }}
            className={`px-4 py-3 border-b-2 font-serif flex items-center gap-1.5 transition-colors ${
              activeTab === 'ai'
                ? 'border-[#8B4513] text-[#8B4513] font-bold'
                : 'border-transparent text-amber-900 hover:text-amber-950'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>AI名师解诗</span>
          </button>
        </div>

        {/* Tab Main Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: ORIGINAL TEXT & PINYIN */}
          {activeTab === 'original' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              
              {/* Title & Author Header */}
              <div className="text-center space-y-2 pb-4 border-b border-[#E5E2D9]">
                {showPinyin && item.pinyinTitle && (
                  <p className="text-xs text-gray-400 font-mono tracking-widest">
                    {item.pinyinTitle}
                  </p>
                )}
                <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#2C2C2C] tracking-wide">
                  {item.title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-serif">
                  <span className="px-2.5 py-0.5 bg-[#F5F2EA] rounded-full border border-[#E5E2D9] text-xs font-bold text-[#8B4513]">
                    〔{item.dynasty}〕
                  </span>
                  <span className="font-semibold text-[#8B4513]">{item.author}</span>
                  {item.rhythm && (
                    <span className="text-xs text-gray-400">({item.rhythm})</span>
                  )}
                </div>
              </div>

              {/* Poem Body Text with Aligned Ruby Pinyin */}
              <div className={`py-6 px-4 sm:px-8 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] shadow-2xs font-serif ${getFontSizeClass()}`}>
                
                {readingLayout === 'horizontal' ? (
                  /* Horizontal Layout */
                  <div className="space-y-4 text-center leading-loose">
                    {item.pinyinWords?.map((lineWords, lineIdx) => (
                      <div
                        key={lineIdx}
                        className={`flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2 py-1 px-2 rounded-md transition-colors ${
                          currentSpeechLineIndex === lineIdx ? 'bg-amber-100/90 ring-1 ring-amber-400' : ''
                        }`}
                      >
                        {lineWords.map((cw, charIdx) => {
                          // Check if word has annotation
                          const note = item.notes?.find(n => n.word === cw.char || cw.char.includes(n.word));
                          return (
                            <div
                              key={charIdx}
                              onClick={() => note && setSelectedWordNote(note)}
                              className={`inline-flex flex-col items-center group relative cursor-pointer ${
                                note ? 'text-[#8B4513] font-bold underline decoration-dotted decoration-[#8B4513]/50' : ''
                              }`}
                            >
                              {showPinyin && cw.py && (
                                <span className="text-xs sm:text-sm font-sans font-normal text-gray-400 leading-tight select-none mb-0.5">
                                  {cw.py}
                                </span>
                              )}
                              <span className="px-0.5 group-hover:text-[#8B4513] transition-colors">
                                {cw.char}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Vertical Ancient Chinese Layout */
                  <div className="flex flex-row-reverse justify-center items-start gap-6 sm:gap-10 py-4 overflow-x-auto min-h-[220px]">
                    {item.pinyinWords?.map((lineWords, lineIdx) => (
                      <div
                        key={lineIdx}
                        className="flex flex-col items-center gap-2 py-2 px-1 border-r border-[#F0EDE6] last:border-r-0"
                      >
                        {lineWords.map((cw, charIdx) => (
                          <div key={charIdx} className="flex flex-col items-center">
                            {showPinyin && cw.py && (
                              <span className="text-[10px] text-gray-400 font-sans select-none">
                                {cw.py}
                              </span>
                            )}
                            <span className="text-xl font-serif">{cw.char}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Selected Word Annotation Popover Bar */}
              {selectedWordNote && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg flex items-start justify-between gap-2 text-xs sm:text-sm animate-fadeIn">
                  <div>
                    <span className="font-bold text-[#8B4513] text-base mr-2">
                      【{selectedWordNote.word}】
                    </span>
                    <span className="text-gray-800">{selectedWordNote.meaning}</span>
                  </div>
                  <button
                    onClick={() => setSelectedWordNote(null)}
                    className="text-gray-500 hover:text-gray-900 text-xs font-bold px-2.5 py-1 bg-amber-100 rounded-full"
                  >
                    关闭
                  </button>
                </div>
              )}

              {/* Quick Line Translation Preview */}
              <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6]">
                <h4 className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                  <span className="w-1.5 h-1.5 bg-[#8B4513] rounded-full"></span>
                  大意白话对照:
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 font-serif leading-relaxed">
                  {item.translation.map((trans, idx) => (
                    <p key={idx}>
                      <span className="text-gray-400 font-mono mr-2">{idx + 1}.</span>
                      {trans}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: NOTES & TRANSLATION */}
          {activeTab === 'notes' && (
            <div className="space-y-6 max-w-2xl mx-auto font-serif">
              
              {/* Word Annotations */}
              <div>
                <h3 className="text-xs font-bold text-[#8B4513] pb-2 border-b border-[#E5E2D9] mb-4 flex items-center gap-2 font-sans uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  字词重点注释 ({item.notes?.length || 0}条)
                </h3>
                {item.notes && item.notes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.notes.map((note, idx) => (
                      <div key={idx} className="p-3.5 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] text-sm">
                        <span className="font-bold text-[#8B4513] text-base block mb-0.5">
                          {note.word}
                        </span>
                        <span className="text-gray-700 leading-normal">{note.meaning}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic py-2">本篇字词浅显，无特殊难懂注释。</p>
                )}
              </div>

              {/* Modern Translation */}
              <div>
                <h3 className="text-xs font-bold text-[#8B4513] pb-2 border-b border-[#E5E2D9] mb-4 flex items-center gap-2 font-sans uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  完整白话文译文
                </h3>
                <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] space-y-2 text-sm sm:text-base text-[#2C2C2C] leading-relaxed">
                  {item.translation.map((line, idx) => (
                    <p key={idx} className="pl-3 border-l-2 border-[#8B4513]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: APPRECIATION & BACKGROUND */}
          {activeTab === 'appreciation' && (
            <div className="space-y-6 max-w-2xl mx-auto font-serif">
              
              {/* Appreciation */}
              <div>
                <h3 className="text-xs font-bold text-[#8B4513] pb-2 border-b border-[#E5E2D9] mb-4 flex items-center gap-2 font-sans uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#8B4513]" />
                  名篇赏析与意境解读
                </h3>
                <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] text-sm sm:text-base text-gray-800 leading-relaxed">
                  {item.appreciation}
                </div>
              </div>

              {/* Background */}
              {item.background && (
                <div>
                  <h3 className="text-xs font-bold text-[#8B4513] pb-2 border-b border-[#E5E2D9] mb-4 flex items-center gap-2 font-sans uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    写作背景与作者故事
                  </h3>
                  <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] text-sm text-gray-700 leading-relaxed">
                    {item.background}
                  </div>
                </div>
              )}

              {/* Tags & Rhyme Info */}
              <div className="p-3 bg-[#F5F2EA] rounded-lg text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2 font-sans border border-[#E5E2D9]">
                <span>体裁结构：{item.rhythm || '古诗'}</span>
                <div className="flex items-center gap-1">
                  <span>主题标签：</span>
                  {item.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 bg-white text-[#8B4513] font-bold rounded-full border border-[#E5E2D9]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: RECITATION DRILL MODE */}
          {activeTab === 'recite' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              
              <div className="p-3.5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-lg text-xs text-[#2C2C2C] flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-[#8B4513]" />
                  背诵自我检测：点击遮挡处可单独取消遮挡，检验背诵成果！
                </span>
                <button
                  onClick={() => setRevealedLines({})}
                  className="px-3 py-1 bg-[#F5F2EA] hover:bg-[#E5E2D9] rounded-full font-bold text-xs text-[#8B4513]"
                >
                  重置全部遮挡
                </button>
              </div>

              {/* Recite Mask selector */}
              <div className="flex items-center gap-2 justify-center text-xs font-bold uppercase tracking-wider">
                <span className="text-gray-500">遮挡模式:</span>
                <button
                  onClick={() => setReciteMask('hideAll')}
                  className={`px-3.5 py-1 rounded-full ${reciteMask === 'hideAll' ? 'bg-[#8B4513] text-white' : 'bg-[#F5F2EA] text-gray-700 border border-[#E5E2D9]'}`}
                >
                  遮挡全部全文
                </button>
                <button
                  onClick={() => setReciteMask('hideKeywords')}
                  className={`px-3.5 py-1 rounded-full ${reciteMask === 'hideKeywords' ? 'bg-[#8B4513] text-white' : 'bg-[#F5F2EA] text-gray-700 border border-[#E5E2D9]'}`}
                >
                  遮挡后半句
                </button>
                <button
                  onClick={() => setReciteMask('none')}
                  className={`px-3.5 py-1 rounded-full ${reciteMask === 'none' ? 'bg-[#8B4513] text-white' : 'bg-[#F5F2EA] text-gray-700 border border-[#E5E2D9]'}`}
                >
                  取消遮挡
                </button>
              </div>

              {/* Recite Interactive Card View */}
              <div className="p-8 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] font-serif text-xl sm:text-2xl text-center space-y-4">
                <h3 className="font-bold text-[#2C2C2C] text-2xl">{item.title}</h3>
                <p className="text-xs text-[#8B4513] italic font-serif">〔{item.dynasty}〕{item.author}</p>

                <div className="space-y-4 pt-4">
                  {item.content.map((line, idx) => {
                    const isRevealed = !!revealedLines[idx];

                    if (!isRevealed) {
                      if (reciteMask === 'hideAll') {
                        return (
                          <div
                            key={idx}
                            onClick={() => setRevealedLines(prev => ({ ...prev, [idx]: true }))}
                            className="py-2.5 px-4 bg-[#F5F2EA] border border-[#E5E2D9] text-[#8B4513] hover:bg-[#E5E2D9] rounded-lg cursor-pointer select-none font-sans text-xs font-bold tracking-wider transition-colors"
                          >
                            🙈 点击查看第 {idx + 1} 句答案 （点击揭晓）
                          </div>
                        );
                      } else if (reciteMask === 'hideKeywords') {
                        const mid = Math.floor(line.length / 2);
                        const firstHalf = line.slice(0, mid);

                        return (
                          <div key={idx} className="flex justify-center items-center gap-2">
                            <span>{firstHalf}</span>
                            <span
                              onClick={() => setRevealedLines(prev => ({ ...prev, [idx]: true }))}
                              className="bg-[#8B4513] text-white px-3 py-0.5 rounded-full cursor-pointer select-none text-xs font-bold font-sans hover:bg-[#72380f]"
                            >
                              ? 点击揭晓
                            </span>
                          </div>
                        );
                      }
                    }

                    return (
                      <p key={idx} className="text-[#2C2C2C] font-bold py-1">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleMarkMastered}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all flex items-center gap-2 mx-auto"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  能熟练背诵，打卡记录！
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: AI TUTOR QUESTION & ANSWER */}
          {activeTab === 'ai' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              
              <div className="p-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-lg space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#2C2C2C] text-sm font-serif">
                  <Sparkles className="w-4 h-4 text-[#8B4513]" />
                  AI 语文名师《{item.title}》专题解答
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="例如：这首诗的写作背景是什么？怎么快速记住？"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-[#E5E2D9] rounded-full text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
                  />
                  <button
                    onClick={handleAskAi}
                    disabled={aiLoading}
                    className="px-5 py-2 bg-[#8B4513] hover:bg-[#72380f] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors disabled:opacity-50 shrink-0"
                  >
                    {aiLoading ? 'AI思考中...' : '提问AI'}
                  </button>
                </div>

                {/* Preset Prompt Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
                  <span className="font-bold text-[#2C2C2C]">快速提问:</span>
                  <button
                    onClick={() => {
                      setAiQuestion('请用生动的语言讲一讲这首诗背后的故事');
                    }}
                    className="px-2.5 py-1 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#8B4513] font-medium rounded-full border border-[#E5E2D9]"
                  >
                    📜 背后故事
                  </button>
                  <button
                    onClick={() => {
                      setAiQuestion('这首诗包含什么修辞手法和好词好句？');
                    }}
                    className="px-2.5 py-1 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#8B4513] font-medium rounded-full border border-[#E5E2D9]"
                  >
                    ✨ 写作好词好句
                  </button>
                  <button
                    onClick={() => {
                      setAiQuestion('小孩子背这首诗有什么记忆口诀？');
                    }}
                    className="px-2.5 py-1 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#8B4513] font-medium rounded-full border border-[#E5E2D9]"
                  >
                    🧠 背诵记忆口诀
                  </button>
                </div>
              </div>

              {/* AI Output Display */}
              {aiAnswer && (
                <div className="p-6 bg-[#FAF9F6] rounded-lg border border-[#F0EDE6] text-sm text-[#2C2C2C] leading-relaxed font-serif whitespace-pre-wrap animate-fadeIn">
                  {aiAnswer}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="px-5 py-3 bg-[#FAF9F6] border-t border-[#E5E2D9] flex items-center justify-between text-xs text-gray-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B4513]">中华经典古诗词典藏</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => prevPoem && onSelectPoem(prevPoem)}
              disabled={!prevPoem}
              className="px-3 py-1 bg-[#F5F2EA] border border-[#E5E2D9] rounded-full text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-[#E5E2D9]"
            >
              ← 上一篇
            </button>
            <button
              onClick={() => nextPoem && onSelectPoem(nextPoem)}
              disabled={!nextPoem}
              className="px-3 py-1 bg-[#F5F2EA] border border-[#E5E2D9] rounded-full text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-[#E5E2D9]"
            >
              下一篇 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
