export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-[18px] text-center text-[clamp(25px,2.5vw,34px)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#252625]">
      {children}
    </h2>
  );
}
