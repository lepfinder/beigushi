export interface GradePage {
  /** URL 路径，如 /一年级上册 */
  slug: string;
  /** content 目录下的文件名 */
  file: string;
  /** 导航短标签 */
  shortLabel: string;
  /** 完整名称 */
  label: string;
}

/** 小学一至六年级（上/下册）静态页面 */
export const GRADE_PAGES: GradePage[] = [
  { slug: '一年级上册', file: '一年级上册古诗词.html', shortLabel: '一上', label: '一年级上册' },
  { slug: '一年级下册', file: '一年级下册古诗词.html', shortLabel: '一下', label: '一年级下册' },
  { slug: '二年级上册', file: '二年级上册古诗词.html', shortLabel: '二上', label: '二年级上册' },
  { slug: '二年级下册', file: '二年级下册古诗词.html', shortLabel: '二下', label: '二年级下册' },
  { slug: '三年级上册', file: '三年级上册古诗词.html', shortLabel: '三上', label: '三年级上册' },
  { slug: '三年级下册', file: '三年级下册古诗词.html', shortLabel: '三下', label: '三年级下册' },
  { slug: '四年级上册', file: '四年级上册古诗词.html', shortLabel: '四上', label: '四年级上册' },
  { slug: '四年级下册', file: '四年级下册古诗词.html', shortLabel: '四下', label: '四年级下册' },
  { slug: '五年级上册', file: '五年级上册古诗词.html', shortLabel: '五上', label: '五年级上册' },
  { slug: '五年级下册', file: '五年级下册古诗词.html', shortLabel: '五下', label: '五年级下册' },
  { slug: '六年级上册', file: '六年级上册古诗词.html', shortLabel: '六上', label: '六年级上册' },
  { slug: '六年级下册', file: '六年级下册古诗词.html', shortLabel: '六下', label: '六年级下册' },
];

export const DEFAULT_GRADE_SLUG = GRADE_PAGES[0].slug;

export function findGradeBySlug(slug: string): GradePage | undefined {
  return GRADE_PAGES.find((g) => g.slug === slug);
}
