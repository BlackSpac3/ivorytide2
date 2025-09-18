"use client";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

const QRCode = () => {
  const qrCodeValue = "https://photos.app.goo.gl/Koo8umKYi19NT1xdA";
  const { resolvedTheme } = useTheme();

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
