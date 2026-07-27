// pages/blog/index.tsx
import Layout from "../../components/layout/Layout"
import { supabase } from "../../lib/supabase"
import { GetStaticProps } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

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
  is_published: boolean
  is_featured: boolean
  published_at: string
  read_time: string
  views: number
}

interface BlogPageProps {
  posts: BlogPost[]
  featuredPost: BlogPost | null
  categories: string[]
  totalPosts: number
}

const CATEGORY_COLORS: Record<string, string> = {
  "Analysis": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "News": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Records": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Opinion": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "History": "bg-red-500/10 text-red-400 border-red-500/20",
  "Comparison": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

export default function Blog({ posts, featuredPost, categories, totalPosts }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(post => {
    if (activeCategory !== "all" && post.category !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return post.title.toLowerCase().includes(q) || 
             post.excerpt.toLowerCase().includes(q) ||
             post.tags.some(tag => tag.toLowerCase().includes(q))
    }
    return true
  })

  return (
    <Layout 
      title="Blog - Mesnaldo | Messi vs Ronaldo News, Analysis & Stories"
      description="Read the latest articles, analysis, and stories about the Messi vs Ronaldo rivalry. In-depth comparisons, record breakdowns, and football history.">
      
      <div className="bg-black min-h-screen">
        
        {/* HERO */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Articles & Stories</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                The Mesnaldo <span className="text-amber-400">Blog</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                In-depth analysis, record breakdowns, and stories about football&apos;s greatest rivalry.
              </p>
              <p className="text-gray-600 text-sm mt-2">{totalPosts} articles published</p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

          {/* FEATURED POST */}
          {featuredPost && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href={`/blog/${featuredPost.slug}`} className="group">
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900 border border-gray-700/60 rounded-3xl overflow-hidden hover:border-gray-600/70 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    <div className="relative h-56 lg:h-full lg:col-span-2 min-h-[280px] bg-gray-800">
                      {featuredPost.featured_image ? (
                        <img src={featuredPost.featured_image} alt={featuredPost.title} className="w-full h-full object-cover absolute inset-0" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 flex items-center justify-center">
                          <span className="text-6xl">📝</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900 lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900 pointer-events-none" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black rounded-full text-[10px] font-bold uppercase tracking-wider z-10">
                        Featured
                      </span>
                    </div>
                    <div className="p-6 sm:p-8 lg:p-10 lg:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[featuredPost.category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                          {featuredPost.category}
                        </span>
                        <span className="text-[11px] text-gray-500">{featuredPost.read_time} min read</span>
                        <span className="text-[11px] text-gray-600">{featuredPost.views?.toLocaleString()} views</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{featuredPost.author}</span>
                        <span>·</span>
                        <span>{new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* FILTERS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 text-xs rounded-full transition-all font-medium ${activeCategory === "all" ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                All Posts
              </button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs rounded-full transition-all font-medium ${activeCategory === cat ? "bg-white text-black" : "text-gray-400 bg-gray-900 border border-gray-800 hover:text-white"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <input type="text" placeholder="Search articles..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-56 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">✕</button>
              )}
            </div>
          </div>

          {/* POSTS GRID */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl block mb-4">📝</span>
              <p className="text-gray-400 text-lg">No articles found</p>
              <p className="text-gray-600 text-sm mt-2">Try a different search or category</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-600">Showing {filteredPosts.length} of {totalPosts} articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPosts.map((post, i) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <div className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl overflow-hidden hover:border-gray-600/70 transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-44 bg-gray-800 overflow-hidden">
                          {post.featured_image ? (
                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                              <span className="text-4xl">📝</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span>·</span>
                            <span>{post.read_time} min read</span>
                            <span>·</span>
                            <span>{post.views?.toLocaleString() || 0} views</span>
                          </div>
                          <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-800/50">
                            {post.tags?.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[9px] text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* NEWSLETTER CTA */}
          <div className="bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-3xl p-8 sm:p-10 text-center">
            <span className="text-4xl block mb-3">📬</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2">Stay Updated</h2>
            <p className="text-sm text-gray-400 mb-5 max-w-md mx-auto">
              Get the latest articles, stats updates, and rare insights delivered straight to your inbox.
            </p>
            <form className="flex items-center gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-500" />
              <button type="submit" className="px-5 py-2.5 bg-amber-500 text-black rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors">
                Subscribe
              </button>
            </form>
            <p className="text-[10px] text-gray-600 mt-3">No spam. Unsubscribe anytime.</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 text-center pt-8 border-t border-gray-800">
            <div>
              <p className="text-2xl font-black text-white">{totalPosts}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Articles</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{categories.length}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Weekly</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Updates</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    const featuredPost = posts?.find(p => p.is_featured) || posts?.[0] || null
    const categories = [...new Set(posts?.map(p => p.category) || [])]

    return {
      props: {
        posts: posts || [],
        featuredPost,
        categories,
        totalPosts: posts?.length || 0,
      },
      revalidate: 3600,
    }
  } catch (e) {
    console.error("Error fetching blog posts:", e)
    return {
      props: {
        posts: [],
        featuredPost: null,
        categories: [],
        totalPosts: 0,
      },
      revalidate: 60,
    }
  }
}