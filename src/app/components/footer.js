"use client";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 h-60 md:h-43 text-gray-300 border-x-2 border-yellow-500 mt-4">
      <div className="max-w-5xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Title */}
          <h2 className="text-xl font-bold bg-gradient-to-r flex gap-2 items-center from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight"><Image 
                        src="/goat.svg" 
                        alt="MESNALDO Logo" 
                        width={38} 
                        height={38}
                        className="drop-shadow-lg"
                        priority
                      /> Mesnaldo</h2>

          {/* Links */}
          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-yellow-400 transition">Home</a>
            <a href="/Club" className="hover:text-yellow-400 transition">Club</a>
            <a href="/International" className="hover:text-yellow-400 transition">International</a>
            <a href="/Achievments" className="hover:text-yellow-400 transition">Achievments</a>
            <a href="/About" className="hover:text-yellow-400 transition">About</a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaGithub /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mesnaldo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
