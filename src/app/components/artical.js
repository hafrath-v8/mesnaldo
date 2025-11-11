"use client";

import Head from "next/head";

export default function Article() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Messi vs Ronaldo: Complete Career Comparison - Stats, Goals, Assists & Legacy Analysis",
    description: "Comprehensive statistical comparison between Lionel Messi and Cristiano Ronaldo. Analyze goals, assists, trophies, Ballon d'Or awards and career legacy in detailed football analysis.",
    author: {
      "@type": "Person",
      name: "A.M.M. Ahamed",
      url: "https://mesnaldo.com/About"
    },
    publisher: {
      "@type": "Organization",
      name: "Mesnaldo Football Analysis",
      logo: {
        "@type": "ImageObject",
        url: "https://mesnaldo.com/goat.png",
        width: 200,
        height: 60
      }
    },
    image: [
      "https://mesnaldo.com/rony.png",
      "https://mesnaldo.com/messi.png"
    ],
    datePublished: "2025-11-11T08:00:00+00:00",
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://mesnaldo.com/messi-vs-ronaldo-complete-comparison"
    },
    keywords: "Messi vs Ronaldo, football statistics, goal comparison, Ballon d'Or, Champions League, career legacy, football analysis",
    articleSection: "Football Analysis",
    articleBody: "Detailed comparison of Lionel Messi and Cristiano Ronaldo career statistics including goals, assists, trophies, appearances and individual awards."
  };

  return (
    <>
      {/* ✅ Enhanced SEO Metadata */}
      <Head>
        {/* Primary Meta Tags */}
        <title>Messi vs Ronaldo: Complete Career Stats Comparison 2025 | Goals, Assists & Legacy</title>
        <meta
          name="description"
          content="Comprehensive 2025 comparison: Lionel Messi vs Cristiano Ronaldo career stats. Detailed analysis of 800+ goals, 300+ assists, Ballon d'Or awards, trophies & football legacy. Expert statistical breakdown."
        />
        <meta
          name="keywords"
          content="Messi vs Ronaldo 2025, football statistics, goal comparison, career stats, Ballon d'Or winners, Champions League records, football legacy, soccer analysis"
        />
        <meta name="author" content="A.M.M. Ahamed" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://mesnaldo.com/messi-vs-ronaldo-complete-comparison" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Messi vs Ronaldo: Complete Career Stats Comparison 2025 | Goals & Legacy" />
        <meta
          property="og:description"
          content="2025 Ultimate Comparison: Messi vs Ronaldo career statistics. 800+ goals, 300+ assists, Ballon d'Or awards, trophy count & complete legacy analysis."
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Mesnaldo Football Analysis" />
        <meta property="og:url" content="https://mesnaldo.com/messi-vs-ronaldo-complete-comparison" />
        <meta property="og:image" content="https://mesnaldo.com/messi-vs-ronaldo-comparison.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Messi vs Ronaldo Statistical Comparison 2025" />
        <meta property="article:published_time" content="2025-11-11T08:00:00+00:00" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="article:author" content="A.M.M. Ahamed" />
        <meta property="article:section" content="Football Analysis" />
        <meta property="article:tag" content="Messi vs Ronaldo" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MesnaldoAnalysis" />
        <meta name="twitter:creator" content="@AMMAhamed" />
        <meta name="twitter:title" content="Messi vs Ronaldo: Complete Career Stats Comparison 2025" />
        <meta name="twitter:description" content="Detailed statistical analysis: Messi vs Ronaldo goals, assists, trophies & legacy. Expert football comparison." />
        <meta name="twitter:image" content="https://mesnaldo.com/messi-vs-ronaldo-comparison.jpg" />
        <meta name="twitter:image:alt" content="Messi and Ronaldo Career Statistics Comparison" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Structured Data for Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mesnaldo.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Football Analysis",
                  "item": "https://mesnaldo.com/analysis"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Messi vs Ronaldo Comparison",
                  "item": "https://mesnaldo.com/messi-vs-ronaldo-complete-comparison"
                }
              ]
            })
          }}
        />
      </Head>

      {/* Main Article Content */}
      <article
        className="max-w-5xl mx-auto border border-gray-700 bg-gray-900 text-gray-200 p-6 rounded-xl shadow-lg leading-relaxed"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Article Header */}
        <header className="border-b border-gray-700 pb-6 mb-6">
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-center text-amber-400 mb-4 leading-tight"
            itemProp="headline"
          >
            Messi vs Ronaldo: Complete Career Stats Comparison 2025 - Goals, Assists & Legacy Analysis
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              By <span itemProp="name" className="text-amber-400">A.M.M. Ahamed</span>
            </span>
            <span>•</span>
            <time itemProp="datePublished" dateTime="2025-11-11" className="text-gray-400">
              November 11, 2025
            </time>
            <span>•</span>
            <span itemProp="timeRequired" content="PT10M">10 min read</span>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg leading-7 mb-4" itemProp="description">
            The <strong className="text-amber-400">Messi vs Ronaldo debate</strong> represents 
            one of the most compelling rivalries in football history. For over 15 years, 
            <strong> Lionel Messi</strong> and <strong>Cristiano Ronaldo</strong> have redefined 
            football excellence, breaking countless records and captivating global audiences. 
            This comprehensive 2025 analysis provides detailed statistical comparison of their 
            entire careers, including <strong className="text-amber-400">goals, assists, 
            appearances, trophies, Ballon d'Or awards, and lasting legacy</strong>.
          </p>
        </section>

        {/* Goals & Assists Section */}
        <section className="mb-8" itemProp="articleBody">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Goals and Assists: Statistical Breakdown
          </h2>
          <p className="mb-4 leading-7">
            Both legends have demonstrated extraordinary goal-scoring prowess throughout their careers. 
            <strong> Cristiano Ronaldo</strong> has achieved a remarkable milestone of{" "}
            <strong className="text-amber-400">955+ official career goals</strong> across all competitions, 
            while <strong>Lionel Messi</strong> has scored an impressive{" "}
            <strong className="text-amber-400">899+ career goals</strong>. Their consistency at the 
            highest level remains unparalleled in football history.
          </p>
          <p className="mb-4 leading-7">
            Where Messi particularly excels is in creative contribution, with an exceptional{" "}
            <strong className="text-amber-400">400+ career assists</strong> compared to Ronaldo's{" "}
            <strong className="text-amber-400">300+ assists</strong>. This highlights Messi's dual 
            threat as both a prolific scorer and creative playmaker, while Ronaldo's aerial dominance 
            and clinical finishing make him the complete modern striker.
          </p>
        </section>

        {/* Appearances & Longevity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Appearances and Career Longevity
          </h2>
          <p className="mb-4 leading-7">
            Ronaldo's physical conditioning and adaptability have enabled him to make over{" "}
            <strong className="text-amber-400">1296+ professional appearances</strong>, demonstrating 
            remarkable durability across top European leagues. Messi, with{" "}
            <strong className="text-amber-400">1133+ career matches</strong>, continues to perform 
            at an elite level, showcasing technical mastery that compensates for physical evolution.
          </p>
        </section>

        {/* Trophies & Team Success */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Trophies and Team Success Analysis
          </h2>
          <p className="mb-4 leading-7">
            Messi's trophy cabinet includes <strong className="text-amber-400">44 senior titles</strong>, 
            highlighted by the historic <strong>2022 FIFA World Cup</strong> victory, <strong>Copa América</strong>, 
            and <strong>4 Champions League titles</strong>. Ronaldo boasts <strong className="text-amber-400">
            34 major trophies</strong>, featuring <strong>5 Champions League victories</strong> and 
            Portugal's first major international trophy at <strong>UEFA Euro 2016,2025</strong>.
          </p>
        </section>

        {/* Ballon d'Or & Individual Awards */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Ballon d'Or and Individual Accolades
          </h2>
          <p className="mb-4 leading-7">
            The Ballon d'Or race has been dominated by these two icons. Messi holds the record with{" "}
            <strong className="text-amber-400">8 Ballon d'Or awards</strong>, while Ronaldo has 
            secured <strong className="text-amber-400">5 Ballon d'Or trophies</strong>. Their 
            individual award collections include numerous Golden Boots, FIFA Best awards, and 
            Champions League top scorer honors.
          </p>
        </section>

        {/* Playing Styles Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Playing Styles: Contrasting Paths to Greatness
          </h2>
          <p className="mb-4 leading-7">
            Ronaldo exemplifies power, athleticism, and relentless goal-scoring efficiency. His 
            evolution from tricky winger to complete forward demonstrates exceptional adaptability. 
            Messi embodies technical genius, visionary playmaking, and effortless dribbling—a natural 
            talent who redefined offensive creativity.
          </p>
        </section>

        {/* Legacy & Impact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Legacy and Global Football Impact
          </h2>
          <p className="mb-4 leading-7">
            Beyond statistics, the Messi-Ronaldo rivalry has transformed football's global landscape. 
            They've inspired new generations, expanded the sport's commercial reach, and established 
            new benchmarks for individual excellence that will influence future football eras.
          </p>
        </section>

        {/* Conclusion */}
        <footer className="border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-amber-400 pl-4">
            Conclusion: Celebrating Football Excellence
          </h2>
          <p className="mb-4 leading-7">
            The Messi vs Ronaldo debate ultimately celebrates two extraordinary athletes who 
            simultaneously elevated football to unprecedented heights. Their rivalry represents 
            a golden era that may never be replicated in world football.
          </p>
          <p className="mt-6 text-center text-xl font-bold text-amber-400 leading-8">
            Messi and Ronaldo: Two legends who defined a generation of football excellence.
          </p>
        </footer>
      </article>

      {/* ✅ Enhanced JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </>
  );
}