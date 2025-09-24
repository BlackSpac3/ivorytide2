"use client";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";

const QRCode = () => {
  const qrCodeValue = "https://photos.app.goo.gl/Koo8umKYi19NT1xdA";
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QRCodeSVG
      value={qrCodeValue}
      size={160}
      fgColor={resolvedTheme === "dark" ? "#f0f0f0" : "#2c2c2c"}
      bgColor={resolvedTheme === "dark" ? "#611234" : "#f9f7f8"}
      className="mb-4"
    />
  );
};

export default QRCode;
