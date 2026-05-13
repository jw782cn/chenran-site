import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";

const lastModified = new Date("2026-05-13");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/zh`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work/seedance-stranger-things-ai-finale`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/work/ai-will`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];
}
