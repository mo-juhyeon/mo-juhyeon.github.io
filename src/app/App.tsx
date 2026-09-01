import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/ImageWithFallback";
import {
  PROFILE,
  ABOUT_PARAGRAPHS,
  PUBLICATIONS,
  NEWS,
  VITAE,
  ME,
  type Publication,
  type VitaeItem,
  type NewsItem,
} from "@/content";

type Section =
  | "about"
  | "publications"
  | "news"
  | "vitae"
  | "publication-detail"
  | "contact";

const NAV_LINKS: { id: Section; label: string }[] = [
  { id: "about", label: "about" },
  { id: "publications", label: "publications" },
  { id: "news", label: "news" },
  { id: "vitae", label: "vitae" },
  { id: "contact", label: "contact" },
];

/** Contact/profile links, minus any whose URL has not been filled in yet. */
const LINKS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, desc: "Reach out anytime" },
  { label: "GitHub", value: PROFILE.github.replace(/^https?:\/\//, ""), href: PROFILE.github, desc: "Code & projects" },
  { label: "LinkedIn", value: "linkedin.com/in/주현-모", href: PROFILE.linkedin, desc: "Professional profile" },
  { label: "CV (PDF)", value: "Download CV", href: PROFILE.cvPdf, desc: "Full curriculum vitae" },
].filter((l) => l.href && l.href !== "mailto:");

/** Render news text, turning `link.label` (if present) into a hyperlink. */
function renderNewsText(item: NewsItem) {
  if (!item.link) return item.text;
  const idx = item.text.indexOf(item.link.label);
  if (idx === -1) return item.text;
  return (
    <>
      {item.text.slice(0, idx)}
      <a
        href={item.link.href}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline underline-offset-2"
      >
        {item.link.label}
      </a>
      {item.text.slice(idx + item.link.label.length)}
    </>
  );
}

/** Author list with the site owner's name emphasised. */
function AuthorList({ authors }: { authors: string }) {
  const parts = authors.split(", ");
  return (
    <p className="text-sm font-sans text-muted-foreground">
      {parts.map((author, idx) => (
        <span key={idx}>
          {author === ME ? (
            <span className="font-bold underline underline-offset-2">{author}</span>
          ) : (
            author
          )}
          {idx < parts.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div
          key={i}
          className={`grid grid-cols-[7rem_1fr] gap-4 ${i > 0 ? "border-t" : ""} border-border ${
            i === 0 ? "pb-4" : "py-4"
          }`}
        >
          <span className="font-mono text-xs text-muted-foreground pt-0.5">{item.date}</span>
          <p className="text-base font-sans text-foreground leading-relaxed">
            {renderNewsText(item)}
          </p>
        </div>
      ))}
    </div>
  );
}

function AboutSection() {
  const [intro, ...rest] = ABOUT_PARAGRAPHS;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
        <div className="space-y-5">
          <div>
            <h1 className="font-garamond text-4xl md:text-5xl font-normal text-foreground leading-tight">
              <span className="font-semibold">{PROFILE.firstName}</span> {PROFILE.lastName}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground font-sans tracking-wide">
              {PROFILE.tagline} &nbsp;·&nbsp; {PROFILE.affiliation}{" "}
              <a
                href={PROFILE.labUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline underline-offset-2"
              >
                {PROFILE.labName}
              </a>
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-xs font-mono text-foreground border border-border px-3 py-1 rounded hover:bg-accent hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="text-base leading-relaxed font-sans text-foreground">{intro}</p>
        </div>

        <div className="flex-shrink-0 order-first md:order-none">
          <div className="w-42 md:w-54 overflow-hidden border border-border/40 shadow-sm md:mt-36">
            <ImageWithFallback
              src="/profile.jpg"
              alt={`${PROFILE.firstName} ${PROFILE.lastName}`}
              className="w-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {rest.map((para, i) => (
        <p key={i} className="text-base leading-relaxed font-sans text-foreground">
          {para}
          {i === rest.length - 1 && (
            <>
              {" "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-primary hover:underline underline-offset-2"
              >
                Get in touch.
              </a>
            </>
          )}
        </p>
      ))}
    </div>
  );
}

function PublicationsSection({
  onPublicationClick,
}: {
  onPublicationClick?: (pub: Publication) => void;
}) {
  const [showAwardDetail, setShowAwardDetail] = useState<{ [key: number]: boolean }>({});

  const toggleAwardDetail = (index: number) =>
    setShowAwardDetail((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="space-y-6">
      {PUBLICATIONS.map((pub, i) => (
        <div
          key={i}
          className={`grid grid-cols-[3rem_1fr] gap-4 ${
            i > 0 ? "border-t border-border pt-5" : "pb-5"
          }`}
        >
          <span className="font-mono text-xs text-muted-foreground pt-0.5">{pub.year}</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AuthorList authors={pub.authors} />
              {pub.type === "registration" && (
                <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 text-xs font-sans rounded">
                  SW REG.
                </span>
              )}
            </div>

            {onPublicationClick ? (
              <button
                onClick={() => onPublicationClick(pub)}
                className="font-garamond text-lg text-foreground hover:text-primary transition-colors leading-snug text-left"
              >
                {pub.title}
              </button>
            ) : (
              <span className="font-garamond text-lg text-foreground leading-snug">
                {pub.title}
              </span>
            )}

            <p className="mt-1 text-xs font-mono text-muted-foreground italic">{pub.venue}</p>
            {pub.status && (
              <p className="mt-0.5 text-xs font-mono text-muted-foreground">{pub.status}</p>
            )}

            <div className="flex items-center gap-2 mt-3">
              {pub.award && (
                <button
                  onClick={() => toggleAwardDetail(i)}
                  className="px-2 py-1 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs font-sans rounded border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  {pub.award} {showAwardDetail[i] ? "▼" : "▶"}
                </button>
              )}
              {pub.doi && (
                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 text-xs font-mono border border-border hover:bg-accent hover:text-white transition-colors rounded"
                >
                  DOI
                </a>
              )}
              {pub.github && (
                <a
                  href={pub.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 text-xs font-mono border border-border hover:bg-accent hover:text-white transition-colors rounded"
                >
                  CODE
                </a>
              )}
            </div>

            {pub.awardDetail && showAwardDetail[i] && (
              <div className="mt-3 p-3 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded bg-gray-50/50 dark:bg-gray-900/30">
                <p className="text-sm font-sans text-foreground">{pub.awardDetail}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function VitaeEntry({ item }: { item: VitaeItem }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-4 border-t border-border py-3">
      <span className="font-mono text-xs text-muted-foreground pt-0.5">{item.period}</span>
      <div>
        <p className="text-base font-sans font-medium text-foreground leading-snug">{item.title}</p>
        {item.detail && (
          <p className="text-sm font-sans text-muted-foreground">{item.detail}</p>
        )}
        {item.links && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {item.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 text-xs font-mono border border-border hover:bg-accent hover:text-white transition-colors rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VitaeSection() {
  return (
    <div className="space-y-10">
      {PROFILE.cvPdf && (
        <p className="text-sm text-muted-foreground font-sans">
          Abbreviated curriculum vitae.{" "}
          <a
            href={PROFILE.cvPdf}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline underline-offset-2"
          >
            Download full CV (PDF)
          </a>
        </p>
      )}

      {VITAE.map((sec) => (
        <div key={sec.heading}>
          <h2 className="font-garamond text-2xl text-foreground mb-4 font-normal">
            {sec.heading}
          </h2>

          {"subsections" in sec ? (
            <div className="space-y-6">
              {sec.subsections.map((sub) => (
                <div key={sub.subheading}>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    {sub.subheading}
                  </p>
                  {sub.items.map((item, i) => (
                    <VitaeEntry key={i} item={item} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {sec.items.map((item, i) => (
                <VitaeEntry key={i} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PublicationDetailSection({ publication }: { publication: Publication | null }) {
  if (!publication) return null;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-garamond text-3xl md:text-4xl text-foreground mb-4 leading-tight">
          {publication.title}
        </h1>
        <AuthorList authors={publication.authors} />
        <p className="mt-2 text-sm font-mono text-muted-foreground italic">{publication.venue}</p>
        {publication.status && (
          <p className="mt-1 text-sm font-mono text-muted-foreground">{publication.status}</p>
        )}
      </div>

      {publication.abstract && (
        <div className="mb-8">
          <h2 className="font-garamond text-2xl text-foreground mb-4">Abstract</h2>
          <p className="text-base font-sans text-foreground leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      )}

      {publication.awardDetail && (
        <div className="mb-8">
          <h2 className="font-garamond text-2xl text-foreground mb-4">Award</h2>
          <p className="text-base font-sans text-foreground leading-relaxed">
            {publication.awardDetail}
          </p>
        </div>
      )}

      {publication.presentations && (
        <div className="mb-8">
          <h2 className="font-garamond text-2xl text-foreground mb-4">Presentation History</h2>
          <div className="space-y-0">
            {publication.presentations.map((pres, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[7rem_1fr] gap-4 border-t border-border py-3"
              >
                <span className="font-mono text-xs text-muted-foreground pt-0.5">{pres.date}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-sans text-foreground">{pres.text}</span>
                  {pres.award && (
                    <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xs font-sans rounded">
                      {pres.award}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        {publication.doi && (
          <a
            href={publication.doi}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 border border-border hover:bg-accent hover:text-white transition-colors text-sm font-sans rounded"
          >
            Paper (DOI)
          </a>
        )}
        {publication.github && (
          <a
            href={publication.github}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 border border-border hover:bg-accent hover:text-white transition-colors text-sm font-sans rounded"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="space-y-10 max-w-2xl">
      <p className="text-base font-sans text-muted-foreground leading-relaxed">
        I'm always happy to connect with researchers, students, and mentors. Feel free to reach out
        via any of the channels below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="group block p-5 border border-border rounded-lg hover:border-primary hover:bg-accent/30 transition-all duration-200"
          >
            <p className="font-mono text-xs text-muted-foreground mb-1 uppercase tracking-widest">
              {item.label}
            </p>
            <p className="font-sans text-base font-medium text-foreground group-hover:text-primary transition-colors">
              {item.value}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(
    () => (window.location.hash.slice(1) as Section) || "about",
  );
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveSection(hash as Section);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  const openPublication = (pub: Publication) => {
    setSelectedPublication(pub);
    handleSectionChange("publication-detail");
  };

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        .font-garamond { font-family: 'EB Garamond', Georgia, serif; }
        .font-mono { font-family: 'DM Mono', 'Courier New', monospace; }
        .font-sans { font-family: 'DM Sans', system-ui, sans-serif; }
      `}</style>

      {/* Top navigation */}
      <header className="border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
          <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionChange(link.id)}
                className={`text-sm font-sans tracking-wide transition-colors duration-150 ${
                  activeSection === link.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {activeSection === "about" && (
          <div className="space-y-16">
            <AboutSection />

            <section>
              <div className="flex items-baseline justify-between border-b border-border pb-3 mb-6">
                <h2 className="font-garamond text-2xl font-normal text-foreground">News</h2>
                <button
                  onClick={() => handleSectionChange("news")}
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                >
                  more →
                </button>
              </div>
              <NewsList items={NEWS.slice(0, 3)} />
            </section>

            <section>
              <h2 className="font-garamond text-2xl font-normal text-foreground mb-6 border-b border-border pb-3">
                Publications
              </h2>
              <PublicationsSection onPublicationClick={openPublication} />
            </section>
          </div>
        )}

        {activeSection === "publications" && (
          <div className="space-y-8">
            <h1 className="font-garamond text-3xl md:text-4xl font-normal text-foreground border-b border-border pb-4">
              Publications
            </h1>
            <PublicationsSection onPublicationClick={openPublication} />
          </div>
        )}

        {activeSection === "news" && (
          <div className="space-y-8">
            <h1 className="font-garamond text-3xl md:text-4xl font-normal text-foreground border-b border-border pb-4">
              News
            </h1>
            <NewsList items={NEWS} />
          </div>
        )}

        {activeSection === "vitae" && (
          <div className="space-y-8">
            <h1 className="font-garamond text-3xl md:text-4xl font-normal text-foreground border-b border-border pb-4">
              Curriculum Vitae
            </h1>
            <VitaeSection />
          </div>
        )}

        {activeSection === "contact" && (
          <div className="space-y-8">
            <h1 className="font-garamond text-3xl md:text-4xl font-normal text-foreground border-b border-border pb-4">
              Contact
            </h1>
            <ContactSection />
          </div>
        )}

        {activeSection === "publication-detail" && (
          <PublicationDetailSection publication={selectedPublication} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-6">
          <p className="font-mono text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {PROFILE.firstName} {PROFILE.lastName} &nbsp;·&nbsp;{" "}
            {PROFILE.university}
          </p>
        </div>
      </footer>
    </div>
  );
}
