// pages/contact.tsx

import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import {
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react"

import Layout from "../components/layout/Layout"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"

const SITE_URL = "https://mesnaldo.com"
const PAGE_URL = `${SITE_URL}/contact`
const CONTACT_EMAIL = "hello@mesnaldo.com"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

export default function Contact() {
  const [form, setForm] =
    useState<ContactForm>(INITIAL_FORM)

  const [copied, setCopied] =
    useState(false)

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Contact Mesnaldo",
    description:
      "Contact Mesnaldo to report football statistics errors, suggest improvements, ask questions or provide feedback about the website.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Mesnaldo",
    },
    about: {
      "@type": "Organization",
      name: "Mesnaldo",
      url: SITE_URL,
      email: CONTACT_EMAIL,
    },
    inLanguage: "en",
  }

  function updateField(
    field: keyof ContactForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const subject =
      form.subject.trim() ||
      "Mesnaldo Website Enquiry"

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n")

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        CONTACT_EMAIL
      )

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Layout
      title="Contact Mesnaldo | Feedback, Corrections & Support"
      description="Contact Mesnaldo to report a Messi or Ronaldo statistics error, suggest a feature, ask a question or provide feedback about the website."
    >
      {/* ================================================
          BREADCRUMB
      ================================================= */}

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Contact",
            url: "/contact",
          },
        ]}
      />

      {/* ================================================
          STRUCTURED DATA
      ================================================= */}

      <Head>
        <script
          key="contact-page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              contactSchema
            ),
          }}
        />
      </Head>

      <main className="bg-black min-h-screen">

        {/* ================================================
            HERO
        ================================================= */}

        <section className="relative border-b border-gray-800 overflow-hidden">
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_55%)]
              pointer-events-none
            "
          />

          <div
            className="
              relative
              max-w-4xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-14
              sm:py-20
              text-center
            "
          >
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
              Get in Touch
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Contact{" "}
              <span className="text-amber-400">
                Mesnaldo
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Found an incorrect statistic, have a
              suggestion, or want to ask us something?
              Send us your feedback.
            </p>
          </div>
        </section>

        {/* ================================================
            MAIN CONTENT
        ================================================= */}

        <section
          aria-labelledby="contact-options"
          className="
            max-w-5xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-12
            sm:py-16
          "
        >
          <h2
            id="contact-options"
            className="sr-only"
          >
            Contact Mesnaldo
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ============================================
                CONTACT INFO
            ============================================= */}

            <aside className="lg:col-span-1 space-y-4">

              {/* EMAIL */}

              <div
                className="
                  bg-gray-900/80
                  border
                  border-gray-700/60
                  rounded-2xl
                  p-5
                  sm:p-6
                "
              >
                <Mail
                  aria-hidden="true"
                  className="w-7 h-7 text-amber-400 mb-3"
                />

                <h3 className="text-white font-bold text-sm mb-1">
                  Email
                </h3>

                <p className="text-xs text-gray-400 mb-3">
                  General enquiries, feedback and
                  statistics corrections.
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-amber-400 text-sm hover:text-amber-300 hover:underline break-all"
                >
                  {CONTACT_EMAIL}
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="
                    block
                    mt-3
                    text-xs
                    text-gray-500
                    hover:text-white
                    transition-colors
                  "
                >
                  {copied
                    ? "Email copied"
                    : "Copy email address"}
                </button>
              </div>

              {/* DATA CORRECTIONS */}

              <div
                className="
                  bg-gray-900/80
                  border
                  border-gray-700/60
                  rounded-2xl
                  p-5
                  sm:p-6
                "
              >
                <AlertCircle
                  aria-hidden="true"
                  className="w-7 h-7 text-amber-400 mb-3"
                />

                <h3 className="text-white font-bold text-sm mb-1">
                  Report a Data Error
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  If you notice an incorrect goal,
                  assist, appearance, trophy, record or
                  other statistic, please include the
                  player, competition and statistic in
                  your message.
                </p>
              </div>

              {/* FAQ */}

              <div
                className="
                  bg-gray-900/80
                  border
                  border-gray-700/60
                  rounded-2xl
                  p-5
                  sm:p-6
                "
              >
                <Search
                  aria-hidden="true"
                  className="w-7 h-7 text-amber-400 mb-3"
                />

                <h3 className="text-white font-bold text-sm mb-1">
                  Before You Contact Us
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Some common questions about our
                  Messi vs Ronaldo statistics and
                  methodology may already be answered
                  on the{" "}
                  <Link
                    href="/faq"
                    className="text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    FAQ page
                  </Link>
                  .
                </p>
              </div>

              {/* ABOUT */}

              <div
                className="
                  bg-gray-900/80
                  border
                  border-gray-700/60
                  rounded-2xl
                  p-5
                  sm:p-6
                "
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="w-7 h-7 text-amber-400 mb-3"
                />

                <h3 className="text-white font-bold text-sm mb-1">
                  About Mesnaldo
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Learn more about the purpose of the
                  website and how the platform presents
                  Messi and Ronaldo comparisons on our{" "}
                  <Link
                    href="/about"
                    className="text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    About page
                  </Link>
                  .
                </p>
              </div>
            </aside>

            {/* ============================================
                CONTACT FORM
            ============================================= */}

            <div
              className="
                lg:col-span-2
                bg-gray-900/80
                border
                border-gray-700/60
                rounded-2xl
                p-6
                sm:p-8
              "
            >
              <h2 className="text-xl font-bold text-white mb-2">
                Send Us a Message
              </h2>

              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Complete the form below. Clicking
                &quot;Open Email&quot; will prepare your
                message in your default email
                application.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME + EMAIL */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-xs text-gray-400 mb-1.5 block font-medium"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Your name"
                      className="
                        w-full
                        bg-gray-800
                        border
                        border-gray-700
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-amber-500/60
                        focus:ring-1
                        focus:ring-amber-500/20
                        transition-colors
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-xs text-gray-400 mb-1.5 block font-medium"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="your@email.com"
                      className="
                        w-full
                        bg-gray-800
                        border
                        border-gray-700
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-amber-500/60
                        focus:ring-1
                        focus:ring-amber-500/20
                        transition-colors
                      "
                    />
                  </div>
                </div>

                {/* SUBJECT */}

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-xs text-gray-400 mb-1.5 block font-medium"
                  >
                    Subject
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={(event) =>
                      updateField(
                        "subject",
                        event.target.value
                      )
                    }
                    className="
                      w-full
                      bg-gray-800
                      border
                      border-gray-700
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      text-white
                      focus:outline-none
                      focus:border-amber-500/60
                      focus:ring-1
                      focus:ring-amber-500/20
                      transition-colors
                    "
                  >
                    <option value="">
                      Select a topic
                    </option>

                    <option value="Report a Mesnaldo data error">
                      Report a Data Error
                    </option>

                    <option value="Mesnaldo feature suggestion">
                      Feature Suggestion
                    </option>

                    <option value="Mesnaldo website bug report">
                      Report a Website Bug
                    </option>

                    <option value="Mesnaldo content or source enquiry">
                      Content / Source Enquiry
                    </option>

                    <option value="Mesnaldo media enquiry">
                      Media / Press Enquiry
                    </option>

                    <option value="Mesnaldo general enquiry">
                      General Enquiry
                    </option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs text-gray-400 mb-1.5 block font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={(event) =>
                      updateField(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Describe your question, feedback or correction..."
                    rows={6}
                    minLength={10}
                    className="
                      w-full
                      bg-gray-800
                      border
                      border-gray-700
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      text-white
                      placeholder-gray-500
                      focus:outline-none
                      focus:border-amber-500/60
                      focus:ring-1
                      focus:ring-amber-500/20
                      transition-colors
                      resize-y
                    "
                  />
                </div>

                {/* SEND */}

                <button
                  type="submit"
                  className="
                    w-full
                    py-3
                    px-5
                    bg-white
                    text-black
                    rounded-xl
                    text-sm
                    font-bold
                    hover:bg-gray-200
                    transition-colors
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <Send
                    aria-hidden="true"
                    className="w-4 h-4"
                  />

                  Open Email
                </button>

                <p className="text-[11px] text-gray-600 text-center leading-relaxed">
                  This form opens your email application
                  and does not automatically submit
                  information to Mesnaldo.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ================================================
            CONTACT GUIDANCE
        ================================================= */}

        <section className="border-t border-gray-800">
          <div
            className="
              max-w-3xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-12
            "
          >
            <h2 className="text-xl font-bold text-white mb-5">
              Reporting a Statistics Error
            </h2>

            <p className="text-sm text-gray-400 leading-7">
              When reporting an incorrect Messi or
              Ronaldo statistic, providing enough
              context helps us review the issue. Useful
              details may include the player&apos;s name,
              competition, season, match, statistic and
              the source you believe supports the
              correction.
            </p>

            <p className="text-sm text-gray-400 leading-7 mt-4">
              Different football data providers can use
              different definitions for statistics such
              as assists or certain historical records.
              For more information about how Mesnaldo
              presents its data, visit the{" "}
              <Link
                href="/faq"
                className="text-amber-400 hover:text-amber-300 hover:underline"
              >
                FAQ
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ================================================
            RELATED PAGES
        ================================================= */}

        <section className="border-t border-gray-800">
          <div
            className="
              max-w-3xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-10
            "
          >
            <h2 className="text-lg font-bold text-white mb-4">
              Related Pages
            </h2>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-800
                  bg-gray-900/50
                  text-sm
                  text-gray-300
                  hover:text-white
                  hover:border-gray-700
                  transition-colors
                "
              >
                About Mesnaldo
              </Link>

              <Link
                href="/faq"
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-800
                  bg-gray-900/50
                  text-sm
                  text-gray-300
                  hover:text-white
                  hover:border-gray-700
                  transition-colors
                "
              >
                FAQ
              </Link>

              <Link
                href="/privacy"
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-800
                  bg-gray-900/50
                  text-sm
                  text-gray-300
                  hover:text-white
                  hover:border-gray-700
                  transition-colors
                "
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-800
                  bg-gray-900/50
                  text-sm
                  text-gray-300
                  hover:text-white
                  hover:border-gray-700
                  transition-colors
                "
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  )
}