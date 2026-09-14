import Image from "next/image";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";

export function CtaSection() {
  return (
    <section className="relative mx-auto mt-[22px] mb-4 grid min-h-[125px] w-[min(1380px,calc(100%-48px))] grid-cols-[1fr_auto_340px] items-center gap-7 overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#cc6b65_0%,#e98c82_55%,#f4bbb0_100%)] px-[34px] py-[25px] text-white max-[900px]:w-[min(720px,calc(100%-32px))] max-[900px]:grid-cols-[1fr_auto] max-[900px]:pr-[30px] max-[640px]:min-h-[220px] max-[640px]:w-[calc(100%-28px)] max-[640px]:grid-cols-1 max-[640px]:content-center max-[640px]:gap-5 max-[640px]:px-6 max-[640px]:py-[26px]">
      <div className="relative z-2">
        <h2 className="mb-2 text-[25px] font-semibold tracking-[-0.03em] max-[640px]:text-2xl">Build a Smarter Routine for Healthier Skin</h2>
        <p className="max-w-[570px] text-[11px] leading-[1.5]">Take the skin quiz and get a personalized routine based on your skin type and concerns.</p>
      </div>
      <a className="relative z-2 inline-flex min-h-[46px] w-fit items-center justify-center gap-[9px] rounded-[13px] bg-white px-[23px] text-sm font-semibold whitespace-nowrap text-[#2d2d2c] transition hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white/50" href="/quiz">
        Get Started Now <SparkleIcon size={17} weight="bold" />
      </a>
      <div className="absolute top-0 right-0 bottom-0 w-[360px] max-[900px]:hidden" aria-hidden="true">
        <Image className="object-cover object-left" src="/images/routine-still-life.png" alt="" fill sizes="360px" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,#ef9f95,transparent_45%)]" />
      </div>
    </section>
  );
}
