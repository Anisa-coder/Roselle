import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { Brand } from "@/components/ui/brand";

const navLinks = [
  ["Home", "#home"],
  ["Skin Types", "#skin-types"],
  ["Recommendations", "#trending"],
  ["Trending Products", "#trending"],
  ["About", "#about"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 h-[68px] border-b border-[#eadfd8] bg-white/95 backdrop-blur-[14px] max-[640px]:h-[62px]">
      <div className="mx-auto grid h-full w-[min(1380px,calc(100%-48px))] grid-cols-[220px_1fr_auto] items-center gap-6 max-[1180px]:grid-cols-[190px_1fr_auto] max-[900px]:w-[min(720px,calc(100%-32px))] max-[900px]:grid-cols-[1fr_auto] max-[640px]:w-[calc(100%-28px)]">
        <Brand />
        <nav className="flex h-full items-center justify-self-center gap-[clamp(22px,3vw,52px)] whitespace-nowrap max-[1180px]:gap-5 max-[900px]:hidden" aria-label="Primary navigation">
          {navLinks.map(([label, href], index) => (
            <a
              className={`relative grid h-full place-items-center text-sm font-medium transition-colors hover:text-[#b94051] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d] max-[1180px]:text-xs ${index === 0 ? "after:absolute after:right-0 after:bottom-3 after:left-0 after:h-0.5 after:rounded-full after:bg-[#df6571]" : ""}`}
              href={href}
              key={`${label}-${href}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[9px] bg-[#b94051] px-5 text-[13px] font-semibold whitespace-nowrap text-white shadow-[0_10px_22px_rgba(185,64,81,.18)] transition hover:-translate-y-0.5 hover:bg-[#a93647] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d] max-[900px]:hidden" href="#quiz">
          Take Skin Quiz <SparkleIcon size={16} weight="bold" aria-hidden="true" />
        </a>
        <details className="relative hidden justify-self-end max-[900px]:block [&>summary::-webkit-details-marker]:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-[10px] border border-[#eadfd8] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#df65714d]" aria-label="Open navigation">
            <ListIcon size={26} weight="bold" />
          </summary>
          <nav className="absolute top-[54px] right-0 grid w-[260px] rounded-[14px] border border-[#eadfd8] bg-white p-3 shadow-[0_14px_40px_rgba(115,74,54,.11)]" aria-label="Mobile navigation">
            {navLinks.slice(1).map(([label, href]) => <a className="rounded-lg p-3 text-sm hover:bg-[#fff7f3] hover:text-[#b94051]" href={href} key={`${label}-${href}`}>{label}</a>)}
            <a className="rounded-lg p-3 text-sm hover:bg-[#fff7f3] hover:text-[#b94051]" href="#quiz">Take Skin Quiz</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
