# Google AI Studio 项目迁移与 Cloud Build 自动化部署经验总结

本文档记录如何将由 **Google AI Studio** 初始创建并绑定了免费子域名（`*.ai.studio`）的项目，无缝平滑迁移至本地/IDE（如 Antigravity / Cursor）开发，并基于 **GCP Cloud Build + Cloud Run** 实现 `git push` 全自动 CI/CD 部署。

---

## 一、 背景与架构原理解析

### 1. AI Studio 的原生托管机制
* **专属特权子域名**：在 Google AI Studio 界面发布应用时，AI Studio 可以分配形如 `xxx.ai.studio` 的免费域名。由于 `ai.studio` 是 Google 内部托管域，外部账号无权直接在 GCP 控制台或 CLI 中对该主域进行所有权验证及手动绑定，只能通过 AI Studio 的内部系统接口进行关联。
* **部署类型 (`Source`)**：AI Studio 默认将代码以 zip 压缩包（源码形式）上传，由 GCP 隐式进行 Buildpacks 编译。部署成功后，Cloud Run 服务会被标记为 **`Source`** 类型，并在元数据中注入 AI Studio 专属的源码注解：
  ```yaml
  metadata:
    annotations:
      run.googleapis.com/sources: '{"app-container":"gs://ai-studio-bucket-..."}'
  ```

### 2. 本地开发与标准 Docker 部署的冲突点
当我们使用本地 IDE 开发，采用 `Dockerfile` + `Cloud Build` 标准编译容器镜像并使用 `gcloud run deploy` 覆盖部署同名 Cloud Run 服务时，GCP 会校验元数据并拦截更新，触发如下报错：
> `ERROR: (gcloud.run.deploy) spec.template.metadata.annotations[run.googleapis.com/sources]: Source annotation has sources that are not referenced by a container.`

---

## 二、 解决方案与标准迁移流程

要保留原本在 AI Studio 绑定的 `xxx.ai.studio` 域名，同时享受本地控制代码、`Dockerfile` 容器化及 Git 触发器全自动 CI/CD，只需按以下 4 个步骤操作：

### 1. 配置项目部署配置文件 (`cloudbuild.yaml`)
在项目根目录下创建 `cloudbuild.yaml`，指定编译 Docker 镜像、推送到 Artifact Registry / GCR、并部署到同名的 Cloud Run 服务（如服务名 `beigushi`）：

```yaml
steps:
  # 1. 构建 Docker 镜像
  - name: 'gcr.io/cloud-builders/docker'
    args: [
      'build',
      '-t', 'gcr.io/myxxyagent/github.com/lepfinder/beigushi:$COMMIT_SHA',
      '-f', 'Dockerfile',
      '.'
    ]

  # 2. 推送镜像到仓库
  - name: 'gcr.io/cloud-builders/docker'
    args: [
      'push', 'gcr.io/myxxyagent/github.com/lepfinder/beigushi:$COMMIT_SHA'
    ]

  # 3. 部署镜像到 Cloud Run 同名服务
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    args: [
      'run', 'deploy', 'beigushi',
      '--image', 'gcr.io/myxxyagent/github.com/lepfinder/beigushi:$COMMIT_SHA',
      '--region', 'us-west1',
      '--project', 'myxxyagent'
    ]

  # 4. 自动清理旧镜像
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'bash'
    args: ['./scripts/cleanup-images.sh']

images:
  - 'gcr.io/myxxyagent/github.com/lepfinder/beigushi:$COMMIT_SHA'

options:
  logging: CLOUD_LOGGING_ONLY
  substitutionOption: ALLOW_LOOSE
```

### 2. 关键核心步骤：清洗原始服务中的 `sources` 注解
在第一次触发 Docker 容器部署前，需通过声明式 YAML 清除原 Cloud Run 服务中带有冲突的 `sources` 源码标记。

1. 准备一个干净的服务声明临时文件（如 `clean_service.yaml`）：
   ```yaml
   apiVersion: serving.knative.dev/v1
   kind: Service
   metadata:
     name: beigushi # 你的 Cloud Run 服务名
     namespace: '117490560652' # GCP 项目编号
     labels:
       cloud.googleapis.com/location: us-west1
   spec:
     template:
       metadata:
         annotations:
           autoscaling.knative.dev/minScale: '0'
           run.googleapis.com/cpu-throttling: 'true'
       spec:
         containerConcurrency: 1000
         containers:
         - image: gcr.io/myxxyagent/github.com/lepfinder/beigushi:latest
           name: app-container
           ports:
           - containerPort: 8080
             name: http1
         serviceAccountName: 117490560652-compute@developer.gserviceaccount.com
   ```
2. 执行替换清洗命令：
   ```bash
   gcloud run services replace clean_service.yaml --project=YOUR_PROJECT_ID --region=YOUR_REGION
   ```

### 3. 创建并配置 GCP Cloud Build 触发器 (Trigger)
1. 在 GCP 控制台中导航至 **Cloud Build -> 触发器**。
2. 创建触发器，关联 GitHub 仓库与 `main` 分支，配置构建配置文件路径为 `cloudbuild.yaml`。
3. 确保触发器服务账号（如 Default Compute Service Account）具备以下 IAM 权限：
   - **Logs Writer** (`roles/logging.logWriter`)
   - **Artifact Registry Writer** (`roles/artifactregistry.writer`)
   - **Cloud Run Admin** (`roles/run.admin`)

### 4. 提交代码验证流水线
在本地完成开发后，执行：
```bash
git add .
git commit -m "feat: update project"
git push origin main
```
Cloud Build 捕获 Push 事件后将自动进行 Docker 镜像构建，并无缝覆盖更新至指定的 Cloud Run 服务。

---

## 三、 总结与最佳实践

| 维度 | AI Studio 原生部署 | IDE 本地/CI/CD 托管部署 |
| :--- | :--- | :--- |
| **构建方式** | 源码 Zip 上传 + 自动 Buildpack (`Source`) | `Dockerfile` 自定义容器 (`Container`) |
| **域名关联** | AI Studio 内置高权限直接映射 `*.ai.studio` | 继承并保留已映射的 `*.ai.studio` 或自定义域名 |
| **开发体验** | 仅限于浏览器端轻量修改 | 本地 IDE (Antigravity/Cursor) 全功能支持 |
| **发布方式** | 手动点击 Deploy | `git push` 自动触发 CI/CD 构建部署 |

**核心经验结论**：
无需放弃 AI Studio 分配的顶级 `*.ai.studio` 域名，只需将部署目标对准 AI Studio 创建的同名 Cloud Run 服务，并在首次构建前**清洗掉元数据中的 `sources` 源码冲突标记**，即可实现完美、高效的本地开发与自动化发布流水线。
