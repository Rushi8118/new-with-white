import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Contact Us | Siddhivinayak Overseas",
  description:
    "Get in touch with Siddhivinayak Overseas for free work visa or study visa consultation. Call +91 99250 64666 or WhatsApp our team.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <PageHero
          eyebrow="Get in touch"
          title="Talk to a visa expert today"
          description="Free 30-minute consultation. We'll review your profile, recommend the best country and visa category, and outline timelines and costs."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
