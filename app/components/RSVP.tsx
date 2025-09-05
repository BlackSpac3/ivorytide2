"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}, for your RSVP!`);
  };

  return (
    <section id="rsvp" className="py-20 bg-accent/30 scroll-mt-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-6">
            RSVP
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Mail className="w-6 h-6 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
          <p className="text-text-muted font-body text-lg max-w-3xl mx-auto">
            Please let us know if you can make it to our special day.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-background p-8 rounded-2xl shadow-lg border border-primary/10">
          <div className="mb-4">
            <label
              className="block font-body font-medium text-foreground mb-2"
              htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-body font-medium text-foreground mb-2"
              htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-body font-medium text-foreground mb-2">
              Will you be attending?
            </label>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground"
              required>
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-gold text-white py-4 rounded-lg font-body font-medium text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
            Send RSVP <Send className="w-5 h-5 inline-block ml-2" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
