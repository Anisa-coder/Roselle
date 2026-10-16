"use client";

import { useRef, useState } from "react";
import { SkinQuiz } from "@/components/sections/skin-quiz";
import { SkinTypeClassifier, type SkinAnalysisResult } from "./skin-type-classifier";

export function SkinAssessment() {
  const [analysis, setAnalysis] = useState<SkinAnalysisResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topPrediction = analysis?.predictions[0];
  const lowConfidence = topPrediction ? topPrediction.score < 0.6 : false;

  function focusHeading() {
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function completeAnalysis(result: SkinAnalysisResult) {
    setAnalysis(result);
    focusHeading();
  }

  function startOver() {
    setAnalysis(null);
    focusHeading();
  }

  return (
    <>
      <div className="mx-auto mb-8 w-[min(1140px,calc(100%-32px))]">
        <ol aria-label="Skin quiz steps" className="mb-8 grid max-w-xl grid-cols-2 gap-3 text-sm font-medium">
          {["Photo analysis", "Skin questions"].map((label, index) => {
            const active = analysis ? index === 1 : index === 0;
            return (
              <li key={label} aria-current={active ? "step" : undefined} className={`flex items-center gap-2 border-b-2 pb-3 ${active ? "border-[#b94051] text-[#8f2937]" : "border-[#dfd2cb] text-[#746e69]"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${active ? "bg-[#b94051] text-white" : "bg-white text-[#746e69]"}`}>{index + 1}</span>
                {label}
              </li>
            );
          })}
        </ol>

        <span className="text-xs font-bold tracking-[0.12em] text-[#b94051] uppercase">Your skincare quiz · Step {analysis ? "2" : "1"} of 2</span>
        <h1 ref={headingRef} tabIndex={-1} className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight outline-none sm:text-4xl">
          {analysis ? "Now, let’s get to know your skin." : "Let’s start with a photo of your skin."}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64645f]">
          {analysis
            ? "Your photo analysis is complete. Next, tell us how your skin usually feels, the issues you face, and your current habits so your routine reflects more than one photo."
            : "First, capture or upload a clear face photo for a private skin-type estimate. Once the analysis finishes, you’ll move straight to the questions about your skin and concerns."}
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-[#746e69]">Your photo is processed on this device. The analysis and quiz answers stay in this page’s memory and clear when you refresh or leave.</p>
      </div>

      {analysis ? (
        <>
          <aside className="mx-auto w-[min(1140px,calc(100%-32px))] rounded-2xl border border-[#eadfd8] bg-white/90 p-5 sm:p-6" aria-labelledby="photo-analysis-summary">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.1em] text-[#b94051] uppercase">Photo analysis complete</span>
                <h2 id="photo-analysis-summary" className="mt-2 text-xl font-semibold">{topPrediction?.label} appearance in your photo</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64645f]">This is a visual estimate. Answer the questions based on your usual skin, even if your experience differs from the photo.</p>
              </div>
              <button type="button" onClick={startOver} className="min-h-11 rounded-xl border border-[#d9c9c1] px-4 py-2 text-sm font-semibold text-[#8f2937] transition hover:border-[#b94051] hover:bg-[#fff7f3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051]">Start over with a new photo</button>
            </div>
            {(lowConfidence || analysis.qualityIssues.length > 0) && (
              <div className="mt-4 rounded-xl border border-[#e4b781] bg-[#fff8ec] p-4 text-sm leading-relaxed text-[#75470f]" role="note">
                <p>{lowConfidence ? "The photo estimate is uncertain. " : ""}{analysis.qualityIssues.length > 0 ? "Photo quality may have affected the estimate. " : ""}Your answers help describe your usual skin characteristics and concerns.</p>
                {analysis.qualityIssues.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5">{analysis.qualityIssues.map((issue) => <li key={issue.code}>{issue.title}</li>)}</ul>}
              </div>
            )}
          </aside>
          <SkinQuiz />
        </>
      ) : (
        <SkinTypeClassifier onComplete={completeAnalysis} />
      )}
    </>
  );
}
