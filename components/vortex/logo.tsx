import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  header?: boolean;
  className?: string;
};

export function VortexLogo({ compact = false, header = false, className = "" }: LogoProps) {
  const imageSize = header
    ? "h-12 w-auto object-contain sm:h-16"
    : compact
      ? "h-10 w-auto object-contain"
      : "h-11 w-auto object-contain sm:h-14";

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center ${className}`}
      aria-label="Vortex Learning home"
    >
      <span className="block">
        <Image
          src="/vortex-logo.png"
          alt="Vortex Learning"
          width={659}
          height={340}
          priority
          className={imageSize}
        />
      </span>
    </Link>
  );
}
