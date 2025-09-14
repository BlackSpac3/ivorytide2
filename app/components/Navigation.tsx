"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  border-b ${
        scrolled
          ? "bg-background/50 backdrop-blur-lg border-b-primary/10"
          : "bg-transparent border-b-transparent"
      }`}>
      <div className="container mx-auto px-10 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-primary fill-current" />
            <span className="font-serif text-xl text-foreground">A & D</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="font-body text-foreground hover:text-primary transition-colors duration-200 relative group">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 border-t border-primary/20">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 font-body text-foreground hover:text-primary transition-colors duration-200">
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
