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
  nameKo: "모주현",
  headline:
    "Molecular Representation Learning · AI for Drug Discovery · Explainable AI",
  tagline: "B.S. in Computer Science & Artificial Intelligence",
  affiliation: "Undergraduate Researcher",
  labName: "PRISM Lab",
  labUrl: "http://sangsoolim.notion.site",
  location: "Seoul, South Korea",
  university: "Dongguk University",
  email: "ahwngus2436@gmail.com",
  github: "https://github.com/mo-juhyeon",
  linkedin:
    "https://www.linkedin.com/in/%EC%A3%BC%ED%98%84-%EB%AA%A8-975766321/",
  // TODO: replace with the Google Drive link once the PDF is ready.
  cvPdf: "",
};

export const CONTACT_INTRO =
  "I'm always happy to connect with researchers, students, and mentors. Feel free to reach out through any of the channels below.";

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
  /** Omitted while an author list is still being settled. */
  authors?: string;
  title: string;
  venue: string;
  status?: string;
  links?: { label: string; href: string }[];
  award?: string;
  awardDetail?: string;
  abstract?: string;
  presentations?: Presentation[];
};

/** Author name rendered in bold + underline wherever it appears. */
export const ME = "Mo J.";

/** Footnote for the asterisk in author lists. */
export const PUBLICATIONS_NOTE =
  "‡ Equal contribution.  * Corresponding author.  Underlined name indicates the author of this site.";

/** Google Drive file viewer link. */
const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

export const PUBLICATIONS: Publication[] = [
  {
    type: "paper",
    year: "2026",
    authors: `${ME}, Lee M., Lee S., Lim S.*`,
    title:
      "Cross-view molecular graph learning enables interpretable ADMET prediction",
    venue: "Bioinformatics",
    status: "Under editorial review · Sole first author",
    links: [
      { label: "PDF", href: drive("14_F8Qwds56z4IypPNg8GepRD24KA0SOt") },
      { label: "Supplementary", href: drive("1Jq_iEfOPuus_eim10bTePfJuX-rAqW99") },
      { label: "GitHub", href: "https://github.com/sslim-aidrug/MAGNET" },
    ],
    abstract:
      "Motivation: Accurate and interpretable ADMET prediction remains challenging because molecular properties arise from structural features across multiple scales. We introduce MAGNET, a cross-view molecular graph learning framework that represents molecules as meta-graphs constructed from complementary BRICS, Junction Tree and Murcko scaffold decompositions. By connecting overlapping fragments across views, MAGNET enables message passing between chemically distinct but structurally related substructures. Multi-objective pre-training further aligns graph representations with molecular descriptors and chemical language model embeddings. " +
      "Results: Across 10 ADMET benchmarks, MAGNET achieved the best performance on seven tasks and the strongest overall rank against fifteen baseline models. MAGNET also identifies cross-view consensus fragments that receive enriched attention, dominate perturbation-based attribution, and recover known structure–activity relationships, permeability determinants, BACE substituent effects and polarity-dependent solvation behavior. These results establish cross-view consensus as a practical principle for interpretable molecular representation learning.",
  },
  {
    type: "paper",
    year: "2026",
    authors: `Lee M., ${ME}, Kang M., Lim S.*`,
    title:
      "SJoINT: Substructure-Driven Junction Tree for Interpretable ADMET Prediction",
    venue: "Manuscript in preparation",
    status: "Co-author · Submission planned for September 2026",
    links: [{ label: "GitHub", href: "https://github.com/sslim-aidrug/SJoINT" }],
  },
  {
    type: "registration",
    year: "2025",
    authors: `Lim S., ${ME}, Lee Y., Lee M.`,
    title:
      "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies",
    venue:
      "Software Registration No. C-2025-040207, Korea Copyright Commission · Registered Oct 1, 2025",
  },
  {
    type: "conference",
    year: "2025",
    authors: `${ME}‡, Lee Y.‡, Lee M., Lim S.*`,
    title:
      "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies",
    venue:
      "Undergraduate/Junior Paper Competition, Korea Computer Congress (KCC) 2025, Korean Institute of Information Scientists and Engineers (KIISE), Korea",
    status: "Co-first author",
    award: "BEST PAPER AWARD",
    awardDetail:
      "Best Paper Award, Undergraduate Division, Undergraduate/Junior Paper Competition, Korea Computer Congress (KCC) 2025 (awarded Jul 30, 2025).",
    links: [
      { label: "Paper", href: drive("1YUXyhn8TRT2TmWwAlZtMOIGjYEZwSQxF") },
      { label: "Poster", href: drive("1Ojhni21QtqcRPqGK_xYR2jjWHXJKULMo") },
      { label: "Certificate", href: drive("1GcobzciQs5A5paxltuP1uiGskujrh9e3") },
      { label: "GitHub", href: "https://github.com/sslim-aidrug/MAGNET" },
    ],
    presentations: [
      {
        date: "Jul 2025",
        text: "Poster presentation at the Undergraduate/Junior Paper Competition, KCC 2025, Korea.",
        award: "🎉 Best Paper Award",
      },
    ],
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
    date: "Jun 29, 2026",
    text: "✈️ Started a month-long summer school programme at The Sheffield College, UK (Jun 29 – Jul 24, 2026).",
    link: {
      label: "The Sheffield College",
      href: "https://www.sheffcol.ac.uk/",
    },
  },
  {
    date: "Jun 23, 2026",
    text: "🚀 Selected as the team to build and demonstrate our chatbot maintenance system at Seoul Metro, running through December 2026.",
  },
  {
    date: "Jun 12, 2026",
    text: "✅ Completed the WE-Meet undergraduate industry project: automated maintenance of rule-based chatbot training data through AI-driven analysis of unanswered queries.",
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
    date: "Nov 24, 2024",
    text: "🎉 Our team received an Encouragement Award from World Friends Korea for our ICT volunteering, in the SNS promotion division.",
  },
  {
    date: "Aug 23, 2024",
    text: "🔬 Began my research journey at PRISM Lab, Dongguk University.",
  },
  {
    date: "Jul 27, 2024",
    text: "🏆 Our team won the Grand Prize at the Smilegate AI Service Weekly-thon with “Story Weaver”, an AI game quest generator.",
    link: {
      label: "Smilegate AI Service Weekly-thon",
      href: "https://newsroom.smilegate.com/lab/2024AIweeklyton",
    },
  },
  {
    date: "Apr 2024",
    text: "🌍 Started seven months of ICT education volunteering with Ukrainian students through World Friends Korea (Apr – Oct 2024).",
  },
];

// ----------------------------------------------------------------- vitae

export type VitaeItem = {
  period: string;
  title: string;
  detail: string;
  /** Shown above the title as a chip — used for award names. */
  badge?: string;
  links?: { label: string; href: string }[];
};
export type VitaeSection =
  | { heading: string; items: VitaeItem[] }
  | { heading: string; keywords: string[] }
  | {
      heading: string;
      subsections: { subheading: string; items: VitaeItem[] }[];
    };

export const VITAE: VitaeSection[] = [
  {
    heading: "Research Interests",
    keywords: [
      "Molecular Representation Learning",
      "AI for Drug Discovery",
      "Explainable AI",
      "Graph Neural Networks",
      "ADMET Prediction",
    ],
  },
  {
    heading: "Education",
    items: [
      {
        period: "2023–Present",
        title: "B.S. in Computer Science and Artificial Intelligence",
        detail: "Dongguk University, Seoul, Korea",
      },
      {
        period: "Jun–Jul 2026",
        title: "Summer School Programme",
        detail:
          "The Sheffield College, Sheffield, United Kingdom · English language, communication and teamwork, digital literacy, and project-based learning (Jun 29 – Jul 24, 2026)",
        links: [
          { label: "Certificate", href: drive("1Pf05TWZgTA2ks5NeGUE2XPA-wg4OdriZ") },
        ],
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
        period: "Jun–Dec 2026",
        title: "Industry Deployment Project, Seoul Metro",
        detail:
          "Selected in June 2026 as the team to build and demonstrate the system at Seoul Metro, extending the WE-Meet project below",
      },
      {
        period: "Apr–Jun 2026",
        title: "WE-Meet Undergraduate Industry Project",
        detail:
          "Convergence and Open Sharing System, National Research Foundation of Korea · Automated maintenance of rule-based chatbot training data through AI-driven analysis of unanswered queries, in collaboration with Seoul Metro",
        links: [
          { label: "Certificate", href: drive("17cnkOyzF7J8oFuulo06r3yhPxFyJh-X5") },
        ],
      },
    ],
  },
  {
    heading: "Teaching & Outreach",
    items: [
      {
        period: "Apr–Oct 2024",
        title: "ICT Education Volunteer, World Friends Korea",
        detail:
          "Taught ICT to Ukrainian students over seven months · National Information Society Agency (NIA), Korea · Team FLY HAI",
      },
    ],
  },
  {
    heading: "Honors & Awards",
    items: [
      {
        period: "2025",
        badge: "BEST PAPER AWARD",
        title:
          "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies",
        detail:
          "Undergraduate Division · Korea Computer Congress (KCC) 2025, Korean Institute of Information Scientists and Engineers (KIISE), Korea",
        links: [
          { label: "Certificate", href: drive("1GcobzciQs5A5paxltuP1uiGskujrh9e3") },
        ],
      },
      {
        period: "2024",
        badge: "GRAND PRIZE",
        title: "Story Weaver — AI game quest and character art generator",
        detail:
          "AI Service Weekly-thon, Smilegate Future Lab, Korea · 1st of 16 teams · Team Sweer",
        links: [
          {
            label: "Announcement",
            href: "https://newsroom.smilegate.com/lab/2024AIweeklyton",
          },
          { label: "GitHub", href: "https://github.com/mo-juhyeon/AIStoryWeaver" },
        ],
      },
      {
        period: "2024",
        badge: "ENCOURAGEMENT AWARD",
        title: "SNS promotion for overseas ICT volunteering",
        detail:
          "SNS Promotion Division · World Friends Korea ICT Volunteers, National Information Society Agency (NIA), Korea · Team FLY HAI",
        links: [
          { label: "Certificate", href: drive("1B7guWzCGqS57hh7oibFOkE3pLeFqXJQ1") },
        ],
      },
    ],
  },
  {
    heading: "Software Registration",
    items: [
      {
        period: "2025",
        title: "Software Registration No. C-2025-040207",
        detail:
          "Multi-view Aggregation of Chemical Graphs for Neural Embedding of Topologies, Korea Copyright Commission",
      },
    ],
  },
  {
    heading: "Certifications",
    items: [
      {
        period: "2024",
        title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
        detail: "Microsoft",
        links: [
          {
            label: "Verify",
            href: "https://www.credly.com/badges/427c7583-43b2-4ab1-9934-015369e82b29/public_url",
          },
        ],
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
