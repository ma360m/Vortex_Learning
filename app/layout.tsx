import type { Metadata } from "next";

import { socialLinks } from "@/lib/vortex-data";
import "./globals.css";

const siteUrl = "https://vortexelearning.com";
const siteDescription =
  "Vortex Learning offers structured online courses, tutoring, and exam preparation for FSc, Cambridge, entry tests, English, and academic learning paths.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vortex Learning | Online Courses, Tutoring & Exam Preparation",
    template: "%s | Vortex Learning",
  },
  description: siteDescription,
  keywords: [
    "online courses",
    "online tutoring",
    "exam preparation",
    "FSc courses",
    "Cambridge O Level Physics",
    "MDCAT preparation",
    "ECAT preparation",
    "Vortex Learning",
  ],
  authors: [{ name: "Vortex Learning" }],
  creator: "Vortex Learning",
  publisher: "Vortex Learning",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Vortex Learning",
    description: siteDescription,
    siteName: "Vortex Learning",
    url: siteUrl,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Learning",
    description: siteDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Vortex Learning",
      url: siteUrl,
      logo: `${siteUrl}/vortex-logo.png`,
      description: siteDescription,
      email: "support@vortexelearning.com",
      telephone: "+92 324 4270697",
      areaServed: "Worldwide",
      sameAs: socialLinks.map((link) => link.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Vortex Learning",
      url: siteUrl,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
