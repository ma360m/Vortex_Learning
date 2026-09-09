"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bot, BookOpen, MessageCircle, Send, Sparkles, X } from "lucide-react";

const whatsappHref = "https://wa.me/923244270697";

type ChatMessage = {
  id: number;
  role: "agent" | "customer";
  text: string;
};

const quickPrompts = [
  "Help me choose a course",
  "Payment or licence key help",
  "Unlock my course",
  "Do you offer live classes?",
  "How can parents track progress?",
  "Training consultancy",
];

const courseAreas = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "English",
  "Computer Science",
  "Programming",
  "AI",
  "Business",
  "Accounting",
  "Economics",
  "Statistics",
  "FSc",
  "Matric",
  "O Level",
  "A Level",
  "IGCSE",
  "GCSE",
  "MDCAT",
  "ECAT",
  "LAT",
  "SAT",
  "IELTS",
];

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function matchedCourseAreas(message: string) {
  const normalized = message.toLowerCase();

  return courseAreas.filter((area) => normalized.includes(area.toLowerCase()));
}

function isGreeting(text: string) {
  return /\b(hi|hello|hey|salam|assalam)\b/.test(text);
}

function answerFor(message: string) {
  const text = message.toLowerCase();
  const matches = matchedCourseAreas(message);

  if (isGreeting(text)) {
    return "Hello. I can help you choose courses, understand access, request instructor help, book guidance, or contact support.";
  }

  if (
    hasAny(text, ["payment", "bank", "transfer", "slip", "receipt", "paid", "fee", "fees", "price", "cost"])
  ) {
    return "Vortex supports bank transfer verification. After payment, upload the slip from your student dashboard. Admin reviews it, then Vortex emails the licence key. If payment has an issue, contact support@vortexelearning.com or +92 324 4270697.";
  }

  if (hasAny(text, ["licence", "license", "key", "unlock", "access", "locked"])) {
    return "Course access works in stages: preview modules are open first, paid modules and resources unlock after admin verifies payment and sends the licence key. Enter the key from the student dashboard or course access page.";
  }

  if (hasAny(text, ["preview", "free", "trial", "sample", "demo"])) {
    return "The first preview modules are open so students can check the course structure before payment. Full modules, resources, instructor help, final quiz, and certificates require licence activation.";
  }

  if (hasAny(text, ["consult", "book", "guidance", "advisor", "recommend", "recommendation", "plan"])) {
    return "For a good recommendation, share the learner's curriculum, subject, exam goal, current level, and deadline. You can also book consultation from the site so the academic team can guide the route.";
  }

  if (hasAny(text, ["parent", "progress", "attendance", "homework", "feedback", "child", "children"])) {
    return "Parents can track attendance, progress, homework, upcoming lessons, payments, teacher feedback, and messages from the parent portal.";
  }

  if (hasAny(text, ["live", "zoom", "meet", "class", "calendar", "session", "cohort"])) {
    return "Yes. Vortex supports live classes, calendar reminders, attendance, teacher notes, homework, recordings, and hybrid programs.";
  }

  if (hasAny(text, ["instructor", "teacher", "tutor", "question", "doubt", "help session"])) {
    return "Students can ask instructors from the course workspace. For available courses, instructor help can include written replies, homework review, and live support sessions where enabled.";
  }

  if (hasAny(text, ["certificate", "quiz", "final", "completion", "award"])) {
    return "Certificates unlock after the final quiz and any required course completion checks. The admin and instructor can supervise quiz, assignment, and certificate settings.";
  }

  if (hasAny(text, ["resource", "notes", "book", "past paper", "paper", "download", "flipbook", "pdf"])) {
    return "Course resources can be shown as locked flipbook-style materials after payment. Downloads stay disabled unless admin allows downloading for a specific course or resource.";
  }

  if (hasAny(text, ["training", "consultancy", "school", "workshop", "professional", "phonics club", "products"])) {
    return "For training consultancy, use the Trainings page to request a program. For related products, visit phonicsclub.com from the training page.";
  }

  if (hasAny(text, ["login", "sign in", "signin", "password", "portal", "dashboard", "role"])) {
    return "After sign-in, every registered user starts with student access. Parent and instructor access are assigned by admin. Admin access is restricted to approved admin emails.";
  }

  if (matches.length > 0 || hasAny(text, ["course", "subject", "curriculum", "exam", "study"])) {
    const focus = matches.length > 0 ? ` For ${matches.slice(0, 3).join(", ")},` : " For course selection,";

    return `${focus} compare curriculum, current level, deadline, and whether you need self-paced lessons, live classes, or accelerated revision. Start from the course catalog, then book consultation if you need a guided match.`;
  }

  if (hasAny(text, ["email", "phone", "contact", "support", "whatsapp", "issue", "problem", "error"])) {
    return "For direct support, email support@vortexelearning.com or call +92 324 4270697. I can also help you decide whether the issue is course access, payment verification, account role, or consultation.";
  }

  return "I can help with course selection, live classes, tutor matching, parent access, payment slips, licence keys, resources, certificates, training consultancy, and support. Tell me the learner's goal or the issue you want to solve.";
}

export function AIHelpAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const nextMessageId = useRef(2);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "agent",
      text: "Hi, I am Vortex AI. Ask me about courses, tutors, live classes, parent access, payments, or support.",
    },
  ]);

  const preview = useMemo(() => messages[messages.length - 1]?.text ?? "", [messages]);

  function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const nextId = nextMessageId.current;
    nextMessageId.current += 2;
    setMessages((current) => [
      ...current,
      { id: nextId, role: "customer", text: trimmed },
      { id: nextId + 1, role: "agent", text: answerFor(trimmed) },
    ]);
    setInput("");
    setOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 w-[calc(100vw-1.5rem)] max-w-[450px] sm:bottom-5 sm:right-5 sm:w-[calc(100vw-2.5rem)]">
      {open && (
        <section className="mb-3 overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-[0_26px_90px_rgba(9,29,83,0.22)]">
          <div className="bg-vortex-gradient p-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/14">
                  <Bot className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Vortex AI Help</p>
                  <p className="text-xs text-cyan-100">Customer support assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/20"
                aria-label="Close AI help"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto bg-[#f7fbff] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "customer" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "customer"
                      ? "bg-vortex-navy text-white"
                      : "border border-vortex-border bg-white text-vortex-slate"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-vortex-border bg-white p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="h-9 shrink-0 rounded-full border border-vortex-border bg-vortex-soft px-3 text-xs font-semibold text-vortex-slate transition hover:border-vortex-cyan hover:text-vortex-blue"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_auto] gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Vortex AI..."
                className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm text-vortex-navy outline-none transition focus:border-vortex-cyan focus:ring-4 focus:ring-vortex-cyan/15"
              />
              <button type="submit" className="grid size-11 place-items-center rounded-2xl bg-vortex-navy text-white transition hover:bg-vortex-blue">
                <Send className="size-4" />
                <span className="sr-only">Send message</span>
              </button>
            </form>
            <div className="mt-3 flex items-center justify-between text-xs text-vortex-muted">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="size-3.5 text-vortex-blue" />
                Vortex assistant
              </span>
              <Link href="/consultation" className="font-semibold text-vortex-blue">
                Talk to human
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="ml-auto grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:w-[450px]">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="grid size-14 place-items-center rounded-full border border-white/70 bg-[#25D366] text-white shadow-[0_18px_55px_rgba(9,29,83,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
          aria-label="Contact Vortex Learning on WhatsApp"
          title="Contact us on WhatsApp"
        >
          <MessageCircle className="size-6" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-full border border-white/70 bg-white/92 p-2 pr-3 text-left shadow-[0_20px_70px_rgba(9,29,83,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-vortex-cyan/70 sm:gap-3 sm:pr-4"
          aria-expanded={open}
        >
          <span className="grid size-12 place-items-center rounded-full bg-vortex-gradient text-white">
            <MessageCircle className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-vortex-navy">Ask Vortex AI</span>
            <span className="block truncate text-xs text-vortex-muted">{preview}</span>
          </span>
          <span className="hidden items-center gap-1 rounded-full bg-vortex-soft px-3 py-1 text-xs font-semibold text-vortex-blue sm:inline-flex">
            <BookOpen className="size-3.5" />
            Help
          </span>
        </button>
      </div>
    </div>
  );
}
