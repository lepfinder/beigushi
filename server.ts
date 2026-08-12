import express from 'express';
import fs from 'fs';
import path from 'path';
import { DEFAULT_GRADE_SLUG, findGradeBySlug, GRADE_PAGES, type GradePage } from './grades.js';

const app = express();
const PORT = Number(process.env.PORT) || 3333;
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CONTENT_DIR = path.join(process.cwd(), 'content');
/** 百度统计站点 ID；设为空字符串可关闭 */
const BAIDU_TONGJI_ID = process.env.BAIDU_TONGJI_ID ?? '8403095a5f32952c96ddac970e7cbe76';

function buildBaiduTongjiScript(): string {
  if (!BAIDU_TONGJI_ID) return '';
  return `<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>`;
}

function injectHeadSnippet(html: string, snippet: string): string {
  if (!snippet) return html;
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${snippet}\n</head>`);
  }
  return snippet + html;
}
function isJuniorGrade(grade: GradePage): boolean {
  return /[七八九]年级/.test(grade.slug);
}

function renderGradeMenuItems(grades: GradePage[], current: GradePage): string {
  return grades
    .map((g) => {
      const active = g.slug === current.slug ? ' is-active' : '';
      return `<a class="grade-menu__item${active}" href="/${encodeURIComponent(g.slug)}" role="option" aria-selected="${g.slug === current.slug ? 'true' : 'false'}" title="${g.label}">${g.shortLabel}</a>`;
    })
    .join('');
}

function buildGradeNav(current: GradePage): string {
  const primaryGrades = GRADE_PAGES.filter((g) => !isJuniorGrade(g));
  const juniorGrades = GRADE_PAGES.filter(isJuniorGrade);
  const primaryItems = renderGradeMenuItems(primaryGrades, current);
  const juniorItems = renderGradeMenuItems(juniorGrades, current);

  return `
<style id="site-grade-nav-style">
  body { padding-top: 64px !important; }
  .site-grade-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(253, 251, 245, 0.92);
    border-bottom: 1px solid rgba(212, 197, 160, 0.7);
    backdrop-filter: saturate(1.1) blur(12px);
    -webkit-backdrop-filter: saturate(1.1) blur(12px);
  }
  .site-grade-nav__inner {
    max-width: 780px;
    margin: 0 auto;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .site-grade-nav .brand {
    display: flex;
    align-items: baseline;
    gap: 10px;
    min-width: 0;
    color: #2c2c2c;
    text-decoration: none;
  }
  .site-grade-nav .brand-mark {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border: 1.5px solid #8b6914;
    color: #8b6914;
    font-family: "STKaiti", "KaiTi", "楷体", "Noto Serif SC", serif;
    font-size: 13px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0;
  }
  .site-grade-nav .brand-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }
  .site-grade-nav .brand-title {
    font-family: "STKaiti", "KaiTi", "楷体", "Noto Serif SC", serif;
    font-size: 1.05rem;
    letter-spacing: 0.18em;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .site-grade-nav .brand-sub {
    font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    font-size: 0.68rem;
    color: #8b6914;
    letter-spacing: 0.12em;
  }
  .grade-menu {
    position: relative;
    flex-shrink: 0;
  }
  .grade-menu__trigger {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    border: 0;
    border-bottom: 1px solid #c4a35a;
    background: transparent;
    color: #2c2c2c;
    font-family: "STKaiti", "KaiTi", "楷体", "Noto Serif SC", serif;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    line-height: 1.3;
    cursor: pointer;
  }
  .grade-menu__trigger:hover,
  .grade-menu.is-open .grade-menu__trigger {
    border-bottom-color: #8b6914;
  }
  .grade-menu__chevron {
    width: 10px;
    height: 6px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  .grade-menu.is-open .grade-menu__chevron {
    transform: rotate(180deg);
  }
  .grade-menu__panel {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: min(280px, calc(100vw - 32px));
    max-height: min(70vh, 420px);
    padding: 10px;
    display: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fdfbf5;
    border: 1px solid #d4c5a0;
    box-shadow: 0 12px 28px rgba(44, 44, 44, 0.08);
    z-index: 1001;
  }
  .grade-menu.is-open .grade-menu__panel {
    display: block;
  }
  .grade-menu__group + .grade-menu__group {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #d4c5a0;
  }
  .grade-menu__group-label {
    font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    font-size: 0.68rem;
    color: #8b6914;
    letter-spacing: 0.16em;
    margin: 0 4px 6px;
  }
  .grade-menu__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .grade-menu__item {
    display: block;
    padding: 8px 6px;
    color: #2c2c2c;
    text-decoration: none;
    text-align: center;
    font-family: "STKaiti", "KaiTi", "楷体", "Noto Serif SC", serif;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    border: 1px solid transparent;
  }
  .grade-menu__item:hover {
    background: #f5f0e1;
    border-color: #d4c5a0;
  }
  .grade-menu__item.is-active {
    background: #8b6914;
    border-color: #8b6914;
    color: #fdfbf5;
  }
  @media (max-width: 640px) {
    body { padding-top: 60px !important; }
    .site-grade-nav__inner { padding: 12px 16px; }
    .site-grade-nav .brand-title { font-size: 0.92rem; letter-spacing: 0.1em; }
    .site-grade-nav .brand-sub { display: none; }
    .grade-menu__trigger { font-size: 0.9rem; }
    .grade-menu__panel { width: min(260px, calc(100vw - 24px)); }
  }
  /* 全局加载遮罩样式 */
  .site-grade-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(253, 251, 245, 0.75);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .site-grade-loading.is-active {
    opacity: 1;
    pointer-events: auto;
  }
  .site-grade-loading__spinner {
    width: 32px;
    height: 32px;
    border: 2px solid rgba(139, 105, 20, 0.2);
    border-top-color: #8b6914;
    border-radius: 50%;
    animation: siteGradeSpin 0.7s infinite linear;
  }
  .site-grade-loading__text {
    font-family: "STKaiti", "KaiTi", "楷体", "Noto Serif SC", serif;
    font-size: 0.95rem;
    color: #8b6914;
    letter-spacing: 0.1em;
  }
  @keyframes siteGradeSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
<div class="site-grade-loading" id="site-grade-loading" aria-hidden="true">
  <div class="site-grade-loading__spinner"></div>
  <div class="site-grade-loading__text">正在加载课文...</div>
</div>
<nav class="site-grade-nav" aria-label="年级切换">
  <div class="site-grade-nav__inner">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">詩</span>
      <span class="brand-text">
        <span class="brand-title">中小学校内必备古诗词</span>
        <span class="brand-sub">统编语文 · 在线典藏</span>
      </span>
    </a>
    <div class="grade-menu" id="grade-menu">
      <button type="button" class="grade-menu__trigger" id="grade-menu-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span>${current.label}</span>
        <svg class="grade-menu__chevron" viewBox="0 0 10 6" aria-hidden="true"><path fill="none" stroke="#8b6914" stroke-width="1.4" d="M1 1l4 4 4-4"/></svg>
      </button>
      <div class="grade-menu__panel" role="listbox" aria-label="选择年级">
        <div class="grade-menu__group">
          <div class="grade-menu__group-label">小学</div>
          <div class="grade-menu__grid">${primaryItems}</div>
        </div>
        <div class="grade-menu__group">
          <div class="grade-menu__group-label">初中</div>
          <div class="grade-menu__grid">${juniorItems}</div>
        </div>
      </div>
    </div>
  </div>
</nav>
<script>
(function () {
  var menu = document.getElementById('grade-menu');
  var trigger = document.getElementById('grade-menu-trigger');
  var loading = document.getElementById('site-grade-loading');
  if (!menu || !trigger) return;
  function closeMenu() {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    var open = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });
  var items = menu.querySelectorAll('.grade-menu__item');
  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (e) {
      if (this.classList.contains('is-active')) return;
      if (loading) {
        loading.classList.add('is-active');
        loading.setAttribute('aria-hidden', 'false');
      }
      closeMenu();
    });
  }
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
</script>`;
}

function injectSeoAndNav(html: string, grade: GradePage): string {
  const description = `${grade.label}统编版语文古诗词与背诵课文，适合中小学生在线阅读与背诵。`;
  const canonical = `/${encodeURIComponent(grade.slug)}`;

  let result = html;

  if (!/name=["']description["']/i.test(result)) {
    result = result.replace(
      /<head>/i,
      `<head>\n<meta name="description" content="${description}">\n<link rel="canonical" href="${canonical}">`
    );
  }

  result = injectHeadSnippet(result, buildBaiduTongjiScript());

  if (/<body[^>]*>/i.test(result)) {
    result = result.replace(/<body([^>]*)>/i, `<body$1>\n${buildGradeNav(grade)}`);
  } else {
    result = buildGradeNav(grade) + result;
  }

  return result;
}

function renderGradePage(grade: GradePage, res: express.Response) {
  const filePath = path.join(CONTENT_DIR, grade.file);
  if (!fs.existsSync(filePath)) {
    res.status(404).type('html').send(renderNotFound(`未找到文件：${grade.file}`));
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  res
    .status(200)
    .type('html')
    .set('Cache-Control', 'public, max-age=300')
    .send(injectSeoAndNav(raw, grade));
}

function renderNotFound(message: string): string {
  const links = GRADE_PAGES.map(
    (g) => `<li><a href="/${encodeURIComponent(g.slug)}">${g.label}</a></li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面未找到 · 中小学校内必备古诗词</title>
  <style>
    body { font-family: "Noto Sans SC", "PingFang SC", sans-serif; background: #fdfbf5; color: #2c2c2c; padding: 48px 20px; }
    .box { max-width: 560px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin-bottom: 12px; }
    p { color: #5a5a5a; margin-bottom: 20px; }
    a { color: #8b6914; }
    ul { line-height: 2; }
  </style>
  ${buildBaiduTongjiScript()}
</head>
<body>
  <div class="box">
    <h1>页面未找到</h1>
    <p>${message}</p>
    <ul>${links}</ul>
  </div>
</body>
</html>`;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 公共静态资源（样式 / 脚本）
app.use('/styles', express.static(path.join(PUBLIC_DIR, 'styles'), { maxAge: '1h' }));
app.use('/js', express.static(path.join(PUBLIC_DIR, 'js'), { maxAge: '1h' }));

app.get('/', (_req, res) => {
  res.redirect(302, `/${encodeURIComponent(DEFAULT_GRADE_SLUG)}`);
});

app.get('/:grade', (req, res, next) => {
  const slug = decodeURIComponent(req.params.grade);
  const grade = findGradeBySlug(slug);
  if (!grade) {
    next();
    return;
  }
  renderGradePage(grade, res);
});

app.use((_req, res) => {
  res.status(404).type('html').send(renderNotFound('没有对应的年级页面，请从下面选择。'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[必备古诗词] http://localhost:${PORT}`);
});
