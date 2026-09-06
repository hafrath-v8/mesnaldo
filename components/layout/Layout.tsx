// components/layout/Layout.tsx

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { useRouter } from "next/router"

import {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  Menu,
  X,
  Goal,
  BarChart3,
  Trophy,
  PenLine,
  Vote,
} from "lucide-react"


/* =========================================================
   TYPES
========================================================= */

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}


interface NavigationLink {
  href: string
  label: string
}


/* =========================================================
   NAVIGATION DATA
========================================================= */

const mainLinks: NavigationLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/goals",
    label: "Goals",
  },
  {
    href: "/assists",
    label: "Assists",
  },
  {
    href: "/trophies",
    label: "Trophies",
  },
  {
    href: "/honours",
    label: "Honours",
  },
  {
    href: "/head-to-head",
    label: "Head to Head",
  },
  {
    href: "/career",
    label: "Career",
  },
  {
    href: "/records",
    label: "Records",
  },
  {
    href: "/who-is-best",
    label: "Who's Best?",
  },
  {
    href: "/detailed-stats",
    label: "Detailed Stats",
  },
]


const secondaryLinks: NavigationLink[] = [
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/messi",
    label: "Messi",
  },
  {
    href: "/ronaldo",
    label: "Ronaldo",
  },
  {
    href: "/poll",
    label: "Poll",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/about",
    label: "About",
  },
]


const footerLinks: Record<
  string,
  NavigationLink[]
> = {
  Compare: [
    {
      href: "/goals",
      label: "Goals",
    },
    {
      href: "/assists",
      label: "Assists",
    },
    {
      href: "/trophies",
      label: "Trophies",
    },
    {
      href: "/honours",
      label: "Honours",
    },
    {
      href: "/head-to-head",
      label: "Head to Head",
    },
    {
      href: "/career",
      label: "Career",
    },
    {
      href: "/records",
      label: "Records",
    },
  ],

  Players: [
    {
      href: "/messi",
      label: "Lionel Messi",
    },
    {
      href: "/ronaldo",
      label: "Cristiano Ronaldo",
    },
    {
      href: "/poll",
      label: "GOAT Poll",
    },
  ],

  Resources: [
    {
      href: "/blog",
      label: "Blog",
    },
    {
      href: "/faq",
      label: "FAQ",
    },
    {
      href: "/about",
      label: "About Mesnaldo",
    },
  ],

  Legal: [
    {
      href: "/privacy",
      label: "Privacy Policy",
    },
    {
      href: "/terms",
      label: "Terms of Service",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ],
}


/* =========================================================
   COMPONENT
========================================================= */

export default function Layout({
  children,

  title =
    "Messi vs Ronaldo: Goals, Assists, Trophies, Records & Career Stats",

  description =
    "Compare Lionel Messi and Cristiano Ronaldo across career goals, assists, appearances, trophies, records, head-to-head matches and detailed football statistics.",
}: LayoutProps) {

  const router =
    useRouter()


  /* =======================================================
     STATE
  ======================================================= */

  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(false)


  const [
    scrolled,
    setScrolled,
  ] =
    useState(false)


  const [
    navigating,
    setNavigating,
  ] =
    useState(false)


  /* =======================================================
     INTENT PREFETCH

     Instead of Next eagerly trying to prefetch every large
     route visible in the navbar, prefetch when the user
     shows intention to visit it.
  ======================================================= */

  const prefetchRoute =
    useCallback(
      (
        href: string
      ) => {

        if (
          href ===
          router.pathname
        ) {
          return
        }


        router
          .prefetch(
            href
          )
          .catch(() => {
            // Prefetch failure should never block navigation.
          })

      },
      [
        router,
      ]
    )


  /* =======================================================
     SCROLL HEADER
  ======================================================= */

  useEffect(
    () => {

      let ticking =
        false


      const updateScroll =
        () => {

          setScrolled(
            window.scrollY >
              10
          )

          ticking =
            false
        }


      const handleScroll =
        () => {

          if (
            ticking
          ) {
            return
          }


          ticking =
            true


          window.requestAnimationFrame(
            updateScroll
          )

        }


      updateScroll()


      window.addEventListener(
        "scroll",
        handleScroll,
        {
          passive: true,
        }
      )


      return () => {

        window.removeEventListener(
          "scroll",
          handleScroll
        )

      }

    },
    []
  )


  /* =======================================================
     CLOSE MOBILE MENU AFTER NAVIGATION
  ======================================================= */

  useEffect(
    () => {

      setMobileOpen(
        false
      )

    },
    [
      router.pathname,
    ]
  )


  /* =======================================================
     ROUTE LOADING STATE
  ======================================================= */

  useEffect(
    () => {

      const handleStart =
        (
          url: string
        ) => {

          /*
           * Avoid showing loading state for navigating
           * to the current route.
           */

          if (
            url !==
            router.asPath
          ) {

            setNavigating(
              true
            )

          }

        }


      const handleComplete =
        () => {

          setNavigating(
            false
          )

        }


      const handleError =
        () => {

          setNavigating(
            false
          )

        }


      router.events.on(
        "routeChangeStart",
        handleStart
      )


      router.events.on(
        "routeChangeComplete",
        handleComplete
      )


      router.events.on(
        "routeChangeError",
        handleError
      )


      return () => {

        router.events.off(
          "routeChangeStart",
          handleStart
        )


        router.events.off(
          "routeChangeComplete",
          handleComplete
        )


        router.events.off(
          "routeChangeError",
          handleError
        )

      }

    },
    [
      router,
    ]
  )


  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActiveRoute =
    (
      href: string
    ) => {

      if (
        href === "/"
      ) {

        return (
          router.pathname ===
          "/"
        )

      }


      return (
        router.pathname ===
        href
      )

    }


  /* =======================================================
     CANONICAL
  ======================================================= */

  const canonicalPath =
    router.pathname ===
    "/"
      ? ""
      : router.pathname


  const canonicalUrl =
    `https://mesnaldo.com${canonicalPath}`


  return (

    <>

      {/* ===================================================
          HEAD
      =================================================== */}

      <Head>

        <title>
          {title}
        </title>


        <meta
          name="description"
          content={
            description
          }
        />


        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />


        <meta
          name="theme-color"
          content="#000000"
        />


        <link
          rel="icon"
          href="/images/logo.png"
        />


        <link
          rel="canonical"
          href={
            canonicalUrl
          }
        />


        {/* Open Graph */}

        <meta
          property="og:title"
          content={
            title
          }
        />


        <meta
          property="og:description"
          content={
            description
          }
        />


        <meta
          property="og:type"
          content="website"
        />


        <meta
          property="og:site_name"
          content="Mesnaldo"
        />


        <meta
          property="og:url"
          content={
            canonicalUrl
          }
        />


        <meta
          property="og:image"
          content="https://mesnaldo.com/images/logo.png"
        />


        {/* Twitter */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />


        <meta
          name="twitter:title"
          content={
            title
          }
        />


        <meta
          name="twitter:description"
          content={
            description
          }
        />


        {/* Organization Schema */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                {
                  "@context":
                    "https://schema.org",

                  "@type":
                    "Organization",

                  name:
                    "Mesnaldo",

                  url:
                    "https://mesnaldo.com",

                  description:
                    "An independent football statistics and comparison platform focused on Lionel Messi and Cristiano Ronaldo.",

                  logo:
                    "https://mesnaldo.com/images/logo.png",

                  sameAs: [
                    "https://www.instagram.com/mesnaldo_com/",
                    "https://www.facebook.com/share/1GtW72fkDK/",
                  ],
                }
              ),
          }}
        />

      </Head>


      {/* ===================================================
          ROUTE PROGRESS BAR
      =================================================== */}

      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[100] h-[2px] bg-amber-400 transition-all duration-300 ${
          navigating
            ? "w-[75%] opacity-100"
            : "w-full opacity-0"
        }`}
      />


      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header
        className={`
          sticky
          top-0
          z-50
          border-b
          border-white/[0.06]
          transition-colors
          duration-200
          ${
            scrolled
              ? "bg-black/95 shadow-lg shadow-black/20"
              : "bg-black/90"
          }
        `}
      >

        {/* =================================================
            DESKTOP TOP BAR
        ================================================= */}

        <div className="hidden lg:block border-b border-white/[0.04] bg-white/[0.01]">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">


            <div className="flex items-center gap-4 text-[11px] text-gray-500">

              <span className="flex items-center gap-1">

                <Goal className="w-3 h-3" />

                Messi vs Ronaldo statistics

              </span>


              <span className="text-gray-700">
                |
              </span>


              <span className="flex items-center gap-1">

                <BarChart3 className="w-3 h-3" />

                Career & match data

              </span>


              <span className="text-gray-700">
                |
              </span>


              <span className="flex items-center gap-1">

                <Trophy className="w-3 h-3" />

                Trophies & records

              </span>

            </div>


            <div className="flex items-center gap-3">

              <Link
                href="/blog"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/blog"
                  )
                }
                className="text-[11px] text-gray-500 hover:text-amber-400 transition-colors flex items-center gap-1"
              >

                <PenLine className="w-3 h-3" />

                Blog

              </Link>


              <Link
                href="/poll"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/poll"
                  )
                }
                className="text-[11px] text-gray-500 hover:text-amber-400 transition-colors flex items-center gap-1"
              >

                <Vote className="w-3 h-3" />

                Vote

              </Link>


              <span className="text-gray-700">
                |
              </span>


              <a
                href="https://www.instagram.com/mesnaldo_com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 hover:text-pink-400 transition-colors flex items-center gap-1"
              >

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >

                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                  />

                  <line
                    x1="18"
                    y1="6"
                    x2="18.01"
                    y2="6"
                  />

                </svg>

                Instagram

              </a>


              <span className="text-gray-700">
                |
              </span>


              <a
                href="https://www.facebook.com/share/1GtW72fkDK/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-1"
              >

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >

                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />

                </svg>

                Facebook

              </a>

            </div>

          </div>

        </div>


        {/* =================================================
            MAIN NAV
        ================================================= */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-14 lg:h-16">


            {/* ===============================================
                LOGO
            =============================================== */}

            <Link
              href="/"
              prefetch={false}
              onMouseEnter={() =>
                prefetchRoute(
                  "/"
                )
              }
              onTouchStart={() =>
                prefetchRoute(
                  "/"
                )
              }
              className="flex items-center gap-2.5 group flex-shrink-0"
            >

              <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-lg overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-center">

                <Image
                  src="/images/logo.png"
                  alt="Mesnaldo"
                  width={28}
                  height={28}
                  priority
                  className="object-contain"
                />

              </div>


              <span className="text-lg lg:text-xl font-black tracking-tight text-white">

                Mes

                <span className="text-amber-400">
                  naldo
                </span>

              </span>

            </Link>


            {/* ===============================================
                DESKTOP NAVIGATION
            =============================================== */}

            <nav
              className="hidden lg:flex items-center gap-0"
              aria-label="Main navigation"
            >

              {mainLinks.map(
                (
                  link
                ) => {

                  const active =
                    isActiveRoute(
                      link.href
                    )


                  return (

                    <Link
                      key={
                        link.href
                      }
                      href={
                        link.href
                      }
                      prefetch={false}
                      onMouseEnter={() =>
                        prefetchRoute(
                          link.href
                        )
                      }
                      onFocus={() =>
                        prefetchRoute(
                          link.href
                        )
                      }
                      className={`
                        relative
                        px-3
                        xl:px-3.5
                        py-1.5
                        text-[13px]
                        rounded-lg
                        transition-colors
                        duration-150
                        font-medium
                        ${
                          active
                            ? "text-white bg-white/[0.08]"
                            : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                        }
                      `}
                    >

                      {
                        link.label
                      }


                      {active && (

                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-400 rounded-full" />

                      )}

                    </Link>

                  )

                }
              )}


              <span className="w-px h-5 bg-white/[0.08] mx-1" />


              {secondaryLinks.map(
                (
                  link
                ) => {

                  const active =
                    isActiveRoute(
                      link.href
                    )


                  return (

                    <Link
                      key={
                        link.href
                      }
                      href={
                        link.href
                      }
                      prefetch={false}
                      onMouseEnter={() =>
                        prefetchRoute(
                          link.href
                        )
                      }
                      onFocus={() =>
                        prefetchRoute(
                          link.href
                        )
                      }
                      className={`
                        relative
                        px-3
                        xl:px-3.5
                        py-1.5
                        text-[13px]
                        rounded-lg
                        transition-colors
                        duration-150
                        font-medium
                        ${
                          active
                            ? "text-white bg-white/[0.08]"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                        }
                      `}
                    >

                      {
                        link.label
                      }

                    </Link>

                  )

                }
              )}

            </nav>


            {/* ===============================================
                MOBILE TOGGLE
            =============================================== */}

            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  previous =>
                    !previous
                )
              }
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                mobileOpen
              }
              className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >

              {mobileOpen
                ? (
                  <X
                    size={20}
                  />
                )
                : (
                  <Menu
                    size={20}
                  />
                )}

            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileOpen && (

          <div className="lg:hidden border-t border-white/[0.06] bg-black">

            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto overscroll-contain">


              {/* MAIN */}

              <div className="mb-3">

                <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-1">

                  Main

                </p>


                {mainLinks.map(
                  (
                    link
                  ) => {

                    const active =
                      isActiveRoute(
                        link.href
                      )


                    return (

                      <Link
                        key={
                          link.href
                        }
                        href={
                          link.href
                        }
                        prefetch={false}
                        onTouchStart={() =>
                          prefetchRoute(
                            link.href
                          )
                        }
                        onMouseEnter={() =>
                          prefetchRoute(
                            link.href
                          )
                        }
                        className={`
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          text-sm
                          rounded-xl
                          transition-colors
                          duration-150
                          ${
                            active
                              ? "text-white bg-white/[0.08] font-semibold"
                              : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                          }
                        `}
                      >

                        {active && (

                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />

                        )}


                        <span
                          className={
                            !active
                              ? "ml-[18px]"
                              : ""
                          }
                        >

                          {
                            link.label
                          }

                        </span>

                      </Link>

                    )

                  }
                )}

              </div>


              {/* MORE */}

              <div className="pt-2 border-t border-white/[0.06]">

                <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-1 mt-3">

                  More

                </p>


                {secondaryLinks.map(
                  (
                    link
                  ) => {

                    const active =
                      isActiveRoute(
                        link.href
                      )


                    return (

                      <Link
                        key={
                          link.href
                        }
                        href={
                          link.href
                        }
                        prefetch={false}
                        onTouchStart={() =>
                          prefetchRoute(
                            link.href
                          )
                        }
                        onMouseEnter={() =>
                          prefetchRoute(
                            link.href
                          )
                        }
                        className={`
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          text-sm
                          rounded-xl
                          transition-colors
                          duration-150
                          ${
                            active
                              ? "text-white bg-white/[0.08] font-semibold"
                              : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                          }
                        `}
                      >

                        {active && (

                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />

                        )}


                        <span
                          className={
                            !active
                              ? "ml-[18px]"
                              : ""
                          }
                        >

                          {
                            link.label
                          }

                        </span>

                      </Link>

                    )

                  }
                )}

              </div>

            </div>

          </div>

        )}

      </header>


      {/* ===================================================
          MAIN PAGE CONTENT
      =================================================== */}

      <main className="w-full min-h-screen">

        {children}

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="border-t border-white/[0.06] bg-black">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">


          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">


            {/* =============================================
                BRAND
            ============================================= */}

            <div className="col-span-2 md:col-span-1">

              <Link
                href="/"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/"
                  )
                }
                className="flex items-center gap-2.5 mb-4"
              >

                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-center">

                  <Image
                    src="/images/logo.png"
                    alt="Mesnaldo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />

                </div>


                <span className="text-xl font-black tracking-tight text-white">

                  Mes

                  <span className="text-amber-400">
                    naldo
                  </span>

                </span>

              </Link>


              <p className="text-sm text-gray-500 leading-relaxed mb-5">

                Explore Lionel Messi and Cristiano Ronaldo
                through career statistics, goals, assists,
                trophies, records and head-to-head comparisons.

              </p>


              <Link
                href="/poll"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/poll"
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold hover:bg-amber-500/20 transition-colors"
              >

                <Vote className="w-3.5 h-3.5" />

                Cast Your GOAT Vote

              </Link>


              {/* SOCIAL */}

              <div className="mt-4">

                <p className="text-xs text-gray-500 mb-2">

                  Follow us on

                </p>


                <div className="flex items-center gap-3">

                  <a
                    href="https://www.instagram.com/mesnaldo_com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mesnaldo on Instagram"
                    className="text-gray-500 hover:text-pink-400 transition-colors"
                  >

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >

                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="5"
                      />

                      <line
                        x1="18"
                        y1="6"
                        x2="18.01"
                        y2="6"
                      />

                    </svg>

                  </a>


                  <a
                    href="https://www.facebook.com/share/1GtW72fkDK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mesnaldo on Facebook"
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  >

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >

                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />

                    </svg>

                  </a>

                </div>

              </div>

            </div>


            {/* =============================================
                FOOTER LINKS
            ============================================= */}

            {Object.entries(
              footerLinks
            ).map(
              (
                [
                  sectionTitle,
                  links,
                ]
              ) => (

                <div
                  key={
                    sectionTitle
                  }
                >

                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">

                    {
                      sectionTitle
                    }

                  </p>


                  <ul className="space-y-2.5">

                    {links.map(
                      (
                        link
                      ) => (

                        <li
                          key={
                            link.href
                          }
                        >

                          <Link
                            href={
                              link.href
                            }
                            prefetch={false}
                            onMouseEnter={() =>
                              prefetchRoute(
                                link.href
                              )
                            }
                            onTouchStart={() =>
                              prefetchRoute(
                                link.href
                              )
                            }
                            className="text-sm text-gray-500 hover:text-white transition-colors"
                          >

                            {
                              link.label
                            }

                          </Link>

                        </li>

                      )
                    )}

                  </ul>

                </div>

              )
            )}

          </div>


          {/* =============================================
              FOOTER BOTTOM
          ============================================= */}

          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs text-gray-600 text-center sm:text-left">

              ©{" "}
              {
                new Date()
                  .getFullYear()
              }{" "}
              Mesnaldo. Independent Messi vs Ronaldo
              statistics and comparison platform.

            </p>


            <div className="flex items-center gap-4 text-xs text-gray-600">

              <Link
                href="/privacy"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/privacy"
                  )
                }
                className="hover:text-gray-400 transition-colors"
              >

                Privacy

              </Link>


              <Link
                href="/terms"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/terms"
                  )
                }
                className="hover:text-gray-400 transition-colors"
              >

                Terms

              </Link>


              <Link
                href="/contact"
                prefetch={false}
                onMouseEnter={() =>
                  prefetchRoute(
                    "/contact"
                  )
                }
                className="hover:text-gray-400 transition-colors"
              >

                Contact

              </Link>

            </div>

          </div>

        </div>

      </footer>


      {/* ===================================================
          GOOGLE ANALYTICS
      =================================================== */}

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-EVYPF04DX0"
      />


      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EVYPF04DX0');
          `,
        }}
      />

    </>

  )

}