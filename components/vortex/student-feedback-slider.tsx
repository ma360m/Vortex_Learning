"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

type FeedbackItem = {
  name: string;
  role: string;
  quote: string;
};

type FeedbackContent = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function StudentFeedbackSlider({
  content,
  items,
}: {
  content: FeedbackContent;
  items: FeedbackItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) return null;

  const activeItem = items[activeIndex] ?? items[0];

  function move(step: number) {
    setActiveIndex((current) => (current + step + items.length) % items.length);
  }

  return (
    <div className="relative overflow-hidden bg-white px-4 py-12 sm:px-8 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-1 bg-vortex-gradient" />
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase text-vortex-blue">{content.eyebrow}</p>
        <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight text-vortex-navy sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-vortex-muted sm:text-base sm:leading-8">
          {content.body}
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-5xl">
        <button
          type="button"
          onClick={() => move(-1)}
          className="absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-vortex-border bg-vortex-soft text-vortex-navy transition hover:border-vortex-cyan hover:bg-white md:grid"
          aria-label="Previous feedback"
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="mx-auto min-h-64 max-w-3xl rounded-[1.5rem] border border-vortex-border bg-vortex-soft px-5 py-9 text-center shadow-[0_18px_60px_rgba(9,29,83,0.06)] sm:px-10 sm:py-11">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-vortex-gradient text-white shadow-[0_14px_45px_rgba(9,29,83,0.18)]">
            <MessageSquareQuote className="size-5" />
          </span>
          <blockquote key={`${activeItem.name}-${activeIndex}`} className="mt-7 text-base font-semibold leading-8 text-vortex-navy sm:text-xl sm:leading-10">
            {activeItem.quote}
          </blockquote>
          <p className="mt-7 font-heading text-3xl font-semibold text-vortex-navy">
            {activeItem.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-vortex-blue">{activeItem.role}</p>
        </div>

        <button
          type="button"
          onClick={() => move(1)}
          className="absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-vortex-border bg-vortex-soft text-vortex-navy transition hover:border-vortex-cyan hover:bg-white md:grid"
          aria-label="Next feedback"
        >
          <ChevronRight className="size-6" />
        </button>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid size-10 place-items-center rounded-full border border-vortex-border bg-white text-vortex-navy md:hidden"
            aria-label="Previous feedback"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-3">
            {items.map((item, index) => (
              <button
                key={`${item.name}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`size-2.5 rounded-full transition ${
                  activeIndex === index ? "scale-125 bg-vortex-navy ring-2 ring-vortex-navy/20" : "bg-vortex-blue/35 hover:bg-vortex-blue"
                }`}
                aria-label={`Show feedback ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid size-10 place-items-center rounded-full border border-vortex-border bg-white text-vortex-navy md:hidden"
            aria-label="Next feedback"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
