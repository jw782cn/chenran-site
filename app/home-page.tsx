"use client";

import { LanguageProvider, useLanguage } from "./language-context";
import dict, { type Locale } from "./i18n";
import { profileLinks, seedanceLinks } from "./site-config";

function PageContent() {
  const { locale, toggle } = useLanguage();
  const t = dict[locale];

  return (
    <main lang={locale === "zh" ? "zh-CN" : "en"}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Chenran Ning home">
          CHENRAN NING
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map((item, i) => (
            <a key={i} href={`#${["medeo", "seedance", "projects", "speaking", "contact"][i]}`}>
              {item}
            </a>
          ))}
          <div className="lang-select-wrapper">
            <select
              className="lang-select"
              value={locale}
              onChange={(e) => {
                if (e.target.value !== locale) toggle();
              }}
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </nav>
      </header>

      <aside className="side-rail" aria-label="Highlights">
        <p>{t.sideRail.title}</p>
        {t.sideRail.stats.map(([number, label], index) => (
          <a href={index === 0 ? "#seedance" : "#medeo"} key={index}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{number}</strong>
            <small>{label}</small>
          </a>
        ))}
      </aside>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>{t.hero.name}</h1>
          <div className="hero-tags">
            {t.hero.tags.map((tag) => (
              <span className="hero-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className="lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a href="#medeo">{t.hero.cta[0]}</a>
            <a href="#contact">{t.hero.cta[1]}</a>
          </div>
        </div>
        <figure className="hero-media">
          <img src="/assets/chenran-qcon.jpg" alt="Chenran Ning speaking at QCon" />
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
            <p className="role-tag">{t.medeo.role}</p>
          </div>
          <h2>{t.medeo.heading}</h2>
          <p>{t.medeo.body}</p>
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
          <h2>{t.seedance.heading}</h2>
          <p>{t.seedance.body}</p>
          <div className="seedance-proof">
            <h3>{t.seedance.coverageTitle}</h3>
            <ul>
              {t.seedance.coverage.map((item, i) => (
                <li key={i}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <h3>{t.seedance.methodologyTitle}</h3>
            <p>{t.seedance.methodology}</p>
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
          <a href={seedanceLinks.work}>{t.seedance.caseStudy}</a>
          <a href={seedanceLinks.xPost} target="_blank" rel="noreferrer">
            {t.seedance.viewPost}
          </a>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-label">
          <span>03</span>
          <p>{locale === "en" ? "Projects" : "作品"}</p>
        </div>
        <div className="projects-content">
          <article className="project-feature">
            <h3>{t.projects.aiWill.title}</h3>
            <p className="project-collab">{t.projects.aiWill.collab}</p>
            <p>{t.projects.aiWill.body}</p>
            <a href="https://www.douban.com/note/864914620/" target="_blank" rel="noreferrer">
              {t.projects.aiWill.link}
            </a>
          </article>
          <article className="project-feature">
            <h3>{t.projects.aiFilms.title}</h3>
            <p>{t.projects.aiFilms.body}</p>
          </article>
          <article className="project-feature">
            <h3>{t.projects.videoCreation.title}</h3>
            <p>{t.projects.videoCreation.body}</p>
            <a href="https://space.bilibili.com/11821775" target="_blank" rel="noreferrer">
              {t.projects.videoCreation.link}
            </a>
          </article>
        </div>
      </section>

      <section className="section proof" id="speaking">
        <div className="section-label">
          <span>04</span>
          <p>{locale === "en" ? "Speaking" : "演讲"}</p>
        </div>
        <div className="proof-copy">
          <h2>{t.speaking.heading}</h2>
          <div>
            {t.speaking.press.map((item, i) => (
              <p key={i}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.text}
                  </a>
                ) : (
                  item.text
                )}
              </p>
            ))}
          </div>
        </div>
        <figure className="portrait-strip">
          <img src="/assets/chenran-medeo.webp" alt="Chenran Ning working on Medeo" />
        </figure>
      </section>

      <footer className="footer" id="contact">
        <div>
          <p className="eyebrow">{t.footer.eyebrow}</p>
          <h2>{t.footer.heading}</h2>
        </div>
        <div className="footer-links">
          {profileLinks.map(({ label, href }) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}

export function HomePage({ initialLocale = "en" }: { initialLocale?: Locale }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <PageContent />
    </LanguageProvider>
  );
}
