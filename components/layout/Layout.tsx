// components/layout/Layout.tsx
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { ReactNode, useState, useEffect } from "react"
import { Menu, X, Goal, BarChart3, Trophy, PenLine, Vote } from "lucide-react"
import Script from "next/script"
interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/goals", label: "Goals" },
  { href: "/assists", label: "Assists" },
  { href: "/trophies", label: "Trophies" },
  { href: "/head-to-head", label: "Head to Head" },
  { href: "/career", label: "Career" },
  { href: "/records", label: "Records" },
]

const secondaryLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/messi", label: "Messi" },
  { href: "/ronaldo", label: "Ronaldo" },
  { href: "/poll", label: "Poll" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
]

const footerLinks = {
  "Compare": [
    { href: "/goals", label: "Goals" },
    { href: "/assists", label: "Assists" },
    { href: "/trophies", label: "Trophies" },
    { href: "/head-to-head", label: "Head to Head" },
    { href: "/career", label: "Career" },
    { href: "/records", label: "Records" },
  ],
  "Players": [
    { href: "/messi", label: "Lionel Messi" },
    { href: "/ronaldo", label: "Cristiano Ronaldo" },
    { href: "/poll", label: "GOAT Poll" },
  ],
  "Resources": [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About Mesnaldo" },
  ],
  "Legal": [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
}

export default function Layout({
  children,
  title = "Mesnaldo - Messi vs Ronaldo | Ultimate Football Comparison",
  description = "The most comprehensive head-to-head comparison of Lionel Messi and Cristiano Ronaldo. Goals, assists, trophies, records, and complete career statistics.",
}: LayoutProps) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/images/logo.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mesnaldo" />
        <link rel="canonical" href={`https://mesnaldo.com${router.pathname}`} />
      </Head>

      {/* ─── NAVBAR ─── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-black/80 backdrop-blur-xl"
      } border-b border-white/[0.06]`}>
        
        {/* Top Bar */}
        <div className="hidden lg:block border-b border-white/[0.04] bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1"><Goal className="w-3 h-3" /> The detailed messi vs ronaldo comparison</span>
              <span className="text-gray-700">|</span>
              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> 2,492+ matches tracked</span>
              <span className="text-gray-700">|</span>
              <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> 258+ records documented</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/blog" className="text-[11px] text-gray-500 hover:text-amber-400 transition-colors flex items-center gap-1"><PenLine className="w-3 h-3" /> Blog</Link>
              <Link href="/poll" className="text-[11px] text-gray-500 hover:text-amber-400 transition-colors flex items-center gap-1"><Vote className="w-3 h-3" /> Vote</Link>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-lg overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5">
                <Image src="/images/logo.png" alt="Mesnaldo" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <span className="text-lg lg:text-xl font-black tracking-tight text-white">
                  Mes<span className="text-amber-400">naldo</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0">
              {mainLinks.map((link) => {
                const isActive = router.pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className={`relative px-3 xl:px-3.5 py-1.5 text-[13px] rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? "text-white bg-white/[0.08]"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                    }`}>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-400 rounded-full" />
                    )}
                  </Link>
                )
              })}

              <span className="w-px h-5 bg-white/[0.08] mx-1" />

              {secondaryLinks.map((link) => {
                const isActive = router.pathname === link.href
                return (
                  <Link key={link.href} href={link.href}
                    className={`relative px-3 xl:px-3.5 py-1.5 text-[13px] rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? "text-white bg-white/[0.08]"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                    }`}>
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Toggle */}
            <button 
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label={mobileOpen ? "Close menu" : "Open menu"}
  className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-black/98 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              <div className="mb-3">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-1">Main</p>
                {mainLinks.map((link) => {
                  const isActive = router.pathname === link.href
                  return (
                    <Link key={link.href} href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${
                        isActive
                          ? "text-white bg-white/[0.08] font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                      }`}>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      <span className={!isActive ? "ml-[18px]" : ""}>{link.label}</span>
                    </Link>
                  )
                })}
              </div>
              
              <div className="pt-2 border-t border-white/[0.06]">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-1 mt-3">More</p>
                {secondaryLinks.map((link) => {
                  const isActive = router.pathname === link.href
                  return (
                    <Link key={link.href} href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${
                        isActive
                          ? "text-white bg-white/[0.08] font-semibold"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                      }`}>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      <span className={!isActive ? "ml-[18px]" : ""}>{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN ─── */}
      <main className="w-full min-h-screen">{children}</main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="Mesnaldo" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  Mes<span className="text-amber-400">naldo</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                The most comprehensive comparison of football&apos;s two greatest icons. Every stat, every record, every moment.
              </p>
              <Link href="/poll" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold hover:bg-amber-500/20 transition-colors">
                <Vote className="w-3.5 h-3.5" /> Cast Your GOAT Vote
              </Link>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Mesnaldo. Independent fan project. Not affiliated with any player, club, or governing body.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── GOOGLE ANALYTICS ─── */}
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

