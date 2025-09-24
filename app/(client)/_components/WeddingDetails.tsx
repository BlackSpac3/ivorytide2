"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

export default function WeddingDetails() {
  const events = [
    {
      title: "Ceremony",
      time: "4:00 PM",
      location: "Garden Pavilion",
      description: "Join us as we exchange vows surrounded by nature's beauty",
      icon: Heart,
    },
    {
      title: "Cocktail Hour",
      time: "5:00 PM",
      location: "Terrace Gardens",
      description: "Celebrate with drinks, hors d'oeuvres, and live music",
      icon: Clock,
    },
    {
      title: "Reception",
      time: "6:30 PM",
      location: "Grand Ballroom",
      description: "Dinner, dancing, and memories to last a lifetime",
      icon: Calendar,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-6">
            Our Special Day
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Heart className="w-6 h-6 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
          <p className="text-text-muted font-body text-lg max-w-2xl mx-auto">
            We can&apos;t wait to celebrate this joyous occasion with our
            beloved family and friends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-accent/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <event.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h3 className="font-serif text-3xl text-foreground mb-3">
                {event.title}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-body text-lg">{event.time}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-secondary">
                  <MapPin className="w-5 h-5" />
                  <span className="font-body text-lg">{event.location}</span>
                </div>
              </div>

              <p className="text-text-muted font-body leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16">
          <div className="bg-accent/30 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">
                Venue Address
              </h3>
            </div>
            <p className="font-body text-lg text-text-muted mb-4">
              Sunset Garden Estate
              <br />
              1234 Vineyard Lane, Napa Valley, CA 94558
            </p>
            <button className="bg-gradient-gold text-white px-8 py-3 rounded-full font-body font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
              Get Directions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
