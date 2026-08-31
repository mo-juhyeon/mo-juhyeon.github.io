/**
 * All CV content lives here. Edit this file to update the site —
 * you should not need to touch App.tsx for ordinary content changes.
 *
 * Items marked TODO are placeholders waiting on real values.
 */

// ---------------------------------------------------------------- profile

export const PROFILE = {
  firstName: "Juhyeon",
  lastName: "Mo",
  tagline: "B.S. in Computer Science & Artificial Intelligence",
  affiliation: "Undergraduate Researcher",
  labName: "@PRISM Lab",
  labUrl: "http://sangsoolim.notion.site",
  university: "Dongguk University",
  email: "ahwngus2436@gmail.com",
  github: "https://github.com/mo-juhyeon",
  linkedin:
    "https://www.linkedin.com/in/%EC%A3%BC%ED%98%84-%EB%AA%A8-975766321/",
  // TODO: replace with the Google Drive link once the PDF is ready.
  cvPdf: "",
};

export const ABOUT_PARAGRAPHS = [
  `I am an undergraduate researcher in the Department of Computer Science and
   Artificial Intelligence at Dongguk University, working at PRISM Lab under
   Dr. Sangsoo Lim. My research is on molecular representation learning — in
   particular, building models for drug property prediction whose outputs can be
   traced back to chemically meaningful structure rather than accepted on faith.`,

  `My main project is MAGNET (Multi-view Aggregation of Chemical Graphs for
   Neural Embedding of Topologies), a cross-view molecular graph learning
   framework for ADMET prediction. Instead of encoding a molecule as a single
   graph, MAGNET learns complementary views of molecular topology and aggregates
   them, so that the model both predicts ADMET endpoints and exposes which
   substructures drive each prediction. I led this work as sole first author; the
   manuscript is currently under editorial review at Bioinformatics, and an
   earlier version received the Best Paper Award in the undergraduate division of
   KCC 2025.`,

  `I am interested in continuing this line of work in AI for drug discovery,
   molecular representation learning, and explainable AI — bridging the gap
   between predictive accuracy and the mechanistic insight that makes a model
   useful to chemists. I would be glad to connect with researchers and students
   who share these interests.`,
];

// ----------------------------------------------------------- publications

export type Presentation = {
  date: string;
  text: string;
  award: string | null;
};

export type Publication = {
  type: "paper" | "conference" | "registration";
  year: string;
  authors: string;
  title: string;
  venue: string;
  status?: string;
  doi?: string;
  github?: string;
  award?: string;
  awardDetail?: string;
  abstract?: string;
  presentations?: Presentation[];
};

/** Author name rendered in bold + underline wherever it appears. */
export const ME = "Mo J.";

export const PUBLICATIONS: Publication[] = [
  {
    type: "paper",
    year: "2026",
    // TODO: fill in the full co-author list in submission order.
    authors: `${ME}, ..., Lim S.`,
    title:
      "Cross-view molecular graph learning enables interpretable ADMET prediction",
    venue: "Bioinformatics",
    status: "Under editorial review · Sole first author",
    github: "https://github.com/sslim-aidrug/MAGNET",
    // TODO: paste the manuscript abstract here.
    abstract: "",
  },
  {
    type: "conference",
    year: "2025",
    // TODO: fill in the full co-author list.
    authors: `${ME}, ..., Lim S.`,
    title:
      "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies",
    venue:
      "Korea Computer Congress (KCC) 2025, Korean Institute of Information Scientists and Engineers (KIISE), Korea",
    status: "Co-first author",
    award: "BEST PAPER AWARD",
    awardDetail:
      "Best Paper Award, Undergraduate Division, Korea Computer Congress (KCC) 2025.",
    github: "https://github.com/sslim-aidrug/MAGNET",
  },
  {
    type: "registration",
    year: "2025",
    authors: `${ME}, ..., Lim S.`,
    title:
      "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies",
    // TODO: add the registration number (프로그램등록번호).
    venue: "Software Program Registration, Korea Copyright Commission · Approved",
  },
];

// ------------------------------------------------------------------ news

export type NewsItem = {
  date: string;
  text: string;
  link?: { label: string; href: string };
};

export const NEWS: NewsItem[] = [
  {
    date: "Jul 09, 2026",
    text: "📄 Submitted “Cross-view molecular graph learning enables interpretable ADMET prediction” to Bioinformatics.",
    link: {
      label: "Bioinformatics",
      href: "https://academic.oup.com/bioinformatics",
    },
  },
  {
    date: "Jun 27, 2026",
    text: "✈️ Started a one-month overseas research training program at the University of Sheffield, UK (Jun 27 – Jul 24, 2026).",
    link: {
      label: "University of Sheffield",
      href: "https://www.sheffield.ac.uk/",
    },
  },
  {
    date: "Jun 23, 2026",
    text: "🚀 Selected for an industry collaboration project with Seoul Metro: automated maintenance of rule-based chatbot training data through AI-driven analysis of unanswered queries.",
  },
  {
    date: "Jul 2025",
    text: "🎉 Received the Best Paper Award in the undergraduate division of KCC 2025 for MAGNET.",
    link: {
      label: "KCC 2025",
      href: "https://www.kiise.or.kr/conference/kcc/2025/",
    },
  },
  {
    date: "Aug 23, 2024",
    text: "🔬 Began my research journey at PRISM Lab, Dongguk University.",
  },
];

// ----------------------------------------------------------------- vitae

export type VitaeItem = { period: string; title: string; detail: string };
export type VitaeSection =
  | { heading: string; items: VitaeItem[] }
  | {
      heading: string;
      subsections: { subheading: string; items: VitaeItem[] }[];
    };

export const VITAE: VitaeSection[] = [
  {
    heading: "Research Interests",
    items: [
      {
        period: "",
        title:
          "Molecular Representation Learning · AI for Drug Discovery · Explainable AI",
        detail: "",
      },
    ],
  },
  {
    heading: "Education",
    items: [
      {
        // TODO: fill in the enrollment period, e.g. "2021–2027".
        period: "",
        title: "B.S. in Computer Science and Artificial Intelligence",
        detail: "Dongguk University, Seoul, Korea",
      },
    ],
  },
  {
    heading: "Research Experience",
    items: [
      {
        period: "Aug 2024–Present",
        title: "Undergraduate Researcher, PRISM Lab",
        detail:
          "Dongguk University, Seoul, Korea (Advisor: Dr. Sangsoo Lim)",
      },
      {
        period: "Jun–Jul 2026",
        title: "Overseas Research Training Program",
        detail: "University of Sheffield, Sheffield, United Kingdom",
      },
      {
        period: "Jun 2026–Present",
        title: "Industry Collaboration Project, Seoul Metro",
        detail:
          "Automated maintenance of rule-based chatbot training data through AI-driven analysis of unanswered queries",
      },
    ],
  },
  {
    heading: "Honors & Awards",
    items: [
      {
        period: "2025",
        title: "Best Paper Award, Undergraduate Division",
        detail:
          "Korea Computer Congress (KCC), Korean Institute of Information Scientists and Engineers (KIISE), Korea",
      },
      {
        period: "2024",
        title: "Grand Prize",
        detail: "AI Service Weekly-thon, Smilegate AI, Korea",
      },
      {
        period: "2024",
        title: "Encouragement Award, SNS Promotion Division",
        detail: "World Friends Korea ICT Volunteers, Korea",
      },
    ],
  },
  {
    heading: "Software Registration",
    items: [
      {
        period: "2025",
        // TODO: add the registration number.
        title: "Software Program Registration (approved)",
        detail:
          "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies, Korea Copyright Commission",
      },
    ],
  },
  {
    // TODO: confirm or edit — drafted from the tooling used in your projects.
    heading: "Technical Skills",
    items: [
      { period: "", title: "Programming", detail: "Python, C/C++, Java, SQL" },
      {
        period: "",
        title: "Machine Learning",
        detail:
          "PyTorch, PyTorch Geometric, DGL, Hugging Face Transformers, scikit-learn, Pandas, NumPy",
      },
      { period: "", title: "Cheminformatics", detail: "RDKit, DeepChem" },
    ],
  },
  {
    heading: "Languages",
    items: [
      // TODO: add an English test score if you have one.
      { period: "", title: "English", detail: "" },
      { period: "", title: "Korean", detail: "Native" },
    ],
  },
];
