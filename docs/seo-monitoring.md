# SEO Monitoring

这份文档是个人站每日 SEO 监测 automation 的本地 SSOT。脚本只做可重复、可机器读取的公开页面检查，不替代 Google Search Console、Bing Webmaster Tools 或人工证据归档。

## 脚本

入口：

```bash
pnpm --silent seo:monitor
```

默认检查线上主域：

```bash
node scripts/seo-monitor.mjs
```

检查本地或临时环境：

```bash
pnpm --silent seo:monitor -- http://localhost:3000
node scripts/seo-monitor.mjs http://127.0.0.1:3000
```

当前固定检查路径：

- `/`
- `/zh`
- `/work/seedance-stranger-things-ai-finale`
- `/work/ai-will`
- `/robots.txt`
- `/sitemap.xml`

脚本无外部 npm 依赖，使用 Node 内建 `fetch`，输出 JSON 到 stdout。需要留存基线时，由主 agent 在明确采集窗口运行并保存结果；日常开发不把临时输出当成线上 baseline。

## JSON 字段

- `checkedAt`：脚本运行时间，ISO 字符串
- `baseUrl`：本次检查使用的 base URL
- `pathStatus`：每个固定路径的 HTTP 状态、最终 URL 和错误信息
- `pages`：HTML 页面的 title、description、canonical、OG image、Twitter card、JSON-LD type 列表和外链状态摘要
- `sitemap.urls`：从 `sitemap.xml` 解析出的 URL 列表
- `robots`：robots 的原始内容、user-agent、allow、disallow、sitemap 和 host
- `externalLinksSummary`：跨页面去重后的外链状态汇总
- `externalLinksSummary.problemLinks`：跨页面去重后的 `limited` / `failed` / `error` 外链列表，用来快速定位需要人工复核的 URL

外链检查规则：

- 脚本按页面收集跨域 `<a href>` 链接
- 先用 `HEAD` 检查，遇到 `403`、`405`、`429`、`999` 再尝试 `GET`
- `2xx` / `3xx` 归为 `ok`
- `401` / `403` / `429` / `999` 归为 `limited`，通常代表登录墙、反爬或限流，需要人工复核
- 最终 URL 命中 captcha / checkpoint 也归为 `limited`
- 网络错误归为 `error`
- 其它 `4xx` / `5xx` 归为 `failed`

## 每日解读

优先看这些信号：

- 固定路径状态是否都是 `200`
- canonical 是否仍指向 `https://chenranning.com` 主域
- OG image 是否仍是主域资源
- Twitter card 是否为 `summary_large_image`
- 首页 JSON-LD 是否包含 `Person`、`ProfilePage`、`WebSite`
- 作品页 JSON-LD 是否包含对应作品类型和 `BreadcrumbList`
- sitemap 是否列出首页、`/zh`、Seedance、AI Will
- robots 是否允许 `/`、阻止 `/share/`、指向主域 sitemap
- 外链 `failed` 是否为 0，`limited` 是否只来自 LinkedIn、X、微信等可解释平台；具体 URL 看 `externalLinksSummary.problemLinks`

## 人工补充

脚本无法覆盖这些指标，仍需 GSC / Bing 或人工补充：

- Google Search Console 的索引状态、URL Inspection、query、CTR、平均排名
- Bing Webmaster Tools 的索引提交、抓取诊断和搜索表现
- 搜索结果里的标题改写、摘要改写、站点链接展示
- 富结果测试和 Schema.org validator 的结构化数据解释结果
- 图片搜索入口、社交平台 preview 实际渲染结果
- X、微信、LinkedIn、即刻等平台因登录态或反爬导致的证据页可见性
- 媒体报道和社交传播数据的截图归档

## 建议节奏

- 每日：运行脚本，确认状态码、canonical、sitemap、robots、外链摘要没有异常
- 每周：人工打开 `limited` 外链，确认反爬不是内容下线
- 每月：从 GSC / Bing 导出品牌词、身份词、项目词、内容词表现，和脚本结果一起复盘
