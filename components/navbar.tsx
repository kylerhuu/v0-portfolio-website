"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useScrollColor } from "@/components/scroll-color-provider";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark } = useScrollColor();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-lg shadow-[0_1px_12px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      )}
      style={
        scrolled
          ? {
              backgroundColor: isDark
                ? "rgba(42, 15, 15, 0.75)"
                : "rgba(245, 241, 235, 0.75)",
              borderBottom: `1px solid var(--scroll-border)`,
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-lg font-bold tracking-tight transition-colors duration-300"
          style={{ color: "var(--scroll-fg)" }}
        >
          Portfolio
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--scroll-muted-fg)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-colors duration-300"
          style={{ color: "var(--scroll-fg)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden backdrop-blur-md px-6 pb-6"
          style={{
            backgroundColor: isDark
              ? "rgba(42, 15, 15, 0.9)"
              : "rgba(245, 241, 235, 0.9)",
            borderBottom: `1px solid var(--scroll-border)`,
          }}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--scroll-muted-fg)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
