// pages/privacy.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"

export default function Privacy() {
  return (
    <Layout 
      title="Privacy Policy - Mesnaldo | How We Handle Your Data"
      description="Privacy Policy for Mesnaldo - Learn how we collect, use, and protect your personal information when you use our Messi vs Ronaldo comparison platform.">
      
      <Head>
        <meta name="keywords" content="Mesnaldo privacy policy, football statistics privacy, data protection, cookie policy" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy",
          "description": "Privacy Policy for Mesnaldo - Messi vs Ronaldo comparison platform",
          "url": "https://messivsronaldo.app/privacy"
        }) }} />
      </Head>

      <div className="bg-black min-h-screen">
        
        {/* HERO */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Legal</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                Privacy <span className="text-amber-400">Policy</span>
              </h1>
              <p className="text-gray-400 text-sm">Last updated: July 2026</p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-sm text-gray-400 leading-relaxed">

          {/* Introduction */}
          <section>
            <p className="mb-4">
              At <span className="text-white font-bold">Mesnaldo</span>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Information We Collect</h2>
            
            <h3 className="text-base font-bold text-gray-300 mb-2">1.1 Information You Provide</h3>
            <p className="mb-3">
              We may collect information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Cast a vote in our GOAT poll (stored locally in your browser)</li>
              <li>Submit a message through our Contact form (name, email, message)</li>
              <li>Subscribe to our newsletter (email address)</li>
              <li>Contact us via email directly</li>
            </ul>

            <h3 className="text-base font-bold text-gray-300 mb-2">1.2 Automatically Collected Information</h3>
            <p className="mb-3">
              When you visit Mesnaldo, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><span className="text-white font-medium">Browser type</span> - Chrome, Firefox, Safari, etc.</li>
              <li><span className="text-white font-medium">Operating system</span> - Windows, macOS, iOS, Android</li>
              <li><span className="text-white font-medium">IP address</span> - General location data (country/city level only)</li>
              <li><span className="text-white font-medium">Pages visited</span> - Which stats and comparisons you view</li>
              <li><span className="text-white font-medium">Time spent</span> - How long you browse our content</li>
              <li><span className="text-white font-medium">Referring URL</span> - How you found our website</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Cookies & Tracking Technologies</h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            
            <h3 className="text-base font-bold text-gray-300 mb-2">2.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><span className="text-white font-medium">Essential Cookies</span> - Required for the website to function properly (e.g., saving your poll vote)</li>
              <li><span className="text-white font-medium">Analytics Cookies</span> - Help us understand how visitors interact with our website (e.g., which pages are most popular)</li>
              <li><span className="text-white font-medium">Preference Cookies</span> - Remember your preferences (e.g., your poll vote choice)</li>
            </ul>

            <h3 className="text-base font-bold text-gray-300 mb-2">2.2 How to Control Cookies</h3>
            <p className="mb-3">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, some features of our site may not function properly.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>To provide, operate, and maintain our website</li>
              <li>To improve, personalize, and expand our website</li>
              <li>To understand and analyze how you use our website</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you, either directly or through one of our partners</li>
              <li>To send you emails (if you have subscribed to our newsletter)</li>
              <li>To find and prevent fraud</li>
              <li>To display the GOAT poll results accurately</li>
            </ul>
          </section>

          {/* Google AdSense & Third-Party Advertising */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Third-Party Advertising</h2>
            <p className="mb-3">
              We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
            <h3 className="text-base font-bold text-gray-300 mb-2">4.1 Google AdSense</h3>
            <p className="mb-3">
              Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Google Ads Settings</a>.
            </p>
            <h3 className="text-base font-bold text-gray-300 mb-2">4.2 Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Data Storage & Security */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Data Storage & Security</h2>
            <p className="mb-3">
              We implement appropriate technical and organizational security measures to protect your personal information. All data is stored on secure servers provided by Supabase and Vercel. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Contact form submissions are stored securely in our database</li>
              <li>Poll votes are stored in our database with minimal information</li>
              <li>We do not store credit card information or financial data</li>
              <li>We do not collect sensitive personal information</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Data Retention</h2>
            <p className="mb-3">
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Poll votes: Retained indefinitely for statistical purposes</li>
              <li>Contact messages: Retained for 12 months</li>
              <li>Newsletter subscriptions: Retained until you unsubscribe</li>
              <li>Analytics data: Retained for 26 months</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Our website is intended for general audiences and does not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove that information from our servers.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Your Data Protection Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li><span className="text-white font-medium">Right to Access</span> - You can request copies of your personal data</li>
              <li><span className="text-white font-medium">Right to Rectification</span> - You can request correction of inaccurate data</li>
              <li><span className="text-white font-medium">Right to Erasure</span> - You can request deletion of your data</li>
              <li><span className="text-white font-medium">Right to Object</span> - You can object to processing of your data</li>
              <li><span className="text-white font-medium">Right to Data Portability</span> - You can request transfer of your data</li>
            </ul>
          </section>

          {/* CCPA Compliance */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. CCPA Privacy Rights (California Residents)</h2>
            <p className="mb-3">
              Under the California Consumer Privacy Act (CCPA), California residents have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Know what personal data is being collected about them</li>
              <li>Know whether their personal data is sold or disclosed and to whom</li>
              <li>Say no to the sale of personal data</li>
              <li>Access their personal data</li>
              <li>Request deletion of their personal data</li>
              <li>Not be discriminated against for exercising their privacy rights</li>
            </ul>
          </section>

          {/* GDPR Compliance */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. GDPR Compliance (EU Residents)</h2>
            <p className="mb-3">
              Under the General Data Protection Regulation (GDPR), EU residents have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Access their personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Erase their personal data (right to be forgotten)</li>
              <li>Restrict processing of their personal data</li>
              <li>Data portability</li>
              <li>Object to processing of their personal data</li>
            </ul>
            <p>
              Our legal basis for processing your data is legitimate interest (providing and improving our service) and consent (for newsletter subscriptions and marketing communications).
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via a prominent notice on our website prior to the change becoming effective. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">12. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2">
              <li>📧 Email: <a href="mailto:privacy@mesnaldo.app" className="text-amber-400 hover:underline">privacy@mesnaldo.app</a></li>
              <li>📝 Contact Form: <Link href="/contact" className="text-amber-400 hover:underline">Contact Page</Link></li>
              <li>⏱️ Response Time: We typically respond within 48 hours</li>
            </ul>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Mesnaldo. All rights reserved. | 
              <Link href="/terms" className="text-gray-500 hover:text-white ml-2 transition-colors">Terms of Service</Link>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  )
}