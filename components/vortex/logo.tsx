import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function VortexLogo({ compact = false, className = "" }: LogoProps) {
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
          className={compact ? "h-10 w-auto object-contain" : "h-14 w-auto object-contain"}
        />
      </span>
    </Link>
  );
}
