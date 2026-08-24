import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vortex Learning | Learning, Structured for Your Path",
    template: "%s | Vortex Learning",
  },
  description:
    "A premium education ecosystem for courses, live classes, AI-powered study, tutoring, parent visibility, community, and academic operations.",
  openGraph: {
    title: "Vortex Learning",
    description:
      "Learning, structured for your path.",
    siteName: "Vortex Learning",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Learning",
    description:
      "A premium education ecosystem for serious students and academic teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
