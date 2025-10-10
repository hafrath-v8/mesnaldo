"use client";
import Link from "next/link";
import { Home, Activity, Globe, Trophy, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/club", icon: Activity, label: "Club" },
    { href: "/International", icon: Globe, label: "International" },
    { href: "/Achievments", icon: Trophy, label: "Achievments" },
    { href: "/About", icon: Info, label: "About" },
  ];

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav 
      className="w-full bg-gray-900 shadow-lg fixed bottom-0 z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center sm:px-6 px-4 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.href}
              variants={itemVariants}
              whileHover="hover"
            >
              <Link
                href={item.href}
                className="flex flex-col items-center sm:flex-row sm:gap-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <motion.div variants={hoverVariants}>
                  <Icon className="w-5 h-5 text-amber-400" />
                </motion.div>
                <motion.span 
                  className="sm:text-sm lg:text-lg text-xs"
                  variants={hoverVariants}
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}