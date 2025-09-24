"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Hero2 = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[70vh] sm:h-screen relative flex items-center justify-center  bg-[url(/images/AR_R4779.jpg)] bg-center bg-cover bg-no-repeat ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-neutral-600/50 backdrop-blur-xs to-accent -z-0" />
      <div className="container  px-6 text-center relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto">
          {/* Decorative element */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent"></div>
              <Heart className="w-8 h-8 text-zinc-100 fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent"></div>
            </div>
          </motion.div>

          {/* Pre-title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-zinc-300 font-body text-lg mb-4 tracking-wider uppercase">
            Together with our families
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-serif text-4xl md:text-8xl text-zinc-50 mb-8 leading-tight">
            Amanda &amp; Ekundayo
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-zinc-300 font-body text-xl md:text-2xl mb-8 tracking-wide">
            Request the pleasure of your company
          </motion.p>

          {/* Date and venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="space-y-4">
            <div className="text-zinc-100 font-serif text-3xl md:text-4xl">
              November 22nd, 2025
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scrollToSection("#fund")}
            transition={{ delay: 2, duration: 0.6 }}
            className="mx-auto mt-10 w-fit hidden sm:block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-zinc-100 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-zinc-100 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero2;
