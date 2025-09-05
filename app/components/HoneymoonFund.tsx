"use client";

import { motion } from "framer-motion";
import { Heart, Gift, Plane, Camera, Utensils } from "lucide-react";
import { useState } from "react";

export default function HoneymoonFund() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const fundGoals = [
    {
      icon: Plane,
      title: "Flight to Italy",
      amount: 2500,
      raised: 1800,
      description: "Help us get to our dream destination",
    },
    {
      icon: Utensils,
      title: "Romantic Dinners",
      amount: 800,
      raised: 650,
      description: "Candlelit dinners in Tuscany",
    },
    {
      icon: Camera,
      title: "Adventure Excursions",
      amount: 1200,
      raised: 400,
      description: "Wine tours and sightseeing",
    },
  ];

  const presetAmounts = [25000, 50000, 100000, 150000, 250000, 500000];

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (amount) {
      // In a real app, this would integrate with a payment processor
      alert(
        `Thank you for your generous gift of ₦${amount}! This would redirect to a secure payment page.`
      );
    }
  };

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-6">
            Honeymoon Fund
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Gift className="w-6 h-6 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
          <p className="text-text-muted font-body text-lg max-w-3xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we would be grateful for a
            contribution to our Italian honeymoon adventure.
          </p>
        </motion.div>

        {/* Fund Goals */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {fundGoals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                  <goal.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h3 className="font-serif text-xl text-foreground mb-2 text-center">
                {goal.title}
              </h3>

              <p className="text-text-muted font-body text-sm text-center mb-4">
                {goal.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">
                    Raised: ₦{goal.raised}
                  </span>
                  <span className="text-text-muted">Goal: ₦{goal.amount}</span>
                </div>
                <div className="w-full bg-accent rounded-full h-2">
                  <div
                    className="gradient-gold h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(goal.raised / goal.amount) * 100}%`,
                    }}></div>
                </div>
                <div className="text-center text-primary font-medium">
                  {Math.round((goal.raised / goal.amount) * 100)}% funded
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-8 max-w-2xl mx-auto border border-primary/10">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-3xl text-foreground mb-2">
              Make a Contribution
            </h3>
            <p className="text-text-muted font-body">
              Every contribution helps make our dream honeymoon a reality
            </p>
          </div>

          <div className="space-y-6">
            {/* Preset Amounts */}
            <div>
              <label className="block font-body font-medium text-foreground mb-3">
                Select an amount:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`p-3 rounded-lg border-2 font-body font-medium transition-all duration-200 ${
                      selectedAmount === amount
                        ? "border-primary bg-primary text-white"
                        : "border-primary/20 text-foreground hover:border-primary/50"
                    }`}>
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block font-body font-medium text-foreground mb-3">
                Or enter a custom amount:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
                  ₦
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border-2 border-primary/20 rounded-lg focus:border-primary focus:outline-none font-body bg-background text-foreground"
                />
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!selectedAmount && !customAmount}
              className="w-full bg-gradient-gold text-white py-4 rounded-lg font-body font-medium text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              Contribute with Love
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-text-muted font-body text-sm">
              Secure payment processing • Your contribution is greatly
              appreciated
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
