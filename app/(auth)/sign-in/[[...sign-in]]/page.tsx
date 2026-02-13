import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { SparklesIcon, ShieldCheckIcon, VideoIcon } from "lucide-react";

const features = [
  {
    icon: SparklesIcon,
    text: "Instant social-ready media transformations",
  },
  {
    icon: VideoIcon,
    text: "Fast Cloudinary-powered video optimization",
  },
  {
    icon: ShieldCheckIcon,
    text: "Secure authentication and private workflows",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] md:grid-cols-2">
        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-violet-300">
              Welcome Back
            </p>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-100">
              Sign in to Cloudinary Studio
            </h1>
            <SignIn forceRedirectUrl="/home" />
          </div>
        </section>
        <aside className="relative hidden md:flex flex-col justify-between border-l border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-slate-900 p-10">
          <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_75%_10%,rgba(167,139,250,0.2),transparent)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Cloudinary Studio</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-100">
              Build premium media experiences at SaaS speed.
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
              Need an account?{" "}
              <Link href="/sign-up" className="text-violet-200 hover:text-violet-100 font-medium">
                Create one
              </Link>
            </p>
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} AbhinavSinha</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
