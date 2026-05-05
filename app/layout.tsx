import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
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

const SITE_URL = "https://new-siddhivinayakoverseas.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Siddhivinayak Overseas | Work Visa & Study Visa Consultants — Japan, Australia, Canada, UK, Germany, NZ, Russia, USA",
    template: "%s | Siddhivinayak Overseas",
  },
  description:
    "Trusted overseas consultancy for Work Visas and Study Visas to Japan, Australia, Canada, UK, Germany, New Zealand, Russia, and the USA. Expert guidance, end-to-end documentation, and proven success rates.",
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
    "overseas consultancy India",
    "Siddhivinayak Overseas",
    "abroad jobs",
    "study abroad consultants",
    "skilled migration visa",
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
    title:
      "Siddhivinayak Overseas | Work & Study Visas to Japan, Australia, Canada, UK, Germany, NZ, Russia, USA",
    description:
      "Your gateway to global careers. Trusted Work Visa and Study Visa consultants with end-to-end support across 8+ countries.",
    images: [
      {
        url: "/consultant-office.jpg",
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
      "Trusted Work Visa and Study Visa consultants for Japan, Australia, Canada, UK, Germany, NZ, Russia, and USA.",
    images: ["/consultant-office.jpg"],
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
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece2cf" },
    { media: "(prefers-color-scheme: dark)", color: "#ece2cf" },
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
    "@type": "ProfessionalService",
    name: "Siddhivinayak Overseas",
    description:
      "Work Visa and Study Visa consultancy for Japan, Australia, Canada, UK, Germany, New Zealand, Russia, and USA.",
    url: SITE_URL,
    image: `${SITE_URL}/consultant-office.jpg`,
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
    ],
    serviceType: ["Work Visa Consulting", "Study Visa Consulting", "Immigration Services"],
    sameAs: ["https://www.siddhivinayakoverseas.com"],
  }

  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
