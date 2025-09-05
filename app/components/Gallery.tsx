"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Camera, UploadCloud } from "lucide-react";

export default function Gallery() {
  const albumLink = "https://www.apple.com/photos/album"; // Replace with actual Apple album link
  const qrCodeValue = albumLink;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-6">
            Wedding Gallery
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Camera className="w-6 h-6 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
          <p className="text-text-muted font-body text-lg max-w-3xl mx-auto">
            Capture your memorable moments at our wedding and share them
            instantly. Scan the QR code below or click the link to upload your
            photos to our shared album.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* QR Code */}
          <div className="bg-accent/50 p-8 rounded-lg shadow-lg border border-primary/10 flex flex-col items-center">
            <QRCodeSVG
              value={qrCodeValue}
              size={160}
              fgColor="#2c2c2c"
              bgColor="#f5f1eb"
              className="mb-4"
            />
            <a
              href={albumLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body bg-gradient-gold text-white py-3 px-6 rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
              Visit Album
            </a>
          </div>

          {/* Instructional Text */}
          <div className="max-w-md text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <UploadCloud className="w-6 h-6 text-primary mr-2" />
              <h3 className="font-serif text-2xl text-foreground">
                How to Upload Photos
              </h3>
            </div>
            <p className="text-text-muted font-body mb-4">
              1. Open the camera app on your smartphone.
              <br />
              2. Point it at the QR code to scan.
              <br />
              3. Tap the notification to open the upload page.
              <br />
              4. Select your photos and upload.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
