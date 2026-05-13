import type { Metadata } from "next";
import { aiWillLinks, SITE_URL } from "../../site-config";

const workUrl = `${SITE_URL}${aiWillLinks.work}`;

export const metadata: Metadata = {
  title: "AI Will with Xinshixiang | Chenran Ning",
  description:
    "A case study of Chenran Ning's AI Will project with Xinshixiang, covering product design, full-stack development, AI dialogue design, and public proof links.",
  alternates: {
    canonical: "/work/ai-will",
  },
  openGraph: {
    url: workUrl,
    title: "AI Will with Xinshixiang | Chenran Ning",
    description:
      "A reported 10,000+ participant AI reflection product built with Xinshixiang.",
    images: ["/assets/chenran-qcon.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Will with Xinshixiang | Chenran Ning",
    description:
      "A reported 10,000+ participant AI reflection product built with Xinshixiang.",
    images: ["/assets/chenran-qcon.jpg"],
  },
};

const proofLinks = [
  ["WeChat report: AI Newrank / Xinshixiang", aiWillLinks.wechatReport],
  ["WeChat launch article", aiWillLinks.wechatLaunch],
  ["Jike launch note", aiWillLinks.jikeLaunch],
  ["Jike 10K+ recap", aiWillLinks.jikeRecap],
] as const;

const workJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${workUrl}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Will",
          item: workUrl,
        },
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": `${workUrl}#creative-work`,
      name: "AI Will",
      description:
        "An AI-guided reflective writing experience created with Xinshixiang, using structured dialogue to help young people reflect on mortality, relationships, and personal values.",
      datePublished: "2024-08-18",
      creator: {
        "@id": `${SITE_URL}/#person`,
      },
      contributor: {
        "@type": "Organization",
        name: "Xinshixiang",
      },
      about: ["AI dialogue", "reflective writing", "social storytelling", "AI product design"],
      citation: proofLinks.map(([label, href]) => ({
        "@type": "CreativeWork",
        name: label,
        url: href,
      })),
    },
  ],
} as const;

export default function AiWillWorkPage() {
  return (
    <main className="work-page">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />
      <header className="site-header work-header">
        <a className="brand" href="/" aria-label="Back to Chenran Ning home">
          CHENRAN NING
        </a>
        <nav aria-label="Work navigation">
          <a href="/">Home</a>
          <a href="/zh">中文</a>
          <a href={aiWillLinks.wechatReport} target="_blank" rel="noreferrer">
            WeChat Report
          </a>
        </nav>
      </header>

      <section className="work-hero">
        <p className="eyebrow">Case Study</p>
        <h1>AI Will with Xinshixiang</h1>
        <p className="lede">
          I designed and built an AI-guided reflective writing product with
          Xinshixiang. Public coverage and my recap describe 10,000+ young
          people using it to think through mortality, relationships, and
          personal values.
        </p>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>01</span>
          <p>Role</p>
        </div>
        <div className="seedance-content">
          <h2>Product designer, full-stack developer, dialogue designer.</h2>
          <p>
            I worked across product framing, interaction flow, full-stack
            implementation, and AI dialogue experience. The core question was
            not whether AI could generate a document, but whether conversation
            with AI could become a meaningful reflective ritual.
          </p>
        </div>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>02</span>
          <p>Approach</p>
        </div>
        <div className="seedance-content">
          <h2>AI as a medium for self-reflection.</h2>
          <p>
            The experience used structured prompts and guided conversation to
            help users move from abstract feelings into concrete choices,
            memories, relationships, and value ordering. It sits closer to
            social storytelling and emotional product design than to a generic
            content-generation tool.
          </p>
        </div>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>03</span>
          <p>Proof</p>
        </div>
        <div className="seedance-content">
          <h2>Public report first, personal posts as context.</h2>
          <p>
            The primary public proof is the WeChat report. The launch and recap
            posts are kept as secondary context for role, timing, and the
            reported 10,000+ participation figure.
          </p>
          <div className="proof-list">
            {proofLinks.map(([label, href]) => (
              <a href={href} key={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
