import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { SparklesIcon, ShieldCheckIcon, VideoIcon } from "lucide-react";

const features = [
  {
    icon: SparklesIcon,
    text: "One dashboard for image and video workflows",
  },
  {
    icon: VideoIcon,
    text: "Preview, transform, and ship assets faster",
  },
  {
    icon: ShieldCheckIcon,
    text: "Auth and access control built in with Clerk",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] md:grid-cols-2">
        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-violet-300">
              Start Free
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-100">
              Create your Cloudinary Studio account
            </h1>
            <SignUp forceRedirectUrl="/home" />
          </div>
        </section>
        <aside className="relative hidden md:flex flex-col justify-between border-l border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-slate-900 p-10">
          <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_75%_10%,rgba(167,139,250,0.2),transparent)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Cloudinary Studio</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-100">
              Launch a premium media workspace in minutes.
            </h2>
          </div>
          <ul className="relative z-10 space-y-4">
            {features.map((feature) => (
              <li
                key={feature.text}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
              >
                <feature.icon className="h-4 w-4 text-violet-300" />
                <span className="text-sm text-slate-200">{feature.text}</span>
              </li>
            ))}
          </ul>
          <div className="relative z-10 space-y-3">
            <p className="text-sm text-slate-200">
              Already registered?{" "}
              <Link href="/sign-in" className="text-violet-200 hover:text-violet-100 font-medium">
                Sign in
              </Link>
            </p>
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} AbhinavSinha</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
