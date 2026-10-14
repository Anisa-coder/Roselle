"use client";

import { useMemo, useRef, useState } from "react";
import {
  createEmptyAnswers,
  getOptionLabel,
  getSensitivitySummary,
  getSkinSummary,
  getVisibleQuestions,
  needsProfessionalSupport,
  updateQuizAnswer,
  type QuestionId,
  type QuizAnswers,
} from "@/lib/skin-quiz";

const concernGuidance: Record<string, string> = {
  breakouts: "Keep cleansing gentle, avoid picking, and look for non-comedogenic products. Painful or persistent breakouts deserve professional care.",
  blackheads: "Avoid harsh scrubs. A simple routine and products labeled non-comedogenic can help reduce unnecessary irritation.",
  redness: "Choose mild, fragrance-free products and stop products that sting. Persistent redness should be assessed by a dermatologist.",
  "dark-spots": "Daily sun protection is an important foundation. A dermatologist can help identify the cause of persistent changes in skin tone.",
  texture: "Avoid aggressive scrubbing and introduce only one new product at a time so you can notice how your skin responds.",
  dryness: "Apply moisturizer after cleansing while skin is still slightly damp, and choose a texture that leaves your skin comfortable.",
  "fine-lines": "Prioritize sun protection and moisturizing before adding more treatment steps.",
  "general-care": "A consistent cleanser, moisturizer, and sunscreen routine is a useful starting point.",
};

const buttonClass = "min-h-12 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051]";

function AnswerSummary({ answers }: { answers: QuizAnswers }) {
  const skin = getSkinSummary(answers);
  const sensitivity = getSensitivitySummary(answers);
  const professionalSupport = needsProfessionalSupport(answers);
  const concerns = answers.concerns.length ? answers.concerns : ["general-care"];
  const dry = answers.skinFeel[0] === "dry-tight" || ["daily", "sometimes"].includes(answers.dryness[0]) || concerns.includes("dryness");
  const oily = answers.skinFeel[0] === "oily-all" || answers.skinFeel[0] === "combination";
  const reactive = ["often", "sometimes", "not-sure"].includes(answers.sensitivity[0]);

  return (
    <div className="mt-7 space-y-6">
      {professionalSupport && (
        <aside className="rounded-2xl border border-[#d88a8a] bg-[#fff0ef] p-5" role="note" aria-label="Professional care recommendation">
          <h3 className="font-semibold text-[#8f2937]">Consider professional support</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#654a49]">You reported frequent reactions or persistent, painful, swollen, or worsening symptoms. General skincare advice may not be enough; a dermatologist can assess the cause and recommend appropriate care.</p>
        </aside>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#eadfd8] bg-white p-6">
          <span className="text-xs font-bold tracking-[0.1em] text-[#b94051] uppercase">Skin feel</span>
          <h3 className="mt-2 text-lg font-semibold">{skin.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64645f]">{skin.explanation}</p>
        </article>
        <article className="rounded-2xl border border-[#eadfd8] bg-white p-6">
          <span className="text-xs font-bold tracking-[0.1em] text-[#b94051] uppercase">Sensitivity</span>
          <h3 className="mt-2 text-lg font-semibold">{sensitivity.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64645f]">{sensitivity.explanation}</p>
        </article>
        <article className="rounded-2xl border border-[#eadfd8] bg-white p-6">
          <span className="text-xs font-bold tracking-[0.1em] text-[#b94051] uppercase">Your context</span>
          <h3 className="mt-2 text-lg font-semibold">Habits and environment</h3>
          <dl className="mt-3 space-y-2 text-sm text-[#64645f]">
            <div><dt className="inline font-medium text-[#252625]">Environment: </dt><dd className="inline">{getOptionLabel("environment", answers.environment[0])}</dd></div>
            <div><dt className="inline font-medium text-[#252625]">Routine: </dt><dd className="inline">{getOptionLabel("routine", answers.routine[0])}</dd></div>
            <div><dt className="inline font-medium text-[#252625]">Sunscreen: </dt><dd className="inline">{getOptionLabel("sunscreen", answers.sunscreen[0])}</dd></div>
          </dl>
        </article>
      </div>

      <section aria-labelledby="reported-concerns" className="rounded-2xl border border-[#eadfd8] bg-white p-6">
        <h3 id="reported-concerns" className="text-xl font-semibold">What you reported</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {concerns.map((concern) => <span key={concern} className="rounded-full bg-[#fce8e7] px-3 py-1.5 text-sm font-medium text-[#8f2937]">{getOptionLabel("concerns", concern)}</span>)}
        </div>
        {answers.concerns[0] !== "general-care" && (
          <dl className="mt-5 grid gap-4 border-t border-[#eadfd8] pt-5 sm:grid-cols-3">
            <div><dt className="text-xs font-bold tracking-wide text-[#7d716b] uppercase">Areas</dt><dd className="mt-1 text-sm text-[#454440]">{answers.areas.map((value) => getOptionLabel("areas", value)).join(", ")}</dd></div>
            <div><dt className="text-xs font-bold tracking-wide text-[#7d716b] uppercase">Duration</dt><dd className="mt-1 text-sm text-[#454440]">{getOptionLabel("duration", answers.duration[0])}</dd></div>
            <div><dt className="text-xs font-bold tracking-wide text-[#7d716b] uppercase">Frequency</dt><dd className="mt-1 text-sm text-[#454440]">{getOptionLabel("frequency", answers.frequency[0])}</dd></div>
          </dl>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {[
          {
            title: "AM routine · protect",
            steps: [
              "Wash gently with lukewarm water and a mild cleanser; avoid scrubbing.",
              dry ? "Apply moisturizer after cleansing; a cream may feel more comfortable on drier areas." : oily ? "Apply a lightweight moisturizer that leaves your skin comfortable." : "Apply a moisturizer you already tolerate.",
              "Before going outdoors, apply broad-spectrum, water-resistant SPF 30+ sunscreen to exposed skin. Reapply about every two hours outdoors and after swimming or sweating, following the label.",
            ],
          },
          {
            title: "PM routine · restore",
            steps: [
              "Gently cleanse to remove sunscreen, makeup, and the day’s buildup.",
              "Apply a moisturizer that leaves your skin comfortable.",
              reactive ? "Keep the routine simple and introduce only one new product at a time." : "If you add a product, introduce one change at a time so you can observe your skin’s response.",
            ],
          },
        ].map((routine) => (
          <article key={routine.title} className="rounded-2xl border border-[#eadfd8] bg-white p-6">
            <h3 className="text-xl font-semibold">{routine.title}</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#64645f]">
              {routine.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </article>
        ))}
      </div>

      <section aria-labelledby="concern-guidance" className="rounded-2xl border border-[#eadfd8] bg-white p-6">
        <h3 id="concern-guidance" className="text-xl font-semibold">Guidance for your concerns</h3>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {concerns.map((concern) => (
            <article key={concern}>
              <h4 className="font-semibold text-[#b94051]">{getOptionLabel("concerns", concern)}</h4>
              <p className="mt-1 text-sm leading-relaxed text-[#64645f]">{concernGuidance[concern]}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-2xl border border-[#eadfd8] bg-white p-6 text-sm leading-relaxed text-[#64645f]">
        <h3 className="text-lg font-semibold text-[#252625]">Before trying something new</h3>
        <p className="mt-2">Test a new skincare product on a small area, such as the inner arm, twice daily for 7–10 days. Follow the product label and stop if you develop redness, itching, or swelling. A home product test cannot rule out every future reaction.</p>
        <p className="mt-3">This self-report summary is educational and does not diagnose a skin condition. Keep following care prescribed by your clinician.</p>
        <p className="mt-3">Sources: <a className="font-medium text-[#8f2937] underline underline-offset-4" href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget" target="_blank" rel="noreferrer">basic skincare</a> · <a className="font-medium text-[#8f2937] underline underline-offset-4" href="https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen" target="_blank" rel="noreferrer">sunscreen use</a> · <a className="font-medium text-[#8f2937] underline underline-offset-4" href="https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products" target="_blank" rel="noreferrer">testing new products</a></p>
      </aside>
    </div>
  );
}

export function SkinQuiz() {
  const [answers, setAnswers] = useState<QuizAnswers>(createEmptyAnswers);
  const [questionId, setQuestionId] = useState<QuestionId>("skinFeel");
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const visibleQuestions = useMemo(() => getVisibleQuestions(answers), [answers]);
  const currentIndex = Math.max(0, visibleQuestions.findIndex((question) => question.id === questionId));
  const question = visibleQuestions[currentIndex];
  const progress = complete ? 100 : Math.round((currentIndex / visibleQuestions.length) * 100);

  function focusHeading() {
    requestAnimationFrame(() => heading.current?.focus());
  }

  function selectOption(value: string) {
    setAnswers((previous) => updateQuizAnswer(previous, question.id, value));
  }

  function goBack() {
    if (currentIndex === 0) return;
    setQuestionId(visibleQuestions[currentIndex - 1].id);
    focusHeading();
  }

  function goForward() {
    if (!answers[question.id].length) return;
    const updatedQuestions = getVisibleQuestions(answers);
    const updatedIndex = updatedQuestions.findIndex((item) => item.id === question.id);
    if (updatedIndex === updatedQuestions.length - 1) {
      setComplete(true);
    } else {
      setQuestionId(updatedQuestions[updatedIndex + 1].id);
    }
    focusHeading();
  }

  function editAnswers() {
    setComplete(false);
    setQuestionId("skinFeel");
    focusHeading();
  }

  function restart() {
    setAnswers(createEmptyAnswers());
    setComplete(false);
    setQuestionId("skinFeel");
    focusHeading();
  }

  return (
    <section id="quiz" aria-labelledby="quiz-heading" className="mx-auto my-10 w-[min(1140px,calc(100%-32px))] scroll-mt-24 rounded-[28px] border border-[#eadfd8] bg-[#fff9f6]/95 p-5 text-[#252625] shadow-[0_24px_70px_rgba(115,74,54,.09)] sm:p-9 lg:p-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold tracking-[0.12em] text-[#b94051] uppercase">Your skin, your starting point</span>
        <span className="text-sm text-[#64645f]">About 4–6 minutes · No sign-up</span>
      </div>

      <h2 ref={heading} tabIndex={-1} id="quiz-heading" className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] outline-none sm:text-4xl">
        {complete ? "Your skincare starting point" : question.title}
      </h2>

      {complete ? (
        <>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64645f]">This summary connects your answers to a simple routine. It describes reported characteristics and concerns; it is not a diagnosis or product prescription.</p>
          <AnswerSummary answers={answers} />
          <p className="mt-5 text-xs leading-relaxed text-[#64645f]">Your answers are kept only in this page and clear when you refresh or leave.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className={`${buttonClass} bg-[#b94051] text-white hover:bg-[#a93647]`} onClick={editAnswers}>Review or edit answers</button>
            <button type="button" className={`${buttonClass} border border-[#d9c9c1] bg-white hover:border-[#b94051]`} onClick={restart}>Restart quiz</button>
          </div>
        </>
      ) : (
        <form className="mt-6" onSubmit={(event) => { event.preventDefault(); goForward(); }}>
          <div className="mb-3 flex items-center justify-between gap-4 text-sm text-[#64645f]">
            <span aria-live="polite">Question {currentIndex + 1} of {visibleQuestions.length}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#eadfd8]" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="h-full rounded-full bg-[#b94051] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
          </div>

          <fieldset className="mt-7">
            <legend className="mb-5 text-sm leading-relaxed text-[#64645f]">{question.hint}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[question.id].includes(option.value);
                return (
                  <label key={option.value} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-[#b94051] focus-within:ring-offset-2 ${selected ? "border-[#b94051] bg-[#fce8e7]" : "border-[#dfd2cb] bg-white hover:border-[#c96d78]"}`}>
                    <input className="h-5 w-5 shrink-0 accent-[#b94051]" type={question.type === "multiple" ? "checkbox" : "radio"} name={question.id} value={option.value} checked={selected} onChange={() => selectOption(option.value)} />
                    <span className="text-sm font-medium leading-snug">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button type="button" disabled={currentIndex === 0} onClick={goBack} className={`${buttonClass} border border-[#d9c9c1] bg-white hover:border-[#b94051] disabled:cursor-not-allowed disabled:opacity-40`}>Back</button>
            <button type="submit" disabled={!answers[question.id].length} className={`${buttonClass} bg-[#b94051] text-white hover:bg-[#a93647] disabled:cursor-not-allowed disabled:opacity-40`}>{currentIndex === visibleQuestions.length - 1 ? "See my routine" : "Continue"}</button>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#64645f]">Choose {question.type === "multiple" ? "at least one option" : "one option"} to continue. Your answers are not saved or sent to a server.</p>
        </form>
      )}
    </section>
  );
}
