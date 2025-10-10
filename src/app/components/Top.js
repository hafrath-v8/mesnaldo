"use client";
import Image from "next/image";

export default function Top() {
  return (
    <header className="w-full  bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-4 lg:px-2 py-2">
        
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110">
            <Image 
              src="/goat.svg" 
              alt="MESNALDO Logo" 
              width={48} 
              height={48}
              className="drop-shadow-lg"
              priority
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent tracking-tight">
            MESNALDO
          </span>
        </div>

        {/* Social Media */}
        <nav className="flex items-center gap-2 sm:gap-3">          

          {/* Share Button */}
          <button
            className="px-4 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 
                     text-amber-300 hover:text-white transition-all duration-300 hover:scale-105
                     font-medium text-sm flex items-center gap-2"
            onClick={() => navigator.share?.({ url: window.location.href, title: 'MESNALDO - Messi vs Ronaldo Comparison' })}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
            Share
          </button>
        </nav>
      </div>
    </header>
  );
}
