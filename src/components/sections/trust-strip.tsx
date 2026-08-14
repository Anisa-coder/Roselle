import { GiftIcon } from "@phosphor-icons/react/dist/ssr/Gift";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star";

const items = [
  { icon: StarIcon, tone: "bg-[#e69316]", value: <>4.8 <small className="text-sm font-medium">/ 5</small></>, title: "Average Product Match", copy: "Based on user feedback" },
  { icon: GiftIcon, tone: "bg-[#5a8d48]", value: "10K+", title: "Product Suggestions", copy: "Curated for every skin" },
  { icon: ShieldCheckIcon, tone: "bg-[#6f61c8]", value: "Dermatology-Inspired", title: "Guidance You Can Trust", copy: "Science-backed recommendations" },
];

export function TrustStrip() {
  return (
    <section className="relative z-5 mx-auto -mt-1 grid w-[min(1380px,calc(100%-48px))] grid-cols-[.9fr_.85fr_1.25fr] rounded-[14px] border border-[#eadfd8] bg-white shadow-[0_14px_40px_rgba(115,74,54,.11)] max-[900px]:mt-4 max-[900px]:w-[min(720px,calc(100%-32px))] max-[900px]:grid-cols-1 max-[640px]:w-[calc(100%-28px)]" aria-label="Roselle highlights">
      {items.map(({ icon: Icon, tone, value, title, copy }, index) => (
        <article className={`flex min-h-[92px] items-center gap-[17px] px-[30px] py-[18px] max-[900px]:border-l-0 max-[900px]:px-5 max-[900px]:py-4 ${index > 0 ? "border-l border-[#eadfd8] max-[900px]:border-t" : ""}`} key={title}>
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white ${tone}`}><Icon size={28} weight="duotone" /></span>
          <div>
            <strong className="block text-[21px] leading-[1.08] text-[#252625]">{value}</strong>
            <b className="mt-[3px] block text-[13px] text-[#252625]">{title}</b>
            <p className="mt-0.5 text-[11px] text-[#64645f]">{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
