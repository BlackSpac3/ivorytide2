import React from "react";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navigation from "./_components/Navigation";
import Footer from "./_components/Footer";

interface Props {
  children: React.ReactNode;
}
const layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navigation />

      <main>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;
