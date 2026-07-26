"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/assistant", label: "AI Assistant" },
  { href: "/about", label: "About Us" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[#E8DDD7] bg-[rgba(250,247,245,0.95)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F5]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7A1F2B] text-sm font-semibold tracking-[0.2em] text-[#FAF7F5]">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-[#7A1F2B]">
              Ledgerpass
            </p>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="flex items-center gap-2 text-sm font-medium text-[#2B2523] sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1F2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F5] ${
                  isActive ? "bg-[#7A1F2B] text-[#FAF7F5]" : "hover:bg-[#F3EBE6] hover:text-[#5C1620]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
