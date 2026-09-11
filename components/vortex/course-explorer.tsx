"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Globe2,
  GraduationCap,
  Languages,
  MessageCircle,
  Microscope,
  School,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";

const whatsappHref = "https://wa.me/923244270697";

type CategoryIcon =
  | "school"
  | "graduation"
  | "award"
  | "international"
  | "admissions"
  | "languages"
  | "users"
  | "skills"
  | "research";

export type CourseCategory = {
  title: string;
  summary: string;
  icon: CategoryIcon;
  details: string[];
  popular: string[];
  examPrep?: string[];
};

const iconMap: Record<CategoryIcon, LucideIcon> = {
  school: School,
  graduation: GraduationCap,
  award: Award,
  international: Globe2,
  admissions: Microscope,
  languages: Languages,
  users: Users,
  skills: Wrench,
  research: BookOpen,
};

const courseCategories: CourseCategory[] = [
  {
    title: "Early Years & Primary",
    summary: "Playgroup to primary learning support.",
    icon: "school",
    details: ["Playgroup", "Pre-Nursery", "Nursery", "Kindergarten / KG", "Reception", "Montessori", "EYFS", "Grades 1-6", "KS1", "KS2", "Cambridge Primary", "Pearson Edexcel iPrimary", "IB PYP", "Pakistani Primary Curriculum"],
    popular: ["English", "Mathematics", "Science", "Phonics", "Reading", "Writing"],
    examPrep: ["Primary school assessments", "Phonics screening support", "School entrance preparation"],
  },
  {
    title: "Middle & Secondary",
    summary: "Support through middle and high school.",
    icon: "graduation",
    details: ["Grades 6-10", "Grades 9-12", "Years 7-11", "KS3", "KS4", "Cambridge Lower Secondary", "Pearson Edexcel iLowerSecondary", "American Middle School", "High School Diploma", "AP", "IB MYP", "IBDP"],
    popular: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
    examPrep: ["School exam preparation", "GCSE preparation", "AP and IB assessment support", "Past papers and mock exams"],
  },
  {
    title: "Cambridge International",
    summary: "Cambridge learning from Primary to A Levels.",
    icon: "award",
    details: ["Cambridge Early Years", "Cambridge Primary", "Cambridge Lower Secondary", "Cambridge IGCSE", "Cambridge O Level", "Cambridge ICE", "Cambridge International AS Level", "Cambridge International A Level", "Cambridge AICE Diploma", "Cambridge IPQ"],
    popular: ["Mathematics", "Additional Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "Business", "Economics", "Accounting"],
    examPrep: ["IGCSE and O Level preparation", "AS and A Level preparation", "Past papers and mock exams", "Exam technique and revision planning"],
  },
  {
    title: "Pearson Edexcel",
    summary: "Edexcel qualifications and exam preparation.",
    icon: "award",
    details: ["Pearson iPrimary", "Pearson iLowerSecondary", "Pearson Edexcel GCSE", "International GCSE", "AS Level", "A Level", "International AS Level", "International A Level", "BTEC", "BTEC Firsts", "BTEC Nationals", "BTEC Higher Nationals", "Functional Skills", "NVQ"],
    popular: ["Mathematics", "Sciences", "English", "Business", "Economics", "Accounting", "ICT"],
    examPrep: ["GCSE and International GCSE preparation", "International AS and A Level preparation", "BTEC assessment support", "Past papers and mock exams"],
  },
  {
    title: "Matric & Intermediate",
    summary: "Pakistani boards and college-level preparation.",
    icon: "school",
    details: ["All Pakistani BISE Boards", "FBISE", "BISE Lahore", "BISE Gujranwala", "BISE Rawalpindi", "BISE Faisalabad", "BISE Multan", "BISE Peshawar", "BISE Quetta", "Sindh Boards", "AKU-EB", "AJK BISE", "Technical Education Boards", "SSC / Matric", "HSSC / Intermediate", "FSc Pre-Medical", "FSc Pre-Engineering", "ICS", "I.Com", "FA", "DAE"],
    popular: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English", "Accounting"],
    examPrep: ["SSC / Matric board preparation", "HSSC / Intermediate board preparation", "BISE and FBISE past papers", "Entry planning after Intermediate"],
  },
  {
    title: "IB & International Curricula",
    summary: "International curriculum support worldwide.",
    icon: "international",
    details: ["IB PYP", "IB MYP", "IB Diploma Programme", "American Curriculum", "US High School Diploma", "Advanced Placement", "British Curriculum", "UK National Curriculum", "Common Core", "Australian Curriculum", "Canadian Curriculum", "OxfordAQA", "AQA", "OCR", "WJEC", "CBSE", "ICSE / ISC"],
    popular: ["Math", "Sciences", "English", "Humanities", "Business", "Computer Science"],
    examPrep: ["IB MYP and Diploma preparation", "Internal assessment support", "AP preparation", "International exam planning"],
  },
  {
    title: "Medical & Engineering Tests",
    summary: "Preparation for admissions and entry tests.",
    icon: "admissions",
    details: ["MDCAT", "NUMS MDCAT", "Medical university admission tests", "ECAT", "UET Entrance Test", "NUST NET", "FAST NU Test", "GIKI Admission Test", "PIEAS Admission Test", "COMSATS NTS/NAT"],
    popular: ["Biology", "Chemistry", "Physics", "Mathematics", "English", "Analytical Reasoning"],
    examPrep: ["MDCAT and NUMS preparation", "ECAT preparation", "NUST NET preparation", "FAST, GIKI, PIEAS and COMSATS tests", "Timed mocks and exam strategy"],
  },
  {
    title: "University Admissions",
    summary: "Local and international admission test preparation.",
    icon: "admissions",
    details: ["SAT", "ACT", "NTS NAT", "NTS GAT", "HAT", "USAT", "GRE", "GMAT", "LSAT", "LNAT", "UCAT", "TMUA", "STEP", "MAT", "LUMS admission preparation", "IBA Admission Test", "University-specific tests"],
    popular: ["Quantitative", "Verbal", "Writing", "Reasoning", "Interview Preparation"],
    examPrep: ["SAT and ACT preparation", "GRE and GMAT preparation", "NTS, HAT and USAT preparation", "University-specific admissions support"],
  },
  {
    title: "English & Language Tests",
    summary: "English learning and international test preparation.",
    icon: "languages",
    details: ["IELTS Academic", "IELTS General Training", "IELTS UKVI", "TOEFL iBT", "PTE Academic", "Duolingo English Test", "Cambridge English", "OET", "Spoken English", "Academic English", "Business English", "Grammar", "Writing", "Conversation", "English for Professionals"],
    popular: ["Speaking", "Listening", "Reading", "Writing", "Grammar", "Vocabulary"],
    examPrep: ["IELTS Academic and General Training", "TOEFL, PTE and Duolingo preparation", "OET preparation", "Speaking, listening, reading and writing practice"],
  },
  {
    title: "University Tutoring",
    summary: "Academic support beyond school.",
    icon: "users",
    details: ["Undergraduate", "Associate Degree", "Masters", "Postgraduate", "PhD academic support", "Computer Science", "Engineering", "AI", "Data Science", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Accounting", "Finance", "Economics", "English", "Psychology"],
    popular: ["Subject Tutoring", "Programming Help", "Research Methods", "Academic Writing", "FYP Guidance", "Thesis Guidance", "Statistics", "SPSS", "MATLAB", "Python", "R", "LaTeX"],
    examPrep: ["University subject revision", "Assignment and assessment guidance", "Research and thesis milestones", "Academic writing and presentation support"],
  },
  {
    title: "Professional Courses",
    summary: "Build career-ready knowledge and skills.",
    icon: "skills",
    details: ["Accounting & Finance", "ACCA Preparation", "CA Preparation", "CFA Preparation", "Business & Management", "Project Management", "PMP Preparation", "Entrepreneurship", "Digital Marketing", "IT & Computing", "Programming", "Artificial Intelligence", "Data Science", "Cybersecurity", "Graphic Design", "Communication Skills", "Public Speaking", "Office Productivity", "Career Development"],
    popular: ["AI", "Digital Marketing", "Programming", "Project Management", "Business", "Design"],
    examPrep: ["Professional certification preparation", "PMP and finance exam support", "Portfolio and project guidance", "Career-focused learning plans"],
  },
  {
    title: "TESOL & Teacher Training",
    summary: "Professional development for educators.",
    icon: "graduation",
    details: ["TESOL", "TEFL", "TESL", "CELTA preparation / guidance", "English Language Teaching", "ESL Teacher Training", "EFL Teacher Training", "Early Childhood Education", "Montessori Teacher Training", "Phonics Teacher Training", "Synthetic Phonics", "Classroom Management", "Lesson Planning", "Curriculum Development", "Assessment & Evaluation", "Educational Technology", "AI for Teachers"],
    popular: ["Lesson Planning", "Phonics", "Classroom Management", "ESL/EFL", "Teacher Development"],
    examPrep: ["TESOL, TEFL and TESL preparation", "Teacher development plans", "Lesson planning and assessment", "Classroom observation and feedback"],
  },
  {
    title: "Technical & Vocational Skills",
    summary: "Practical skills for education and employment.",
    icon: "skills",
    details: ["NAVTTC course preparation", "Technical & Vocational Education", "Digital Skills", "Graphic Design", "UI/UX Design", "Web Development", "Full-Stack Development", "Mobile App Development", "WordPress", "E-Commerce", "SEO", "Social Media Marketing", "Freelancing", "Amazon / E-Commerce Skills", "Generative AI", "Machine Learning", "Data Analytics", "Cloud Computing", "Networking", "MS Office", "AutoCAD", "Video Editing"],
    popular: ["Web Development", "Graphic Design", "AI", "Freelancing", "Office Skills", "E-Commerce"],
    examPrep: ["NAVTTC course preparation", "Technical skills assessment", "Portfolio and project support", "Industry-focused accelerated plans"],
  },
  {
    title: "Research & Academic Support",
    summary: "Support for higher education and research.",
    icon: "research",
    details: ["Research Methods", "Thesis Guidance", "FYP Guidance", "Academic Writing", "Research Tools", "Statistics", "SPSS", "MATLAB", "Python", "R", "LaTeX", "Data Analysis", "Literature Review", "Proposal Writing"],
    popular: ["Thesis", "FYP", "Academic Writing", "Statistics", "Research Tools"],
    examPrep: ["Research proposal support", "Thesis and FYP milestones", "Data analysis and statistics", "Academic writing and presentation review"],
  },
];

const filterLabels = ["All Routes", "School", "Cambridge", "Edexcel", "Admissions", "Languages", "Professional"];
const tabs = ["Overview", "Programs & Levels", "Subjects", "Exam Prep"] as const;
type Tab = (typeof tabs)[number];

function searchableText(category: CourseCategory) {
  return [category.title, category.summary, ...category.details, ...category.popular, ...(category.examPrep ?? [])].join(" ").toLowerCase();
}

function matchesFilter(category: CourseCategory, filter: string) {
  if (filter === "All Routes") return true;
  if (filter === "School") return ["Early Years & Primary", "Middle & Secondary", "Matric & Intermediate", "IB & International Curricula"].includes(category.title);
  if (filter === "Cambridge") return category.title.includes("Cambridge") || searchableText(category).includes("cambridge");
  if (filter === "Edexcel") return category.title.includes("Edexcel") || searchableText(category).includes("edexcel");
  if (filter === "Admissions") return ["Medical & Engineering Tests", "University Admissions", "English & Language Tests"].includes(category.title);
  if (filter === "Languages") return ["English & Language Tests", "TESOL & Teacher Training"].includes(category.title);
  return ["University Tutoring", "Professional Courses", "TESOL & Teacher Training", "Technical & Vocational Skills", "Research & Academic Support"].includes(category.title);
}

export function CourseExplorer({ categories = courseCategories }: { categories?: CourseCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Routes");
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CourseCategory | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesQuery = !normalizedQuery || searchableText(category).includes(normalizedQuery);
      return matchesQuery && matchesFilter(category, activeFilter);
    });
  }, [activeFilter, categories, query]);

  const shouldShowAll = showAll || query.trim().length > 0 || activeFilter !== "All Routes";
  const visibleCategories = shouldShowAll ? filteredCategories : filteredCategories.slice(0, 8);

  useEffect(() => {
    if (!activeCategory) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeCategory]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveCategory(null);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  function openCategory(category: CourseCategory) {
    setActiveCategory(category);
    setActiveTab("Overview");
  }

  return (
    <>
      <section className="mt-10 rounded-[1.5rem] border border-vortex-border bg-white p-4 shadow-[0_16px_60px_rgba(9,29,83,0.06)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block min-w-0 flex-1">
            <span className="sr-only">Search courses</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-vortex-blue" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAll(false);
              }}
              placeholder="Search by subject, exam, level or curriculum..."
              className="h-12 w-full rounded-2xl border border-vortex-border bg-vortex-soft pl-12 pr-11 text-sm text-vortex-navy outline-none transition placeholder:text-vortex-muted focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-vortex-muted transition hover:bg-white hover:text-vortex-navy"
                aria-label="Clear course search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </label>
          <div className="flex items-center gap-2 text-xs font-semibold text-vortex-muted">
            <SlidersHorizontal className="size-4 text-vortex-blue" />
            <span>{filteredCategories.length} learning routes</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Learning route filters">
          {filterLabels.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
              aria-pressed={activeFilter === filter}
              className={`h-9 shrink-0 rounded-full border px-4 text-xs font-semibold transition ${
                activeFilter === filter
                  ? "border-vortex-navy bg-vortex-navy text-white"
                  : "border-vortex-border bg-white text-vortex-slate hover:border-vortex-cyan hover:text-vortex-blue"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleCategories.map((category, index) => {
          const Icon = iconMap[category.icon];
          const previewItems = category.details.slice(0, 3);

          return (
            <button
              key={category.title}
              type="button"
              onClick={() => openCategory(category)}
              className="group flex min-h-[260px] flex-col rounded-[1.25rem] border border-vortex-border bg-white p-5 text-left shadow-[0_14px_50px_rgba(9,29,83,0.06)] transition hover:-translate-y-1 hover:border-vortex-cyan/60 hover:shadow-[0_20px_65px_rgba(9,29,83,0.12)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold text-vortex-muted">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span className="mt-5 block font-heading text-2xl font-semibold leading-tight text-vortex-navy">{category.title}</span>
              <span className="mt-2 block text-sm leading-6 text-vortex-muted">{category.summary}</span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {previewItems.map((item) => (
                  <span key={item} className="rounded-full bg-vortex-soft px-2.5 py-1 text-[0.68rem] font-semibold text-vortex-slate">{item}</span>
                ))}
                {category.details.length > previewItems.length ? (
                  <span className="rounded-full border border-vortex-border px-2.5 py-1 text-[0.68rem] font-semibold text-vortex-muted">+{category.details.length - previewItems.length} more</span>
                ) : null}
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-vortex-blue">
                Explore route
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </button>
          );
        })}
      </div>

      {filteredCategories.length === 0 ? (
        <div className="mt-6 rounded-[1.25rem] border border-dashed border-vortex-border bg-white p-8 text-center">
          <p className="font-heading text-2xl font-semibold text-vortex-navy">No matching learning route yet</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-vortex-muted">Try another search, or contact us and we will help you find the right subject, curriculum, exam, or professional skill.</p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary mt-5 h-11 px-5">
            <MessageCircle className="size-4" />
            Contact Us Now
          </a>
        </div>
      ) : null}

      {!shouldShowAll && filteredCategories.length > visibleCategories.length ? (
        <div className="mt-6 flex justify-center">
          <button type="button" onClick={() => setShowAll(true)} className="btn-secondary h-11 px-5">
            View All Routes
            <ArrowRight className="size-4" />
          </button>
        </div>
      ) : null}

      {activeCategory ? (
        <div
          className="fixed inset-0 z-[70] flex justify-end bg-vortex-navy/55 p-0 sm:p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveCategory(null);
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-panel-title"
            className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-[0_24px_90px_rgba(9,29,83,0.28)] sm:rounded-[1.5rem]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-vortex-border p-5 sm:p-7">
              <div className="flex min-w-0 items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-vortex-soft text-vortex-blue">
                  {(() => {
                    const Icon = iconMap[activeCategory.icon];
                    return <Icon className="size-5" />;
                  })()}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-vortex-blue">Learning route</p>
                  <h2 id="course-panel-title" className="mt-2 font-heading text-3xl font-semibold leading-tight text-vortex-navy">{activeCategory.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-vortex-muted">{activeCategory.summary}</p>
                </div>
              </div>
              <button type="button" onClick={() => setActiveCategory(null)} className="grid size-10 shrink-0 place-items-center rounded-full border border-vortex-border text-vortex-slate transition hover:bg-vortex-soft hover:text-vortex-navy" aria-label="Close course details">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
            <div role="tablist" aria-label="Learning route details" className="grid grid-cols-2 gap-2 rounded-2xl bg-vortex-soft p-1 sm:grid-cols-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`min-h-10 rounded-xl px-2 py-2 text-xs font-semibold transition ${activeTab === tab ? "bg-white text-vortex-navy shadow-sm" : "text-vortex-slate hover:text-vortex-blue"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Overview" ? (
                <div className="mt-7">
                  <p className="text-sm leading-7 text-vortex-muted">Personalized online support can be arranged around the learner&apos;s curriculum, current level, goals, and schedule.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["One-to-one tutoring", "Live online classes", "Accelerated plans", "Personalized support"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                        <Sparkles className="size-4 shrink-0 text-vortex-blue" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 rounded-2xl border border-vortex-border bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase text-vortex-blue">Popular starting points</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeCategory.popular.slice(0, 6).map((item) => (
                        <span key={item} className="rounded-full bg-vortex-soft px-3 py-1.5 text-xs font-semibold text-vortex-slate">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === "Programs & Levels" ? (
                <DetailList title="Available programs and levels" items={activeCategory.details} />
              ) : null}

              {activeTab === "Subjects" ? (
                <DetailList title="Popular subjects and support" items={activeCategory.popular} />
              ) : null}

              {activeTab === "Exam Prep" ? (
                <DetailList title="Exam preparation options" items={activeCategory.examPrep ?? ["Targeted revision plans", "Past papers and mock exams", "Exam technique and feedback", "Personalized academic guidance"]} />
              ) : null}
            </div>

            <div className="border-t border-vortex-border bg-white p-5 shadow-[0_-12px_30px_rgba(9,29,83,0.05)] sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm font-semibold text-vortex-navy">Talk to an Academic Advisor</p>
                <p className="mt-1 text-xs leading-5 text-vortex-muted">Ask about availability, schedules, fees, and enrolment.</p>
              </div>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary h-11 w-full px-5 sm:w-auto">
                <MessageCircle className="size-4" />
                Contact Us Now
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-7">
      <p className="text-xs font-semibold uppercase text-vortex-blue">{title}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold leading-5 text-vortex-slate">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-vortex-cyan" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
