# SEO Baselines

本目录保存个人站 SEO 监测脚本的人工锚点。日常 automation 可以临时运行脚本，但只有主 agent 明确采集的结果放进这里。

## 2026-05-13

- `2026-05-13-predeploy.json`：部署前线上基线，`/zh`、两个作品页、`robots.txt`、`sitemap.xml` 仍为 404。
- `2026-05-13-postdeploy.json`：部署后线上基线，6 个固定路径均为 200，sitemap 4 条 URL，首页 canonical 和 OG image 均指向 `https://chenranning.com`。
- `2026-05-13-summary.json`：部署前后摘要对比。

当前可自动确认的提升：

- 可索引 URL 从 1 个首页扩展到首页、中文页、Seedance 作品页、AI Will 作品页。
- `robots.txt` 从 404 修复为 200。
- `sitemap.xml` 从 404 修复为 200，包含 4 条主域 URL。
- 首页 canonical 从缺失修复为 `https://chenranning.com/`。
- OG image 从 Railway 默认域修复为主域资源。
- 外链 `failed` 和 `error` 均为 0；`limited` 为 LinkedIn 反爬和微信 captcha，需人工浏览器复核。

SEO 结果指标仍需 GSC / Bing 接入后观察：impressions、clicks、CTR、average position、indexed pages。
