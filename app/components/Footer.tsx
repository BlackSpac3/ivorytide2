"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/10 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center">
          {/* Wedding Logo */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            <Heart className="w-8 h-8 text-primary fill-current" />
            <h3 className="font-serif text-3xl text-gradient">Amanda & Dayo</h3>
            <Heart className="w-8 h-8 text-primary fill-current" />
          </div>

          {/* Wedding Details */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-serif text-xl text-foreground mb-2">Date</h4>
              <p className="text-text-muted font-body">October 15th, 2025</p>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-serif text-xl text-foreground mb-2">Venue</h4>
              <p className="text-text-muted font-body text-center">
                Sunset Garden Estate
                <br />
                VI, Lagos
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-serif text-xl text-foreground mb-2">
                Contact
              </h4>
              <p className="text-text-muted font-body">
                wedding@amandaanddayo.com
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Heart className="w-4 h-4 text-primary fill-current" />
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mb-8">
            <p className="text-text-muted font-body text-lg italic max-w-2xl mx-auto">
              &quot;Love is composed of a single soul inhabiting two
              bodies&quot;
            </p>
            <p className="text-text-muted font-body text-sm mt-2">
              - Aristotle
            </p>
          </div>

          {/* Copyright */}
          <div className="text-text-muted font-body text-sm">
            <p>&copy; 2024 Amanda & Dayo. Made with love ❤️</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
