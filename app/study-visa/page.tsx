import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, CheckCircle2, Calendar } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { StudyVisaSection } from "@/components/study-visa-section"
import { ProcessSection } from "@/components/process-section"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Study Visa Consultancy | UK, Germany, Canada, Australia, USA, Ireland",
  description:
    "Study abroad with Siddhivinayak Overseas. Bachelors, Masters, PhD admissions and student visas to the UK, Germany, France, Canada, Australia, NZ, USA, and Ireland.",
  keywords: [
    "study abroad consultancy",
    "UK student visa",
    "Germany student visa",
    "Canada study permit",
    "Australia student visa",
    "USA F1 visa",
    "Ireland study visa",
    "MS abroad",
    "scholarship abroad",
  ],
}

const INTAKES = [
  { country: "UK", main: "September", second: "January" },
  { country: "Germany", main: "October", second: "April" },
  { country: "Canada", main: "September", second: "January / May" },
  { country: "Australia", main: "February", second: "July" },
  { country: "USA", main: "Fall (Aug)", second: "Spring (Jan)" },
  { country: "Ireland", main: "September", second: "January" },
]

const REQUIREMENTS = [
  "Academic transcripts (10th, 12th, Bachelors)",
  "IELTS / TOEFL / PTE / Duolingo score",
  "Statement of Purpose (SOP)",
  "2–3 Letters of Recommendation",
  "Updated CV / Resume",
  "Proof of funds / education loan sanction",
]

export default function StudyVisaPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <PageHero
          eyebrow="Study Visa Consultancy"
          title="Study at the world's best universities"
          description="From shortlisting to landing on campus, we guide students through every step — admissions, scholarships, visas, and settlement."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Study Visa" }]}
        />

        <StudyVisaSection />

        {/* Intakes */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <Calendar className="h-3.5 w-3.5" />
                Intake calendar
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-balance text-foreground md:text-4xl">
                Plan your application timeline
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                Most universities accept applications 8–12 months before the intake. Start
                early to maximise scholarship chances.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INTAKES.map((i) => (
                <div
                  key={i.country}
                  className="lift-card rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {i.country}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Main intake
                      </p>
                      <p className="mt-1 font-semibold text-primary">{i.main}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Secondary
                      </p>
                      <p className="mt-1 font-semibold text-foreground">{i.second}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Documentation
                </span>
                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-balance text-foreground md:text-4xl">
                  Documents you&apos;ll need
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                  We help you prepare and review every document so your application stands
                  out at admissions committees.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="btn-glow mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contact">Start your application</Link>
                </Button>
              </div>
              <div className="md:col-span-6">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {REQUIREMENTS.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />
      </main>
      <SiteFooter />
    </>
  )
}
