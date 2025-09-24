"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import NavUser from "./nav-user";
import { toast } from "sonner";

function isActive(href: string, url: string) {
  return href.startsWith(url);
}

export default function Navbar() {
  const [offset, setOffset] = useState(0);
  const pathname = usePathname();

  const navlinks = [
    {
      href: "/app/overview",
      label: "Overview",
      active: isActive(pathname, "/app/overview"),
    },
    {
      href: "/app/guests",
      label: "Guests",
      active: isActive(pathname, "/app/guests"),
    },
    {
      href: "/app/planners",
      label: "Planners",
      active: isActive(pathname, "/app/planners"),
    },
  ];
  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="w-full bg-background dark:bg-card sticky top-0 px-2 z-50">
      <div className="relative">
        <div className="absolute top-0 left-6">
          <div
            className={cn(
              "h-16 flex items-center justify-center transition-all duration-300",
              offset > 0 && "h-12"
            )}>
            <div className="w-8 size-8 bg-primary/10 rounded-md flex items-center justify-center">
              <Command className="w-4 stroke-primary" />
            </div>
          </div>
        </div>

        {/* Top bar */}
        <div
          className={cn(
            "flex  w-full items-center transition-all duration-300",
            offset > 0 ? "h-0 overflow-hidden opacity-0 " : "h-16 opacity-100"
          )}>
          <div className="flex items-center justify-end sm:justify-between px-6 w-full ">
            <div className=" hidden sm:flex items-center gap-3 pl-12">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Separator orientation="vertical" className="h-6 min-h-6" />
                <span className="flex items-center gap-2 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500"></div>
                  <span className="font-medium">
                    Amanda &amp; Ekundayo&apos;s Wedding
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => toast.warning("Comming soon")}
                variant="outline">
                Feedback
              </Button>
              <div className="relative">
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                <Button
                  type="button"
                  onClick={() => toast.warning("Comming soon")}
                  variant="outline"
                  size="icon">
                  <Bell />
                </Button>
              </div>

              <NavUser />
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <nav className={cn("flex items-center gap-4 border-b h-12 px-6 ")}>
          {/* Logo shows when scrolled */}

          <ul
            className={cn(
              "flex text-sm transition-all duration-300",
              offset > 0 ? "translate-x-11" : "translate-x-0"
            )}>
            {navlinks.map((link) => (
              <li key={link.href} className="relative h-12  flex items-center">
                <Link
                  href={link.href}
                  className={cn(
                    " rounded-lg px-3 h-8 text-muted-foreground flex items-center hover:bg-muted transition-all",
                    link.active && "text-primary font-medium"
                  )}>
                  {link.label}
                </Link>
                {link.active && (
                  <motion.div
                    layoutId="activeSection"
                    style={{ originY: "0px" }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
