"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent via-background to-accent relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 ">
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
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Heart className="w-8 h-8 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </motion.div>

          {/* Pre-title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-text-muted font-body text-lg mb-4 tracking-wider uppercase">
            Together with our families
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-serif text-4xl md:text-8xl lg:text-9xl text-gradient mb-8 leading-tight">
            Amanda &amp; Dayo
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-text-muted font-body text-xl md:text-2xl mb-8 tracking-wide">
            Request the pleasure of your company
          </motion.p>

          {/* Date and venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="space-y-4">
            <div className="text-foreground font-serif text-3xl md:text-4xl">
              November 22nd, 2025
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="mx-auto mt-10 w-fit">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
