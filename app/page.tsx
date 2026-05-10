const navItems = ["Work", "Films", "Builds", "Speaking", "Contact"];

const stats = [
  ["25M+", "reported cross-platform impressions"],
  ["10K+", "reported AI Will participants"],
  ["200K", "Claude context behind RepoChat"],
  ["QCon", "AI product engineering talk"],
];

const work = [
  {
    kicker: "Product",
    title: "Medeo",
    body: "Head of Product for a chat-first AI video creation and editing platform. Owns product strategy, roadmap, and workflows that turn text, audio, images, links, and scripts into editable video.",
    link: "https://www.medeo.app/",
  },
  {
    kicker: "Film",
    title: "Seedance 2.0 Stranger Things finale",
    body: "Created a viral AI film experiment reimagining the Stranger Things finale, reaching 25M+ reported impressions and coverage from Chinese and international media.",
    link: "https://x.com/Nin19536",
  },
  {
    kicker: "Social product",
    title: "AI Will",
    body: "Designed and built an AI-guided reflective writing experience with Xinshixiang, using conversation as a medium for self-reflection and social storytelling.",
    link: "https://www.douban.com/note/864914620/",
  },
];

const builds = [
  "RepoChat-200k, a long-context GitHub repo understanding and coding tool for Claude 200k.",
  "ComfyUI-Catcat, a lightweight UX extension later featured in Comflowy AI Weekly.",
  "Label Assistant, a GPT-4V batch labeling tool for SD and LoRA creator datasets.",
  "LangGraph frontend agent for generating runnable shadcn components from natural language.",
];

const press = [
  "Linkloud salon recap on making a 25M-view AI video with a 50 RMB budget.",
  "QCon Beijing / InfoQ talk on AI-native product engineering and Flow Engineer roles.",
  "Times of India and Zoom TV coverage of the Seedance 2.0 Stranger Things experiment.",
  "Public workflow breakdowns for Devices, The Creature, Vision, and AI-native video production.",
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
          <a href="#work" key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{number}</strong>
            <small>{label}</small>
          </a>
        ))}
      </aside>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI video product lead / full-stack engineer / AI filmmaker</p>
          <h1>
            YOUR TICKET TO AI VIDEO, PRODUCT, AND STORY
          </h1>
          <p className="lede">
            I build video products from model capability to creative workflow, then test them in the public arena through films, tools, talks, and creator experiments.
          </p>
          <div className="hero-actions">
            <a href="#work">Enter work</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <figure className="hero-media">
          <img src="/assets/chenran-qcon.jpg" alt="Chenran Ning speaking at QCon" />
          <figcaption>QCon Beijing / InfoQ, AI product engineering talk</figcaption>
        </figure>
      </section>

      <section className="section intro" id="work">
        <div className="section-label">
          <span>01</span>
          <p>Work</p>
        </div>
        <div className="intro-copy">
          <h2>Hello, I am Chenran Ning.</h2>
          <p>
            I am building Medeo, a conversation-first AI video editor. My work sits between product strategy, full-stack engineering, model integration, and AI-native content creation.
          </p>
          <p>
            The through-line is simple: make powerful AI systems usable enough that people can create, iterate, and publish with them.
          </p>
        </div>
      </section>

      <section className="work-grid">
        {work.map((item) => (
          <article className="work-item" key={item.title}>
            <p>{item.kicker}</p>
            <h3>{item.title}</h3>
            <span>{item.body}</span>
            <a href={item.link} target="_blank" rel="noreferrer">
              View source
            </a>
          </article>
        ))}
      </section>

      <section className="section media-section" id="films">
        <div className="section-label">
          <span>02</span>
          <p>Films</p>
        </div>
        <div>
          <h2>AI films as product tests.</h2>
          <p>
            I use short films and public experiments to stress-test AI video workflows: script density, multimodal control, fast MVP testing, cross-platform spread, and production-ready output.
          </p>
        </div>
        <div className="video-grid">
          <div className="video-card">
            <iframe
              title="Seedance 2.0 AI video short"
              src="https://www.youtube.com/embed/N8ELq1PtZsE"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p>Stranger Things finale experiment</p>
          </div>
          <div className="video-card">
            <iframe
              title="Seedance 2.0 changed AI video"
              src="https://www.youtube.com/embed/vrWFp4Z87-4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p>Seedance 2.0 public remix trail</p>
          </div>
        </div>
      </section>

      <section className="section builds" id="builds">
        <div className="section-label">
          <span>03</span>
          <p>Builds</p>
        </div>
        <div className="builds-list">
          {builds.map((item, index) => (
            <p key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </p>
          ))}
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
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <figure className="portrait-strip">
          <img src="/assets/chenran-medeo.webp" alt="Chenran Ning portrait from Medeo" />
          <img src="/assets/github-avatar.jpg" alt="Chenran Ning GitHub avatar" />
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
