import { Award, BookOpen, Eye, FileUp, Layers3, Plus, Save, Wallet } from "lucide-react";

const builderSteps = [
  ["basic", "Basic Information"],
  ["media", "Course Media"],
  ["curriculum", "Curriculum"],
  ["pricing", "Pricing and Access"],
  ["completion", "Certificate"],
  ["publish", "Preview and Publish"],
];

function BuilderSection({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[1.5rem] border border-vortex-border bg-white p-5 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
      <p className="text-xs font-semibold uppercase text-vortex-blue">Step {number}</p>
      <h2 className="mt-2 font-heading text-3xl font-semibold text-vortex-navy">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-vortex-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function CourseBuilderStudio({
  owner,
  returnTo,
}: {
  owner: "admin" | "instructor";
  returnTo: string;
}) {
  const action = owner === "admin" ? "/api/vortex/admin-actions" : "/api/vortex/instructor-actions";
  const intent = owner === "admin" ? "course-submit" : "instructor-course";

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden xl:block">
        <div className="sticky top-28 rounded-[1.35rem] border border-vortex-border bg-white p-3 shadow-[0_14px_50px_rgba(9,29,83,0.06)]">
          <p className="px-3 py-2 text-xs font-semibold uppercase text-vortex-muted">Builder steps</p>
          <nav className="grid gap-1" aria-label="Course builder steps">
            {builderSteps.map(([id, label], index) => (
              <a key={id} href={`#${id}`} className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-vortex-slate transition hover:bg-vortex-soft hover:text-vortex-blue">
                <span className="grid size-7 place-items-center rounded-lg bg-vortex-blue/10 text-xs text-vortex-blue">{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <form action={action} method="post" className="grid gap-6">
        <input type="hidden" name="returnTo" value={returnTo} />

        <BuilderSection id="basic" number={1} title="Basic Information" description="Create the public course record before adding the complete LMS structure.">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["title", "Course title", "Accelerated Chemistry Rescue"],
              ["slug", "Course slug", "accelerated-chemistry-rescue"],
              ["subject", "Subject", "Chemistry"],
              ["board", "Curriculum / board", "FSc / Cambridge / Edexcel"],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="grid gap-2 text-sm font-semibold text-vortex-navy">
                {label}
                <input name={name} required className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder={placeholder} />
              </label>
            ))}
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Course type
              <select name="mode" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                <option value="self_paced">Self paced</option>
                <option value="live">Live</option>
                <option value="hybrid">Hybrid</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="accelerated">Accelerated Learning Program</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Instructor
              <select name="instructor" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                <option>Dr. Ayesha Rahman</option>
                <option>Hamza Qureshi</option>
                <option>Sara Malik</option>
                <option>Musa Siddiqui</option>
              </select>
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-vortex-navy">
            Course overview
            <textarea name="description" required className="min-h-28 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm outline-none" placeholder="Describe the learning promise, curriculum coverage, and ideal student." />
          </label>
        </BuilderSection>

        <BuilderSection id="media" number={2} title="Course Media" description="Prepare thumbnails, banners, intro video, and downloadable orientation files.">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["thumbnail", "Course thumbnail"],
              ["banner", "Course banner"],
              ["intro_video", "Intro video URL"],
              ["prospectus", "Prospectus / PDF URL"],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2 text-sm font-semibold text-vortex-navy">
                {label}
                <input name={name} className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="https://..." />
              </label>
            ))}
          </div>
        </BuilderSection>

        <BuilderSection id="curriculum" number={3} title="Curriculum" description="Create modules and lessons like the Phonics Club builder, with lesson type, order, resources, and completion settings.">
          <div className="grid gap-4">
            {["Diagnostic and Study Plan", "Core Lessons", "Exam Practice"].map((module, index) => (
              <div key={module} className="rounded-2xl border border-vortex-border bg-vortex-soft p-4">
                <div className="grid gap-3 md:grid-cols-[56px_1fr_160px] md:items-center">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white text-sm font-bold text-vortex-blue">{index + 1}</span>
                  <input name={`module_${index + 1}`} defaultValue={module} className="h-11 rounded-2xl border border-vortex-border bg-white px-4 text-sm font-semibold text-vortex-navy outline-none" />
                  <select name={`module_${index + 1}_type`} className="h-11 rounded-2xl border border-vortex-border bg-white px-3 text-sm outline-none">
                    <option>Video lessons</option>
                    <option>Live class</option>
                    <option>Reading/PDF</option>
                    <option>Quiz</option>
                    <option>Assignment</option>
                  </select>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {["Lesson title", "Resource URL", "Duration minutes"].map((label) => (
                    <input key={label} name={`${module}_${label}`} className="h-10 rounded-xl border border-vortex-border bg-white px-3 text-xs outline-none" placeholder={label} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="submit" name="intent" value={intent} className="mt-4 h-10 rounded-full border border-vortex-border bg-white px-4 text-xs font-semibold text-vortex-navy">
            <Plus className="mr-1 inline size-3.5 text-vortex-blue" />
            Save modules
          </button>
        </BuilderSection>

        <BuilderSection id="pricing" number={4} title="Pricing and Access" description="Set payment, bank transfer, licence key, and instructor help options.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Price
              <input name="price" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder="PKR 18000" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-vortex-navy">
              Access rule
              <select name="access_rule" className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none">
                <option>Licence key after bank-slip verification</option>
                <option>Free preview then paid access</option>
                <option>Admin approved access</option>
              </select>
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["instructor_help", "Instructor Q&A"],
              ["live_help", "Live help sessions"],
              ["bank_transfer", "Bank transfer slips"],
            ].map(([name, label]) => (
              <label key={name} className="flex items-center gap-2 rounded-2xl border border-vortex-border bg-vortex-soft px-4 py-3 text-sm font-semibold text-vortex-navy">
                <input name={name} type="checkbox" defaultChecked />
                {label}
              </label>
            ))}
          </div>
        </BuilderSection>

        <BuilderSection id="completion" number={5} title="Certificate and Completion" description="Control assignments, progress requirements, quizzes, and certificate issue rules.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["completion_percent", "Completion required %", "80"],
              ["quiz_score", "Quiz score %", "70"],
              ["certificate_name", "Certificate name", "Vortex Course Completion"],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="grid gap-2 text-sm font-semibold text-vortex-navy">
                {label}
                <input name={name} className="h-11 rounded-2xl border border-vortex-border bg-vortex-soft px-4 text-sm outline-none" placeholder={placeholder} />
              </label>
            ))}
          </div>
        </BuilderSection>

        <BuilderSection id="publish" number={6} title="Preview and Publish" description="Save draft, submit for admin approval, or publish when the course is ready.">
          <div className="grid gap-3 sm:grid-cols-3">
            <button type="submit" name="intent" value={owner === "admin" ? "course-draft" : "instructor-course"} className="btn-secondary h-11 px-4">
              <Save className="size-4" />
              Save Draft
            </button>
            <button type="submit" name="intent" value={intent} className="btn-primary h-11 px-4">
              <BookOpen className="size-4" />
              Submit Course
            </button>
            <button type="submit" name="intent" value="course-publish" className="btn-secondary h-11 px-4">
              <Eye className="size-4" />
              Publish Request
            </button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              [FileUp, "Media"],
              [Layers3, "Modules"],
              [Wallet, "Payments"],
              [Award, "Certificate"],
            ].map(([Icon, label]) => (
              <span key={label as string} className="flex items-center gap-2 rounded-2xl bg-vortex-soft px-4 py-3 text-xs font-semibold text-vortex-slate">
                <Icon className="size-4 text-vortex-blue" />
                {label as string}
              </span>
            ))}
          </div>
        </BuilderSection>
      </form>
    </div>
  );
}
