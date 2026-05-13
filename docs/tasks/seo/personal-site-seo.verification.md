---
status: active
started_at: 2026-05-13
module: seo
---

# 个人官网 SEO 验证记录

验证日期：2026-05-13  
验证范围：第一阶段 SEO 准备工作，包含技术 SEO 地基、中文可索引入口、Seedance / AI Will 作品页模板和主页内容口径清洗

## 1. 自动验证结果

| 项目 | 结果 | 证据 |
|---|---|---|
| TypeScript | Pass | `pnpm typecheck` 通过 |
| Production build | Pass | `pnpm build` 通过，`/`、`/zh`、`/robots.txt`、`/sitemap.xml`、`/work/seedance-stranger-things-ai-finale`、`/work/ai-will` 均静态生成 |
| SEO monitor script | Pass | `pnpm --silent seo:monitor -- http://localhost:3000` 通过，6 个固定路径均返回 200，stdout 可直接作为 JSON 解析 |
| robots.txt | Pass | `curl http://localhost:3000/robots.txt` 返回 `Allow: /`、`Disallow: /share/`、主域 sitemap |
| sitemap.xml | Pass | `curl http://localhost:3000/sitemap.xml` 返回 4 个 URL：`/`、`/zh`、Seedance 作品页、AI Will 作品页 |
| 首页 canonical | Pass | 首页 HTML 有 `rel="canonical"` 指向 `https://chenranning.com` |
| 中文页 canonical | Pass | `/zh` HTML 有 `rel="canonical"` 指向 `https://chenranning.com/zh` |
| Seedance 作品页 canonical | Pass | 作品页 HTML 有 `rel="canonical"` 指向对应主域 URL |
| AI Will 作品页 canonical | Pass | 作品页 HTML 有 `rel="canonical"` 指向对应主域 URL |
| OG / Twitter image | Pass | 首页、中文页、作品页均输出 `https://chenranning.com/assets/chenran-qcon.jpg` |
| Person / ProfilePage JSON-LD | Pass | 首页 HTML 中存在 `application/ld+json`，包含 `Person`、`WebSite`、`ProfilePage` |
| Seedance 作品页 JSON-LD | Pass | 作品页 HTML 中存在 `VideoObject` 和 `BreadcrumbList` |
| AI Will 作品页 JSON-LD | Pass | 作品页 HTML 中存在 `CreativeWork` 和 `BreadcrumbList` |
| www 到 root 重定向 | Pass | `curl -I -H 'Host: www.chenranning.com' http://localhost:3000/work/seedance-stranger-things-ai-finale` 返回 `308 Permanent Redirect` 到 root 主域 |
| 旧 X handle 清理 | Pass | `app/**` 中未检出 `ran_zixing` |
| 中文核心内容可抓取 | Pass | `curl http://localhost:3000/zh` 可直接看到“宁晨然”“报道口径”“Medeo AI 视频产品负责人”等中文核心文本 |
| 外链状态 | Pass with notes | 24 个外链中 23 个返回 200；LinkedIn 返回 999 反爬码；AI Will 旧项目页链接已移除，改用公众号报道和即刻旁证 |

## 2. 已完成功能

- 新增 `app/robots.ts`
- 新增 `app/sitemap.ts`
- 新增 `app/site-config.ts`，集中维护主域、profile links、Seedance proof links 和 JSON-LD
- 将首页拆成可复用 `HomePage` client component，根路径默认英文，`/zh` 默认中文
- 修正 X 链接为 `https://x.com/Nin19536`
- 将 Seedance 媒体链接替换为已核验 URL：Times of India、Zoom TV、Cosmic Book News、Linkloud / 腾讯新闻、智源社区 / 极客公园
- 将传播数据口径改为 reported / 报道口径 / estimated，不写成后台绝对数据
- 新增 `/work/seedance-stranger-things-ai-finale` 作品页模板，包含角色、workflow、公开视频和 proof links
- 新增 Seedance 作品页 `VideoObject` / `BreadcrumbList` JSON-LD
- 新增 `/work/ai-will` 轻量作品页，证据主链改为 AI 新榜 / 新世相公众号报道、上线文章、即刻发布和复盘
- 移除 AI Will 旧项目页链接，避免安全页污染外链健康结果
- 新增 `www.chenranning.com` 到 `https://chenranning.com` 的 308 / permanent redirect 规则
- 首页增加 Bilibili 长期视频创作入口，避免早期 GitHub 项目成为主线
- 新增 `scripts/seo-monitor.mjs` 和 `pnpm --silent seo:monitor`，可重复采集页面状态、title、description、canonical、OG image、Twitter card、JSON-LD type、sitemap、robots 和外链状态摘要
- 新增 `docs/seo-monitoring.md`，作为每日 SEO 监测 automation 的本地 SSOT

## 3. 未完成 / 人工项

- 未做浏览器截图 QA：当前项目未安装 Playwright，当前会话也没有可调用的 Browser 工具；本轮只做 curl / build / typecheck 验证
- `www` 到 root 已在 Next redirect 层处理；上线后仍建议在 Railway / DNS 层确认真实生产环境行为
- 线上 `https://chenranning.com` baseline 已写入 `docs/seo/baselines/2026-05-13-predeploy.json`、`docs/seo/baselines/2026-05-13-postdeploy.json` 和摘要 `docs/seo/baselines/2026-05-13-summary.json`
- 部署后发现并修复 `NEXT_PUBLIC_SITE_URL` 导致的 canonical / OG image Railway 域漂移；代码已强制使用 `SITE_URL`，Railway 变量也已校正为 `https://chenranning.com`
- Google Search Console 需要人工登录验证域名
- Bing Webmaster Tools 需要人工登录验证域名
- X 原帖完整互动数据、微信公众号原文、Instagram / TikTok / Shorts 转载链仍需后续截图或 Content Engine 补核
- AI Will 公众号报道和上线文章已返回 200，但建议后续补浏览器截图归档，防止微信验证页造成证据漂移

## 4. GSC 配置清单

1. 用 Google Search Console 添加 Domain property：`chenranning.com`
2. 按提示在 DNS 添加 TXT 验证记录
3. 验证通过后提交 sitemap：`https://chenranning.com/sitemap.xml`
4. 用 URL Inspection 请求索引：
   - `https://chenranning.com/`
   - `https://chenranning.com/zh`
   - `https://chenranning.com/work/seedance-stranger-things-ai-finale`
   - `https://chenranning.com/work/ai-will`
5. 每月导出 queries，按品牌词、身份词、项目词、内容词分组复盘

## 5. Bing Webmaster 配置清单

1. 用 Bing Webmaster Tools 添加站点：`https://chenranning.com`
2. 优先从 Google Search Console 导入；如果不能导入，再走 DNS TXT 验证
3. 提交 sitemap：`https://chenranning.com/sitemap.xml`
4. 后续可接入 IndexNow，但第一阶段不急

## 6. 月度复盘维度

- 品牌词：`Chenran Ning`、`宁晨然`
- 身份词：`AI Video Product Lead`、`AI 视频产品负责人`、`AI filmmaker`、`AI 影像创作者`
- 项目词：`Medeo`、`Seedance Stranger Things AI finale`、`AI Will`
- 内容词：`AI video workflow`、`AI-native video creation`、`怪奇物语 AI 大结局`
- 技术项：索引状态、canonical、sitemap、robots、富结果解析、图片入口
- 外部引用：新增媒体报道、社交 profile sameAs、AI answer citation

## 7. 可循环监测脚本

本地 SSOT：`docs/seo-monitoring.md`

运行方式：

```bash
pnpm --silent seo:monitor
pnpm --silent seo:monitor -- http://localhost:3000
node scripts/seo-monitor.mjs http://localhost:3000
```

当前脚本默认检查 `https://chenranning.com`，支持传入任意 base URL。输出 JSON 到 stdout，不写文件，不把临时本地结果伪装成线上 baseline。

2026-05-13 本地 smoke test：

- 命令：`pnpm --silent seo:monitor -- http://localhost:3000`
- 路径状态：`/`、`/zh`、`/work/seedance-stranger-things-ai-finale`、`/work/ai-will`、`/robots.txt`、`/sitemap.xml` 均返回 200
- sitemap：4 条主域 URL
- robots：`Allow: /`、`Disallow: /share/`、主域 sitemap
- 页面 metadata：首页、中文页、两个作品页均采集到 title、description、canonical、OG image、Twitter card
- JSON-LD：首页 / 中文页包含 `Person`、`ProfilePage`、`WebSite`；Seedance 页包含 `VideoObject`、`BreadcrumbList`；AI Will 页包含 `CreativeWork`、`BreadcrumbList`
- 外链摘要：22 条去重外链，19 条 `ok`，3 条 `limited`，0 条 `failed`，0 条 `error`；`problemLinks` 顶层列出 LinkedIn 与微信 captcha 相关 URL
- limited：LinkedIn 返回 999，两条微信公众号链接跳 captcha，需人工浏览器复核

## 8. 外链健康检查

检查日期：2026-05-13
检查方法：Node `fetch`，先 HEAD，遇到 405 / 403 / 429 再 GET，12 秒超时

| 状态 | HTTP | URL | 说明 |
|---|---:|---|---|
| Warn | 999 | `https://cn.linkedin.com/in/chenran-ning/en` | LinkedIn 反爬响应，需浏览器人工确认 |
| Pass | 200 | `https://cosmicbook.news/seedance-2-0-viral-videos-superman-stranger-things` | 可访问 |
| Pass | 200 | `https://github.com/jw782cn` | 可访问 |
| Pass | 200 | `https://hub.baai.ac.cn/view/52716` | 可访问 |
| Pass | 200 | `https://i.ytimg.com/vi/iEmsuUuGBY4/hqdefault.jpg` | 可访问 |
| Pass | 200 | `https://m.okjike.com/originalPosts/66c175eca0d6d2ffc4b4244e` | 可访问 |
| Pass | 200 | `https://m.okjike.com/originalPosts/670cf05c46d5f8944cec94b7` | 可访问 |
| Pass | 200 | `https://m.okjike.com/originalPosts/6991d4b4c5a1d4e649055d93` | 可访问 |
| Pass | 200 | `https://mp.weixin.qq.com/s/2cjf7AXjV7kHb5N0SsdbGQ` | 可访问 |
| Pass | 200 | `https://mp.weixin.qq.com/s/EYsqgDYSDu6OsmzZ0vXrJw` | 可访问 |
| Pass | 200 | `https://news.qq.com/rain/a/20260423A07MLY00` | 可访问 |
| Pass | 200 | `https://space.bilibili.com/11821775` | 可访问 |
| Pass | 200 | `https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms` | 可访问 |
| Pass | 200 | `https://web.okjike.com/u/B6B0FF28-51D1-4A11-803E-FC46A0AD6EF8` | 可访问 |
| Pass | 200 | `https://www.bilibili.com/video/BV1hCc5zVE7u` | 跳到尾斜杠 URL |
| Pass | 200 | `https://www.marsmag.com/2026/02/18/netflix-to-bytedance-over-ai-videos-we-will-sue-you/` | 可访问 |
| Pass | 200 | `https://www.medeo.app/` | 可访问 |
| Pass | 200 | `https://www.ndtvprofit.com/business/disney-calls-out-bytedance-for-piracy-in-ai-video-model-seedance-2-0-11003312` | 可访问 |
| Pass | 200 | `https://www.one2x.ai/` | 可访问 |
| Pass | 200 | `https://www.youtube.com/embed/iEmsuUuGBY4` | 可访问 |
| Pass | 200 | `https://www.youtube.com/watch?v=iEmsuUuGBY4` | 可访问 |
| Pass | 200 | `https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636` | 可访问 |
| Pass | 200 | `https://x.com/Nin19536` | 可访问 |
| Pass | 200 | `https://x.com/Nin19536/status/2021956823457440179` | 可访问 |
