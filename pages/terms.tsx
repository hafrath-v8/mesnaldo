// pages/terms.tsx
import Layout from "../components/layout/Layout"
import { motion } from "framer-motion"
import Head from "next/head"

export default function Terms() {
  return (
    <Layout title="Terms of Service - Mesnaldo"
      description="Terms of Service for Mesnaldo - the ultimate Messi vs Ronaldo comparison platform. Read our terms and conditions.">
      
      <Head>
        <meta name="keywords" content="Mesnaldo terms, terms of service, football statistics terms, Messi vs Ronaldo terms" />
      </Head>

      <div className="bg-black min-h-screen">
        
        {/* ─── HERO ─── */}
        <section className="relative border-b border-gray-800 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center relative">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">Legal</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                Terms of <span className="text-amber-400">Service</span>
              </h1>
              <p className="text-gray-400 text-sm">Last updated: July 2026</p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-sm text-gray-400 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Mesnaldo (&quot;the Website&quot;), you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Website. We reserve the right to modify these terms at any time, 
              and your continued use of the Website constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Description of Service</h2>
            <p>
              Mesnaldo is an independent, fan-made football statistics and comparison platform. We provide statistical data, 
              visualizations, and comparison tools related to Lionel Messi and Cristiano Ronaldo. All content is for informational 
              and entertainment purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>
              The Website name &quot;Mesnaldo&quot;, its logo, design, layout, and original content are the intellectual property of Mesnaldo. 
              All player names, images, club names, and competition names are the property of their respective owners and are used 
              for identification purposes only under fair use principles. Statistical data is compiled from publicly available sources.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Disclaimer of Affiliation</h2>
            <p>
              Mesnaldo is NOT affiliated with, endorsed by, or connected to Lionel Messi, Cristiano Ronaldo, their respective 
              clubs (Inter Miami, Al Nassr, Barcelona, Real Madrid, etc.), FIFA, UEFA, or any football governing body. This is 
              an independent project created by football fans for football fans.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Accuracy of Data</h2>
            <p>
              While we strive for 100% accuracy in all statistics presented on the Website, we cannot guarantee that all data 
              is completely error-free. Statistics are compiled from multiple public sources and may contain unintentional 
              discrepancies. Users are encouraged to report any errors they discover through our Contact page. Mesnaldo shall 
              not be held liable for any decisions made based on the data presented on this Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. User Conduct</h2>
            <p>When using the Website, you agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the Website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Website</li>
              <li>Use automated tools (bots, scrapers) to extract data without permission</li>
              <li>Post spam or malicious content through any forms</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with the proper working of the Website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">7. Poll Voting</h2>
            <p>
              The GOAT poll is intended for entertainment purposes. Votes are limited to one per device using browser local storage. 
              We reserve the right to remove fraudulent votes or reset the poll at any time. The poll results do not constitute 
              a scientific survey and should not be treated as such.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">8. Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites or services. Mesnaldo is not responsible for the content, 
              privacy policies, or practices of any third-party websites. Users access external links at their own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              Mesnaldo and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive 
              damages arising from your use of the Website. The Website is provided &quot;as is&quot; without any warranties, 
              express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">10. Privacy</h2>
            <p>
              Your use of the Website is also governed by our Privacy Policy. Please review our Privacy Policy to understand 
              how we collect and use information. We do not sell personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">11. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to the Website at any time, without prior notice, for any 
              reason including violation of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from 
              these terms shall be resolved through good-faith communication. Users can reach us through the Contact page 
              for any concerns.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">13. Contact Information</h2>
            <p>
              For any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              📧 <a href="mailto:hello@mesnaldo.app" className="text-amber-400 hover:underline">hello@mesnaldo.app</a>
            </p>
            <p>
              Or visit our <a href="/contact" className="text-amber-400 hover:underline">Contact page</a>.
            </p>
          </section>

          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Mesnaldo. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  )
}