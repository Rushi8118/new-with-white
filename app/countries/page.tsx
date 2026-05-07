import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { WorkVisaSection } from "@/components/work-visa-section"

export const metadata: Metadata = {
  title: "Countries We Serve | Siddhivinayak Overseas",
  description:
    "Explore continent-wise work visa destinations and country pathways with Siddhivinayak Overseas.",
}

export default function CountriesPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden premium-page">
        <PageHero
          eyebrow="Global Destinations"
          title="Countries we serve for work visas"
          description="Explore opportunities across Europe, Americas, Pacific, Asia, Gulf, and Africa with a continent-wise country list and visa routes."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Countries" }]}
        />
        <WorkVisaSection />
      </main>
      <SiteFooter />
    </>
  )
}
