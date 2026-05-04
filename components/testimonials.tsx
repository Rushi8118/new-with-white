"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Rohan M.",
    country: "Now in Tokyo, Japan",
    role: "SSW Hospitality Visa",
    quote:
      "The team handled my JLPT prep, employer matching, and visa filing seamlessly. I landed in Tokyo within 9 months of signing up.",
    rating: 5,
  },
  {
    name: "Priya S.",
    country: "Now in Toronto, Canada",
    role: "Express Entry PR",
    quote:
      "Honest, transparent, and always available. They guided my CRS profile to a 482 score and I got my ITA on the first draw.",
    rating: 5,
  },
  {
    name: "Arjun K.",
    country: "Now in Berlin, Germany",
    role: "EU Blue Card",
    quote:
      "From German A1 prep to landing my engineering role in Berlin, every step was professionally managed. Highly recommend.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-balance text-foreground md:text-5xl">
            Real journeys.{" "}
            <span className="text-primary">Real outcomes.</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Hear from a few of the thousands who now live, study, and work abroad with us.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="lift-card relative flex flex-col rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-5 top-5 h-8 w-8 text-primary/20"
              />
              <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 grow text-pretty text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t.role} · {t.country}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
