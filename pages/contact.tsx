// pages/contact.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import { useState } from "react"
import Head from "next/head"
import { Mail, MessageCircle, Clock, Search, CheckCircle2, Camera, Send } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

  return (
    <Layout title="Contact Us - Mesnaldo"
      description="Get in touch with the Mesnaldo team. Report errors, suggest features, or just say hello. We'd love to hear from you!">
      
      <Head>
        <meta name="keywords" content="contact Mesnaldo, Messi vs Ronaldo contact, football statistics feedback, report data error" />
        <link rel="canonical" href="https://messivsronaldo.app/contact" />
      </Head>

      <div className="bg-black min-h-screen">
        
        {/* ─── HERO ─── */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06),transparent_50%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Get in Touch</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                Contact <span className="text-amber-400">Us</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Have a question, suggestion, or spotted an error? We&apos;d love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ─── CONTACT INFO CARDS ─── */}
            <div className="lg:col-span-1 space-y-4">
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
                <Mail className="w-7 h-7 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Email Us</h3>
                <p className="text-xs text-gray-400 mb-2">General inquiries & support</p>
                <a href="mailto:hello@mesnaldo.app" className="text-amber-400 text-sm hover:underline">hello@mesnaldo.app</a>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
                <Send className="w-7 h-7 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Follow Us</h3>
                <p className="text-xs text-gray-400 mb-2">Stay updated with the latest</p>
                <div className="flex items-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><MessageCircle className="w-5 h-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Camera className="w-5 h-5" /></a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Send className="w-5 h-5" /></a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
                <Clock className="w-7 h-7 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Response Time</h3>
                <p className="text-xs text-gray-400">We typically respond within <span className="text-white font-bold">24-48 hours</span>. Data corrections are prioritized and usually resolved within 24 hours.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-5 sm:p-6">
                <Search className="w-7 h-7 text-amber-400 mb-3" />
                <h3 className="text-white font-bold text-sm mb-1">Before You Contact</h3>
                <p className="text-xs text-gray-400">Check our <a href="/faq" className="text-amber-400 hover:underline">FAQ page</a> — your question might already be answered there!</p>
              </motion.div>
            </div>

            {/* ─── CONTACT FORM ─── */}
            <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 bg-gray-900/80 backdrop-blur border border-gray-700/60 rounded-2xl p-6 sm:p-8">
              
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-black text-white mb-2">Message Sent!</h2>
                  <p className="text-gray-400 text-sm mb-6">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-white mb-2">Send Us a Message</h2>
                  <p className="text-xs text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you.</p>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                      <p className="text-xs text-red-400">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block font-medium">Name</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block font-medium">Subject</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gray-500 transition-colors">
                        <option value="">Select a topic</option>
                        <option value="data-error">Report a Data Error</option>
                        <option value="suggestion">Feature Suggestion</option>
                        <option value="contribution">Contribution / Volunteer</option>
                        <option value="media">Media / Press Inquiry</option>
                        <option value="bug">Report a Bug</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block font-medium">Message</label>
                      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </Layout>
  )
}