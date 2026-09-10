// pages/terms.tsx

import Head from "next/head"
import Link from "next/link"
import Layout from "../components/layout/Layout"
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema"

const SITE_URL = "https://mesnaldo.com"
const PAGE_URL = `${SITE_URL}/terms`

export default function Terms() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Terms of Service | Mesnaldo",
    description:
      "Read the Terms of Service governing the use of Mesnaldo, an independent Messi and Ronaldo football statistics and comparison website.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Mesnaldo",
    },
    about: {
      "@type": "Thing",
      name: "Mesnaldo Terms of Service",
    },
    inLanguage: "en",
    dateModified: "2026-07-01",
  }

  return (
    <Layout
      title="Terms of Service | Mesnaldo"
      description="Read the Mesnaldo Terms of Service covering website use, football statistics, intellectual property, user conduct, third-party links, liability and privacy."
    >
      {/* =====================================================
          BREADCRUMB STRUCTURED DATA
      ===================================================== */}

      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Terms of Service",
            url: "/terms",
          },
        ]}
      />

      {/* =====================================================
          PAGE STRUCTURED DATA
      ===================================================== */}

      <Head>
        <script
          key="terms-webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
          }}
        />
      </Head>

      <main className="bg-black min-h-screen">

        {/* =====================================================
            HERO
        ===================================================== */}

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

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">

            <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
              Legal
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Terms of{" "}
              <span className="text-amber-400">
                Service
              </span>
            </h1>

            <p className="text-gray-400 text-sm">
              Last updated: July 2026
            </p>

            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto mt-5">
              These Terms of Service explain the conditions that apply when
              accessing or using Mesnaldo and its football statistics,
              comparisons, articles, polls and other website features.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            max-w-3xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-12
            sm:py-16
          "
        >
          <div className="space-y-10 text-sm text-gray-400 leading-7">

            {/* 1 */}

            <section aria-labelledby="acceptance-of-terms">
              <h2
                id="acceptance-of-terms"
                className="text-xl font-bold text-white mb-3"
              >
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using Mesnaldo (&quot;the Website&quot;), you
                agree to these Terms of Service. If you do not agree with these
                terms, you should discontinue use of the Website.
              </p>

              <p className="mt-3">
                We may update these Terms when necessary to reflect changes to
                the Website, its services, or applicable requirements. The
                updated version will be published on this page together with a
                revised update date.
              </p>
            </section>

            {/* 2 */}

            <section aria-labelledby="description-of-service">
              <h2
                id="description-of-service"
                className="text-xl font-bold text-white mb-3"
              >
                2. Description of Service
              </h2>

              <p>
                Mesnaldo is an independent football statistics and comparison
                website focused primarily on Lionel Messi and Cristiano
                Ronaldo.
              </p>

              <p className="mt-3">
                The Website may provide career statistics, match data,
                comparisons, records, trophies, individual honours,
                visualizations, articles, polls and related football content.
                The information is provided for general informational,
                analytical and entertainment purposes.
              </p>
            </section>

            {/* 3 */}

            <section aria-labelledby="intellectual-property">
              <h2
                id="intellectual-property"
                className="text-xl font-bold text-white mb-3"
              >
                3. Intellectual Property
              </h2>

              <p>
                Unless otherwise stated, the Mesnaldo name, website design,
                original written content, graphics, data presentation,
                comparison formats and other original materials created for
                Mesnaldo are protected by applicable intellectual property
                rights.
              </p>

              <p className="mt-3">
                Player names, club names, competition names, trademarks,
                logos, photographs and other third-party materials remain the
                property of their respective owners. References to those names
                or properties are used for identification, reporting,
                commentary and informational purposes and do not imply
                ownership, sponsorship or endorsement by Mesnaldo.
              </p>

              <p className="mt-3">
                Football statistics displayed by Mesnaldo may be compiled,
                calculated or organized using information available from
                multiple sources. Rights in any underlying third-party
                materials remain with their respective owners.
              </p>
            </section>

            {/* 4 */}

            <section aria-labelledby="disclaimer-of-affiliation">
              <h2
                id="disclaimer-of-affiliation"
                className="text-xl font-bold text-white mb-3"
              >
                4. Disclaimer of Affiliation
              </h2>

              <p>
                Mesnaldo is an independent website and is not officially
                affiliated with, sponsored by, endorsed by, or operated by
                Lionel Messi, Cristiano Ronaldo, their clubs, FIFA, UEFA,
                CONMEBOL, national football associations, leagues, tournament
                organizers or other football governing bodies unless
                explicitly stated otherwise.
              </p>
            </section>

            {/* 5 */}

            <section aria-labelledby="accuracy-of-data">
              <h2
                id="accuracy-of-data"
                className="text-xl font-bold text-white mb-3"
              >
                5. Accuracy of Statistics and Information
              </h2>

              <p>
                We aim to provide useful and accurate football statistics, but
                we do not guarantee that every figure displayed on the Website
                will always be complete, current or error-free.
              </p>

              <p className="mt-3">
                Football statistics can vary between data providers because of
                differences in definitions, historical records, assist
                criteria, competition classifications and other methodological
                factors.
              </p>

              <p className="mt-3">
                Users should therefore consider the statistics on Mesnaldo as
                informational data rather than an official record issued by a
                football governing body.
              </p>

              <p className="mt-3">
                If you believe a statistic is incorrect, you can report it
                through our{" "}
                <Link
                  href="/contact"
                  className="text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Contact page
                </Link>
                .
              </p>
            </section>

            {/* 6 */}

            <section aria-labelledby="user-conduct">
              <h2
                id="user-conduct"
                className="text-xl font-bold text-white mb-3"
              >
                6. User Conduct
              </h2>

              <p>
                When using Mesnaldo, you agree not to misuse the Website or
                interfere with its normal operation.
              </p>

              <p className="mt-3">
                Prohibited activities include:
              </p>

              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  Using the Website for unlawful or fraudulent purposes.
                </li>

                <li>
                  Attempting to gain unauthorized access to accounts, servers,
                  databases or restricted areas of the Website.
                </li>

                <li>
                  Intentionally interfering with the security, availability or
                  normal operation of the Website.
                </li>

                <li>
                  Distributing malicious software, spam or harmful content
                  through the Website.
                </li>

                <li>
                  Impersonating another person or entity.
                </li>

                <li>
                  Using automated systems in a way that places unreasonable
                  technical load on the Website or attempts to bypass access
                  controls.
                </li>
              </ul>
            </section>

            {/* 7 */}

            <section aria-labelledby="poll-voting">
              <h2
                id="poll-voting"
                className="text-xl font-bold text-white mb-3"
              >
                7. Polls and Voting
              </h2>

              <p>
                Mesnaldo may provide public opinion polls, including polls
                related to the Messi vs Ronaldo debate. These polls are
                intended primarily for entertainment and community
                participation.
              </p>

              <p className="mt-3">
                Browser-based mechanisms may be used to discourage repeated
                voting from the same browser or device. Such mechanisms do not
                guarantee that every vote represents a unique individual.
              </p>

              <p className="mt-3">
                Poll results are not scientific surveys and should not be
                interpreted as statistically representative measurements of
                global public opinion.
              </p>

              <p className="mt-3">
                We may investigate or remove votes that appear to result from
                abuse, automation, manipulation or technical errors.
              </p>
            </section>

            {/* 8 */}

            <section aria-labelledby="third-party-links">
              <h2
                id="third-party-links"
                className="text-xl font-bold text-white mb-3"
              >
                8. Third-Party Links and Services
              </h2>

              <p>
                Mesnaldo may contain links to external websites, data sources,
                social platforms, advertisements or third-party services.
              </p>

              <p className="mt-3">
                Those external services operate independently from Mesnaldo.
                We are not responsible for their content, availability,
                security, terms, privacy policies or business practices.
              </p>

              <p className="mt-3">
                Users should review the applicable terms and privacy policies
                of third-party services before using them.
              </p>
            </section>

            {/* 9 */}

            <section aria-labelledby="advertising">
              <h2
                id="advertising"
                className="text-xl font-bold text-white mb-3"
              >
                9. Advertising
              </h2>

              <p>
                Mesnaldo may display advertising or use third-party advertising
                services. Advertisements may be provided by external
                advertising partners and may be selected based on contextual,
                technical or other permitted signals.
              </p>

              <p className="mt-3">
                The appearance of an advertisement on Mesnaldo does not
                necessarily constitute an endorsement of the advertised
                product, service or organization.
              </p>

              <p className="mt-3">
                Information about cookies, advertising technologies and data
                processing should be read together with our{" "}
                <Link
                  href="/privacy"
                  className="text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            {/* 10 */}

            <section aria-labelledby="limitation-of-liability">
              <h2
                id="limitation-of-liability"
                className="text-xl font-bold text-white mb-3"
              >
                10. Disclaimer and Limitation of Liability
              </h2>

              <p>
                Mesnaldo is provided on an &quot;as available&quot; basis.
                While we make reasonable efforts to maintain the Website, we
                cannot guarantee uninterrupted availability or that all
                information will be free from errors or omissions.
              </p>

              <p className="mt-3">
                To the extent permitted by applicable law, Mesnaldo and its
                operators will not be responsible for losses or damages
                resulting solely from reliance on information displayed on the
                Website, interruptions in availability, or the actions of
                independent third-party services.
              </p>

              <p className="mt-3">
                Nothing in these Terms is intended to exclude or limit rights
                or liabilities that cannot legally be excluded under
                applicable law.
              </p>
            </section>

            {/* 11 */}

            <section aria-labelledby="privacy">
              <h2
                id="privacy"
                className="text-xl font-bold text-white mb-3"
              >
                11. Privacy
              </h2>

              <p>
                Your use of Mesnaldo is also subject to our Privacy Policy,
                which explains how information may be collected, used and
                processed when you use the Website.
              </p>

              <p className="mt-3">
                Please read the{" "}
                <Link
                  href="/privacy"
                  className="text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Mesnaldo Privacy Policy
                </Link>{" "}
                for more information.
              </p>
            </section>

            {/* 12 */}

            <section aria-labelledby="availability">
              <h2
                id="availability"
                className="text-xl font-bold text-white mb-3"
              >
                12. Website Availability and Changes
              </h2>

              <p>
                We may add, modify, suspend or discontinue particular Website
                features when necessary. This may include statistics,
                comparison tools, articles, polls or other functionality.
              </p>

              <p className="mt-3">
                We may also restrict access when reasonably necessary for
                maintenance, security, abuse prevention or compliance with
                applicable requirements.
              </p>
            </section>

            {/* 13 */}

            <section aria-labelledby="governing-law">
              <h2
                id="governing-law"
                className="text-xl font-bold text-white mb-3"
              >
                13. Governing Law
              </h2>

              <p>
                These Terms are intended to operate in accordance with
                applicable law. Nothing in these Terms removes any mandatory
                rights available to users under laws that apply to them.
              </p>

              <p className="mt-3">
                If a dispute or concern arises regarding Mesnaldo, users are
                encouraged to contact us first so that the matter can be
                reviewed and, where possible, resolved through good-faith
                communication.
              </p>
            </section>

            {/* 14 */}

            <section aria-labelledby="changes-to-terms">
              <h2
                id="changes-to-terms"
                className="text-xl font-bold text-white mb-3"
              >
                14. Changes to These Terms
              </h2>

              <p>
                We may revise these Terms from time to time. When material
                changes are made, the updated Terms will be published on this
                page and the &quot;Last updated&quot; date will be changed
                accordingly.
              </p>

              <p className="mt-3">
                Your continued use of the Website after revised Terms become
                effective constitutes acceptance of those revised Terms to the
                extent permitted by applicable law.
              </p>
            </section>

            {/* 15 */}

            <section aria-labelledby="contact-information">
              <h2
                id="contact-information"
                className="text-xl font-bold text-white mb-3"
              >
                15. Contact Information
              </h2>

              <p>
                If you have questions, concerns or feedback about these Terms
                of Service, you can contact Mesnaldo using the following
                methods.
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@mesnaldo.com"
                    className="text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    hello@mesnaldo.com
                  </a>
                </p>

                <p>
                  Contact form:{" "}
                  <Link
                    href="/contact"
                    className="text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    Contact Mesnaldo
                  </Link>
                </p>
              </div>
            </section>

            {/* =================================================
                RELATED LEGAL LINKS
            ================================================= */}

            <section
              aria-labelledby="related-pages"
              className="pt-8 border-t border-gray-800"
            >
              <h2
                id="related-pages"
                className="text-lg font-bold text-white mb-4"
              >
                Related Pages
              </h2>

              <div className="flex flex-wrap gap-3">

                <Link
                  href="/privacy"
                  className="
                    inline-flex
                    items-center
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-800
                    bg-gray-900/50
                    text-gray-300
                    hover:text-white
                    hover:border-gray-700
                    transition-colors
                  "
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-800
                    bg-gray-900/50
                    text-gray-300
                    hover:text-white
                    hover:border-gray-700
                    transition-colors
                  "
                >
                  Contact
                </Link>

                <Link
                  href="/about"
                  className="
                    inline-flex
                    items-center
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-800
                    bg-gray-900/50
                    text-gray-300
                    hover:text-white
                    hover:border-gray-700
                    transition-colors
                  "
                >
                  About Mesnaldo
                </Link>
              </div>
            </section>

            {/* =================================================
                COPYRIGHT
            ================================================= */}

            <footer className="text-center pt-8 border-t border-gray-800">
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} Mesnaldo. All rights reserved.
              </p>
            </footer>

          </div>
        </div>
      </main>
    </Layout>
  )
}