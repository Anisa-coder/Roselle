import type { Metadata } from "next";
import Link from "next/link";
import { SkinQuiz } from "@/components/sections/skin-quiz";

export const metadata: Metadata = {
  title: "Skin Quiz | Roselle",
  description: "Answer five questions about your skin and habits to explore a simple skincare routine.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#f7eee7] bg-[radial-gradient(ellipse_at_top_right,rgba(244,187,176,0.4),transparent_55%),linear-gradient(180deg,#f7eee7_0%,#fff7f3_55%,#fffdfb_100%)] text-[#252625]">
      <header className="border-b border-[#eadfd8] bg-white/85 px-6 py-5 backdrop-blur-[14px]">
        <nav aria-label="Quiz navigation" className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
          <Link href="/" className="text-xl font-semibold text-[#b94051]">Roselle</Link>
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#fff7f3]">← Back to home</Link>
        </nav>
      </header>
      <main className="py-8 sm:py-12">
        <div className="mx-auto w-[min(1140px,calc(100%-32px))]">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your skincare quiz</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64645f]">Answer based on your usual skin and current habits. Choose one answer per question, and select all relevant concerns. If you are unsure, choose “I&apos;m not sure” where available. Use Back to review your answers before viewing your routine.</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64645f]">This self-report quiz offers general skincare education. It cannot diagnose a skin condition, confirm your skin type, or guarantee a product will suit you. Continue any prescribed care as directed by your clinician.</p>
        </div>
        <SkinQuiz />
      </main>
    </div>
  );
}
