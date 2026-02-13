import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 md:px-8">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/55 p-8 shadow-[0_25px_80px_-30px_rgba(76,29,149,0.6)] backdrop-blur-xl md:p-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-violet-200">
            <SparklesIcon className="h-3.5 w-3.5" />
            Cloudinary Studio
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-100 md:text-6xl">
            Premium media workflows for modern SaaS teams
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Upload, optimize, preview, and share assets from one polished dashboard.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SignUpButton>
              <button className="btn h-11 rounded-xl border-0 bg-gradient-to-r from-violet-500 to-indigo-500 px-7 text-white shadow-[0_14px_36px_-12px_rgba(124,58,237,0.95)] hover:from-violet-400 hover:to-indigo-400 focus-ring">
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </SignUpButton>
            <SignInButton>
              <button className="btn h-11 rounded-xl border border-white/15 bg-white/5 px-7 text-slate-100 hover:bg-white/10 focus-ring">
                Sign In
              </button>
            </SignInButton>
            <Link
              href="/home"
              className="btn h-11 rounded-xl border border-white/15 bg-transparent px-7 text-slate-300 hover:text-white hover:border-white/30 focus-ring"
            >
              Explore Demo
            </Link>
          </div>
          <p className="mt-8 text-xs text-slate-500">&copy; {new Date().getFullYear()} AbhinavSinha</p>
        </div>
      </section>
    </main>
  );
}
