import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { HandHeartIcon } from "@phosphor-icons/react/dist/ssr/HandHeart";
import { TargetIcon } from "@phosphor-icons/react/dist/ssr/Target";
import { TestTubeIcon } from "@phosphor-icons/react/dist/ssr/TestTube";
import { UserFocusIcon } from "@phosphor-icons/react/dist/ssr/UserFocus";

const benefits = [
  { icon: UserFocusIcon, tone: "bg-[#f9d7d4] text-[#b94051]", title: "Skin-Type Based Suggestions", copy: "Personalized picks for your unique skin type." },
  { icon: TestTubeIcon, tone: "bg-[#eceaff] text-[#655ab2]", title: "Ingredient-Aware Recommendations", copy: "We recommend effective, safe ingredients." },
  { icon: TargetIcon, tone: "bg-[#f9d7d4] text-[#b94051]", title: "Concern-Based Product Ratings", copy: "See what works best for your concerns." },
  { icon: HandHeartIcon, tone: "bg-[#def7f3] text-[#168a89]", title: "Better Long-Term Skin Habits", copy: "Build routines that support healthy skin." },
  { icon: ClockIcon, tone: "bg-[#fff0cf] text-[#c9810f]", title: "Routine Simplified", copy: "Clear steps for morning, night, and weekly care." },
];

export function WhySection() {
  return (
    <section className="mx-auto grid w-[min(1380px,calc(100%-48px))] grid-cols-[minmax(0,.9fr)_minmax(0,1.35fr)] items-center gap-16 py-[62px] pb-[42px] max-[900px]:w-[min(720px,calc(100%-32px))] max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[900px]:py-[46px] max-[900px]:pb-6 max-[640px]:w-[calc(100%-28px)]" id="about">
      <div className="relative min-h-[390px] overflow-hidden rounded-[15px] shadow-[0_16px_42px_rgba(105,75,58,.12)] max-[900px]:min-h-[430px] max-[640px]:min-h-[390px]">
        <Image className="object-cover" src="/images/routine-still-life.png" alt="A calm skincare routine arranged on a stone bathroom vanity" fill sizes="(max-width: 768px) 100vw, 42vw" />
        <div className="absolute top-[18px] right-[18px] grid w-[182px] gap-[14px] rounded-xl border border-white/80 bg-white/95 p-5 shadow-[0_12px_30px_rgba(72,52,41,.15)] backdrop-blur-lg max-[640px]:w-40 max-[640px]:p-4">
          <strong className="text-[13px]">Your Ideal Routine</strong>
          {["Cleanse", "Treat", "Moisturize", "Protect"].map((step) => (
            <span className="flex items-center gap-[9px] text-[11px] text-[#4f514c]" key={step}>
              <CheckIcon className="h-6 w-6 rounded-full bg-[#edf5e9] p-[5px] text-[#5a8d48]" size={14} weight="bold" />{step}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="mb-2.5 block text-[11px] font-bold tracking-[.08em] text-[#df6571] uppercase">Smarter skincare, better results</span>
        <h2 className="text-[clamp(34px,3.2vw,48px)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#252625]">Why Choose Better<br className="max-[640px]:hidden" />Skincare Guidance?</h2>
        <div className="mt-[26px] grid grid-cols-2 gap-x-[34px] gap-y-[22px] max-[640px]:grid-cols-1">
          {benefits.map(({ icon: Icon, tone, title, copy }) => (
            <article className="flex items-start gap-3" key={title}>
              <Icon className={`h-[35px] w-[35px] shrink-0 rounded-[10px] p-2 ${tone}`} />
              <div><h3 className="mb-1 text-[13px] font-semibold">{title}</h3><p className="text-[11px] leading-[1.45] text-[#64645f]">{copy}</p></div>
            </article>
          ))}
        </div>
        <a className="mt-[23px] inline-flex min-h-10 w-fit items-center gap-2 rounded-[10px] border border-[#f9d7d4] px-4 text-xs font-semibold text-[#b94051] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d]" href="#skin-types">
          Learn More About Us <ArrowRightIcon size={16} />
        </a>
      </div>
    </section>
  );
}
