import { useState, useEffect, useMemo } from "react";
import {
  PROFILE,
  ABOUT_PARAGRAPHS,
  CONTACT_INTRO,
  PUBLICATIONS,
  PUBLICATIONS_NOTE,
  NEWS,
  VITAE,
  ME,
  type Publication,
  type NewsItem,
  type VitaeItem,
} from "@/content";

type Section = "about" | "publications" | "news" | "vitae" | "contact";
const SECTIONS: Section[] = ["about", "publications", "news", "vitae", "contact"];

const FULL_NAME = `${PROFILE.firstName} ${PROFILE.lastName}`;

/** Stable DOM id from a title, so search results can scroll to a row. */
const slugId = (s: string) =>
  "x-" +
  s.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 64);

/** Profile links, minus any whose URL has not been filled in yet. */
const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, desc: "Reach out anytime" },
  {
    label: "GitHub",
    value: PROFILE.github.replace(/^https?:\/\//, ""),
    href: PROFILE.github,
    desc: "Code & projects",
  },
  { label: "LinkedIn", value: "linkedin.com/in/주현-모", href: PROFILE.linkedin, desc: "Professional profile" },
  { label: "CV (PDF)", value: "Download CV", href: PROFILE.cvPdf, desc: "Full curriculum vitae" },
].filter((l) => l.href && l.href !== "mailto:");

// ------------------------------------------------------------------ search

type Hit = { id: string; section: Section; title: string; where: string; text: string };

function buildSearch(): Hit[] {
  const out: Hit[] = [];
  PUBLICATIONS.forEach((p) =>
    out.push({
      id: slugId(p.title),
      section: "publications",
      title: p.title,
      where: "Publications",
      text: [p.title, p.venue, p.status, p.authors, p.abstract, p.awardDetail]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    }),
  );
  VITAE.forEach((sec) => {
    if ("keywords" in sec) return;
    const items = "items" in sec ? sec.items : sec.subsections.flatMap((s) => s.items);
    items.forEach((it) =>
      out.push({
        id: slugId(it.title),
        section: "vitae",
        title: it.title,
        where: sec.heading,
        text: [it.title, it.detail].filter(Boolean).join(" ").toLowerCase(),
      }),
    );
  });
  NEWS.forEach((n) =>
    out.push({
      id: slugId(n.text),
      section: "news",
      title: n.text.replace(/^[^A-Za-z가-힣]+/, ""),
      where: "News",
      text: n.text.toLowerCase(),
    }),
  );
  return out;
}

// --------------------------------------------------------------- fragments

function renderNews(item: NewsItem) {
  if (!item.link) return item.text;
  const idx = item.text.indexOf(item.link.label);
  if (idx === -1) return item.text;
  return (
    <>
      {item.text.slice(0, idx)}
      <a href={item.link.href} target="_blank" rel="noreferrer">
        {item.link.label}
      </a>
      {item.text.slice(idx + item.link.label.length)}
    </>
  );
}

/** Author list with the site owner's name emphasised. */
function Authors({ authors }: { authors: string }) {
  const parts = authors.split(", ");
  return (
    <p className="pub-authors">
      {parts.map((a, i) => (
        <span key={i}>
          {a.replace(/[‡*]+$/, "") === ME ? <span className="me">{a}</span> : a}
          {i < parts.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function ChipLinks({ links }: { links?: { label: string; href: string }[] }) {
  if (!links) return null;
  return (
    <>
      {links.map((l) => (
        <a key={l.label} className="chip-btn" href={l.href} target="_blank" rel="noreferrer">
          {l.label}
        </a>
      ))}
    </>
  );
}

function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="rows">
      {items.map((item, i) => (
        <div className="row" key={i} id={slugId(item.text)}>
          <span className="row-date">{item.date}</span>
          <p className="row-text">{renderNews(item)}</p>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------------------ publications

function PublicationRow({ pub }: { pub: Publication }) {
  const [open, setOpen] = useState(false);
  const hasDetails = !!(pub.abstract || pub.awardDetail || pub.presentations);

  return (
    <div className="row proj" id={slugId(pub.title)}>
      <span className="row-date">{pub.year}</span>
      <div>
        {pub.authors && <Authors authors={pub.authors} />}
        <p className="pub-title">{pub.title}</p>
        <p className="pub-venue">{pub.venue}</p>
        {pub.status && <p className="pub-status">{pub.status}</p>}

        <div className="tagrow">
          {pub.award && <span className="badge">{pub.award}</span>}
          <ChipLinks links={pub.links} />
          {hasDetails && (
            <button className="chip-btn" onClick={() => setOpen((o) => !o)}>
              {pub.abstract ? "Abstract" : "Details"} {open ? "▾" : "▸"}
            </button>
          )}
        </div>

        {hasDetails && open && (
          <div className="details">
            {pub.abstract && <p>{pub.abstract}</p>}
            {pub.awardDetail && <p>{pub.awardDetail}</p>}
            {pub.presentations && (
              <>
                <h4>Presentation history</h4>
                <ul>
                  {pub.presentations.map((pres, i) => (
                    <li key={i}>
                      {pres.date} — {pres.text}
                      {pres.award ? ` ${pres.award}` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Publications({ items }: { items: Publication[] }) {
  return (
    <div>
      <div className="rows">
        {items.map((pub, i) => (
          <PublicationRow key={i} pub={pub} />
        ))}
      </div>
      <p className="group-note">{PUBLICATIONS_NOTE}</p>
    </div>
  );
}

// ------------------------------------------------------------------ about

function About({ go }: { go: (s: Section) => void }) {
  const [intro, ...rest] = ABOUT_PARAGRAPHS;

  return (
    <div className="stack-lg">
      <div>
        <div className="about-head">
          <h1 className="name">
            <b>{PROFILE.firstName}</b> {PROFILE.lastName}
            <span className="ko">{PROFILE.nameKo}</span>
          </h1>
          <p className="headline">{PROFILE.headline}</p>

          <img className="portrait" src="/profile.jpg" alt={FULL_NAME} />

          <p className="standing">
            {PROFILE.tagline} · {PROFILE.affiliation}
            {" @ "}
            <a href={PROFILE.labUrl} target="_blank" rel="noreferrer">
              {PROFILE.labName}
            </a>
          </p>
          <p className="location">
            📍 {PROFILE.university}, {PROFILE.location}
          </p>

          <div className="linkrow">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>

          <p className="bio">{intro}</p>
        </div>

        {rest.map((para, i) => (
          <p className="bio" key={i}>
            {para}
            {i === rest.length - 1 && (
              <>
                {" "}
                <a href={`mailto:${PROFILE.email}`}>Get in touch.</a>
              </>
            )}
          </p>
        ))}
      </div>

      <section>
        <div className="block-head">
          <h2 className="block-title">News</h2>
          <button className="more-link" onClick={() => go("news")}>
            more →
          </button>
        </div>
        <NewsList items={NEWS.slice(0, 3)} />
      </section>

      <section>
        <div className="block-head">
          <h2 className="block-title">Publications</h2>
          <button className="more-link" onClick={() => go("publications")}>
            more →
          </button>
        </div>
        <Publications items={PUBLICATIONS.slice(0, 3)} />
      </section>
    </div>
  );
}

// ------------------------------------------------------------------ vitae

function VitaeRow({ item }: { item: VitaeItem }) {
  return (
    <div className="row wide" id={slugId(item.title)}>
      <span className="row-date">{item.period}</span>
      <div>
        <p className="row-title">{item.title}</p>
        {item.detail && <p className="row-detail">{item.detail}</p>}
        {(item.badge || item.links) && (
          <div className="tagrow" style={{ marginTop: 8 }}>
            {item.badge && <span className="badge">{item.badge}</span>}
            <ChipLinks links={item.links} />
          </div>
        )}
      </div>
    </div>
  );
}

function Vitae() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (!vis.length) return;
        vis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -62% 0px", threshold: 0 },
    );
    VITAE.forEach((sec) => {
      const el = document.getElementById(slugId(sec.heading));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="vitae-layout">
      <nav className="vitae-toc" aria-label="Sections on this page">
        {VITAE.map((sec) => {
          const id = slugId(sec.heading);
          return (
            <button
              key={sec.heading}
              className={active === id ? "toc-link active" : "toc-link"}
              onClick={() => jump(id)}
            >
              {sec.heading}
            </button>
          );
        })}
      </nav>

      <div className="stack-md vitae-body">
        {VITAE.map((sec) => (
          <div key={sec.heading} id={slugId(sec.heading)}>
            <h2 className="vitae-sec-title">{sec.heading}</h2>

            {"keywords" in sec ? (
              <div className="kw-row">
                {sec.keywords.map((k) => (
                  <span className="kw" key={k}>
                    {k}
                  </span>
                ))}
              </div>
            ) : "subsections" in sec ? (
              <div className="stack-md">
                {sec.subsections.map((sub) => (
                  <div key={sub.subheading}>
                    <p className="subhead">{sub.subheading}</p>
                    <div className="rows">
                      {sub.items.map((it, i) => (
                        <VitaeRow key={i} item={it} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rows">
                {sec.items.map((it, i) => (
                  <VitaeRow key={i} item={it} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- contact

function contactIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("email"))
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </svg>
    );
  if (l.includes("github"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17 4.9 18 5.2 18 5.2c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    );
  if (l.includes("linkedin"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2 2 0 11-.02 4 2 2 0 01.02-4zM3 8.5h4V21H3zM9 8.5h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M6 2.75h7.5L18.5 7.75V21.25H6z" />
      <path d="M13.5 2.75V8h5" />
    </svg>
  );
}

function Contact() {
  return (
    <div className="stack-md">
      <p className="row-text muted" style={{ maxWidth: "42rem" }}>
        {CONTACT_INTRO}
      </p>
      <div className="contact-grid">
        {LINKS.map((c) => (
          <a
            key={c.label}
            className="contact-card"
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
          >
            <div className="contact-head">
              <span className="contact-icon">{contactIcon(c.label)}</span>
              <p className="k">{c.label}</p>
            </div>
            <p className="v">{c.value}</p>
            <p className="d">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------- app

export default function App() {
  const [section, setSection] = useState<Section>(() => {
    const h = window.location.hash.slice(1) as Section;
    return SECTIONS.includes(h) ? h : "about";
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [showTop, setShowTop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const search = useMemo(buildSearch, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1) as Section;
      if (SECTIONS.includes(h)) setSection(h);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

  const go = (s: Section) => {
    setSection(s);
    window.location.hash = s;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const q = query.trim().toLowerCase();
  const results = q ? search.filter((h) => h.text.includes(q)).slice(0, 8) : [];

  const goToHit = (h: Hit) => {
    setSearchOpen(false);
    setQuery("");
    setSection(h.section);
    window.location.hash = h.section;
    setTimeout(() => {
      const el = document.getElementById(h.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      else window.scrollTo({ top: 0 });
    }, 70);
  };

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wrap">
          <nav className="nav">
            <button className="nav-name" onClick={() => go("about")}>
              {FULL_NAME}
            </button>
            <div className="nav-right">
              {SECTIONS.map((id) => (
                <button key={id} className={section === id ? "active" : ""} onClick={() => go(id)}>
                  {id}
                </button>
              ))}
              <button
                className="nav-icon"
                aria-label="Search"
                title="Search (/)"
                onClick={() => setSearchOpen(true)}
              >
                ⌕
              </button>
              <button
                className="nav-icon"
                aria-label="Toggle dark mode"
                title="Toggle theme"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="wrap">
          {section === "about" && <About go={go} />}

          {section === "publications" && (
            <>
              <h1 className="page-title">Publications</h1>
              <Publications items={PUBLICATIONS} />
            </>
          )}

          {section === "news" && (
            <>
              <h1 className="page-title">News</h1>
              <NewsList items={NEWS} />
            </>
          )}

          {section === "vitae" && (
            <>
              {PROFILE.cvPdf ? (
                <div className="page-head">
                  <h1 className="page-title">Curriculum Vitae</h1>
                  <a
                    className="cv-pdf"
                    href={PROFILE.cvPdf}
                    target="_blank"
                    rel="noreferrer"
                    title="View / download CV (PDF)"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="M6 2.75h7.5L18.5 7.75V21.25H6z M13.5 2.75V8h5"
                      />
                    </svg>
                    PDF
                  </a>
                </div>
              ) : (
                <h1 className="page-title">Curriculum Vitae</h1>
              )}
              <Vitae />
            </>
          )}

          {section === "contact" && (
            <>
              <h1 className="page-title">Contact</h1>
              <Contact />
            </>
          )}
        </div>
      </main>

      <footer>
        <div className="wrap">
          <p className="cred">
            © {new Date().getFullYear()} {FULL_NAME} · {PROFILE.university}
          </p>
        </div>
      </footer>

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              className="search-input"
              placeholder="Search publications, news, and CV…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) goToHit(results[0]);
              }}
            />
            <div className="search-results">
              {q && results.length === 0 && <p className="search-empty">No matches.</p>}
              {results.map((h) => (
                <button key={h.id} className="search-hit" onClick={() => goToHit(h)}>
                  <span className="search-hit-title">{h.title}</span>
                  <span className="search-hit-where">{h.where}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTop && (
        <button
          className="to-top"
          aria-label="Back to top"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </div>
  );
}
