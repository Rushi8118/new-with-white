"use client"

import { lazy, Suspense, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Sparkles, Globe2, TrendingUp, Users, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const InteractiveGlobe = lazy(() => import("@/components/interactive-globe"))

function GlobeFallback() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center md:h-[500px]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading 3D Globe...</p>
      </div>
    </div>
  )
}

export function Hero() {
  const [showGlobe, setShowGlobe] = useState(false)

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pt-28 pb-8 text-foreground md:pt-36 md:pb-12"
    >
      {/* Subtle warm cream wash + soft gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.7 0.155 70 / 0.10) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.22 0.045 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.22 0.045 255 / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Trusted by 5,000+ aspirants worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground md:text-6xl lg:text-[4rem]"
          >
            Your gateway to a{" "}
            <span className="relative whitespace-nowrap text-primary glow-text">
              global career
              <svg
                aria-hidden="true"
                viewBox="0 0 200 8"
                className="absolute -bottom-1 left-0 h-2 w-full text-primary/60"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 Q 50 0 100 4 T 200 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Siddhivinayak Overseas is your specialist partner for{" "}
            <span className="font-semibold text-foreground">Work Visas</span> and{" "}
            <span className="font-semibold text-foreground">Study Visas</span> to Japan,
            Australia, Canada, the UK, Germany, New Zealand, Russia, USA, and UAE. End-to-end
            documentation, employer connects, and a dedicated case officer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="btn-glow rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/contact" className="group">
                Start Your Visa Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/70 bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/countries">Explore Countries</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              MEA-registered consultancy
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-foreground">98%</span>
              <span className="text-muted-foreground">visa success rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-foreground">10+</span>
              <span className="text-muted-foreground">countries served</span>
            </div>
          </motion.div>
        </div>

        {/* 3D Globe Section */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto"
          >
            {/* Dark space backdrop for the globe */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.12 0.03 255) 0%, oklch(0.12 0.03 255 / 0.7) 50%, transparent 80%)",
              }}
            />
            
            {!showGlobe ? (
              <div className="flex h-[400px] w-full flex-col items-center justify-center md:h-[500px]">
                <Globe2 className="mb-4 h-16 w-16 text-primary/40" />
                <Button
                  onClick={() => setShowGlobe(true)}
                  className="btn-glow rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Launch 3D Globe
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Interactive Earth with live visa destinations
                </p>
              </div>
            ) : (
              <Suspense fallback={<GlobeFallback />}>
                <InteractiveGlobe className="h-[400px] w-full md:h-[500px]" />
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
