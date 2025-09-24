"use client";

import { motion } from "framer-motion";
import { Heart, Gift, Banknote, CreditCard, LucideProps } from "lucide-react";
import React, { useState } from "react";
import BankPaymentForm from "./bank-payment-form";

type ActionType = "gift" | "cash" | null;

const CashPaymentDetails = () => {
  const [showBankPayment, setShowBankPayment] = useState(false);
  return (
    <div className="space-y-6">
      <h3 className="font-medium text-xl">Account Details</h3>
      <div className="space-y-2">
        <h4 className="text-primary font-medium">Naira Account</h4>
        <p className="text-text-muted">GTB - 0128737878 - EKUNDAYO JACOBS</p>
      </div>
      <div className="space-y-2 text-text-muted">
        <h4 className="text-primary font-medium">USD Account</h4>
        <p>Account Name: Nkoyo Ebieme</p>
        <p>Account Number: 217829470607</p>
        <p>Wire Routing: 101019644</p>
        <p> ACH Routing: 101019644</p>
        <p>Account Type: Checking</p>
        <p>Bank Name: Lead Bank</p>
        <p>Bank Address: 1801 Main St., Kansas City, MO 64108</p>
      </div>
      <div className="space-y-2 text-text-muted">
        <h4 className="text-primary font-medium">Euro Account</h4>
        <p>Account Name: Nkoyo Ebieme</p>
        <p>Account Number: 65349447</p>
        <p>Swift Code: CLJUGB21XXX</p>
        <p> Sort Code: 041307</p>
        <p>Bank Name: Clear Junction Limited</p>
        <p>
          Bank Address: 4th Floor Imperial House, 15 Kingsway, London, United
          Kingdom, WC2B 6UN
        </p>
        <p>IBAN: GB56CLJU04130765349447</p>
      </div>
      <div className="flex w-full gap-2 items-center text-text-muted">
        <hr className="w-full border-text-muted/50" />
        or
        <hr className="w-full border-text-muted/50" />
      </div>
      {showBankPayment && <BankPaymentForm />}
      {!showBankPayment && (
        <button
          onClick={() => setShowBankPayment(true)}
          className="w-full border border-text-muted/50  hover:border-primary/5 hover:text-primary flex items-center gap-2 justify-center text-foreground py-4 rounded-lg font-medium text-lg hover:bg-primary/5 cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <CreditCard className="w-5" /> Pay with Card
        </button>
      )}

      {/* <button className="flex items-center justify-center gap-2 border-primary border-2 p-2 rounded-lg"></button> */}
    </div>
  );
};
const PaymentActionCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-background rounded-2xl p-8 max-w-xl mx-auto border border-primary/10">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-serif text-3xl text-foreground mb-2">
          Send Us a Gift
        </h3>
        <p className="text-text-muted font-body">
          We appreciate your kindness and thoughtfulness more than words can say
        </p>
      </div>
      <CashPaymentDetails />
    </motion.div>
  );
};
export default function HoneymoonFund() {
  const [state, setState] = useState<ActionType>(null);
  const giftUrl = "https://www.thingstogetus.com/1818031ab30ea";

  const actions: {
    value: ActionType;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
  }[] = [
    {
      value: "cash",
      icon: Banknote,
      title: "Gift with cash",
      description: "Transfer directly to the detail below or pay with card",
    },
    {
      value: "gift",
      icon: Gift,
      title: "Gift registry",
      description: "Pick a gift from our registry",
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const runAction = (value: ActionType) => {
    if (value === "gift") {
      return window.open(giftUrl, "_blank");
    }

    setState((prev) => (prev === "cash" ? null : "cash"));
    if (state === null) {
      scrollToSection("#payment");
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-primary mb-6">
            Gift Couple
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
            contribution.
          </p>
        </motion.div>

        {/* Fund Goals */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {actions.map((action, index) => (
            <motion.button
              type="button"
              onClick={() => runAction(action.value)}
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-background cursor-pointer rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                action.value === state &&
                "border-primary/30 shadow-lg shadow-primary/10 "
              }`}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                  <action.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h3 className="font-serif text-xl text-foreground mb-2 text-center">
                {action.title}
              </h3>

              <p className="text-text-muted font-body text-sm text-center mb-4">
                {action.description}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Donation Form */}
        <section id="payment" className="scroll-mt-20">
          {state === "cash" && <PaymentActionCard />}
        </section>
      </div>
    </section>
  );
}
