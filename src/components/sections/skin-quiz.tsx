"use client";

import { useRef, useState } from "react";

const questions = [
  { title: "How does your skin usually feel?", hint: "Think about a typical day without makeup.", options: ["Oily all over", "Dry or tight", "Oily T-zone, dry cheeks", "Comfortable and balanced", "I'm not sure"] },
  { title: "What would you like to focus on?", hint: "Choose all that apply.", options: ["Breakouts", "Dryness", "Dark spots or uneven tone", "Redness", "Fine lines", "General care"], multiple: true },
  { title: "How often do products irritate your skin?", hint: "For example, stinging, burning, or discomfort.", options: ["Often", "Sometimes", "Rarely", "I'm not sure"] },
  { title: "What does your current routine look like?", hint: "There is no wrong starting point.", options: ["I'm starting from scratch", "Cleanser and moisturizer", "I already use several products"] },
  { title: "How often do you use sunscreen?", hint: "This helps us highlight a useful next habit.", options: ["Every day", "Only when going out", "Rarely or never"] },
];

const concernTips: Record<string, string> = {
  Breakouts: "Look for products labeled non-comedogenic. Avoid scrubbing or picking at blemishes; persistent or painful breakouts deserve professional advice.",
  Dryness: "Make moisturizing a consistent step, especially after cleansing. Choose a texture that leaves your skin comfortable.",
  "Dark spots or uneven tone": "Prioritize consistent sun protection. A dermatologist can help identify the cause of persistent changes in skin tone.",
  Redness: "Keep your routine gentle and avoid products that sting. Persistent redness is a reason to speak with a dermatologist.",
  "Fine lines": "Focus first on daily sun protection and moisturizing before expanding your routine.",
  "General care": "A simple, consistent routine is a useful starting point. You do not need a long list of products.",
};

const buttonClass = "min-h-12 rounded-xl px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051]";

export function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>(() => questions.map(() => []));
  const heading = useRef<HTMLHeadingElement>(null);
  const complete = step === questions.length;
  const question = questions[step];
  const sensitive = ["Often", "Sometimes"].includes(answers[2][0]) || answers[1].includes("Redness");
  const dry = answers[0][0] === "Dry or tight" || answers[1].includes("Dryness");
  const profile = ({ "Oily all over": "Oily-leaning", "Dry or tight": "Dry-leaning", "Oily T-zone, dry cheeks": "Combination", "Comfortable and balanced": "Balanced" } as Record<string, string>)[answers[0][0]] ?? "Still exploring";

  function moveTo(next: number) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function select(option: string) {
    setAnswers((previous) => previous.map((selected, index) => {
      if (index !== step) return selected;
      if (!question.multiple || option === "General care") return [option];
      return selected.includes(option) ? selected.filter((value) => value !== option) : [...selected.filter((value) => value !== "General care"), option];
    }));
  }

  return (
    <section id="quiz" aria-labelledby="quiz-heading" className="mx-auto my-12 w-[min(1140px,calc(100%-32px))] scroll-mt-24 rounded-3xl border border-[#eadfd8] bg-[#fff7f3] p-6 text-[#252625] sm:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold tracking-[0.12em] text-[#b94051] uppercase">Your skin, your starting point</span>
        <span className="text-sm text-[#64645f]">About 2 minutes · No sign-up</span>
      </div>
      <h2 ref={heading} tabIndex={-1} id="quiz-heading" className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl">{complete ? "Meet your everyday routine" : question.title}</h2>
      {complete ? (
        <div className="mt-6 space-y-6">
          <p className="text-[#64645f]">{profile === "Still exploring" ? "Your skin type is uncertain from your answers. Start with the basics below and observe how your skin responds." : <>You described <strong className="text-[#b94051]">{profile.toLowerCase()} skin characteristics</strong>. This reflects your answer, not a confirmed skin type.</>} {sensitive ? "You also reported irritation or redness, so the routine emphasizes gentle care." : answers[2][0] === "I'm not sure" ? "Your sensitivity is unknown; introduce new products cautiously." : "Even if irritation is rare, new products can still cause a reaction."}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Morning · protect", steps: ["Wash gently with lukewarm water and a mild cleanser; avoid scrubbing.", dry ? "Apply moisturizer after cleansing. A cream may feel more comfortable on dry areas." : "Apply a moisturizer you tolerate after cleansing.", "Before going outdoors, apply broad-spectrum, water-resistant SPF 30+ sunscreen to exposed skin. Apply 15 minutes before sun exposure; reapply every two hours outdoors and after swimming or sweating, following the label. Seek shade and wear protective clothing too."] },
              { title: "Evening · care", steps: ["Gently cleanse to remove the day's buildup.", "Apply moisturizer.", sensitive ? "Choose fragrance-free products and keep the routine simple." : "Keep products that suit you; introduce changes one at a time."] },
            ].map((routine) => (
              <article key={routine.title} className="rounded-2xl border border-[#eadfd8] bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold">{routine.title}</h3>
                <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#64645f]">{routine.steps.map((text) => <li key={text}>{text}</li>)}</ol>
              </article>
            ))}
          </div>
          <div className="rounded-2xl bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">For your concerns</h3>
            <div className="grid gap-5 sm:grid-cols-2">{answers[1].map((concern) => <div key={concern}><h4 className="font-medium text-[#b94051]">{concern}</h4><p className="mt-1 text-sm leading-relaxed text-[#64645f]">{concernTips[concern]}</p></div>)}</div>
          </div>
          <p className="text-sm leading-relaxed text-[#64645f]">{answers[3][0] === "I'm starting from scratch" ? "Start with the basics above and build consistency." : "Use this as a checklist alongside products you already tolerate."} {answers[4][0] === "Every day" ? "Keep up your daily sunscreen habit." : "Your next habit: make sunscreen part of your morning routine."}</p>
          <div className="rounded-2xl border border-[#eadfd8] bg-white p-6 text-sm leading-relaxed text-[#64645f]">
            <h3 className="mb-3 text-lg font-semibold text-[#252625]">Before trying something new</h3>
            <p>Test a new skincare product on a small area, such as the inner arm, twice daily for 7–10 days. Use the normal amount and follow the label for how long to leave it on, including rinsing off cleansers. Stop using it if you develop redness, itching, or swelling. A home product test cannot rule out every future reaction.</p>
            <p className="mt-3">Speak with a dermatologist about persistent irritation, painful breakouts, or ongoing changes in your skin. This routine does not replace medical advice or prescribed treatment.</p>
            <p className="mt-3">Read the guidance: <a className="underline" href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget" target="_blank" rel="noreferrer">Skincare basics</a> · <a className="underline" href="https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen" target="_blank" rel="noreferrer">Sunscreen application</a> · <a className="underline" href="https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products" target="_blank" rel="noreferrer">Testing new products</a></p>
          </div>
          <p className="text-xs text-[#64645f]">Answers stay in this page and reset when you reload or leave it.</p>
          <div className="flex flex-wrap gap-3">
            <button className={`${buttonClass} bg-[#b94051] text-white`} onClick={() => moveTo(0)}>Edit my answers</button>
            <button className={`${buttonClass} border border-[#eadfd8] bg-white`} onClick={() => { setAnswers(questions.map(() => [])); moveTo(0); }}>Retake quiz</button>
          </div>
        </div>
      ) : (
        <form className="mt-5" onSubmit={(event) => { event.preventDefault(); if (answers[step].length) moveTo(step + 1); }}>
          <div className="mb-5 flex items-center justify-between text-sm text-[#64645f]"><span aria-live="polite">Question {step + 1} of {questions.length}</span><span>{Math.round(step / questions.length * 100)}% complete</span></div>
          <progress className="mb-6 h-2 w-full accent-[#b94051]" value={step} max={questions.length} aria-label="Quiz progress" />
          <fieldset>
            <legend className="mb-5 text-[#64645f]">{question.hint}</legend>
            <div className="grid gap-3 sm:grid-cols-2">{question.options.map((option) => (
              <label key={option} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-[#b94051] ${answers[step].includes(option) ? "border-[#b94051] bg-[#fce8e7]" : "border-[#eadfd8] bg-white hover:border-[#b94051]"}`}>
                <input className="h-4 w-4 shrink-0 accent-[#b94051]" type={question.multiple ? "checkbox" : "radio"} name={`question-${step}`} checked={answers[step].includes(option)} onChange={() => select(option)} />
                <span className="text-sm font-medium">{option}</span>
              </label>
            ))}</div>
          </fieldset>
          <div className="mt-8 flex items-center justify-between gap-3">
            <button type="button" disabled={step === 0} onClick={() => moveTo(step - 1)} className={`${buttonClass} border border-[#eadfd8] bg-white disabled:cursor-not-allowed disabled:opacity-40`}>Back</button>
            <button type="submit" disabled={!answers[step].length} className={`${buttonClass} bg-[#b94051] text-white hover:bg-[#a93647] disabled:cursor-not-allowed disabled:opacity-40`}>{step === questions.length - 1 ? "See my routine" : "Continue"}</button>
          </div>
          <p className="mt-5 text-xs text-[#64645f]">Choose {question.multiple ? "at least one option" : "an option"} to continue. Your answers are not saved or sent to a server.</p>
        </form>
      )}
    </section>
  );
}
