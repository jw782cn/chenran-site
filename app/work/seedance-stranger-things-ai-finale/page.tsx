import type { Metadata } from "next";
import { seedanceLinks, SITE_URL } from "../../site-config";

const workUrl = `${SITE_URL}${seedanceLinks.work}`;

export const metadata: Metadata = {
  title: "Seedance 2.0 Stranger Things AI Finale | Chenran Ning",
  description:
    "A case study of Chenran Ning's Seedance 2.0 Stranger Things finale experiment, with verified proof links, reported reach, workflow, and media coverage.",
  alternates: {
    canonical: "/work/seedance-stranger-things-ai-finale",
  },
  openGraph: {
    url: `${SITE_URL}/work/seedance-stranger-things-ai-finale`,
    title: "Seedance 2.0 Stranger Things AI Finale | Chenran Ning",
    description:
      "Verified proof links and workflow notes for the reported 25M+ impression AI film experiment.",
    images: ["/assets/chenran-qcon.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seedance 2.0 Stranger Things AI Finale | Chenran Ning",
    description:
      "Verified proof links and workflow notes for the reported 25M+ impression AI film experiment.",
    images: ["/assets/chenran-qcon.jpg"],
  },
};

const proofLinks = [
  ["Original X post", seedanceLinks.xPost],
  ["YouTube video", seedanceLinks.youtube],
  ["Bilibili video", seedanceLinks.bilibili],
  ["Jike recap", seedanceLinks.jike],
  ["Linkloud / Tencent News salon recap", seedanceLinks.linkloud],
  ["BAAI / GeekPark reposted recap", seedanceLinks.baai],
  ["Cosmic Book News", seedanceLinks.cosmicBookNews],
  ["Times of India", seedanceLinks.timesOfIndia],
  ["Zoom TV", seedanceLinks.zoomTv],
  ["MARS Magazine", seedanceLinks.marsMagazine],
  ["NDTV Profit", seedanceLinks.ndtvProfit],
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
          name: "Seedance 2.0 Stranger Things AI Finale",
          item: workUrl,
        },
      ],
    },
    {
      "@type": "VideoObject",
      "@id": `${workUrl}#video`,
      name: "I Fixed Stranger Things 5 with Seedance 2.0",
      description:
        "Chenran Ning's Seedance 2.0 Stranger Things finale experiment, documented with verified proof links and reported reach.",
      uploadDate: "2026-02-12",
      thumbnailUrl: "https://i.ytimg.com/vi/iEmsuUuGBY4/hqdefault.jpg",
      embedUrl: "https://www.youtube.com/embed/iEmsuUuGBY4",
      contentUrl: seedanceLinks.youtube,
      inLanguage: "en",
      creator: {
        "@id": `${SITE_URL}/#person`,
      },
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      about: ["Seedance 2.0", "AI video", "AI filmmaking", "Stranger Things fan finale"],
      sameAs: [seedanceLinks.xPost, seedanceLinks.youtube, seedanceLinks.bilibili],
      citation: proofLinks.map(([label, href]) => ({
        "@type": "CreativeWork",
        name: label,
        url: href,
      })),
    },
  ],
} as const;

export default function SeedanceWorkPage() {
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
          <a href={seedanceLinks.xPost} target="_blank" rel="noreferrer">
            X Post
          </a>
        </nav>
      </header>

      <section className="work-hero">
        <p className="eyebrow">Case Study</p>
        <h1>Seedance 2.0 Stranger Things AI Finale</h1>
        <p className="lede">
          I reimagined the Stranger Things finale with Seedance 2.0 and built the
          short film as a script-first AI-native production experiment. The case
          has reported 25M+ impressions across media and social platforms.
        </p>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>01</span>
          <p>Role</p>
        </div>
        <div className="seedance-content">
          <h2>Creator, director, writer, editor, workflow designer.</h2>
          <p>
            The work connects AI video product judgment with hands-on filmmaking:
            fandom research, script iteration, character reference control,
            audio design, editing, publishing, and post-release analysis.
          </p>
        </div>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>02</span>
          <p>Workflow</p>
        </div>
        <div className="seedance-content">
          <h2>Script density before model spectacle.</h2>
          <p>
            The production used Reddit and fan reaction signals to identify unmet
            expectations, then tested the idea with short MVP clips before
            expanding it into a longer sequence. The workflow emphasized content
            scarcity, the first five seconds, repeated reversals, and Seedance
            2.0 multi-reference generation.
          </p>
        </div>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>03</span>
          <p>Film</p>
        </div>
        <div className="seedance-content">
          <h2>Watch the public version.</h2>
          <p>
            The video is embedded from YouTube. Bilibili and X are kept as
            separate proof links because their metrics and comments are platform
            specific.
          </p>
        </div>
        <div className="video-hero">
          <iframe
            title="I Fixed Stranger Things 5 with Seedance 2.0"
            src="https://www.youtube.com/embed/iEmsuUuGBY4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section seedance-section work-section">
        <div className="section-label">
          <span>04</span>
          <p>Proof</p>
        </div>
        <div className="seedance-content">
          <h2>Verified links, not floating claims.</h2>
          <p>
            Reach numbers should be described as reported or estimated. The BAAI
            / GeekPark recap cites roughly 19.14M views across related X posts;
            the 25M+ figure is a reported all-platform exposure estimate, not a
            private dashboard metric.
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
