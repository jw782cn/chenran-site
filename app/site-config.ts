export const SITE_URL = "https://chenranning.com";

export const siteName = "Chenran Ning / 宁晨然";

export const defaultDescription =
  "Chenran Ning is an AI video product lead, full-stack engineer, and AI filmmaker building Medeo and AI-native creative workflows.";

export const profileLinks = [
  { label: "X", href: "https://x.com/Nin19536" },
  { label: "GitHub", href: "https://github.com/jw782cn" },
  { label: "LinkedIn", href: "https://cn.linkedin.com/in/chenran-ning/en" },
  { label: "Jike", href: "https://web.okjike.com/u/B6B0FF28-51D1-4A11-803E-FC46A0AD6EF8" },
] as const;

export const seedanceLinks = {
  work: "/work/seedance-stranger-things-ai-finale",
  xPost: "https://x.com/Nin19536/status/2021956823457440179",
  youtube: "https://www.youtube.com/watch?v=iEmsuUuGBY4",
  bilibili: "https://www.bilibili.com/video/BV1hCc5zVE7u",
  jike: "https://m.okjike.com/originalPosts/6991d4b4c5a1d4e649055d93",
  linkloud: "https://news.qq.com/rain/a/20260423A07MLY00",
  baai: "https://hub.baai.ac.cn/view/52716",
  cosmicBookNews: "https://cosmicbook.news/seedance-2-0-viral-videos-superman-stranger-things",
  timesOfIndia:
    "https://timesofindia.indiatimes.com/web-series/news/english/viral-ai-imagined-stranger-things-finale-sparks-fan-debate-over-eleven-kali-showdown-and-the-future-of-storytelling/articleshow/128406293.cms",
  zoomTv:
    "https://www.zoomtventertainment.com/web-series/stranger-things-ai-generated-finale-seedance-2-0-article-153615636",
  marsMagazine: "https://www.marsmag.com/2026/02/18/netflix-to-bytedance-over-ai-videos-we-will-sue-you/",
  ndtvProfit:
    "https://www.ndtvprofit.com/business/disney-calls-out-bytedance-for-piracy-in-ai-video-model-seedance-2-0-11003312",
} as const;

export const aiWillLinks = {
  work: "/work/ai-will",
  wechatReport: "https://mp.weixin.qq.com/s/EYsqgDYSDu6OsmzZ0vXrJw",
  wechatLaunch: "https://mp.weixin.qq.com/s/2cjf7AXjV7kHb5N0SsdbGQ",
  jikeLaunch: "https://m.okjike.com/originalPosts/66c175eca0d6d2ffc4b4244e",
  jikeRecap: "https://m.okjike.com/originalPosts/670cf05c46d5f8944cec94b7",
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Chenran Ning",
      alternateName: ["宁晨然", "jw782cn"],
      url: SITE_URL,
      image: `${SITE_URL}/assets/chenran-qcon.jpg`,
      jobTitle: "AI Video Product Lead",
      description: defaultDescription,
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Fudan University",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Cornell Tech",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Medeo",
        url: "https://www.medeo.app/",
      },
      knowsAbout: [
        "AI video",
        "AI filmmaking",
        "creator tools",
        "AI-native creative workflows",
        "full-stack engineering",
        "agent workflows",
      ],
      sameAs: profileLinks.map((link) => link.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: siteName,
      url: SITE_URL,
      inLanguage: ["en", "zh-CN"],
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile-page`,
      url: SITE_URL,
      name: siteName,
      inLanguage: ["en", "zh-CN"],
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
} as const;
