---
status: active
started_at: 2026-05-13
module: seo
---

# 个人官网 SEO 验证记录

验证日期：2026-05-13  
验证范围：第一阶段 SEO 准备工作，包含技术 SEO 地基、中文可索引入口、Seedance 作品页模板和主页内容口径清洗

## 1. 自动验证结果

| 项目 | 结果 | 证据 |
|---|---|---|
| TypeScript | Pass | `pnpm typecheck` 通过 |
| Production build | Pass | `pnpm build` 通过，`/`、`/zh`、`/robots.txt`、`/sitemap.xml`、`/work/seedance-stranger-things-ai-finale` 均静态生成 |
| robots.txt | Pass | `curl http://localhost:3000/robots.txt` 返回 `Allow: /`、`Disallow: /share/`、主域 sitemap |
| sitemap.xml | Pass | `curl http://localhost:3000/sitemap.xml` 返回 3 个 URL：`/`、`/zh`、Seedance 作品页 |
| 首页 canonical | Pass | 首页 HTML 有 `rel="canonical"` 指向 `https://chenranning.com` |
| 中文页 canonical | Pass | `/zh` HTML 有 `rel="canonical"` 指向 `https://chenranning.com/zh` |
| Seedance 作品页 canonical | Pass | 作品页 HTML 有 `rel="canonical"` 指向对应主域 URL |
| OG / Twitter image | Pass | 首页、中文页、作品页均输出 `https://chenranning.com/assets/chenran-qcon.jpg` |
| Person / ProfilePage JSON-LD | Pass | 首页 HTML 中存在 `application/ld+json`，包含 `Person`、`WebSite`、`ProfilePage` |
| 旧 X handle 清理 | Pass | `app/**` 中未检出 `ran_zixing` |
| 中文核心内容可抓取 | Pass | `curl http://localhost:3000/zh` 可直接看到“宁晨然”“报道口径”“Medeo AI 视频产品负责人”等中文核心文本 |

## 2. 已完成功能

- 新增 `app/robots.ts`
- 新增 `app/sitemap.ts`
- 新增 `app/site-config.ts`，集中维护主域、profile links、Seedance proof links 和 JSON-LD
- 将首页拆成可复用 `HomePage` client component，根路径默认英文，`/zh` 默认中文
- 修正 X 链接为 `https://x.com/Nin19536`
- 将 Seedance 媒体链接替换为已核验 URL：Times of India、Zoom TV、Cosmic Book News、Linkloud / 腾讯新闻、智源社区 / 极客公园
- 将传播数据口径改为 reported / 报道口径 / estimated，不写成后台绝对数据
- 新增 `/work/seedance-stranger-things-ai-finale` 作品页模板，包含角色、workflow、公开视频和 proof links
- 首页增加 Bilibili 长期视频创作入口，避免早期 GitHub 项目成为主线

## 3. 未完成 / 人工项

- 未做浏览器截图 QA：当前项目未安装 Playwright，当前会话也没有可调用的 Browser 工具；本轮只做 curl / build / typecheck 验证
- `www` 到 root 的 301 仍需在域名 / Railway 层处理；代码层已通过 canonical 和 sitemap 指向 root 主域
- Google Search Console 需要人工登录验证域名
- Bing Webmaster Tools 需要人工登录验证域名
- X 原帖完整互动数据、微信公众号原文、Instagram / TikTok / Shorts 转载链仍需后续截图或 Content Engine 补核

## 4. GSC 配置清单

1. 用 Google Search Console 添加 Domain property：`chenranning.com`
2. 按提示在 DNS 添加 TXT 验证记录
3. 验证通过后提交 sitemap：`https://chenranning.com/sitemap.xml`
4. 用 URL Inspection 请求索引：
   - `https://chenranning.com/`
   - `https://chenranning.com/zh`
   - `https://chenranning.com/work/seedance-stranger-things-ai-finale`
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
