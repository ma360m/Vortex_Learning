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
  { label: "Explore", href: "/explore" },
  { label: "Courses", href: "/courses" },
  { label: "Preview", href: "/preview" },
  { label: "Our Team", href: "/team" },
  { label: "Blog", href: "/blog" },
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
    name: "A Level learner",
    role: "Physics and Mathematics",
    quote:
      "The course structure helped me see exactly what to study next instead of jumping between random notes and videos.",
  },
  {
    name: "Parent of O Level student",
    role: "Parent visibility",
    quote:
      "The organized path, reminders, and teacher feedback make it much easier to support learning from home.",
  },
  {
    name: "Entry test student",
    role: "Accelerated program",
    quote:
      "The revision plan and practice checkpoints made the final weeks before the exam feel manageable.",
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
  { label: "Facebook", href: "#", kind: "facebook" },
  { label: "Instagram", href: "#", kind: "instagram" },
  { label: "LinkedIn", href: "#", kind: "linkedin" },
  { label: "YouTube", href: "#", kind: "youtube" },
];

export const subjects = [
  { title: "Physics", cluster: "Science", description: "Concept modeling, labs, numericals, and exam method.", count: "38 courses" },
  { title: "Chemistry", cluster: "Science", description: "Physical, organic, inorganic, and board-focused revision.", count: "31 courses" },
  { title: "Biology", cluster: "Science", description: "Diagrams, systems, memorization strategy, and MCQ practice.", count: "29 courses" },
  { title: "Mathematics", cluster: "Core", description: "Algebra, calculus, statistics, mechanics, and past papers.", count: "44 courses" },
  { title: "English", cluster: "Language", description: "Academic writing, IELTS, grammar, literature, and speaking.", count: "22 courses" },
  { title: "Computer Science", cluster: "Technology", description: "Theory, programming, databases, algorithms, and projects.", count: "27 courses" },
  { title: "Economics", cluster: "Commerce", description: "Micro, macro, policy analysis, diagrams, and essays.", count: "18 courses" },
  { title: "Accounting", cluster: "Commerce", description: "Ledgers, financial statements, ratios, and exam drills.", count: "16 courses" },
  { title: "Business", cluster: "Commerce", description: "Strategy, operations, marketing, finance, and case writing.", count: "21 courses" },
  { title: "Psychology", cluster: "Humanities", description: "Research methods, case studies, and structured responses.", count: "12 courses" },
  { title: "Statistics", cluster: "Core", description: "Probability, distributions, interpretation, and data tasks.", count: "14 courses" },
  { title: "AI", cluster: "Technology", description: "AI literacy, prompt systems, projects, and responsible use.", count: "11 courses" },
  { title: "Programming", cluster: "Technology", description: "Python, web, problem solving, and portfolio projects.", count: "20 courses" },
  { title: "Languages", cluster: "Language", description: "English fluency, exam speaking, and academic communication.", count: "15 courses" },
];

export const instructors = [
  {
    name: "Dr. Ayesha Rahman",
    role: "Lead Science Instructor",
    subjects: ["Physics", "Chemistry", "O Level"],
    experience: "12 years",
    qualification: "PhD Physics Education",
    availability: "Weekday evenings",
    rating: "4.9",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=720&q=75",
    bio: "Specializes in turning abstract science into disciplined exam answers and strong conceptual intuition.",
  },
  {
    name: "Hamza Qureshi",
    role: "Mathematics Program Director",
    subjects: ["A Level Math", "Statistics", "SAT"],
    experience: "10 years",
    qualification: "MSc Applied Mathematics",
    availability: "Live cohorts",
    rating: "4.8",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=720&q=75",
    bio: "Builds structured problem-solving systems for students preparing for advanced boards and university entry.",
  },
  {
    name: "Sara Malik",
    role: "English and IELTS Coach",
    subjects: ["IELTS", "English Language", "Writing"],
    experience: "9 years",
    qualification: "MA Applied Linguistics",
    availability: "Consultations open",
    rating: "4.9",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=720&q=75",
    bio: "Coaches international students through speaking confidence, academic writing, and band-focused improvement.",
  },
  {
    name: "Musa Siddiqui",
    role: "AI and Programming Mentor",
    subjects: ["Programming", "AI", "Computer Science"],
    experience: "8 years",
    qualification: "Software Engineer, ML Systems",
    availability: "Weekend bootcamps",
    rating: "4.8",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=75",
    bio: "Helps students build practical technology skills through projects, code reviews, and AI-supported workflows.",
  },
];

export const platformRoles = [
  {
    role: "Student",
    title: "A calm cockpit for every learner.",
    href: "/signin?next=/dashboard/student",
    points: ["Continue learning", "Daily and weekly goals", "Bookmarks", "Certificates", "Recommended courses"],
  },
  {
    role: "Parent",
    title: "Transparent progress without chasing updates.",
    href: "/signin?next=/dashboard/parent",
    points: ["Attendance", "Payments", "Homework", "Teacher feedback", "Messages"],
  },
  {
    role: "Instructor",
    title: "Teaching tools that keep learning organized.",
    href: "/signin?next=/dashboard/instructor",
    points: ["Live sessions", "Teacher notes", "Homework", "Course approvals", "Discussions"],
  },
  {
    role: "Admin",
    title: "Operations for a scaled education business.",
    href: "/signin?next=/dashboard/admin",
    points: ["Courses", "Users", "Payments", "Coupons", "Analytics", "Support tickets"],
  },
];

export const team = [
  {
    name: "Zara Farooq",
    role: "Founder and Academic Lead",
    group: "Leadership",
    experience: "15 years in education strategy",
    qualification: "MEd Learning Design",
  },
  {
    name: "Omar Saeed",
    role: "Head of Product",
    group: "Developers",
    experience: "Scaled learning products and CMS systems",
    qualification: "BS Computer Science",
  },
  {
    name: "Mariam Iqbal",
    role: "Student Success Manager",
    group: "Support Team",
    experience: "Parent communications and retention",
    qualification: "MA Education Leadership",
  },
  {
    name: "Danish Raza",
    role: "Growth and Partnerships",
    group: "Marketing",
    experience: "Schools, colleges, and tutoring institutes",
    qualification: "MBA Marketing",
  },
  {
    name: "Prof. Sameer Ali",
    role: "Academic Advisor",
    group: "Advisors",
    experience: "Curriculum review and assessment design",
    qualification: "PhD Assessment",
  },
  {
    name: "Nida Hassan",
    role: "Teacher Enablement Lead",
    group: "Teachers",
    experience: "Instructor training and quality assurance",
    qualification: "PGCert Teacher Training",
  },
];

export const blogPosts = [
  {
    title: "How to Build a Revision Plan That Survives Exam Season",
    category: "Exam Guides",
    date: "Sample article",
    excerpt: "A practical framework for turning past papers, weak topics, and daily targets into a weekly study rhythm.",
  },
  {
    title: "IELTS Writing: Why Most Essays Lose Band Scores",
    category: "Tips and Tricks",
    date: "Sample article",
    excerpt: "Common structure, cohesion, and task-response errors students can fix before booking the exam.",
  },
  {
    title: "Choosing Between FSc, A Level, and University Entry Routes",
    category: "University Guides",
    date: "Sample article",
    excerpt: "A parent-friendly comparison of curriculum demands, timelines, and admissions implications.",
  },
  {
    title: "AI for Students: Helpful Assistant, Not Shortcut",
    category: "Career Advice",
    date: "Sample article",
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
