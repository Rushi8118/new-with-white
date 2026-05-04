"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WORK_COUNTRIES = [
  "Japan",
  "Australia",
  "Canada",
  "United Kingdom",
  "Germany",
  "New Zealand",
  "Russia",
  "United States",
  "Other / Not sure",
]

const STUDY_COUNTRIES = [
  "United Kingdom",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "New Zealand",
  "United States",
  "Ireland",
  "Other / Not sure",
]

const WORK_CATEGORIES = [
  "Skilled / Specified Worker (Japan SSW)",
  "Australia 482 / 186 / 491",
  "Canada Express Entry / LMIA",
  "UK Skilled Worker / Health & Care",
  "Germany EU Blue Card / Opportunity Card",
  "New Zealand AEWV",
  "Russia HQS",
  "USA H-1B / EB-3",
  "Not sure — please advise",
]

type FormState = "idle" | "loading" | "done"

export function ContactSection() {
  const [workState, setWorkState] = useState<FormState>("idle")
  const [studyState, setStudyState] = useState<FormState>("idle")

  const handleSubmit = (
    setter: React.Dispatch<React.SetStateAction<FormState>>,
  ) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setter("loading")
    setTimeout(() => setter("done"), 700)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-balance text-foreground md:text-5xl">
              Talk to a <span className="text-primary">visa expert</span>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Free 30-minute consultation. We&apos;ll review your profile, recommend the
              best country and visa category, and outline timelines and costs.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <Phone className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Call us
                  </p>
                  <a
                    href="tel:+919925064666"
                    className="mt-0.5 block font-semibold text-foreground transition hover:text-primary"
                  >
                    +91 99250 64666
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/919925064666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block font-semibold text-foreground transition hover:text-primary"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <Mail className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:info@siddhivinayakoverseas.com"
                    className="mt-0.5 block font-semibold text-foreground transition hover:text-primary"
                  >
                    info@siddhivinayakoverseas.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Office
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    Siddhivinayak Overseas, India
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border/60 bg-card/70 p-6 backdrop-blur-md md:p-8"
            >
              <Tabs defaultValue="work" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-background/60 p-1">
                  <TabsTrigger
                    value="work"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Work Visa Inquiry
                  </TabsTrigger>
                  <TabsTrigger
                    value="study"
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Study Visa Inquiry
                  </TabsTrigger>
                </TabsList>

                {/* WORK VISA FORM */}
                <TabsContent value="work" className="mt-6">
                  {workState === "done" ? (
                    <SuccessState
                      title="Thank you!"
                      message="Your work visa enquiry has been received. A case officer will reach out within one business day."
                    />
                  ) : (
                    <form
                      onSubmit={handleSubmit(setWorkState)}
                      className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                      <Field id="w-name" label="Full name">
                        <Input id="w-name" name="name" required placeholder="Your full name" />
                      </Field>
                      <Field id="w-phone" label="Phone">
                        <Input
                          id="w-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 ..."
                        />
                      </Field>
                      <Field id="w-email" label="Email" full>
                        <Input
                          id="w-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                        />
                      </Field>
                      <Field id="w-country" label="Preferred country">
                        <CountrySelect id="w-country" options={WORK_COUNTRIES} />
                      </Field>
                      <Field id="w-category" label="Visa category">
                        <Select name="category">
                          <SelectTrigger
                            id="w-category"
                            className="border-border/70 bg-background/50"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {WORK_CATEGORIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field id="w-experience" label="Years of experience">
                        <Input
                          id="w-experience"
                          name="experience"
                          type="number"
                          min={0}
                          placeholder="e.g. 4"
                        />
                      </Field>
                      <Field id="w-role" label="Current role / industry">
                        <Input id="w-role" name="role" placeholder="e.g. Nurse, Welder, IT" />
                      </Field>
                      <Field id="w-message" label="Tell us more" full>
                        <Textarea
                          id="w-message"
                          name="message"
                          rows={3}
                          placeholder="English proficiency, qualifications, target role, timeline..."
                        />
                      </Field>
                      <SubmitRow
                        loading={workState === "loading"}
                        label="Request work visa consultation"
                      />
                    </form>
                  )}
                </TabsContent>

                {/* STUDY VISA FORM */}
                <TabsContent value="study" className="mt-6">
                  {studyState === "done" ? (
                    <SuccessState
                      title="Thank you!"
                      message="Your study visa enquiry has been received. A counsellor will reach out within one business day."
                    />
                  ) : (
                    <form
                      onSubmit={handleSubmit(setStudyState)}
                      className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                      <Field id="s-name" label="Full name">
                        <Input id="s-name" name="name" required placeholder="Your full name" />
                      </Field>
                      <Field id="s-phone" label="Phone">
                        <Input
                          id="s-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 ..."
                        />
                      </Field>
                      <Field id="s-email" label="Email" full>
                        <Input
                          id="s-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                        />
                      </Field>
                      <Field id="s-country" label="Preferred country">
                        <CountrySelect id="s-country" options={STUDY_COUNTRIES} />
                      </Field>
                      <Field id="s-level" label="Study level">
                        <Select name="level">
                          <SelectTrigger
                            id="s-level"
                            className="border-border/70 bg-background/50"
                          >
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelors">Bachelor&apos;s</SelectItem>
                            <SelectItem value="masters">Master&apos;s</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="diploma">Diploma / Foundation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field id="s-intake" label="Target intake">
                        <Input
                          id="s-intake"
                          name="intake"
                          placeholder="e.g. Sep 2026 / Jan 2027"
                        />
                      </Field>
                      <Field id="s-field" label="Field of study">
                        <Input
                          id="s-field"
                          name="field"
                          placeholder="e.g. Data Science, Nursing"
                        />
                      </Field>
                      <Field id="s-message" label="Tell us about you" full>
                        <Textarea
                          id="s-message"
                          name="message"
                          rows={3}
                          placeholder="Academic background, IELTS / TOEFL scores, scholarship interest..."
                        />
                      </Field>
                      <SubmitRow
                        loading={studyState === "loading"}
                        label="Request study visa consultation"
                      />
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- helpers ---------------- */

function Field({
  id,
  label,
  children,
  full,
}: {
  id: string
  label: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <div className="mt-2 [&_input]:border-border/70 [&_input]:bg-background/50 [&_textarea]:border-border/70 [&_textarea]:bg-background/50">
        {children}
      </div>
    </div>
  )
}

function CountrySelect({ id, options }: { id: string; options: string[] }) {
  return (
    <Select name="country">
      <SelectTrigger id={id} className="border-border/70 bg-background/50">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {options.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function SubmitRow({ loading, label }: { loading: boolean; label: string }) {
  return (
    <div className="md:col-span-2">
      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="btn-glow w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {loading ? "Sending..." : label}
        {!loading && <Send className="ml-2 h-4 w-4" />}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We never share your data.
      </p>
    </div>
  )
}

function SuccessState({ title, message }: { title: string; message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <CheckCircle2 className="h-14 w-14 text-primary" />
      <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>
    </div>
  )
}
