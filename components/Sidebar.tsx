"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarProps = {
  name: string;
  role: string;
};

export default function Sidebar({
  name,
  role,
}: SidebarProps) {
  const pathname = usePathname();

  const roleSlug =
    pathname.split("/")[1] || "kartik";

  const [currentSection, setCurrentSection] =
    useState("overview");

  useEffect(() => {
    const updateSection = () => {
      const params = new URLSearchParams(
        window.location.search
      );

      setCurrentSection(
        params.get("section") || "overview"
      );
    };

    updateSection();

    window.addEventListener(
      "popstate",
      updateSection
    );

    return () => {
      window.removeEventListener(
        "popstate",
        updateSection
      );
    };
  }, [pathname]);

  const navigation = [
    {
      name: "Overview",
      section: "overview",
      href: `/${roleSlug}`,
    },
    {
      name: "Decisions",
      section: "decisions",
      href: `/${roleSlug}?section=decisions`,
    },
    {
      name: "Directions",
      section: "directions",
      href: `/${roleSlug}?section=directions`,
    },
    {
      name: "Escalations",
      section: "escalations",
      href: `/${roleSlug}?section=escalations`,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col bg-[#020817] text-white">
      {/* Brand */}
      <div className="border-b border-slate-800 px-7 py-7">
        <h1 className="text-2xl font-bold tracking-tight">
          NIYANTA
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Anantha Filament Works
        </p>
      </div>

      {/* Logged in user */}
      <div className="border-b border-slate-800 px-7 py-7">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Logged in as
        </p>

        <p className="mt-3 text-lg font-semibold">
          {name}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {role}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive =
              currentSection === item.section;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  setCurrentSection(item.section);
                }}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sign out */}
      <div className="border-t border-slate-800 p-5">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
            N
          </div>

          <span>Sign out</span>
        </Link>
      </div>
    </aside>
  );
}