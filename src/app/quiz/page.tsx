import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { SkinAssessment } from "./skin-assessment";

export const metadata: Metadata = {
  title: "Skin Quiz | Roselle",
  description: "Start with a private photo analysis, then answer questions about your skin, concerns, environment, and habits to explore a simple skincare routine.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#f7eee7] bg-[radial-gradient(ellipse_at_top_right,rgba(244,187,176,0.4),transparent_55%),linear-gradient(180deg,#f7eee7_0%,#fff7f3_55%,#fffdfb_100%)] text-[#252625]">
      <header className="border-b border-[#eadfd8] bg-white/85 px-6 py-5 backdrop-blur-[14px]">
        <nav aria-label="Quiz navigation" className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
          <Brand href="/" compact />
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#fff7f3]">← Back to home</Link>
        </nav>
      </header>
      <main className="py-8 sm:py-12">
        <SkinAssessment />
      </main>
    </div>
  );
}
