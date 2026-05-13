export type Locale = "en" | "zh";

const dict = {
  en: {
    nav: ["Medeo", "Seedance", "Projects", "Speaking", "Contact"],
    langToggle: "中",
    sideRail: {
      title: "Proof includes",
      stats: [
        ["25M+", "reported impressions, Seedance 2.0"],
        ["Medeo", "Head of Product, AI video"],
        ["2018", "video creation since college"],
      ],
    },
    hero: {
      name: "CHENRAN NING",
      tags: ["AI Video Product Lead", "Full-stack Engineer", "AI Filmmaker"],
      lede: "I connect AI model capabilities, product experience, and creative storytelling into things people actually use and share.",
      cta: ["Enter work", "Contact"],
    },
    medeo: {
      role: "Head of Product",
      heading: "Conversation-first AI video editor.",
      body: "Create and edit video through natural language. Text, images, scripts go in; publishable video comes out. I own product strategy, roadmap, and the full creation workflow.",
    },
    seedance: {
      heading: "Reported 25M+ impressions from one AI film experiment.",
      body: "I created a Stranger Things finale reimagined entirely with Seedance 2.0. The film went viral across Chinese and international media, becoming one of the most-referenced examples of AI video storytelling in 2026.",
      coverageTitle: "Coverage",
      coverage: [
        { text: "Times of India: international entertainment media pickup", link: "https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms" },
        { text: 'Zoom TV: "Stranger Things AI-Created Finale Goes Viral"', link: "https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636" },
        { text: "Cosmic Book News: Stranger Things fixed finale feature", link: "https://cosmicbook.news/seedance-2-0-viral-videos-superman-stranger-things" },
        { text: "Linkloud / Tencent News: methodology salon recap", link: "https://news.qq.com/rain/a/20260423A07MLY00" },
        { text: "BAAI / GeekPark: 25M+ reported exposure recap", link: "https://hub.baai.ac.cn/view/52716" },
      ],
      methodologyTitle: "Methodology",
      methodology: "Content scarcity, script information density, fast MVP testing, cross-platform distribution, and an AI-native production pipeline. Reach numbers are reported / estimated public figures.",
      caseStudy: "Read case study",
      viewPost: "View original post on X",
    },
    projects: {
      aiWill: {
        title: "AI Will",
        collab: "with Xinshixiang",
        body: "Designed and built an AI-guided reflective writing experience. Through structured conversation, 10,000+ young people explored mortality, relationships, and personal values. AI as medium for self-reflection, not content generation.",
        link: "Read case study",
      },
      aiFilms: {
        title: "AI Short Films",
        body: "Director, writer, and editor on multiple AI short films: The Creature (Whisk + Kling), Devices (Blender + ComfyUI), Vision (MJ + GPT-4o + Luma/Runway). Each serves as a public workflow breakdown and production-method test.",
      },
      videoCreation: {
        title: "Long-form Video",
        body: "Long-term Bilibili video creation since college, including Fudan University graduation MV, campus films, vlogs, music videos, annual reflections, and later AI video experiments.",
        link: "Bilibili space",
      },
    },
    speaking: {
      heading: "Public thinking, not just shipped screens.",
      press: [
        { text: "Times of India coverage of the Stranger Things AI finale experiment.", link: "https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms" },
        { text: "Zoom TV: Stranger Things AI-Created Finale Goes Viral.", link: "https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636" },
        { text: "Linkloud / Tencent News salon recap: making a reported 25M+ exposure AI video.", link: "https://news.qq.com/rain/a/20260423A07MLY00" },
        { text: "QCon Beijing / InfoQ: AI-native product engineering and Flow Engineer roles.", link: null },
        { text: "Public workflow breakdowns for Devices, The Creature, Vision, and long-term Bilibili video creation.", link: null },
      ],
    },
    footer: {
      eyebrow: "Connect",
      heading: "Build the next AI-native story with me.",
    },
  },
  zh: {
    nav: ["Medeo", "Seedance", "作品", "演讲", "联系"],
    langToggle: "EN",
    sideRail: {
      title: "关键数据",
      stats: [
        ["25M+", "Seedance 2.0 报道口径曝光"],
        ["Medeo", "AI 视频产品负责人"],
        ["2018", "大学起持续视频创作"],
      ],
    },
    hero: {
      name: "宁晨然",
      tags: ["AI 视频产品负责人", "全栈工程师", "AI 影像创作者"],
      lede: "我把 AI 模型能力、产品体验和创意叙事连接在一起，做出人们真正会用、会传播的东西。",
      cta: ["查看作品", "联系我"],
    },
    medeo: {
      role: "产品负责人",
      heading: "对话优先的 AI 视频编辑器。",
      body: "用自然语言创建和编辑视频。输入文字、图片、脚本，输出可发布的视频。我负责产品策略、路线图和完整的创作工作流。",
    },
    seedance: {
      heading: "一个 AI 影片实验，报道口径全网曝光 2500 万+。",
      body: "我用 Seedance 2.0 完整重新创作了《怪奇物语》大结局。作品在中外媒体广泛传播，成为 2026 年最具代表性的 AI 视频叙事案例之一。",
      coverageTitle: "媒体报道",
      coverage: [
        { text: "Times of India：国际娱乐媒体转载", link: "https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms" },
        { text: "Zoom TV：怪奇物语 AI 大结局走红全网", link: "https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636" },
        { text: "Cosmic Book News：单独报道 Stranger Things fixed finale", link: "https://cosmicbook.news/seedance-2-0-viral-videos-superman-stranger-things" },
        { text: "Linkloud / 腾讯新闻：完整方法论拆解", link: "https://news.qq.com/rain/a/20260423A07MLY00" },
        { text: "智源社区 / 极客公园：2500 万+ 曝光复盘转载", link: "https://hub.baai.ac.cn/view/52716" },
      ],
      methodologyTitle: "方法论",
      methodology: "内容稀缺性、脚本信息密度、快速 MVP 验证、跨平台分发，以及 AI 原生制作流程。传播数据统一使用报道口径 / estimated。",
      caseStudy: "查看作品页",
      viewPost: "查看 X 原帖",
    },
    projects: {
      aiWill: {
        title: "AI 遗嘱",
        collab: "与新世相合作",
        body: "设计并构建了一个 AI 引导的反思写作体验。通过结构化对话，10,000+ 年轻人探索了死亡、关系和个人价值观。AI 作为自我反思的媒介，而非内容生成工具。",
        link: "查看作品页",
      },
      aiFilms: {
        title: "AI 短片",
        body: "多部 AI 短片的导演、编剧和剪辑：The Creature（Whisk + Kling）、Devices（Blender + ComfyUI）、Vision（MJ + GPT-4o + Luma/Runway）。每部作品都是公开的工作流拆解和制作方法测试。",
      },
      videoCreation: {
        title: "长期视频创作",
        body: "大学起长期在 Bilibili 发布视频，覆盖复旦毕业 MV、校园微电影、Vlog、MV、年度总结和后来的 AI 视频实验。",
        link: "B 站空间",
      },
    },
    speaking: {
      heading: "不只是交付产品，更在公开思考。",
      press: [
        { text: "Times of India 报道《怪奇物语》AI 大结局实验。", link: "https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms" },
        { text: "Zoom TV：怪奇物语 AI 大结局走红全网。", link: "https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636" },
        { text: "Linkloud / 腾讯新闻沙龙回顾：用低成本做一条报道口径 2500 万+ 曝光的 AI 视频。", link: "https://news.qq.com/rain/a/20260423A07MLY00" },
        { text: "QCon 北京 / InfoQ：AI 原生产品工程与 Flow Engineer 角色。", link: null },
        { text: "Devices、The Creature、Vision 等作品的公开工作流拆解，以及长期 Bilibili 视频创作。", link: null },
      ],
    },
    footer: {
      eyebrow: "联系",
      heading: "一起构建下一个 AI 原生故事。",
    },
  },
} as const;

export default dict;
