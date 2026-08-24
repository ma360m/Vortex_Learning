"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bot, BookOpen, MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "agent" | "customer";
  text: string;
};

const quickPrompts = [
  "Help me choose a course",
  "Book a consultation",
  "Payment or licence key help",
  "Do you offer live classes?",
  "How can parents track progress?",
];

function answerFor(message: string) {
  const text = message.toLowerCase();

  if (text.includes("consult") || text.includes("book")) {
    return "I can help with that. Share the learner's curriculum, subject, target exam, and deadline, then the Vortex team can match a course or tutor.";
  }

  if (
    text.includes("payment") ||
    text.includes("bank") ||
    text.includes("slip") ||
    text.includes("licence") ||
    text.includes("license") ||
    text.includes("key")
  ) {
    return "For bank transfer, upload your payment slip from the student dashboard. Admin verifies it and emails your licence key. If payment has an issue, contact support@vortexelearning.com or +92 324 4270697.";
  }

  if (text.includes("parent") || text.includes("progress")) {
    return "Parents can track attendance, progress, homework, upcoming lessons, payments, teacher feedback, and messages from the parent portal.";
  }

  if (text.includes("live") || text.includes("zoom") || text.includes("meet")) {
    return "Yes. Vortex supports live classes, calendar reminders, attendance, teacher notes, homework, recordings, and hybrid programs.";
  }

  if (text.includes("course") || text.includes("subject")) {
    return "Tell me the curriculum or goal: O Level, A Level, IGCSE, FSc, SAT, IELTS, AI, programming, or a specific subject. I will suggest the best learning path.";
  }

  return "I can help with course selection, live classes, tutor matching, parent access, payments, certificates, and technical support. What are you trying to solve today?";
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
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[390px]">
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
                Sample assistant
              </span>
              <Link href="/consultation" className="font-semibold text-vortex-blue">
                Talk to human
              </Link>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ml-auto grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full border border-white/70 bg-white/92 p-2 pr-4 text-left shadow-[0_20px_70px_rgba(9,29,83,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-vortex-cyan/70 sm:w-[390px]"
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
  );
}
