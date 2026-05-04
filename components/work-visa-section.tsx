"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Briefcase } from "lucide-react"

interface Country {
  code: string
  name: string
  flag: string
  tagline: string
  highlights: string[]
  visa: string
}

const COUNTRIES: Country[] = [
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    tagline: "Specified Skilled Worker (SSW) & Engineer pathways",
    highlights: ["Hospitality, Care, Manufacturing", "JFT / JLPT support", "5-year work permit"],
    visa: "SSW / Engineer Visa",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "Skilled migration & employer-sponsored streams",
    highlights: ["Subclass 482 / 186 / 189", "Trade skill assessment", "PR pathway available"],
    visa: "Skilled Work Visa",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Express Entry, PNP & LMIA jobs",
    highlights: ["Federal Skilled Worker", "Provincial Nominee", "PR in 12-18 months"],
    visa: "Work Permit / PR",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Skilled Worker & Health & Care visa",
    highlights: ["CoS support", "Healthcare partners", "Dependents allowed"],
    visa: "Skilled Worker Visa",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    tagline: "EU Blue Card & Opportunity Card",
    highlights: ["Engineering & IT roles", "German A1 / B1 prep", "Family reunification"],
    visa: "EU Blue Card",
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Accredited Employer Work Visa",
    highlights: ["Green List occupations", "Up to 5-year stay", "Path to residency"],
    visa: "AEWV",
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    tagline: "Highly Qualified Specialist programme",
    highlights: ["IT, Energy, Engineering", "3-year work permit", "Streamlined invitation"],
    visa: "HQS Work Visa",
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    tagline: "H-1B, L-1 & EB-3 employment routes",
    highlights: ["Employer petition support", "Document drafting", "Interview prep"],
    visa: "H-1B / EB-3",
  },
]

export function WorkVisaSection() {
  return (
    <section
      id="work-visa"
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            Work Visa Specialists
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-balance text-foreground md:text-5xl">
            Work visas to{" "}
            <span className="text-primary">8 leading destinations</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From skilled migration to employer-sponsored pathways — we match your profile to the
            right country, role, and visa category, then handle every step.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES.map((country, idx) => (
            <motion.article
              key={country.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="lift-card group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
            >
              {/* Hover gradient accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/20"
              />

              <div className="flex items-start justify-between">
                <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>
                  {country.flag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                {country.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-primary/90">
                {country.visa}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {country.tagline}
              </p>

              <ul className="mt-5 space-y-2">
                {country.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100"
              >
                Check eligibility
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
