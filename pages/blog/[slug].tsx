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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

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
              prose
              prose-invert
              prose-lg
              max-w-none

              prose-headings:text-white
              prose-headings:font-black

              prose-p:text-gray-300
              prose-p:leading-relaxed

              prose-strong:text-white
              prose-strong:font-bold

              prose-a:text-amber-400
              prose-a:no-underline
              hover:prose-a:underline

              prose-ul:text-gray-300
              prose-ol:text-gray-300

              prose-blockquote:border-amber-400
              prose-blockquote:text-gray-400

              prose-code:text-amber-400
              prose-code:bg-gray-800
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:rounded
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

              <h2 className="text-lg font-bold text-white mb-6">
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