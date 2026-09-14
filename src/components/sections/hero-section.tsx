import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { skinTypes } from "@/lib/skincare-data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[540px] flex-col justify-center overflow-hidden bg-[#f7eee7] max-[900px]:min-h-[700px] max-[900px]:justify-start max-[640px]:min-h-[690px]" aria-labelledby="hero-title">
      <Image
        src="/images/skinguide-hero.png"
        alt="Botanical skincare products arranged beside blossoms and a round mirror"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center max-[900px]:object-[65%_bottom]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,247,.99)_0%,rgba(255,251,247,.93)_34%,rgba(255,251,247,.35)_53%,transparent_68%)] max-[900px]:bg-[linear-gradient(180deg,rgba(255,251,247,.98)_0%,rgba(255,251,247,.91)_38%,rgba(255,251,247,.12)_70%,rgba(255,251,247,.45)_100%)]" />
      <div className="relative z-2 mx-auto w-[min(1380px,calc(100%-48px))] py-[76px] pb-[98px] max-[900px]:w-[min(720px,calc(100%-32px))] max-[900px]:pt-14 max-[900px]:pb-[280px] max-[640px]:w-[calc(100%-28px)] max-[640px]:pt-[42px] max-[640px]:pb-[300px]">
        <h1 id="hero-title" className="max-w-[620px] text-[clamp(48px,5vw,72px)] font-bold leading-[.99] tracking-[-0.055em] text-[#252625] max-[900px]:max-w-[660px] max-[900px]:text-[clamp(43px,8.5vw,65px)] max-[640px]:text-[43px] max-[640px]:leading-[1.03]">
          Find the Right Skincare for Every <span className="text-[#df6571]">Skin Type</span>
        </h1>
        <p className="mt-5 mb-6 max-w-[540px] text-[17px] leading-[1.55] text-[#53524f] max-[640px]:mt-4 max-[640px]:text-[15px]">
          Personalized product suggestions and routines based on your skin type and unique concerns.
        </p>
        <div className="flex flex-wrap gap-[14px] max-[640px]:grid max-[640px]:w-[min(100%,330px)] max-[640px]:grid-cols-1">
          <a className="inline-flex min-h-[46px] items-center justify-center gap-[9px] rounded-[13px] bg-[#b94051] px-[23px] text-sm font-semibold whitespace-nowrap text-white shadow-[0_10px_22px_rgba(185,64,81,.18)] transition hover:-translate-y-0.5 hover:bg-[#a93647] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d] max-[640px]:w-full" href="#trending">
            Explore Recommendations <ArrowRightIcon size={17} weight="bold" />
          </a>
          <a className="inline-flex min-h-[46px] items-center justify-center gap-[9px] rounded-[13px] border border-[#eadfd8] bg-white/90 px-[23px] text-sm font-semibold whitespace-nowrap text-[#2d2d2c] shadow-[0_7px_18px_rgba(80,55,43,.07)] transition hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d] max-[640px]:w-full" href="/quiz">
            Start Skin Analysis <SparkleIcon size={17} weight="bold" />
          </a>
        </div>
      </div>
      <div className="absolute bottom-[22px] left-1/2 z-3 mx-auto flex w-[min(1380px,calc(100%-48px))] -translate-x-1/2 gap-2.5 overflow-x-auto [scrollbar-width:none] max-[900px]:w-[calc(100%-32px)] max-[640px]:bottom-[15px] max-[640px]:w-[calc(100%-28px)] [&::-webkit-scrollbar]:hidden" aria-label="Skin types">
        {skinTypes.map(({ short, icon: Icon, color }) => (
          <a href="#skin-types" className={`inline-flex min-h-9 shrink-0 items-center gap-[7px] rounded-full border border-[#eadfd8] bg-white/95 px-[15px] text-xs shadow-[0_4px_14px_rgba(74,46,32,.07)] ${color}`} key={short}>
            <Icon size={17} weight="duotone" aria-hidden="true" /> {short}
          </a>
        ))}
      </div>
    </section>
  );
}
