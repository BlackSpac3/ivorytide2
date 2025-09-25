"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Hero2 = () => {
  return (
    <>
      <div className="h-screen w-full " />
      <div className="h-screen fixed  top-0 left-0 w-full bg-[url(/images/AR_R4779.jpg)] -z-10 bg-center bg-cover bg-no-repeat">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-neutral-600/50 backdrop-blur-xs to-accent -z-0" />

          <div className="container  px-6 text-center relative z-[1] ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-10">
              <div className="space-y-6">
                <div className="space-y-2">
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
                    className="text-zinc-300 font-body text-lg tracking-wider uppercase">
                    Together with our families
                  </motion.p>
                </div>

                <div className="space-y-4">
                  {/* Main title */}
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-zinc-50 leading-tight">
                      Amanda &amp; Ekundayo
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className="text-zinc-300 font-body text-xl md:text-2xl tracking-wide">
                      Request the pleasure of your company
                    </motion.p>
                  </div>

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
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="mx-auto z-20 w-fit hidden sm:block">
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
      </div>
    </>
  );
};

export default Hero2;
