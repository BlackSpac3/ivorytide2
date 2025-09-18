import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React from "react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="border border-primary/30 rounded-full flex items-center gap-1 p-1">
      <div className="relative">
        {resolvedTheme === "light" && (
          <motion.span
            layoutId="activeTheme"
            style={{ originY: "0px" }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
            }}
            className="bg-primary/10 rounded-full inset-0 absolute z-[-1]"></motion.span>
        )}
        <button
          onClick={() => setTheme("light")}
          className={`p-2 aspect-square rounded-full cursor-pointer hover:bg-primary/10 ${
            resolvedTheme === "light" ? "text-primary" : "text-text-muted"
          } `}>
          <Sun className="size-4" />
        </button>
      </div>
      <div className="relative">
        {resolvedTheme === "dark" && (
          <motion.span
            layoutId="activeTheme"
            style={{ originY: "0px" }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
            }}
            className="bg-primary/20 rounded-full inset-0 absolute z-[-1]"></motion.span>
        )}

        <button
          onClick={() => setTheme("dark")}
          className={`p-2 aspect-square rounded-full cursor-pointer hover:bg-primary/10 ${
            resolvedTheme === "dark" ? "text-primary" : "text-text-muted"
          }`}>
          <Moon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
