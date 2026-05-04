import type { MetadataRoute } from "next"

const SITE_URL = "https://new-siddhivinayakoverseas.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/work-visa", priority: 0.9 },
    { path: "/study-visa", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }))
}
