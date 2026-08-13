import fs from 'fs';
import path from 'path';
import { GRADE_PAGES, type GradePage } from './grades.js';

export const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://beigushi.ai.studio').replace(/\/$/, '');
export const SITE_NAME = '中小学校内必备古诗词';
export const SITE_DESCRIPTION =
  '统编语文一至九年级古诗词与背诵课文，含原文与注释，供中小学生在线阅读与背诵。';

export interface PoemSeo {
  grade: string;
  poemId: string;
  title: string;
  author: string;
  dynasty: string;
  excerpt: string;
}

interface PoemsMetaFile {
  poems?: Array<{
    grade?: string;
    poemId?: string;
    title?: string;
    author?: string;
    dynasty?: string;
    excerpt?: string;
  }>;
}

export function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function gradePath(slug: string): string {
  return `/${encodeURIComponent(slug)}`;
}

/** 给 canonical / sitemap / llms 用可读中文路径 */
export function gradeAbsUrl(slug: string): string {
  return `${SITE_ORIGIN}/${slug}`;
}

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith('http')) return pathname;
  return `${SITE_ORIGIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function loadPoemsForSeo(metaPath: string): PoemSeo[] {
  if (!fs.existsSync(metaPath)) return [];
  const raw = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as PoemsMetaFile;
  return (raw.poems || [])
    .filter((p) => p.grade && p.title)
    .map((p) => ({
      grade: p.grade as string,
      poemId: p.poemId || '',
      title: p.title as string,
      author: p.author || '',
      dynasty: p.dynasty || '',
      excerpt: p.excerpt || '',
    }));
}

export function poemsOfGrade(poems: PoemSeo[], grade: GradePage): PoemSeo[] {
  return poems.filter((p) => p.grade === grade.slug);
}

function joinTitles(titles: string[], max = 6): string {
  if (titles.length <= max) return titles.join('、');
  return `${titles.slice(0, max).join('、')}等`;
}

export function gradeSeoCopy(grade: GradePage, poems: PoemSeo[]): { title: string; description: string } {
  const titles = poems.map((p) => p.title);
  const listed = joinTitles(titles);
  const title = listed
    ? `${grade.label}古诗词（${listed}）· 统编语文`
    : `${grade.label}古诗词与背诵课文 · 统编语文`;
  const description = listed
    ? `${grade.label}统编语文收录 ${poems.length} 首古诗词：${listed}。含原文与注释，适合中小学生在线阅读与背诵。`
    : `${grade.label}统编版语文古诗词与背诵课文，适合中小学生在线阅读与背诵。`;
  return { title, description };
}

export function buildHeadTags(opts: {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: unknown;
}): string {
  const { title, description, canonical, jsonLd } = opts;
  const og = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="zh_CN">`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
  ];
  if (jsonLd) {
    og.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`
    );
  }
  return og.join('\n');
}

export function upsertSeoHead(
  html: string,
  opts: { title: string; description: string; canonical: string; jsonLd?: unknown }
): string {
  let result = html;
  if (/<title>/i.test(result)) {
    result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(opts.title)}</title>`);
  } else {
    result = result.replace(/<head>/i, `<head>\n<title>${escapeHtml(opts.title)}</title>`);
  }
  result = result.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '');
  result = result.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '');
  result = result.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '');
  result = result.replace(
    /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>\s*/gi,
    ''
  );

  const tags = buildHeadTags(opts);
  if (/<\/head>/i.test(result)) {
    return result.replace(/<\/head>/i, `${tags}\n</head>`);
  }
  return tags + result;
}

/** 诗题改为 h2，样式仍走 .poem-title，避免改动 18 份课文源文件 */
export function semanticizePoemTitles(html: string): string {
  return html.replace(
    /<div class="poem-title([^"]*)">([\s\S]*?)<\/div>/g,
    '<h2 class="poem-title$1">$2</h2>'
  );
}

export function buildGradeJsonLd(grade: GradePage, poems: PoemSeo[]): unknown {
  const pageUrl = gradeAbsUrl(grade.slug);
  const { title, description } = gradeSeoCopy(grade, poems);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
    about: {
      '@type': 'Thing',
      name: `统编语文${grade.label}古诗词`,
    },
    hasPart: {
      '@type': 'ItemList',
      numberOfItems: poems.length,
      itemListElement: poems.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          author: p.author || undefined,
          temporalCoverage: p.dynasty || undefined,
          url: p.poemId ? `${pageUrl}#${p.poemId}` : pageUrl,
          text: p.excerpt || undefined,
        },
      })),
    },
  };
}

export function buildHomeJsonLd(poems: PoemSeo[]): unknown {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description: SITE_DESCRIPTION,
        inLanguage: 'zh-CN',
      },
      {
        '@type': 'ItemList',
        name: '统编语文年级目录',
        numberOfItems: GRADE_PAGES.length,
        itemListElement: GRADE_PAGES.map((g, i) => {
          const count = poemsOfGrade(poems, g).length;
          return {
            '@type': 'ListItem',
            position: i + 1,
            url: gradeAbsUrl(g.slug),
            name: count ? `${g.label}（${count} 首）` : g.label,
          };
        }),
      },
    ],
  };
}

export function buildMapJsonLd(): unknown {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `古诗地图 · ${SITE_NAME}`,
    description: '统编语文中小学古诗词地理分布图，按学段、朝代与地点类型浏览。坐标为教学示意。',
    url: absoluteUrl('/map'),
    inLanguage: 'zh-CN',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_ORIGIN },
  };
}

export function buildSitemapXml(contentDir: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: Array<{ loc: string; lastmod?: string; priority: string }> = [
    { loc: `${SITE_ORIGIN}/`, lastmod: today, priority: '0.8' },
    { loc: `${SITE_ORIGIN}/map`, lastmod: today, priority: '0.6' },
  ];

  for (const g of GRADE_PAGES) {
    const filePath = path.join(contentDir, g.file);
    let lastmod = today;
    try {
      lastmod = fs.statSync(filePath).mtime.toISOString().slice(0, 10);
    } catch {
      /* keep today */
    }
    urls.push({
      loc: gradeAbsUrl(g.slug),
      lastmod,
      priority: '1.0',
    });
  }

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeHtml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

export function buildLlmsTxt(poems: PoemSeo[]): string {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `- 站点：${SITE_ORIGIN}`,
    '- 范围：义务教育统编语文教材一至九年级（上/下册）古诗词，含原文与注释',
    '- 引用请以各年级页面正文为准；地图坐标为教学示意，并非精确考证',
    '',
    '## 年级',
  ];

  for (const g of GRADE_PAGES) {
    const titles = poemsOfGrade(poems, g).map((p) => p.title);
    const listed = titles.length ? `：${joinTitles(titles, 8)}` : '';
    lines.push(`- [${g.label}](${gradeAbsUrl(g.slug)})${listed}`);
  }

  lines.push(
    '',
    '## 其它',
    `- [古诗地图](${absoluteUrl('/map')})：诗中地示意分布`,
    `- [站点地图](${absoluteUrl('/sitemap.xml')})`,
    ''
  );
  return lines.join('\n');
}

export function buildHomeNoscriptCatalog(poems: PoemSeo[]): string {
  const items = GRADE_PAGES.map((g) => {
    const count = poemsOfGrade(poems, g).length;
    const label = count ? `${g.label}（${count} 首）` : g.label;
    return `<li><a href="${gradePath(g.slug)}">${escapeHtml(label)}</a></li>`;
  }).join('');
  return `<noscript>
  <h1>${escapeHtml(SITE_NAME)}</h1>
  <p>${escapeHtml(SITE_DESCRIPTION)}</p>
  <ul>${items}</ul>
</noscript>`;
}
