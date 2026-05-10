const navItems = ["Medeo", "Seedance", "Projects", "Speaking", "Contact"];

const stats = [
  ["25M+", "reported impressions, Seedance 2.0"],
  ["Medeo", "Head of Product, AI video"],
  ["5+", "AI short films produced"],
  ["10K+", "AI Will participants"],
];

const press = [
  {
    text: "Times of India coverage of the Stranger Things AI finale experiment.",
    link: "https://timesofindia.indiatimes.com",
  },
  {
    text: "Zoom TV: Stranger Things AI-Created Finale Goes Viral.",
    link: null,
  },
  {
    text: "Linkloud salon recap: making a 25M-view AI video with 50 RMB.",
    link: null,
  },
  {
    text: "QCon Beijing / InfoQ: AI-native product engineering and Flow Engineer roles.",
    link: null,
  },
  {
    text: "Public workflow breakdowns for Devices, The Creature, Vision, and AI-native video production.",
    link: null,
  },
];

const links = [
  ["X", "https://x.com/ran_zixing"],
  ["GitHub", "https://github.com/jw782cn"],
  ["LinkedIn", "https://cn.linkedin.com/in/chenran-ning/en"],
  ["Jike", "https://web.okjike.com/u/B6B0FF28-51D1-4A11-803E-FC46A0AD6EF8"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Chenran Ning home">
          CHENRAN NING
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <aside className="side-rail" aria-label="Highlights">
        <p>Proof includes</p>
        {stats.map(([number, label], index) => (
          <a href="#medeo" key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{number}</strong>
            <small>{label}</small>
          </a>
        ))}
      </aside>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>CHENRAN NING</h1>
          <div className="hero-tags">
            <span className="hero-tag">AI Video Product Lead</span>
            <span className="hero-tag">Full-stack Engineer</span>
            <span className="hero-tag">AI Filmmaker</span>
          </div>
          <p className="lede">
            I connect AI model capabilities, product experience, and creative storytelling into things people actually use and share.
          </p>
          <div className="hero-actions">
            <a href="#medeo">Enter work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <figure className="hero-media">
          <img src="/assets/chenran-qcon.jpg" alt="Chenran Ning" />
          <figcaption>Chenran Ning</figcaption>
        </figure>
      </section>

      <section className="section medeo-section" id="medeo">
        <div className="section-label">
          <span>01</span>
          <p>Medeo</p>
        </div>
        <div className="medeo-content">
          <div className="medeo-header">
            <img src="/assets/medeo-logo.png" alt="Medeo" className="medeo-inline-logo" />
            <p className="role-tag">Head of Product</p>
          </div>
          <h2>Conversation-first AI video editor.</h2>
          <p>
            Create and edit video through natural language. Text, images, scripts go in; publishable video comes out. I own product strategy, roadmap, and the full creation workflow.
          </p>
          <div className="medeo-links">
            <a href="https://www.medeo.app/" target="_blank" rel="noreferrer">
              medeo.app
            </a>
            <a href="https://www.one2x.ai/" target="_blank" rel="noreferrer">
              one2x.ai
            </a>
          </div>
        </div>
        </section>

      <section className="section seedance-section" id="seedance">
        <div className="section-label">
          <span>02</span>
          <p>Seedance</p>
        </div>
        <div className="seedance-content">
          <h2>25M+ impressions from one AI film experiment.</h2>
          <p>
            I created a Stranger Things finale reimagined entirely with Seedance 2.0. The film went viral across Chinese and international media, becoming one of the most-referenced examples of AI video storytelling in 2026.
          </p>
          <div className="seedance-proof">
            <h3>Coverage</h3>
            <ul>
              <li><a href="https://timesofindia.indiatimes.com/technology/tech-news/stranger-things-finale-created-with-ai-goes-viral/articleshow/121786498.cms" target="_blank" rel="noreferrer">Times of India: international entertainment media pickup</a></li>
              <li><a href="https://www.zoom.tv/entertainment/stranger-things-ai-created-finale-goes-viral" target="_blank" rel="noreferrer">Zoom TV: &quot;Stranger Things AI-Created Finale Goes Viral&quot;</a></li>
              <li>Multiple Chinese AI / entertainment outlets</li>
              <li><a href="https://mp.weixin.qq.com/s/sMg2MsaClpFIMBx8A1tJRQ" target="_blank" rel="noreferrer">Linkloud salon: detailed methodology breakdown</a></li>
            </ul>
            <h3>Methodology</h3>
            <p>
              Content scarcity, script information density, fast MVP testing, cross-platform distribution, and an AI-native production pipeline. Total production cost: 50 RMB.
            </p>
          </div>
        </div>
        <div className="video-hero">
          <iframe
            title="Seedance 2.0 Stranger Things AI finale"
            src="https://www.youtube.com/embed/iEmsuUuGBY4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="seedance-links">
          <a href="https://x.com/Nin19536/status/2021956823457440179" target="_blank" rel="noreferrer">
            View original post on X
          </a>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-label">
          <span>03</span>
          <p>Projects</p>
        </div>
        <div className="projects-content">
          <article className="project-feature">
            <h3>AI Will</h3>
            <p className="project-collab">with Xinshixiang</p>
            <p>
              Designed and built an AI-guided reflective writing experience. Through structured conversation, 10,000+ young people explored mortality, relationships, and personal values. AI as medium for self-reflection, not content generation.
            </p>
            <a href="https://www.douban.com/note/864914620/" target="_blank" rel="noreferrer">
              Douban project page
            </a>
          </article>
          <article className="project-feature">
            <h3>AI Short Films</h3>
            <p>
              Director, writer, and editor on multiple AI short films: The Creature (Whisk + Kling), Devices (Blender + ComfyUI), Vision (MJ + GPT-4o + Luma/Runway). Each serves as a public workflow breakdown and production-method test.
            </p>
          </article>
        </div>
      </section>

      <section className="section proof" id="speaking">
        <div className="section-label">
          <span>04</span>
          <p>Speaking</p>
        </div>
        <div className="proof-copy">
          <h2>Public thinking, not just shipped screens.</h2>
          <div>
            {press.map((item) => (
              <p key={item.text}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer">{item.text}</a>
                ) : (
                  item.text
                )}
              </p>
            ))}
          </div>
        </div>
        <figure className="portrait-strip">
          <img src="/assets/chenran-medeo.webp" alt="Chenran Ning" />
        </figure>
      </section>

      <footer className="footer" id="contact">
        <div>
          <p className="eyebrow">Connect</p>
          <h2>Build the next AI-native story with me.</h2>
        </div>
        <div className="footer-links">
          {links.map(([label, href]) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
