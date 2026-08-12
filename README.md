# 背故事 (beigushi)

背故事是一个基于轻量级静态页面的响应式应用。

## 部署与构建

项目配置了 GCP Cloud Build & Cloud Run CI/CD 自动化部署流水线：
- **触发条件**：向 `main` 分支提交代码 (`git push`)
- **构建方式**：基于 `Dockerfile` 编译镜像并推送至 Google Container Registry (GCR)
- **部署发布**：自动发布至 Cloud Run 服务 `beigushi`
