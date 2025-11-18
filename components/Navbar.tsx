"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-black/80 backdrop-blur-md border-white/[0.08] py-4" 
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="container-width flex items-center justify-between">
          <Link href="/" className="text-xl font-bold font-display tracking-tight z-50 relative">
            ALEX<span className="text-blue-500">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.span 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-blue-500" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black md:hidden pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-4xl font-display font-medium block",
                      pathname === item.href ? "text-blue-500" : "text-white/80"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
