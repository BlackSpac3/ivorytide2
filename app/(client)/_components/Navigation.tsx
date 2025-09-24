"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Registry", href: "#fund" },
    // { name: "Registry", href: "#details" },
    { name: "RSVP", href: "#rsvp" },
    { name: "Gallery", href: "#gallery" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-10 bg-transparent border-b border-b-transparent transition-colors",
        scrolled && "bg-background border-b-primary/10  ",
        isOpen && "bg-background border-b-primary/10 "
      )}>
      <div
        className={cn(
          "container mx-auto py-6 transition-all",
          isOpen && "pb-0"
        )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Logo white={!scrolled && !isOpen} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "font-body text-text-muted hover:text-primary transition-colors duration-200 relative group",
                  !scrolled && "text-zinc-300 hover:text-zinc-50"
                )}>
                {item.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full",
                    !scrolled && "bg-zinc-50"
                  )}></span>
              </button>
            ))}
            <ThemeToggle white={!scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden p-2 text-primary transition-colors",
              !scrolled && !isOpen && "text-zinc-300"
            )}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-4  py-4 border-t border-primary/20">
            <div>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full  text-left py-2 font-body text-foreground hover:text-primary transition-colors">
                  {item.name}
                </button>
              ))}
            </div>
            <hr className="border-primary/20" />
            <div className="flex items-center justify-between ">
              <span className="text-sm text-text-muted">App Theme</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
