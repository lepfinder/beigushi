import { PoemItem } from '../types';
import { ensurePinyinData } from '../utils/pinyin';
import { primaryPoemsPart1 } from './primaryPoemsPart1';
import { primaryPoemsPart2 } from './primaryPoemsPart2';
import { reciteLessonsData } from './reciteLessonsData';
import { juniorSeniorData } from './juniorSeniorData';

const rawPoems: Omit<PoemItem, 'pinyinWords'>[] = [
  ...primaryPoemsPart1,
  ...primaryPoemsPart2,
  ...reciteLessonsData,
  ...juniorSeniorData
];

export const initialPoemsData: PoemItem[] = rawPoems.map(p => ({
  ...p,
  pinyinWords: ensurePinyinData(p.content, p.pinyinContent)
}));

export const STAGE_OPTIONS = [
  { value: 'all', label: '全部学段' },
  { value: 'primary', label: '小学 (1-6年级统编版)' },
  { value: 'junior', label: '初中 (7-9年级统编版)' },
  { value: 'senior', label: '高中 (必修/选修)' }
];

export const GRADE_OPTIONS = [
  { value: 'all', label: '全部年级' },
  { value: '一年级上册', label: '一年级上册' },
  { value: '一年级下册', label: '一年级下册' },
  { value: '二年级上册', label: '二年级上册' },
  { value: '二年级下册', label: '二年级下册' },
  { value: '三年级上册', label: '三年级上册' },
  { value: '三年级下册', label: '三年级下册' },
  { value: '四年级上册', label: '四年级上册' },
  { value: '四年级下册', label: '四年级下册' },
  { value: '五年级上册', label: '五年级上册' },
  { value: '五年级下册', label: '五年级下册' },
  { value: '六年级上册', label: '六年级上册' },
  { value: '六年级下册', label: '六年级下册' },
  { value: '七年级上册', label: '七年级上册' },
  { value: '七年级下册', label: '七年级下册' },
  { value: '八年级上册', label: '八年级上册' },
  { value: '八年级下册', label: '八年级下册' },
  { value: '九年级上册', label: '九年级上册' },
  { value: '九年级下册', label: '九年级下册' },
  { value: '高中必修', label: '高中必修' }
];

export const CATEGORY_OPTIONS = [
  { value: 'all', label: '全部分类' },
  { value: 'poetry', label: '古诗词/绝句/律诗/词' },
  { value: 'prose', label: '背诵文言文/经典古文' },
  { value: 'modern', label: '必背现代经典名篇/散文' }
];

export const DYNASTY_OPTIONS = [
  '全朝代', '先秦', '汉代', '魏晋', '南北朝', '北朝', '唐代', '宋代', '元代', '明代', '清代', '近代', '现代'
];

export const TAG_OPTIONS = [
  '全部主题', '思乡', '写景', '爱国', '送别', '劝学', '名胜', '节日', '品质', '动物', '植物', '哲理', '劳动', '亲情', '文言文', '故事'
];
