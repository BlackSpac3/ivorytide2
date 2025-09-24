"use client";
import React from "react";
import ConetntWrapper from "./content-wrapper";
import { Command } from "lucide-react";
import { APP_CONFIG } from "@/app.config";
import ThemeToggle from "./theme-toggle";

const AppFooter = () => {
  return (
    <footer className="w-full h-14 bg-background dark:bg-card border-t flex items-center z-10">
      <ConetntWrapper>
        <div
          className="gap-5 justify-between flex items-center text-sm text-muted-foreground
          ">
          <div className="flex items-start gap-2">
            <Command className="w-4 h-4 mt-0.5" />
            <div>{APP_CONFIG.copyright}</div>
          </div>

          <div>
            <ThemeToggle />
          </div>
        </div>
      </ConetntWrapper>
    </footer>
  );
};

export default AppFooter;
