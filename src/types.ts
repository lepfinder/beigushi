export type EducationStage = 'primary' | 'junior' | 'senior';

export type ItemCategory = 'poetry' | 'prose' | 'modern';

export interface WordNote {
  word: string;
  meaning: string;
}

export interface CharPinyin {
  char: string;
  py: string;
}

export interface PoemItem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  stage: EducationStage;
  grade: string; // e.g. "一年级上册", "三年级下册", "七年级上册", "高中必修一"
  category: ItemCategory;
  pinyinTitle?: string;
  content: string[]; // Chinese character lines
  pinyinContent?: string[]; // Line pinyin strings
  pinyinWords?: CharPinyin[][]; // Line -> Char-Pinyin array for aligned ruby rendering
  notes?: WordNote[];
  translation: string[];
  appreciation: string;
  background?: string;
  tags: string[];
  rhythm?: string; // e.g., "五言绝句", "七言律诗", "词牌名·水调歌头"
  custom?: boolean;
  createdAt?: number;
}

export type StudyStatus = 'unlearned' | 'learning' | 'mastered';

export interface UserStudyData {
  statusMap: Record<string, StudyStatus>;
  favorites: Record<string, boolean>;
  reciteCount: Record<string, number>;
  lastReadId?: string;
  customPoems: PoemItem[];
}

export interface FilterState {
  searchQuery: string;
  stage: EducationStage | 'all';
  grade: string | 'all';
  category: ItemCategory | 'all';
  dynasty: string | 'all';
  tag: string | 'all';
  status: 'all' | StudyStatus | 'favorite';
}

export interface ReaderSettings {
  showPinyin: boolean;
  readingLayout: 'horizontal' | 'vertical';
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  reciteMode: 'none' | 'hideAll' | 'hideKeywords' | 'lineByLine';
  playbackSpeed: number; // 0.8, 1, 1.25, 1.5
}
