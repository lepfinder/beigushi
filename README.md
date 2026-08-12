# 背古诗 (beigushi)

中小学校内必备古诗词在线阅读站点，按统编语文教材一至六年级（上/下册）整理，便于浏览与背诵。

内容以静态 HTML 存放；Express 在运行时注入年级导航与 SEO 元信息，并提供静态资源与健康检查接口。

## 功能

- 小学 12 册（一上～六下）古诗词与背诵课文
- 顶部年级切换（含加载遮罩）
- 拼音显示/隐藏、本册目录锚点、回到顶部
- 响应式布局，适合手机与桌面阅读

## 技术栈

| 层 | 技术 |
| --- | --- |
| 服务端 | Node.js · Express · TypeScript |
| 前端 | 静态 HTML + 公共 CSS/JS |
| 构建 | esbuild（打包 `server.ts`） |
| 部署 | Docker · GCP Cloud Build · Cloud Run |

## 目录结构

```
beigushi/
├── content/          # 各年级静态页面（*.html）
├── public/
│   ├── styles/       # 公共样式
│   └── js/           # 公共脚本（拼音开关、回到顶部等）
├── grades.ts         # 年级路由与元数据
├── server.ts         # Express 入口（注入导航 / SEO）
├── Dockerfile
├── cloudbuild.yaml   # CI/CD：构建镜像 → 推送 → 部署 Cloud Run
└── scripts/          # 镜像清理等运维脚本
```

## 本地开发

前置：Node.js 22+

```bash
npm install
npm run dev          # http://localhost:3333
```

常用脚本：

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 用 `tsx` 直接跑 `server.ts` |
| `npm run build` | 打包为 `dist/server.cjs` |
| `npm start` | 启动生产构建产物 |
| `npm run clean` | 清理 `dist/` |

根路径 `/` 会重定向到默认册（一年级上册）。年级页路径形如 `/一年级上册`。健康检查：`GET /api/health`。

## 内容与路由

年级列表集中在 `grades.ts` 的 `GRADE_PAGES`。新增一册时：

1. 在 `content/` 放入对应 HTML（引用 `/styles/common.css`、`/js/common.js`）
2. 在 `GRADE_PAGES` 增加 `slug` / `file` / 标签配置

服务端会读取 HTML，注入顶部导航，并补全 `description` 与 `canonical`。

## 部署

推送到 `main` 后，Cloud Build 按 `cloudbuild.yaml` 执行：

1. 用 `Dockerfile` 构建镜像并打 `$COMMIT_SHA` 标签
2. 推送到 GCR：`gcr.io/myxxyagent/github.com/lepfinder/beigushi`
3. 部署到 Cloud Run 服务 `beigushi`（区域 `us-west1`）
4. 清理旧镜像，仅保留最近 3 个版本

本地也可自行构建运行：

```bash
docker build -t beigushi .
docker run --rm -p 8080:8080 beigushi
```

从 AI Studio 迁到本仓库 CI/CD 的说明见 [docs/ai-studio-cloud-build-migration.md](docs/ai-studio-cloud-build-migration.md)。
