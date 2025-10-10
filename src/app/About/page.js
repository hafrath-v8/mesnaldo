"use client";
import { Inter } from "next/font/google";
import Footer from "../components/footer"
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function AboutPage() {
  return (
    <div className={`w-full max-w-5xl mx-auto bg-gray-900 p-6 sm:p-8 ${inter.className}`}>
      
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Football Legends Comparison</h1>
        <div className="w-20 h-1 bg-amber-400 mx-auto mb-4"></div>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
          The ultimate platform for comparing the greatest football players of all time through data-driven analysis
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-4">Our Mission</h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          We provide comprehensive, data-driven comparisons between football's greatest legends. 
          Our platform eliminates bias and focuses on factual statistics, achievements, and performance 
            metrics to help fans and analysts make informed comparisons between iconic players.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sm:mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Analysis</h3>
          <p className="text-gray-400 text-sm">Accurate statistics and metrics from official sources</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚽</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Comparisons</h3>
          <p className="text-gray-400 text-sm">Goals, assists, trophies, and advanced metrics</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Unbiased Insights</h3>
          <p className="text-gray-400 text-sm">Objective analysis free from personal preferences</p>
        </div>
      </div>

      {/* What We Compare Section */}
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6">What We Compare</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">📈 Performance Metrics</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Goals & Assists Efficiency
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Trophies & Achievements
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Career Longevity
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                International Performance
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">🏆 Career Highlights</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Major Tournament Wins
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Individual Awards
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Club Success
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                Records & Milestones
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 mb-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-4">Data Sources & Methodology</h2>
        <p className="text-gray-300 mb-4">
          Our data is sourced from official football organizations and verified statistical databases:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-750 rounded-lg p-3">
            <div className="text-white font-semibold">FIFA</div>
          </div>
          <div className="bg-gray-750 rounded-lg p-3">
            <div className="text-white font-semibold">UEFA</div>
          </div>
          <div className="bg-gray-750 rounded-lg p-3">
            <div className="text-white font-semibold">Official Leagues</div>
          </div>
          <div className="bg-gray-750 rounded-lg p-3">
            <div className="text-white font-semibold">Club Records</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6">About Our Team</h2>
        <p className="text-gray-300 mb-6">
          We are a group of football enthusiasts, data analysts, and sports journalists passionate about 
          providing accurate and meaningful comparisons between football legends. Our team combines 
          statistical expertise with deep football knowledge to deliver insightful analysis.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-750 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">🤝 Our Commitment</h3>
            <p className="text-gray-400 text-sm">
              To maintain the highest standards of accuracy and objectivity in all our comparisons
            </p>
          </div>
          <div className="bg-gray-750 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">🎯 Our Goal</h3>
            <p className="text-gray-400 text-sm">
              To settle debates with data and celebrate the achievements of all football greats
            </p>
          </div>
        </div>
      </div>

      {/* Contact/Footer */}
      <div className="text-center mt-8 pt-8 border-t border-gray-700">
        <p className="text-gray-400 mb-4">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        <button className="bg-amber-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-amber-300 transition-colors">
          Contact Us
        </button>
      </div>
      <Footer/>
    </div>
  );
}
