"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        <header className="w-full border-b border-white/10 bg-slate-900/55 backdrop-blur-xl">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-18">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button border border-white/10 hover:bg-white/10"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1">
              <Link href="/home" className="group inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_10px_30px_-8px_rgba(124,58,237,0.8)]">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Cloudinary</p>
                  <p className="text-lg font-semibold tracking-tight text-slate-100 group-hover:text-violet-300">
                    Studio
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center gap-3">
              {user && (
                <>
                  <div className="avatar">
                    <div className="h-9 w-9 rounded-full ring ring-violet-400/40 ring-offset-2 ring-offset-slate-950">
                      <img
                        src={user.imageUrl}
                        alt={user.username || user.emailAddresses[0].emailAddress}
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-slate-100 truncate max-w-60">
                      {user.username || user.emailAddresses[0].emailAddress}
                    </p>
                    <p className="text-xs text-slate-400">Workspace</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="btn btn-ghost btn-circle border border-white/10 hover:bg-white/10 focus-ring"
                    aria-label="Sign out"
                  >
                    <LogOutIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="panel-glass border-r border-white/10 w-72 h-full flex flex-col bg-slate-950/80">
          <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_12px_35px_-10px_rgba(124,58,237,0.85)]">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Media Platform</p>
              <p className="text-sm font-semibold text-slate-100">Cloudinary Studio</p>
            </div>
          </div>
          <ul className="menu p-4 w-full grow gap-1.5">
            {sidebarItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-250 ${
                      active
                        ? "border-violet-400/40 bg-gradient-to-r from-violet-500/25 to-indigo-500/20 text-white shadow-[0_10px_40px_-18px_rgba(124,58,237,0.95)]"
                        : "border-transparent text-slate-300 hover:text-slate-100 hover:border-white/10 hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {active && (
                      <span className="absolute -inset-px rounded-xl bg-violet-400/15 blur-xl -z-10" />
                    )}
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {user && (
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="btn w-full rounded-xl border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-white/25"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sign Out
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">
                &copy; {currentYear} AbhinavSinha
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
