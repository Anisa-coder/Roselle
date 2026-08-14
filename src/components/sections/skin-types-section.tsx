import { skinTypes } from "@/lib/skincare-data";

const cardTones = [
  "bg-[#f1f6ed] hover:border-[#9bb98a]",
  "bg-[#eef6fb] hover:border-[#8fbddb]",
  "bg-[#f4f7ec] hover:border-[#a9bc79]",
  "bg-[#fff1f2] hover:border-[#eaa0aa]",
  "bg-[#eef9f7] hover:border-[#79c7c2]",
  "bg-[#fff8e9] hover:border-[#e8bb64]",
];

export function SkinTypesSection() {
  return (
    <section className="mx-auto w-[min(1140px,calc(100%-48px))] py-16 max-[900px]:w-[min(720px,calc(100%-32px))] max-[640px]:w-[calc(100%-28px)] max-[640px]:py-12" id="skin-types">
      <div className="mb-11 max-w-[720px] max-[640px]:mb-8">
        <span className="mb-3 block text-xs font-bold tracking-[0.12em] text-[#df6571] uppercase">Your skin, understood</span>
        <h2 className="text-[clamp(30px,3.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.04em] text-[#252625]">
          Understand Your Skin, <span className="text-[#b94051]">Target Your Concerns</span>
        </h2>
        <p className="mt-4 max-w-[650px] text-base leading-relaxed text-[#64645f]">
          Explore the characteristics of each skin type and discover guidance shaped around what your skin truly needs.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
        {skinTypes.map(({ name, description, icon: Icon, color }, index) => (
          <article className={`group min-h-[205px] rounded-[16px] border border-transparent p-7 shadow-[0_8px_24px_rgba(89,63,48,.05)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(89,63,48,.1)] max-[640px]:min-h-0 max-[640px]:p-6 ${cardTones[index]}`} key={name}>
            <div className={`mb-7 grid h-12 w-12 place-items-center rounded-[13px] bg-white/80 shadow-sm ${color}`}>
              <Icon size={30} weight="duotone" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-[#252625]">{name}</h3>
            <p className="max-w-[290px] text-sm leading-relaxed text-[#64645f]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
