import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://siddhivinayakoverseas.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Siddhivinayak Overseas | Work Visa & Study Visa Consultants",
    template: "%s | Siddhivinayak Overseas",
  },
  description:
    "Trusted overseas consultancy for Work Visas and Study Visas to Japan, Australia, Canada, UK, Germany, New Zealand, Russia, USA, and UAE. Expert guidance, end-to-end documentation, and proven success rates.",
  keywords: [
    "work visa consultant",
    "study visa consultant",
    "Japan work visa",
    "Australia work visa",
    "Canada work visa",
    "UK work visa",
    "Germany work visa",
    "New Zealand work visa",
    "Russia work visa",
    "USA work visa",
    "UAE work visa",
    "overseas consultancy India",
    "Siddhivinayak Overseas",
    "abroad jobs",
    "study abroad consultants",
    "skilled migration visa",
    "express entry canada",
    "australia pr visa",
    "germany opportunity card",
    "EU blue card",
  ],
  authors: [{ name: "Siddhivinayak Overseas" }],
  creator: "Siddhivinayak Overseas",
  publisher: "Siddhivinayak Overseas",
  category: "Immigration & Visa Consultancy",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Siddhivinayak Overseas",
    title: "Siddhivinayak Overseas | Work & Study Visas to 10+ Countries",
    description:
      "Your gateway to global careers. Trusted Work Visa and Study Visa consultants with end-to-end support across 10+ countries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Siddhivinayak Overseas — Work and Study Visa Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhivinayak Overseas | Work & Study Visa Consultants",
    description:
      "Trusted Work Visa and Study Visa consultants for Japan, Australia, Canada, UK, Germany, NZ, Russia, USA, and UAE.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece2cf" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Siddhivinayak Overseas",
        description:
          "Work Visa and Study Visa consultancy for Japan, Australia, Canada, UK, Germany, New Zealand, Russia, USA, and UAE.",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        areaServed: [
          "Japan",
          "Australia",
          "Canada",
          "United Kingdom",
          "Germany",
          "New Zealand",
          "Russia",
          "United States",
          "United Arab Emirates",
          "India",
        ],
        serviceType: ["Work Visa Consulting", "Study Visa Consulting", "Immigration Services", "Permanent Residency"],
        sameAs: ["https://www.siddhivinayakoverseas.com"],
        telephone: "+919925064666",
        email: "info@siddhivinayakoverseas.com",
      },
      {
        "@type": "WebSite",
        name: "Siddhivinayak Overseas",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/countries?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
