---
status: in_progress
started_at: 2026-05-13
module: seo
---

# 个人官网 SEO 项目

**Owner**: 主 Agent + SEO / Frontend / Content subagents  
**Created**: 2026-05-13  
**前置依赖**: `/Users/ran/.codex/worktrees/d5ac/ran-brain/docs/research/seo/2026-05-13_personal-site-seo-methodology.md`

---

## 1. 目标与 Definition of Done

### 1.1 目标

把 `chenranning.com` 从单页个人名片升级为可抓取、可验证、可长期迭代的个人实体主页与 SEO 实验场。第一阶段先完成个人身份 SSOT 对齐、主页内容可信度清洗、基础技术 SEO、个人实体结构化数据、作品页规划与监控闭环，不追求一次性写完所有内容。

### 1.2 Definition of Done

1. 官网内容已对齐 `/Users/ran/.codex/worktrees/d5ac/ran-brain/personal/identity-ssot.md`
2. 主页所有身份、代表作、指标和链接完成可信度清洗，未核验信息明确标注或移除
3. 主页、作品页、JSON-LD 和 SEO topic cluster 不把个人 Brain / ran-brain / harness / memory 结构作为公开展示项目
4. `https://chenranning.com/robots.txt` 和 `https://chenranning.com/sitemap.xml` 返回 200，并指向 canonical 主域
5. 首页有明确 canonical、metadata、Open Graph、Twitter card，社交图片使用 `https://chenranning.com` 主域资源
6. 首页 HTML 中存在 `Person` / `ProfilePage` JSON-LD，能把 `Chenran Ning`、`宁晨然`、`jw782cn`、GitHub、X、LinkedIn、即刻、Medeo 等实体线索连接起来；不要把社交平台 URL 里的 handle 误写成姓名或别名
7. 中文内容有可索引方案，不能只依赖客户端切换后才出现中文核心内容
8. 至少完成第一批独立作品页的信息架构和 URL 设计，并实现 1 个代表页作为模板
9. 建立 SEO 监控清单，包含 Google Search Console、Bing Webmaster Tools、品牌词 / 身份词 / 项目词 / 内容词分组
10. `pnpm typecheck` 和 `pnpm build` 通过
11. 用浏览器检查桌面和移动端：首页、中文内容入口、作品页、社交预览关键图文不重叠

### 1.3 不做的事

- 不批量生成低质量 SEO 文章
- 不把所有作品页一次性写完
- 不改网站整体视觉风格，除非为 SEO 内容结构必须调整
- 不把未核验数据写成绝对事实，传播指标继续使用“报道口径 / reported / estimated”
- 不公开展示个人 Brain、ran-brain、harness、memory 结构；这些只作为内部资料源和工作方法背景
- 不接入付费 SEO 工具账号，除非主人后续明确提供

---

## 2. 当前事实（先读这些）

### 2.1 本 repo 文件

- `/Users/ran/Desktop/codes/chenran-site/AGENTS.md` — 本站约定
- `/Users/ran/Desktop/codes/chenran-site/app/layout.tsx` — 当前全站 metadata
- `/Users/ran/Desktop/codes/chenran-site/app/page.tsx` — 当前单页主页结构
- `/Users/ran/Desktop/codes/chenran-site/app/i18n.ts` — 中英文文案数据
- `/Users/ran/Desktop/codes/chenran-site/app/language-context.tsx` — 当前客户端语言切换
- `/Users/ran/Desktop/codes/chenran-site/public/assets/` — 当前站点图片资产
- `/Users/ran/Desktop/codes/chenran-site/docs/references.md` — 当前站点结构和视觉参考

### 2.2 ran-brain 资料源

- `/Users/ran/.codex/worktrees/d5ac/ran-brain/personal/identity-ssot.md` — 个人身份 SSOT，官网内容和 SEO 实体的上游事实源
- `/Users/ran/.codex/worktrees/d5ac/ran-brain/docs/research/seo/2026-05-13_personal-site-seo-methodology.md` — SEO 方法论 research
- `/Users/ran/.codex/worktrees/d5ac/ran-brain/personal/profile.md` — 官网、简历、媒体 kit 可复用公开资料
- `/Users/ran/.codex/worktrees/d5ac/ran-brain/personal/source-materials/2026-05-10/chenran_public_materials_2026-05-10.xlsx` — 公开素材证据库
- `/Users/ran/.codex/worktrees/d5ac/ran-brain/personal/source-materials/2026-05-13/old-resume-screenshot-extraction.md` — 旧简历结构化提取
- `/Users/ran/.codex/worktrees/d5ac/ran-brain/memory/projects/chenran-site.md` — 域名、Railway、HTTPS 记忆

### 2.3 已知问题

- 当前公开站点缺少 `/robots.txt` 和 `/sitemap.xml`
- root 和 `www` 的 canonical / redirect 策略已在代码层处理，上线后需确认生产环境行为
- 当前没有 JSON-LD 结构化数据
- 当前是单页锚点结构，缺少作品独立 URL、独立 title/meta/OG
- 当前中文内容依赖客户端语言切换，不是清晰的可索引中文页面
- 现有链接健康需要持续核验，尤其 LinkedIn、豆瓣安全跳转、X 登录态、媒体泛链接

---

## 3. 方案

### 3.1 先做身份 SSOT 和内容可信度清洗，再做技术 SEO

采用：先把主页内容对齐 `identity-ssot.md`，再修 technical SEO

原因：SEO 是放大器。若主页身份、链接、代表作、指标口径不稳，技术 SEO 会放大错误。当前最先要修的是“搜索引擎理解的你”和“真实资料源里的你”一致。

P0 清洗范围：

- 身份：只使用 `Chenran Ning`、`宁晨然`、`jw782cn` 等已确认实体线索
- 链接：外链逐条核验，泛链接和空链接替换成具体证据页或暂时移除
- 指标：`25M+`、`10K+`、B 站数据全部保留“报道口径 / 旧数据 / 待核验”
- 代表作：优先 Seedance、Medeo、AI 共写遗嘱、QCon、Bilibili 长期视频创作，不平铺全部项目；早期 GitHub 项目不进入主页主线
- 内部系统：个人 Brain / ran-brain 只作为 SSOT 和工作流来源，不进入主页模块、作品页、JSON-LD 作品实体或 SEO topic cluster

### 3.2 采用阶段化 SEO，而不是一次性重写全站

采用：先修发现、理解、规范化，再扩作品页和内容集群

原因：当前站点已经有 SSR 和主要文案，基础不错。第一阶段最值得做的是让搜索引擎和 AI answer 系统能理解“宁晨然是谁、做什么、凭什么可信”，而不是马上扩大页面数量。

### 3.3 主域策略

采用：`https://chenranning.com/` 作为 canonical 主域

待实现项：

- 所有 metadata URL 使用主域
- sitemap 只列主域 URL
- 页面加 self canonical
- `www` 永久重定向到 root；页面层同时 canonical 到 root

### 3.4 中文索引策略

采用：优先新增 `/zh` 可索引中文页面，而不是只靠客户端语言切换

原因：中文搜索会覆盖“宁晨然”“AI 视频产品负责人”“AI 影像创作者”“怪奇物语 AI 大结局”“复旦 Cornell”等词。如果中文文案只在客户端状态里出现，抓取和展示都不稳定。

### 3.5 第一批作品页 URL

建议第一批独立页面：

- `/work/seedance-stranger-things-ai-finale`
- `/work/medeo-ai-video-editor`
- `/work/ai-will`
- `/work/devices`
- `/speaking/qcon-ai-product`

第一阶段只实现 1 个代表页作为模板，优先 `Seedance`，因为它有最强外部传播和媒体证明。

### 3.6 作品页模板

每个作品页固定结构：

1. 一句话说明这个作品是什么
2. 背景与问题
3. 本人角色
4. 方法 / workflow
5. 可见产出
6. 结果与指标，带 reported 限定
7. 外部报道 / 证据链接
8. 相关作品和联系方式

---

## 4. Subagent 编排

### Subagent A: Identity SSOT And Homepage Content Cleanup

- 输入：本 task §2、§3.1，ran-brain `personal/identity-ssot.md`、`personal/profile.md`、公开素材证据库
- 产出：
  - 首页身份文案、代表作排序和指标口径清洗方案
  - 现有外链核验结果
  - `app/i18n.ts` / `app/page.tsx` 中不可信或不精确内容的最小修正
- 退出条件：
  - 主页不再包含误用身份、空链接、泛 proof、未限定指标
  - 所有保留 claim 都能在 SSOT 或 source materials 中找到来源
  - 主页不展示个人 Brain / ran-brain / harness / memory 结构

### Subagent B: Technical SEO Foundation

- 输入：本 task §2、§3.2 到 §3.4，`app/layout.tsx`、Next.js App Router 文档经验
- 产出：
  - `app/robots.ts` 或等价实现
  - `app/sitemap.ts` 或等价实现
  - canonical metadata
  - OG/Twitter 主域图片修正
  - `Person` / `ProfilePage` JSON-LD
- 退出条件：
  - `pnpm typecheck`
  - `pnpm build`
  - 本地访问 `/robots.txt`、`/sitemap.xml` 返回合理内容

### Subagent C: Content Architecture And First Work Page

- 输入：本 task §2、§3.5、§3.6，`app/page.tsx`、`app/i18n.ts`、ran-brain `personal/identity-ssot.md`
- 产出：
  - 第一批作品页 URL 和数据结构方案
  - 实现 1 个代表作品页，优先 Seedance
  - 首页到作品页的清晰内链
  - 作品页独立 metadata
- 退出条件:
  - 作品页可从首页点击进入
  - 作品页可直接打开，首屏说明清楚，不依赖弹窗或客户端状态才能理解
  - `pnpm typecheck`

### Subagent D: Chinese Indexing And Copy Cleanup

- 输入：本 task §3.4，`app/i18n.ts`，ran-brain `personal/identity-ssot.md`
- 产出：
  - `/zh` 或其他可索引中文方案
  - 中文首页 title、description、H1、核心 proof
  - 中英文 metadata 不互相冲突
- 退出条件：
  - curl 或浏览器直接打开中文 URL 能看到中文核心内容
  - 首页语言切换仍可用

### Subagent E: Verification And Monitoring Plan

- 输入：A/B/C 产出，本 task §5
- 产出：
  - `docs/tasks/seo/personal-site-seo.verification.md`
  - 链接健康检查结果
  - GSC / Bing Webmaster 人工配置清单
  - 后续月度 SEO 复盘模板
- 退出条件：
  - 验收清单逐项 pass/fail 写清
  - 不能自动完成的外部账号步骤列成人工 TODO

---

## 5. 验收清单

### 5.1 不破坏既有

- [ ] 首页仍可在桌面和移动端正常展示
- [ ] 中英文切换仍可用
- [ ] 现有外链仍能点击
- [ ] 现有图片资源正常加载
- [x] `pnpm typecheck` 通过
- [x] `pnpm build` 通过

### 5.2 技术 SEO

- [x] `/robots.txt` 返回 200
- [x] `/sitemap.xml` 返回 200
- [x] 首页 HTML 有 canonical 到 `https://chenranning.com/`
- [x] OG/Twitter image 使用主域资源
- [x] 首页有 `Person` / `ProfilePage` JSON-LD
- [x] JSON-LD 不包含页面不可见或未核验的夸张信息

### 5.3 内容 SEO

- [ ] 首页内容已对齐 `personal/identity-ssot.md`
- [x] 当前 X 链接和社交身份不再误用 URL handle
- [x] 主页所有外链有核验状态
- [ ] 首页首屏同时表达姓名、当前 title、领域和代表 proof
- [x] 中文核心内容可被直接 URL 抓取
- [x] 至少 1 个作品页有独立 URL、title、description、H1、证据链接
- [ ] Seedance / Medeo / AI Will / Devices / QCon 后续页面规划已写入文档或数据结构
- [x] 传播指标使用 reported / 报道口径限定

### 5.4 监控与文档

- [x] `docs/tasks/seo/personal-site-seo.verification.md` 存在
- [x] GSC 配置步骤已列出
- [x] Bing Webmaster Tools 配置步骤已列出
- [x] 月度复盘维度已列出：品牌词、身份词、项目词、内容词、外链、AI citation

---

## 6. 风险与降级

| 风险 | 缓解 |
|---|---|
| www 到 root 的生产环境行为可能受 Railway / DNS 影响 | 代码层已加 permanent redirect，部署后用真实域名 `curl -I` 复验 |
| 中文路由改动影响当前客户端语言切换 | 先做最小 `/zh` 页面，复用现有文案数据，保留原切换交互 |
| JSON-LD 写入未核验指标或误用社交 handle 导致信任风险 | 只写身份、角色、sameAs、knowsAbout、worksFor，不写粉丝数、曝光量，且不把未确认社交 handle 写成姓名或别名 |
| 拆作品页导致视觉风格膨胀 | 第一阶段只做 Seedance 模板页，复用现有视觉系统 |
| 外链平台反爬或登录态导致自动检查误报 | 链接检查结果标注状态码和限制原因，人工确认 LinkedIn / X |

---

## 7. 变更记录

- **2026-05-13 T0** — 主 Agent 创建 SEO Task，引用 ran-brain SEO research，并拆分 Technical SEO、Content Architecture、Chinese Indexing、Verification 四个后续阶段
- **2026-05-13 T1** — Coder 启动第一阶段准备工作：补 `robots.ts`、`sitemap.ts`、canonical、OG/Twitter image、Person/ProfilePage JSON-LD、`/zh` 中文入口、Seedance 作品页模板和 verification 文档
- **2026-05-13 T2** — 补充 `www.chenranning.com` 到 root 主域的 permanent redirect，并为 Seedance 作品页增加 `VideoObject` / `BreadcrumbList` JSON-LD
- **2026-05-13 T3** — 跑外链健康检查并写入 verification；20 个核心外链返回 200，LinkedIn 返回 999 反爬码，豆瓣跳安全页但返回 200
