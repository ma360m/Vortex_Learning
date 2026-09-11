import type { MetadataRoute } from "next";

import { courses } from "@/lib/vortex-data";

const siteUrl = "https://vortexelearning.com";
const publicPages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.95 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/explore", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/support", changeFrequency: "monthly", priority: 0.6 },
  { path: "/consultation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/trainings", changeFrequency: "monthly", priority: 0.65 },
  { path: "/instructors", changeFrequency: "monthly", priority: 0.65 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.65 },
  { path: "/community", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...publicPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...courses.map((course) => ({
      url: `${siteUrl}/courses/${course.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
