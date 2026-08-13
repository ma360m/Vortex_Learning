"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Bell,
  Bookmark,
  Bot,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  ListChecks,
  Moon,
  PanelLeft,
  PlayCircle,
  Sun,
  type LucideIcon,
} from "lucide-react";

const playerTabs = ["Notes", "Downloads", "Transcript", "AI Assistant", "Assignments", "Discussion", "Quiz"];

const lessons: Array<[string, string, string, boolean]> = [
  ["01", "Vectors and scalars", "12 min", true],
  ["02", "Forces and motion", "19 min", true],
  ["03", "Momentum", "24 min", false],
  ["04", "Energy transfer", "17 min", false],
  ["05", "Past-paper method", "29 min", false],
];

const lessonTools: Array<[LucideIcon, string]> = [
  [FileText, "Lesson summary"],
  [Download, "Resource pack"],
  [Bot, "AI prompt"],
  [ListChecks, "Assignment brief"],
];

export function LearningPlayer() {
  const [dark, setDark] = useState(true);
  const [activeTab, setActiveTab] = useState(playerTabs[0]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#f7fbff] text-vortex-navy dark:bg-[#06163f] dark:text-white">
        <header className="border-b border-vortex-border bg-white/88 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#071847]/88 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-vortex-blue dark:text-[#47C8F2]">
              <PanelLeft className="size-4" />
              Vortex Learning
            </Link>
            <div className="hidden min-w-0 flex-1 text-center md:block">
              <p className="truncate text-sm font-semibold">O Level Physics Mastery</p>
              <p className="text-xs text-vortex-muted dark:text-cyan-100">Mechanics and Measurement - Lesson 3</p>
            </div>
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              aria-pressed={dark}
              className="inline-flex size-10 items-center justify-center rounded-full border border-vortex-border bg-white text-vortex-navy transition hover:border-vortex-cyan dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span className="sr-only">Toggle dark mode</span>
            </button>
          </div>
        </header>

        <main className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-vortex-border bg-white p-4 shadow-[0_18px_70px_rgba(9,29,83,0.08)] dark:border-white/10 dark:bg-white/8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-vortex-blue dark:text-[#47C8F2]">
                  Course progress
                </p>
                <h1 className="mt-2 font-heading text-3xl font-semibold">62%</h1>
              </div>
              <Award className="size-8 text-vortex-blue dark:text-[#47C8F2]" />
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-vortex-soft dark:bg-white/10">
              <div className="h-full w-[62%] rounded-full bg-vortex-gradient" />
            </div>
            <div className="mt-6 grid gap-2">
              {lessons.map(([number, title, duration, complete]) => (
                <button
                  type="button"
                  key={title as string}
                  className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    title === "Momentum"
                      ? "bg-vortex-navy text-white dark:bg-white dark:text-vortex-navy"
                      : "hover:bg-vortex-soft dark:hover:bg-white/10"
                  }`}
                >
                  <span className="grid size-8 place-items-center rounded-xl bg-vortex-blue/10 text-xs font-semibold text-vortex-blue dark:bg-white/10 dark:text-[#47C8F2]">
                    {complete ? <CheckCircle2 className="size-4" /> : number}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{title as string}</span>
                    <span className="mt-1 block text-xs opacity-70">{duration as string}</span>
                  </span>
                  <PlayCircle className="size-4 opacity-70" />
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-vortex-border text-xs font-semibold dark:border-white/10">
                <Bookmark className="size-4" />
                Bookmark
              </button>
              <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-vortex-border text-xs font-semibold dark:border-white/10">
                <Bell className="size-4" />
                Reminder
              </button>
            </div>
          </aside>

          <section className="grid gap-5">
            <div className="overflow-hidden rounded-[2rem] border border-vortex-border bg-white shadow-[0_22px_80px_rgba(9,29,83,0.1)] dark:border-white/10 dark:bg-white/8">
              <div className="aspect-video bg-[linear-gradient(135deg,#091D53,#143A84_52%,#1E8ACB)] p-6 text-white">
                <div className="flex items-center justify-between text-sm text-cyan-100">
                  <span>Live replay - Momentum</span>
                  <span className="rounded-full bg-white/12 px-3 py-1">HD</span>
                </div>
                <div className="flex h-full items-center justify-center">
                  <button type="button" className="grid size-20 place-items-center rounded-full border border-white/30 bg-white/18 text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur">
                    <PlayCircle className="size-9" />
                    <span className="sr-only">Play lesson</span>
                  </button>
                </div>
              </div>
              <div className="grid gap-4 border-t border-vortex-border p-5 dark:border-white/10 xl:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm font-semibold text-vortex-blue dark:text-[#47C8F2]">Mechanics and Measurement</p>
                  <h2 className="mt-2 font-heading text-4xl font-semibold">Momentum and conservation</h2>
                  <p className="mt-3 text-sm leading-7 text-vortex-muted dark:text-cyan-100">
                    Definitions, worked examples, transcript highlights, resource pack, and practice checkpoints for this lesson.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    ["Daily", "42 min"],
                    ["Weekly", "4.5 hr"],
                    ["Streak", "9 days"],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-24 rounded-2xl bg-vortex-soft p-3 dark:bg-white/10">
                      <p className="text-xs text-vortex-muted dark:text-cyan-100">{label}</p>
                      <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-vortex-border bg-white p-4 shadow-[0_18px_70px_rgba(9,29,83,0.08)] dark:border-white/10 dark:bg-white/8">
              <div className="flex gap-2 overflow-x-auto rounded-full bg-vortex-soft p-2 dark:bg-white/8">
                {playerTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
                      activeTab === tab
                        ? "bg-vortex-navy text-white dark:bg-white dark:text-vortex-navy"
                        : "text-vortex-slate hover:bg-white dark:text-cyan-100 dark:hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_300px]">
                <div className="rounded-3xl bg-vortex-soft p-6 dark:bg-white/8">
                  <p className="text-sm font-semibold text-vortex-blue dark:text-[#47C8F2]">{activeTab}</p>
                  <h3 className="mt-3 font-heading text-3xl font-semibold">
                    {activeTab === "AI Assistant" ? "Ask for a targeted explanation." : "Momentum lesson workspace"}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-vortex-muted dark:text-cyan-100">
                    {activeTab === "Downloads"
                      ? "Formula sheet, worksheet, mark scheme notes, and class board are grouped for this lesson."
                      : activeTab === "Discussion"
                        ? "Teacher notes and peer questions stay attached to the exact lesson context."
                        : activeTab === "Quiz"
                          ? "A short diagnostic checks definitions, calculations, and common exam traps."
                          : "Structured notes, transcript highlights, bookmarks, and revision prompts stay synchronized with the video."}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {lessonTools.map(([Icon, label]) => (
                      <button key={label} type="button" className="flex items-center gap-3 rounded-2xl bg-white p-4 text-left text-sm font-semibold text-vortex-navy transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-white">
                        <Icon className="size-4 text-vortex-blue dark:text-[#47C8F2]" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-vortex-navy p-5 text-white dark:bg-white dark:text-vortex-navy">
                    <Award className="size-5 text-[#47C8F2]" />
                    <p className="mt-4 text-sm font-semibold">Certificate readiness</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15 dark:bg-vortex-soft">
                      <div className="h-full w-[62%] rounded-full bg-[#47C8F2]" />
                    </div>
                    <p className="mt-3 text-xs opacity-75">Completion certificate unlocks after lessons, quiz, and assignment review.</p>
                  </div>
                  <div className="rounded-3xl border border-vortex-border p-5 dark:border-white/10">
                    <Clock className="size-5 text-vortex-blue dark:text-[#47C8F2]" />
                    <p className="mt-4 text-sm font-semibold">Next reminder</p>
                    <p className="mt-2 text-xs leading-6 text-vortex-muted dark:text-cyan-100">Tomorrow - 7:30 PM - Physics revision sprint</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
