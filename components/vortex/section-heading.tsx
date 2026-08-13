type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const titleClass = tone === "dark" ? "text-white" : "text-vortex-navy";
  const textClass = tone === "dark" ? "text-cyan-50" : "text-vortex-muted";
  const eyebrowClass = tone === "dark" ? "text-[#47C8F2]" : "text-vortex-blue";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-semibold uppercase ${eyebrowClass}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-4xl font-semibold leading-tight sm:text-5xl ${titleClass}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${textClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
