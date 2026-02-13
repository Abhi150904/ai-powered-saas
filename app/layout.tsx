import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloudinary Studio",
  description: "Premium media workflow SaaS with Cloudinary and Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
          colorBackground: "rgba(15, 23, 42, 0.7)",
          colorInputBackground: "rgba(15, 23, 42, 0.55)",
          colorInputText: "#e2e8f0",
          colorText: "#e2e8f0",
          colorTextSecondary: "#cbd5e1",
          colorDanger: "#ef4444",
          borderRadius: "0.875rem",
        },
        elements: {
          cardBox: "shadow-none",
          card:
            "backdrop-blur-xl bg-slate-900/60 border border-white/10 shadow-[0_20px_80px_-20px_rgba(76,29,149,0.45)] rounded-2xl",
          headerTitle: "text-slate-100 text-2xl font-semibold tracking-tight",
          headerSubtitle: "text-slate-300",
          socialButtonsBlockButton:
  "!bg-white !text-black border border-gray-300 hover:!bg-gray-100",

socialButtonsBlockButtonText:
  "!text-black font-medium",

          formFieldLabel: "text-slate-300 text-sm font-medium",
          formFieldInput:
            "h-11 border border-white/15 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 rounded-xl focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all duration-200",
          formButtonPrimary:
            "h-11 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white rounded-xl shadow-[0_10px_35px_-10px_rgba(124,58,237,0.9)] active:scale-[0.98] transition-all duration-200",
          footerActionText: "text-slate-300",
          footerActionLink: "text-violet-200 hover:text-violet-100 font-medium",
          dividerLine: "bg-white/10",
          dividerText: "text-slate-300",
          formResendCodeLink: "text-violet-300 hover:text-violet-200",
          formFieldHintText: "text-slate-300",
          formFieldSuccessText: "text-emerald-300",
          formFieldErrorText: "text-rose-300",
          identityPreviewText: "text-slate-200",
          identityPreviewEditButton: "text-violet-200 hover:text-violet-100",
          formHeaderTitle: "text-slate-100",
          formHeaderSubtitle: "text-slate-300",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
