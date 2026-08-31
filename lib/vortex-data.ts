import { generatedCourses } from "./generated-courses";

export type CourseMode = "Live" | "Self paced" | "Hybrid" | "Bootcamp";

export type CourseResource = {
  id: string;
  title: string;
  fileName: string;
  kind: string;
  storagePath: string;
  sizeLabel: string;
  visibility: "public" | "enrolled" | "paid" | "admin";
  downloadable: boolean;
  flipbook: boolean;
};

export type Course = {
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  subject: string;
  board: string;
  mode: CourseMode;
  level: string;
  duration: string;
  lessons: number;
  instructor: string;
  rating: string;
  description: string;
  tags: string[];
  outcomes: string[];
  freeModuleCount?: number;
  requiresPayment?: boolean;
  paymentMethod?: string;
  certificateRule?: string;
  downloadPolicy?: string;
  helpLinks?: string[];
  resourceFiles?: CourseResource[];
  modules: {
    title: string;
    lessons: string[];
    resources: string[];
    isPreview?: boolean;
  }[];
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Trainings", href: "/trainings" },
  { label: "Team", href: "/team" },
  { label: "FAQs", href: "/faqs" },
  { label: "Support", href: "/support" },
];

export const projectAttribution = {
  title: "Vortex Learning is a project of Phonics Club",
  description:
    "Built as a structured digital learning initiative by Phonics Club for students, families, tutors, and academic teams who need organized learning pathways.",
  points: ["Academic structure", "Parent visibility", "Tutor guidance", "Student support"],
};

export const curriculumOptions = [
  "FSc",
  "Matric",
  "O Level",
  "A Level",
  "IGCSE",
  "GCSE",
  "Cambridge",
  "Edexcel",
  "MDCAT",
  "ECAT",
  "LAT",
  "IELTS",
  "SAT",
];

export const learningPaths = [
  {
    title: "Curriculum",
    description: "Structured academic routes for board exams and school systems.",
    items: ["FSc", "Matric", "O Level", "A Level", "IGCSE", "GCSE", "Edexcel", "Cambridge"],
  },
  {
    title: "Subject",
    description: "Go deep in a single discipline with lessons, practice, and revision.",
    items: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Computer Science"],
  },
  {
    title: "Goal",
    description: "Focused programs for exams, admissions, careers, and accelerated learning.",
    items: ["SAT", "IELTS", "Medical Entry", "Engineering Entry", "Crash Courses", "Mock Exams"],
  },
];

export const courses: Course[] = generatedCourses;

export const studentFeedbacks = [
  {
    name: "O Level learner",
    role: "Physics exam preparation",
    quote:
      "My papers went extremely well, especially Physics. Mark-scheme practice helped me understand what examiners wanted and shape stronger answers.",
  },
  {
    name: "Parent feedback",
    role: "Concept clarity and progress",
    quote:
      "She loved studying with Ms Aiyesha and showed clear progress after starting lessons. We are grateful for the care and effort.",
  },
  {
    name: "Mathematics learner",
    role: "Confidence before exams",
    quote:
      "My maths exam felt so much easier. Thank you for devoting your time and helping me understand the questions with confidence.",
  },
  {
    name: "Long-term learner",
    role: "Three-year journey",
    quote:
      "Ms Aiyesha helped me rise when I had almost given up. Her teaching and encouragement made these exams possible.",
  },
  {
    name: "A Level learner",
    role: "Moving forward",
    quote:
      "My family is happy and proud. After O Levels, I feel ready and motivated to begin A Levels with full focus.",
  },
];

export const learningJourney = [
  {
    title: "Find the path",
    text: "Curriculum, subject, tutor, exam goal, or career skill.",
  },
  {
    title: "Learn with structure",
    text: "Recorded lessons, live classes, notes, transcripts, and downloads.",
  },
  {
    title: "Practice with feedback",
    text: "Assignments, quizzes, discussion, homework, and teacher notes.",
  },
  {
    title: "Review with intelligence",
    text: "AI planning, revision maps, reminders, and learning recommendations.",
  },
  {
    title: "Prove progress",
    text: "Progress reports, certificates, attendance, and parent visibility.",
  },
];

export const platformModules = [
  "Unlimited courses",
  "Live learning",
  "Self paced",
  "AI assistant",
  "Community",
  "Certificates",
  "Calendar sync",
  "Analytics",
  "Admin controls",
  "Support tickets",
  "Blogs and guides",
  "Reminders",
];

export const faqGroups = [
  {
    title: "Learning",
    items: [
      {
        question: "Do you support live learning?",
        answer:
          "Yes. Vortex supports Zoom or Google Meet sessions, calendar sync, reminders, attendance, teacher notes, and homework.",
      },
      {
        question: "Can students learn at their own pace?",
        answer:
          "Yes. Self-paced courses include resume learning, daily and weekly goals, bookmarks, notifications, progress, and free preview modules.",
      },
      {
        question: "Is exam preparation included?",
        answer:
          "Courses can include past papers, topic practice, mock exams, assignments, resource packs, and certificate requirements.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        question: "Can students ask instructors for help?",
        answer:
          "Students can ask course questions, request help, attach homework, and join live support sessions where available.",
      },
      {
        question: "How does payment support work?",
        answer:
          "Students can upload a bank transfer slip. Admin verifies it and then sends the licence key for course access.",
      },
      {
        question: "Who should I contact if payment has an issue?",
        answer:
          "Contact Vortex support at support@vortexelearning.com or +92 324 4270697.",
      },
    ],
  },
];

export const policyPages = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "How Vortex Learning handles account data, learning progress, support requests, payment verification records, and communication preferences.",
    sections: [
      ["Information we collect", "We collect information needed to create accounts, recommend learning paths, operate course access, track progress, and respond to support requests."],
      ["How we use information", "We use data to provide courses, live learning, resources, certificates, parent visibility, support, admin operations, and platform security."],
      ["Learning and parent visibility", "Progress, attendance, homework, certificates, and teacher feedback may be visible to approved parent or guardian accounts."],
      ["Payment records", "Bank transfer slips, verification status, and licence-key records are used only for course access and finance support."],
      ["Contact", "For privacy questions, contact support@vortexelearning.com."],
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "Rules for using courses, previews, locked resources, dashboards, support tools, and Vortex Learning accounts.",
    sections: [
      ["Course access", "Preview modules may be available before payment. Full access requires approved payment and licence-key activation where applicable."],
      ["Student responsibilities", "Students should use lessons, resources, AI support, assignments, and discussions honestly and respectfully."],
      ["Resources", "Paid resources are protected. Downloads stay disabled unless admin enables downloading for a course or resource."],
      ["Certificates", "Certificates depend on course completion, quiz requirements, assignment review, and active access rules."],
      ["Support", "Support requests should include accurate contact details and course information so the team can respond correctly."],
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    summary:
      "How Vortex Learning reviews refund requests for course access, duplicate payments, and payment verification issues.",
    sections: [
      ["Review basis", "Refund requests are reviewed against course access status, payment records, resource access, and the reason provided."],
      ["Duplicate payments", "Duplicate bank transfers can be reviewed by support when proof of payment is provided."],
      ["Course access issues", "If access was not activated after approved payment, support will prioritize resolving access before considering a refund."],
      ["How to request", "Email support@vortexelearning.com with the registered email, course name, payment proof, and reason."],
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary:
      "How cookies and local browser storage may be used for sign-in state, preferences, dashboards, and support tools.",
    sections: [
      ["Essential storage", "The platform may use cookies or local browser storage for sign-in state, dashboard routing, and basic preferences."],
      ["Support tools", "Chat and support widgets may store conversation state so the user can continue a request."],
      ["Control", "Users can clear browser storage, but some account and dashboard features may require signing in again."],
    ],
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vortex.learning?igsi=ZDNlZDc0MzIxNw==",
    kind: "instagram",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@vortex-elearning?si=itlglnaI6To7Msuv",
    kind: "youtube",
  },
];

function courseCountLabel(subject: string) {
  const count = courses.filter((course) => course.subject.toLowerCase() === subject.toLowerCase()).length;
  return `${count} course${count === 1 ? "" : "s"}`;
}

export const subjects = [
  { title: "Physics", cluster: "Science", description: "Concept modeling, labs, numericals, and exam method.", count: courseCountLabel("Physics") },
  { title: "Chemistry", cluster: "Science", description: "Physical, organic, inorganic, and board-focused revision.", count: courseCountLabel("Chemistry") },
  { title: "Biology", cluster: "Science", description: "Diagrams, systems, memorization strategy, and MCQ practice.", count: courseCountLabel("Biology") },
  { title: "Mathematics", cluster: "Core", description: "Algebra, calculus, statistics, mechanics, and past papers.", count: courseCountLabel("Mathematics") },
  { title: "English", cluster: "Language", description: "Academic writing, IELTS, grammar, literature, and speaking.", count: courseCountLabel("English") },
  { title: "Computer Science", cluster: "Technology", description: "Theory, programming, databases, algorithms, and projects.", count: courseCountLabel("Computer Science") },
  { title: "Economics", cluster: "Commerce", description: "Micro, macro, policy analysis, diagrams, and essays.", count: courseCountLabel("Economics") },
  { title: "Accounting", cluster: "Commerce", description: "Ledgers, financial statements, ratios, and exam drills.", count: courseCountLabel("Accounting") },
  { title: "Business", cluster: "Commerce", description: "Strategy, operations, marketing, finance, and case writing.", count: courseCountLabel("Business") },
  { title: "Psychology", cluster: "Humanities", description: "Research methods, case studies, and structured responses.", count: courseCountLabel("Psychology") },
  { title: "Statistics", cluster: "Core", description: "Probability, distributions, interpretation, and data tasks.", count: courseCountLabel("Statistics") },
  { title: "AI", cluster: "Technology", description: "AI literacy, prompt systems, projects, and responsible use.", count: courseCountLabel("AI") },
  { title: "Programming", cluster: "Technology", description: "Python, web, problem solving, and portfolio projects.", count: courseCountLabel("Programming") },
  { title: "Languages", cluster: "Language", description: "English fluency, exam speaking, and academic communication.", count: courseCountLabel("Languages") },
];

export const instructors = [
  {
    name: "Aiyesha Saddiqua",
    role: "Cambridge-certified Physics and Mathematics Trainer",
    subjects: ["Physics", "Mathematics", "IB", "IGCSE/GCSE", "A Level"],
    experience: "IGCSE, O Level, A Level",
    qualification: "Cambridge, Pearson Edexcel, OCR, AQA, and Oxford board specialist",
    availability: "One-to-one and group sessions",
    rating: "Consultations open",
    photo: "/instructors/ayesha-saddiqa.png",
    bio: "Cambridge-certified trainer specializing in Physics and Mathematics for students who need stronger concepts, exam technique, and targeted practice. Her sessions focus on clearing weak areas and helping each learner work toward excellence.",
    highlights: [
      "Physics and Mathematics across all levels",
      "IB, Pearson Edexcel, Cambridge, AQA, Oxford, A Level, IGCSE, and GCSE",
      "Concept clarity, exam technique, and structured practice",
    ],
  },
  {
    name: "Dr. Aroma Saleem",
    role: "Biology Instructor and Medical Sciences Mentor",
    subjects: ["Biology", "GCSE", "IGCSE", "AQA", "Edexcel"],
    experience: "Medical science teaching",
    qualification: "MBBS",
    availability: "Dynamic digital sessions",
    rating: "New profile",
    photo: "/instructors/aroma-saleem.png",
    bio: "Doctor and biology mentor with strong academic performance and deep familiarity with GCSE, IGCSE, AQA, and Edexcel science syllabi. She uses a tablet and digital stylus to explain diagrams, solve problems, and keep lessons interactive.",
    highlights: [
      "Biology strength backed by MBBS training",
      "GCSE, IGCSE, AQA, and Edexcel syllabus support",
      "Virtual whiteboard lessons with diagrams and active problem-solving",
    ],
  },
  {
    name: "Kashmala Aziz",
    role: "Biology Lecturer and Zoologist",
    subjects: ["Biology", "Zoology", "FSc", "Board practicals"],
    experience: "4+ years",
    qualification: "PhD Zoology candidate, MS Zoology, BS Zoology",
    availability: "Biology sessions",
    rating: "Examiner experience",
    photo: "/instructors/kashmala-aziz.png",
    bio: "Biology lecturer with Lahore College teaching experience, annual board practical duties, and Biology sub-examiner work under BISE Lahore. She brings academic leadership, laboratory practice, and structured feedback into student learning.",
    highlights: [
      "Visiting Lecturer Biology at Lahore College for Women University",
      "BISE Lahore practical examiner and sub-examiner experience",
      "Academic Roll of Honour and Zoological Sorority leadership",
    ],
  },
  {
    name: "Iman Aziz",
    role: "Chemistry Instructor and Research Mentor",
    subjects: ["Chemistry", "Analytical Chemistry", "Organic Chemistry", "Physical Chemistry"],
    experience: "Research-focused chemistry",
    qualification: "MS Chemistry candidate, BS Chemistry",
    availability: "Chemistry support",
    rating: "New profile",
    photo: "/instructors/iman-aziz.png",
    bio: "Chemistry educator with BS Chemistry from Lahore College for Women University and current MS Chemistry studies at COMSATS Lahore. Her background includes analytical, organic, inorganic, physical chemistry, biochemistry, and nanocomposite research.",
    highlights: [
      "BS Chemistry with 3.59/4 final grade",
      "MS Chemistry at COMSATS University Islamabad, Lahore Campus",
      "Research on graphene-based ZnO nanocomposites and green solvents",
    ],
  },
];

export const platformRoles = [
  {
    role: "Student",
    title: "A calm cockpit for every learner",
    href: "/signin?next=/dashboard/student",
    points: ["Continue learning", "Daily and weekly goals", "Bookmarks", "Certificates", "Recommended courses"],
  },
  {
    role: "Parent",
    title: "Transparent progress without chasing updates",
    href: "/signin?next=/dashboard/parent",
    points: ["Attendance", "Payments", "Homework", "Teacher feedback", "Messages"],
  },
  {
    role: "Instructor",
    title: "Teaching tools that keep learning organized",
    href: "/signin?next=/dashboard/instructor",
    points: ["Live sessions", "Teacher notes", "Homework", "Course approvals", "Discussions"],
  },
  {
    role: "Admin",
    title: "Operations for a scaled education business",
    href: "/signin?next=/dashboard/admin",
    points: ["Courses", "Users", "Payments", "Coupons", "Analytics", "Support tickets"],
  },
];

export const team = [
  {
    name: "Aiyesha Saddiqua",
    role: "Physics and Mathematics Lecturer",
    group: "Instructors",
    experience: "IGCSE, O Level, A Level, Cambridge, Pearson Edexcel, OCR, AQA, and Oxford boards",
    qualification: "Cambridge-certified trainer",
  },
  {
    name: "Dr. Aroma Saleem",
    role: "Biology Instructor and Medical Sciences Mentor",
    group: "Instructors",
    experience: "GCSE, IGCSE, AQA, Edexcel, and digital whiteboard biology support",
    qualification: "MBBS",
  },
  {
    name: "Kashmala Aziz",
    role: "Biology Lecturer and Zoologist",
    group: "Instructors",
    experience: "Lahore College teaching, board practicals, and BISE Lahore sub-examiner work",
    qualification: "MS Zoology, PhD Zoology candidate",
  },
  {
    name: "Iman Aziz",
    role: "Chemistry Instructor and Research Mentor",
    group: "Instructors",
    experience: "Analytical, organic, inorganic, physical chemistry, biochemistry, and nanocomposite research",
    qualification: "BS Chemistry, MS Chemistry candidate",
  },
];

export const blogPosts = [
  {
    title: "How to Build a Revision Plan That Survives Exam Season",
    category: "Exam Guides",
    date: "Guidance",
    excerpt: "A practical framework for turning past papers, weak topics, and daily targets into a weekly study rhythm.",
  },
  {
    title: "IELTS Writing: Why Most Essays Lose Band Scores",
    category: "Tips and Tricks",
    date: "Guidance",
    excerpt: "Common structure, cohesion, and task-response errors students can fix before booking the exam.",
  },
  {
    title: "Choosing Between FSc, A Level, and University Entry Routes",
    category: "University Guides",
    date: "Guidance",
    excerpt: "A parent-friendly comparison of curriculum demands, timelines, and admissions implications.",
  },
  {
    title: "AI for Students: Helpful Assistant, Not Shortcut",
    category: "Career Advice",
    date: "Guidance",
    excerpt: "How to use AI for planning, feedback, and practice while keeping learning honest and durable.",
  },
];

export const searchIndex = [
  ...courses.map((course) => ({
    type: "Course",
    title: course.title,
    description: course.description,
    href: `/courses/${course.slug}`,
    tags: course.tags,
  })),
  ...subjects.map((subject) => ({
    type: "Subject",
    title: subject.title,
    description: subject.description,
    href: "/courses",
    tags: [subject.cluster, subject.count],
  })),
  ...instructors.map((instructor) => ({
    type: "Tutor",
    title: instructor.name,
    description: `${instructor.role} with ${instructor.experience} of experience.`,
    href: "/team#instructors",
    tags: instructor.subjects,
  })),
  ...blogPosts.map((post) => ({
    type: "Article",
    title: post.title,
    description: post.excerpt,
    href: "/blog",
    tags: [post.category],
  })),
  {
    type: "Past Paper",
    title: "Physics Past Papers and Practice",
    description: "Locked resource hub for papers, notes, numericals, and revision material.",
    href: "/courses/physics",
    tags: ["Resources", "Exam Guides", "Paid"],
  },
  {
    type: "FAQ",
    title: "Can parents track attendance and homework?",
    description: "Parents can review attendance, homework, payments, messages, and teacher feedback.",
    href: "/faqs",
    tags: ["Parents", "Support"],
  },
  {
    type: "Training",
    title: "Training Consultancy",
    description: "Request science training, teacher development, institutional consultancy, and workshop guidance.",
    href: "/trainings",
    tags: ["Training", "Consultancy", "Phonics Club"],
  },
  {
    type: "Study Notes",
    title: "FSc Mathematics Notes and Solved Exercises",
    description: "Locked flipbook library for mathematics notes, textbooks, and solved exercises.",
    href: "/courses/maths",
    tags: ["Resources", "Study Notes", "Paid"],
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
