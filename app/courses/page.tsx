import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

import { CourseExplorer, type CourseCategory } from "@/components/vortex/course-explorer";
import { SiteShell } from "@/components/vortex/site-shell";

const whatsappHref = "https://wa.me/923244270697";

const courseFaqs = [
  ["What courses does Vortex Learning offer?", "We offer academic tutoring, exam preparation, international curriculum support, professional courses, technical skills, teacher training, and personalized learning plans."],
  ["Which curricula and examination systems do you support?", "Our tutors support Cambridge International, Pearson Edexcel, Pakistani Boards, IB, British Curriculum, American Curriculum, and other international education systems."],
  ["Do you offer one-to-one online classes?", "Yes. One-to-one tutoring can be arranged around the learner's level, subject, goals, and preferred schedule."],
  ["Can students join from any country?", "Yes. Vortex Learning provides online learning support for students worldwide, with schedules arranged across time zones."],
  ["What if my subject is not listed?", "Contact us with your requirements. Our available learning options are not limited to the courses displayed on the website."],
  ["How do I choose the right tutor or course?", "Browse a category, search by subject or exam, or contact our academic team for help matching the learner's goals and current level."],
  ["How do I enrol?", "Choose a learning category and select Contact Us Now. Our team will guide you through availability, scheduling, fees, and enrolment."],
  ["Can I speak to someone before enrolling?", "Yes. You can discuss the learner's goals, curriculum, level, and preferred arrangement with our team before registering."],
];

const courseCategories: CourseCategory[] = [
  {
    title: "Early Years & Primary",
    summary: "Playgroup to primary learning support.",
    icon: "school",
    details: ["Playgroup", "Pre-Nursery", "Nursery", "Kindergarten / KG", "Reception", "Montessori", "EYFS", "Grades 1-6", "KS1", "KS2", "Cambridge Primary", "Pearson Edexcel iPrimary", "IB PYP", "Pakistani Primary Curriculum"],
    popular: ["English", "Mathematics", "Science", "Phonics", "Reading", "Writing"],
  },
  {
    title: "Middle & Secondary",
    summary: "Support through middle and high school.",
    icon: "graduation",
    details: ["Grades 6-10", "Grades 9-12", "Years 7-11", "KS3", "KS4", "Cambridge Lower Secondary", "Pearson Edexcel iLowerSecondary", "American Middle School", "High School Diploma", "AP", "IB MYP", "IBDP"],
    popular: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
  },
  {
    title: "Cambridge International",
    summary: "Cambridge learning from Primary to A Levels.",
    icon: "award",
    details: ["Cambridge Early Years", "Cambridge Primary", "Cambridge Lower Secondary", "Cambridge IGCSE", "Cambridge O Level", "Cambridge ICE", "Cambridge International AS Level", "Cambridge International A Level", "Cambridge AICE Diploma", "Cambridge IPQ"],
    popular: ["Mathematics", "Additional Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "Business", "Economics", "Accounting"],
  },
  {
    title: "Pearson Edexcel",
    summary: "Edexcel qualifications and exam preparation.",
    icon: "award",
    details: ["Pearson iPrimary", "Pearson iLowerSecondary", "Pearson Edexcel GCSE", "International GCSE", "AS Level", "A Level", "International AS Level", "International A Level", "BTEC", "BTEC Firsts", "BTEC Nationals", "BTEC Higher Nationals", "Functional Skills", "NVQ"],
    popular: ["Mathematics", "Sciences", "English", "Business", "Economics", "Accounting", "ICT"],
  },
  {
    title: "Matric & Intermediate",
    summary: "Pakistani boards and college-level preparation.",
    icon: "school",
    details: ["All Pakistani BISE Boards", "FBISE", "BISE Lahore", "BISE Gujranwala", "BISE Rawalpindi", "BISE Faisalabad", "BISE Multan", "BISE Peshawar", "BISE Quetta", "Sindh Boards", "AKU-EB", "AJK BISE", "Technical Education Boards", "SSC / Matric", "HSSC / Intermediate", "FSc Pre-Medical", "FSc Pre-Engineering", "ICS", "I.Com", "FA", "DAE"],
    popular: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English", "Accounting"],
  },
  {
    title: "IB & International Curricula",
    summary: "International curriculum support worldwide.",
    icon: "international",
    details: ["IB PYP", "IB MYP", "IB Diploma Programme", "American Curriculum", "US High School Diploma", "Advanced Placement", "British Curriculum", "UK National Curriculum", "Common Core", "Australian Curriculum", "Canadian Curriculum", "OxfordAQA", "AQA", "OCR", "WJEC", "CBSE", "ICSE / ISC"],
    popular: ["Math", "Sciences", "English", "Humanities", "Business", "Computer Science"],
  },
  {
    title: "Medical & Engineering Tests",
    summary: "Preparation for admissions and entry tests.",
    icon: "admissions",
    details: ["MDCAT", "NUMS MDCAT", "Medical university admission tests", "ECAT", "UET Entrance Test", "NUST NET", "FAST NU Test", "GIKI Admission Test", "PIEAS Admission Test", "COMSATS NTS/NAT"],
    popular: ["Biology", "Chemistry", "Physics", "Mathematics", "English", "Analytical Reasoning"],
  },
  {
    title: "University Admissions",
    summary: "Local and international admission test preparation.",
    icon: "admissions",
    details: ["SAT", "ACT", "NTS NAT", "NTS GAT", "HAT", "USAT", "GRE", "GMAT", "LSAT", "LNAT", "UCAT", "TMUA", "STEP", "MAT", "LUMS admission preparation", "IBA Admission Test", "University-specific tests"],
    popular: ["Quantitative", "Verbal", "Writing", "Reasoning", "Interview Preparation"],
  },
  {
    title: "English & Language Tests",
    summary: "English learning and international test preparation.",
    icon: "languages",
    details: ["IELTS Academic", "IELTS General Training", "IELTS UKVI", "TOEFL iBT", "PTE Academic", "Duolingo English Test", "Cambridge English", "OET", "Spoken English", "Academic English", "Business English", "Grammar", "Writing", "Conversation", "English for Professionals"],
    popular: ["Speaking", "Listening", "Reading", "Writing", "Grammar", "Vocabulary"],
  },
  {
    title: "University Tutoring",
    summary: "Academic support beyond school.",
    icon: "users",
    details: ["Undergraduate", "Associate Degree", "Masters", "Postgraduate", "PhD academic support", "Computer Science", "Engineering", "AI", "Data Science", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Accounting", "Finance", "Economics", "English", "Psychology"],
    popular: ["Subject Tutoring", "Programming Help", "Research Methods", "Academic Writing", "FYP Guidance", "Thesis Guidance", "Statistics", "SPSS", "MATLAB", "Python", "R", "LaTeX"],
  },
  {
    title: "Professional Courses",
    summary: "Build career-ready knowledge and skills.",
    icon: "skills",
    details: ["Accounting & Finance", "ACCA Preparation", "CA Preparation", "CFA Preparation", "Business & Management", "Project Management", "PMP Preparation", "Entrepreneurship", "Digital Marketing", "IT & Computing", "Programming", "Artificial Intelligence", "Data Science", "Cybersecurity", "Graphic Design", "Communication Skills", "Public Speaking", "Office Productivity", "Career Development"],
    popular: ["AI", "Digital Marketing", "Programming", "Project Management", "Business", "Design"],
  },
  {
    title: "TESOL & Teacher Training",
    summary: "Professional development for educators.",
    icon: "graduation",
    details: ["TESOL", "TEFL", "TESL", "CELTA preparation / guidance", "English Language Teaching", "ESL Teacher Training", "EFL Teacher Training", "Early Childhood Education", "Montessori Teacher Training", "Phonics Teacher Training", "Synthetic Phonics", "Classroom Management", "Lesson Planning", "Curriculum Development", "Assessment & Evaluation", "Educational Technology", "AI for Teachers"],
    popular: ["Lesson Planning", "Phonics", "Classroom Management", "ESL/EFL", "Teacher Development"],
  },
  {
    title: "Technical & Vocational Skills",
    summary: "Practical skills for education and employment.",
    icon: "skills",
    details: ["NAVTTC course preparation", "Technical & Vocational Education", "Digital Skills", "Graphic Design", "UI/UX Design", "Web Development", "Full-Stack Development", "Mobile App Development", "WordPress", "E-Commerce", "SEO", "Social Media Marketing", "Freelancing", "Amazon / E-Commerce Skills", "Generative AI", "Machine Learning", "Data Analytics", "Cloud Computing", "Networking", "MS Office", "AutoCAD", "Video Editing"],
    popular: ["Web Development", "Graphic Design", "AI", "Freelancing", "Office Skills", "E-Commerce"],
  },
  {
    title: "Research & Academic Support",
    summary: "Support for higher education and research.",
    icon: "research",
    details: ["Research Methods", "Thesis Guidance", "FYP Guidance", "Academic Writing", "Research Tools", "Statistics", "SPSS", "MATLAB", "Python", "R", "LaTeX", "Data Analysis", "Literature Review", "Proposal Writing"],
    popular: ["Thesis", "FYP", "Academic Writing", "Statistics", "Research Tools"],
  },
];

export const metadata = {
  title: "Courses",
  description:
    "Explore Vortex Learning courses across O Level, A Level, IGCSE, FSc, Matric, SAT, IELTS, AI, programming, business, science, and more.",
};

export default function CoursesPage() {
  return (
    <SiteShell>
      <section className="page-hero page-hero-courses px-5 py-16 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#47C8F2]">Online classes worldwide</p>
            <h1 className="mt-4 max-w-4xl font-heading text-5xl font-semibold leading-tight sm:text-7xl">
              Personalized Learning, Wherever You Are
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cyan-50">
              Looking for the right learning support? We offer online classes for students worldwide, covering a wide range of subjects, academic levels, and international curricula.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-cyan-50">
              From school subjects and exam preparation to specialized courses and one-to-one tutoring, our learning plans are tailored to each student&apos;s goals, level, and schedule.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">
              All Subjects | All Levels | Global Access | Personalized Support
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#learning-categories" className="btn-white h-12 px-5">
                Explore Learning
                <ArrowRight className="size-4" />
              </Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-glass h-12 px-5">
                <MessageCircle className="size-4" />
                Contact Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase text-cyan-100">Accelerated routes</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold">Try our accelerated plans and receive certification</h2>
            <p className="mt-4 text-sm leading-7 text-cyan-50">
              Contact us to explore ongoing classes, create a personalized learning plan, or ask about accelerated courses with completion certificates.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-white h-11 px-5">
                <MessageCircle className="size-4" />
                WhatsApp Us
              </a>
              <Link href="/consultation" className="btn-glass h-11 px-5">
                Request Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="learning-categories" className="section-wrap">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-vortex-blue">Learning Without Boundaries</p>
          <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
            From Playgroup to University and Professional Development
          </h2>
          <p className="mt-4 text-sm leading-7 text-vortex-muted">
            Vortex Learning connects learners with personalized academic support across subjects, curricula, qualifications, exam preparation, and career pathways. Select a category to view offered subjects and support options.
          </p>
        </div>

        <CourseExplorer categories={courseCategories} />
      </section>

      <section className="section-wrap pt-0">
        <div className="grid gap-6 rounded-[2rem] border border-vortex-border bg-white p-7 shadow-[0_18px_70px_rgba(9,29,83,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-vortex-blue">Can&apos;t find what you&apos;re looking for?</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">
              We can help you find the right tutor or create a personalized learning plan.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-vortex-muted">
              Our learning support is not limited to the categories above. Contact our team for a particular subject, curriculum, examination, qualification, university course, or professional skill.
            </p>
          </div>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary h-11 px-5">
            <MessageCircle className="size-4" />
            Contact Us Now
          </a>
        </div>
      </section>

      <section id="course-faqs" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-vortex-blue">Frequently Asked Questions</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-vortex-navy">A clearer start for every learner</h2>
            <p className="mt-4 text-sm leading-7 text-vortex-muted">Find quick answers about subjects, curricula, online classes, enrolment, and finding the right learning path.</p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {courseFaqs.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-vortex-border bg-vortex-paper px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-vortex-navy">
                  {question}
                  <ChevronDown className="size-4 shrink-0 text-vortex-blue transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 pr-6 text-sm leading-7 text-vortex-muted">{answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/faqs" className="btn-secondary h-11 px-5">
              View All FAQs
              <ArrowRight className="size-4" />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-primary h-11 px-5">
              <MessageCircle className="size-4" />
              Ask Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
