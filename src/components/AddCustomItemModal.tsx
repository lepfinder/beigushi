import React, { useState } from 'react';
import { EducationStage, ItemCategory, PoemItem } from '../types';
import { ensurePinyinData } from '../utils/pinyin';
import { X, Plus, Sparkles, BookOpen } from 'lucide-react';

interface AddCustomItemModalProps {
  onClose: () => void;
  onAddPoem: (newItem: PoemItem) => void;
}

export const AddCustomItemModal: React.FC<AddCustomItemModalProps> = ({ onClose, onAddPoem }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [dynasty, setDynasty] = useState('唐代');
  const [stage, setStage] = useState<EducationStage>('primary');
  const [grade, setGrade] = useState('三年级上册');
  const [category, setCategory] = useState<ItemCategory>('poetry');
  const [pinyinTitle, setPinyinTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [translationText, setTranslationText] = useState('');
  const [appreciation, setAppreciation] = useState('');
  const [tagsStr, setTagsStr] = useState('古诗, 必备');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contentText.trim()) {
      alert('请至少填写标题与内容！');
      return;
    }

    const contentLines = contentText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const translationLines = translationText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    const tags = tagsStr
      .split(/[,，\s]+/)
      .map(t => t.trim())
      .filter(Boolean);

    const newItem: PoemItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || '佚名',
      dynasty: dynasty.trim() || '未知',
      stage,
      grade,
      category,
      pinyinTitle: pinyinTitle.trim(),
      content: contentLines,
      pinyinWords: ensurePinyinData(contentLines),
      translation: translationLines.length > 0 ? translationLines : ['暂无白话译文'],
      appreciation: appreciation.trim() || '用户自定义添加的经典课文。',
      tags: tags.length > 0 ? tags : ['自定义'],
      custom: true,
      createdAt: Date.now()
    };

    onAddPoem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#FAF9F6] border border-[#E5E2D9] w-full max-w-xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#2C2C2C]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold font-serif text-[#2C2C2C] text-base tracking-tight">
            <Plus className="w-5 h-5 text-[#8B4513]" />
            添加自定义古诗 / 课文
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#2C2C2C] hover:bg-[#F5F2EA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#8B4513] uppercase tracking-wider mb-1 font-sans">标题 *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="如: 锦瑟"
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">标题拼音 (可选)</label>
              <input
                type="text"
                value={pinyinTitle}
                onChange={e => setPinyinTitle(e.target.value)}
                placeholder="如: jǐn sè"
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">作者</label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="如: 李商隐"
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">朝代</label>
              <input
                type="text"
                value={dynasty}
                onChange={e => setDynasty(e.target.value)}
                placeholder="如: 唐代"
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">分类类型</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ItemCategory)}
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              >
                <option value="poetry">古诗词/绝句</option>
                <option value="prose">文言文/古文</option>
                <option value="modern">现代文章</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">学段划分</label>
              <select
                value={stage}
                onChange={e => setStage(e.target.value as EducationStage)}
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              >
                <option value="primary">小学 (1-6年级)</option>
                <option value="junior">初中 (7-9年级)</option>
                <option value="senior">高中 (必修/选修)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">所属年级</label>
              <input
                type="text"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="如: 七年级上册 / 高中必修一"
                className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8B4513] uppercase tracking-wider mb-1 font-sans">
              诗词/课文原文 (每行一句) *
            </label>
            <textarea
              required
              rows={4}
              value={contentText}
              onChange={e => setContentText(e.target.value)}
              placeholder={`锦瑟无端五十弦，一弦一柱思华年。
庄生晓梦迷蝴蝶，望帝春心托杜鹃。
沧海月明珠有泪，蓝田日暖玉生烟。
此情可待成追忆？只是当时已惘然。`}
              className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] font-serif focus:outline-none focus:border-[#8B4513]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">
              白话文译文 (选填，每行对应一句)
            </label>
            <textarea
              rows={2}
              value={translationText}
              onChange={e => setTranslationText(e.target.value)}
              placeholder="对应各句的译文解释..."
              className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] font-serif focus:outline-none focus:border-[#8B4513]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 font-sans">主题标签 (逗号分隔)</label>
            <input
              type="text"
              value={tagsStr}
              onChange={e => setTagsStr(e.target.value)}
              placeholder="如: 情感, 伤感, 经典"
              className="w-full px-3 py-2 bg-white border border-[#E5E2D9] rounded-lg text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#E5E2D9]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#F5F2EA] hover:bg-[#E5E2D9] text-[#2C2C2C] rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#8B4513] hover:bg-[#72380f] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-2xs transition-colors"
            >
              确认保存课文
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
