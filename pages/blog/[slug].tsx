// pages/blog/[slug].tsx

import Layout from "../../components/layout/Layout"
import { supabase } from "../../lib/supabase"
import { GetStaticProps, GetStaticPaths } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema"
import Head from "next/head"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  category: string
  tags: string[]
  published_at: string
  read_time: string
  views: number
}

interface BlogPostPageProps {
  post: BlogPost | null
  relatedPosts: BlogPost[]
}

export default function BlogPost({
  post,
  relatedPosts,
}: BlogPostPageProps) {
  if (!post) {
    return (
      <Layout
        title="Post Not Found | Mesnaldo"
        description="The requested Mesnaldo article could not be found."
      >
        <div className="bg-black min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-6xl block mb-4">
              🔍
            </span>

            <h1 className="text-2xl font-black text-white mb-2">
              Article Not Found
            </h1>

            <p className="text-gray-400 text-sm mb-6">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>

            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const articleUrl = `https://mesnaldo.com/blog/${post.slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(post.featured_image && {
      image: [post.featured_image],
    }),
    datePublished: post.published_at,
    author: {
      "@type": "Organization",
      name: post.author || "Mesnaldo",
      url: "https://mesnaldo.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Mesnaldo",
      url: "https://mesnaldo.com",
    },
    ...(post.category && {
      articleSection: post.category,
    }),
    ...(post.tags?.length > 0 && {
      keywords: post.tags.join(", "),
    }),
    inLanguage: "en",
  }

  return (
    <Layout
      title={`${post.title} | Mesnaldo Blog`}
      description={post.excerpt}
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
            name: "Blog",
            url: "/blog",
          },
          {
            name: post.title,
            url: `/blog/${post.slug}`,
          },
        ]}
      />

      {/* =====================================================
          ARTICLE META
      ===================================================== */}
      <Head>
        <script
          key="blogposting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />

        <meta
          property="og:title"
          content={post.title}
        />

        <meta
          property="og:description"
          content={post.excerpt}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          property="og:url"
          content={articleUrl}
        />

        {post.featured_image && (
          <meta
            property="og:image"
            content={post.featured_image}
          />
        )}

        <meta
          property="article:published_time"
          content={post.published_at}
        />

        {post.author && (
          <meta
            property="article:author"
            content={post.author}
          />
        )}

        {post.category && (
          <meta
            property="article:section"
            content={post.category}
          />
        )}

        {post.tags?.map((tag) => (
          <meta
            key={tag}
            property="article:tag"
            content={tag}
          />
        ))}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={post.title}
        />

        <meta
          name="twitter:description"
          content={post.excerpt}
        />

        {post.featured_image && (
          <meta
            name="twitter:image"
            content={post.featured_image}
          />
        )}
      </Head>

      <div className="bg-black min-h-screen">

        {/* =====================================================
            ARTICLE HEADER
        ===================================================== */}
        <section className="relative border-b border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

            <Link
              href="/blog"
              className="text-xs text-gray-500 hover:text-amber-400 transition-colors mb-6 inline-block"
            >
              ← Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">

              {post.category && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {post.category}
                </span>
              )}

              {post.read_time && (
                <span className="text-[11px] text-gray-500">
                  {post.read_time} min read
                </span>
              )}

              <span className="text-[11px] text-gray-600">
                {(post.views ?? 0).toLocaleString()} views
              </span>
            </div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-4"
            >
              {post.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">

              {post.author && (
                <span>
                  {post.author}
                </span>
              )}

              {post.author && post.published_at && (
                <span>
                  ·
                </span>
              )}

              {post.published_at && (
                <span>
                  {new Date(
                    post.published_at
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              )}
            </div>

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-500 bg-gray-800/50 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            ARTICLE CONTENT
        ===================================================== */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

          {post.featured_image && (
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-10 bg-gray-800">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.4,
            }}
            className="
              max-w-none
              text-[16px]
              sm:text-[17px]
              text-gray-300

              [&_h2]:mt-16
              [&_h2]:mb-6
              [&_h2]:border-l-4
              [&_h2]:border-amber-400
              [&_h2]:bg-gradient-to-r
              [&_h2]:from-amber-500/10
              [&_h2]:to-transparent
              [&_h2]:px-5
              [&_h2]:py-4
              [&_h2]:text-2xl
              sm:[&_h2]:text-3xl
              [&_h2]:font-black
              [&_h2]:leading-tight
              [&_h2]:tracking-tight
              [&_h2]:text-white
              [&_h2]:rounded-r-xl

              [&_h3]:mt-10
              [&_h3]:mb-4
              [&_h3]:text-xl
              sm:[&_h3]:text-2xl
              [&_h3]:font-extrabold
              [&_h3]:leading-tight
              [&_h3]:text-amber-300

              [&_h4]:mt-8
              [&_h4]:mb-3
              [&_h4]:text-lg
              [&_h4]:font-bold
              [&_h4]:text-white

              [&_p]:my-5
              [&_p]:max-w-[72ch]
              [&_p]:text-[16px]
              sm:[&_p]:text-[17px]
              [&_p]:leading-[1.9]
              [&_p]:text-gray-300

              [&_strong]:font-bold
              [&_strong]:text-white

              [&_a]:font-semibold
              [&_a]:text-amber-400
              [&_a]:underline
              [&_a]:decoration-amber-500/40
              [&_a]:underline-offset-4
              hover:[&_a]:text-amber-300

              [&_ul]:my-7
              [&_ul]:space-y-3
              [&_ul]:pl-6
              [&_ul]:list-disc
              [&_ol]:my-7
              [&_ol]:space-y-3
              [&_ol]:pl-6
              [&_ol]:list-decimal
              [&_li]:pl-1
              [&_li]:leading-7
              [&_li]:text-gray-300
              [&_li::marker]:text-amber-400
              [&_li::marker]:font-bold

              [&_blockquote]:my-10
              [&_blockquote]:rounded-2xl
              [&_blockquote]:border
              [&_blockquote]:border-amber-500/20
              [&_blockquote]:border-l-4
              [&_blockquote]:border-l-amber-400
              [&_blockquote]:bg-amber-500/[0.06]
              [&_blockquote]:px-6
              [&_blockquote]:py-5
              [&_blockquote]:text-gray-200

              [&_hr]:my-14
              [&_hr]:border-gray-800

              [&_table]:my-10
              [&_table]:w-full
              [&_table]:border-collapse
              [&_table]:overflow-hidden
              [&_table]:rounded-xl
              [&_table]:text-sm
              [&_thead]:bg-gray-900
              [&_th]:border
              [&_th]:border-gray-800
              [&_th]:px-4
              [&_th]:py-3
              [&_th]:text-left
              [&_th]:font-bold
              [&_th]:text-white
              [&_td]:border
              [&_td]:border-gray-800
              [&_td]:px-4
              [&_td]:py-3
              [&_td]:text-gray-300

              [&_div]:my-10
              [&_div]:rounded-2xl
              [&_div]:border
              [&_div]:border-gray-800
              [&_div]:bg-gray-900/60
              [&_div]:p-5
              sm:[&_div]:p-7

              [&_div_p]:my-2
              [&_div_p]:max-w-none
              [&_div_p]:leading-7

              [&_div_.text-amber-400]:text-amber-400
            "
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>

        {/* =====================================================
            RELATED POSTS
        ===================================================== */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-6">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors"
                  >
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-600">

                      {relatedPost.category && (
                        <>
                          <span>
                            {relatedPost.category}
                          </span>

                          <span>
                            ·
                          </span>
                        </>
                      )}

                      {relatedPost.read_time && (
                        <span>
                          {relatedPost.read_time} min read
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            BACK TO BLOG
        ===================================================== */}
        <div className="text-center pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 text-gray-400 rounded-xl text-sm font-medium hover:text-white hover:border-gray-700 transition-colors"
          >
            ← Back to All Articles
          </Link>
        </div>

      </div>
    </Layout>
  )
}


/* =========================================================
   STATIC PATHS
========================================================= */

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const {
      data: posts,
      error,
    } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("is_published", true)

    if (error) {
      console.error(
        "Error fetching blog paths:",
        error
      )

      return {
        paths: [],
        fallback: "blocking",
      }
    }

    const paths = (posts ?? [])
      .filter(
        (post) =>
          typeof post.slug === "string" &&
          post.slug.length > 0
      )
      .map((post) => ({
        params: {
          slug: post.slug,
        },
      }))

    return {
      paths,
      fallback: "blocking",
    }
  } catch (error) {
    console.error(
      "Unexpected getStaticPaths error:",
      error
    )

    return {
      paths: [],
      fallback: "blocking",
    }
  }
}


/* =========================================================
   STATIC PROPS
========================================================= */

export const getStaticProps: GetStaticProps<
  BlogPostPageProps
> = async ({ params }) => {
  try {
    const slug = params?.slug

    if (
      typeof slug !== "string" ||
      slug.length === 0
    ) {
      return {
        notFound: true,
      }
    }

    /* =====================================================
       FETCH CURRENT POST
    ===================================================== */

    const {
      data: post,
      error: postError,
    } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (
      postError ||
      !post
    ) {
      if (postError) {
        console.error(
          "Error fetching blog post:",
          postError
        )
      }

      return {
        notFound: true,
        revalidate: 60,
      }
    }

    /* =====================================================
       FETCH RELATED POSTS
    ===================================================== */

    const {
      data: relatedPosts,
      error: relatedError,
    } = await supabase
      .from("blog_posts")
      .select(
        `
          id,
          title,
          slug,
          excerpt,
          content,
          featured_image,
          author,
          category,
          tags,
          published_at,
          read_time,
          views
        `
      )
      .eq(
        "category",
        post.category || ""
      )
      .neq(
        "slug",
        slug
      )
      .eq(
        "is_published",
        true
      )
      .order(
        "published_at",
        {
          ascending: false,
        }
      )
      .limit(2)

    if (relatedError) {
      console.error(
        "Error fetching related posts:",
        relatedError
      )
    }

    return {
      props: {
        post: post as BlogPost,
        relatedPosts:
          (relatedPosts as BlogPost[]) ??
          [],
      },

      revalidate: 3600,
    }
  } catch (error) {
    console.error(
      "Unexpected blog page error:",
      error
    )

    return {
      notFound: true,
      revalidate: 60,
    }
  }
}