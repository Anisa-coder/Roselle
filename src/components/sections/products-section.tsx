"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star";
import { products } from "@/lib/skincare-data";

export function ProductsSection() {
  const shelfRef = useRef<HTMLDivElement>(null);

  function getLoopWidth(shelf: HTMLDivElement) {
    const firstCard = shelf.children[0] as HTMLElement | undefined;
    const firstRepeatedCard = shelf.children[products.length] as HTMLElement | undefined;

    return firstCard && firstRepeatedCard
      ? firstRepeatedCard.offsetLeft - firstCard.offsetLeft
      : 0;
  }

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;

    const frame = requestAnimationFrame(() => {
      shelf.scrollLeft = getLoopWidth(shelf);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function moveShelf(direction: -1 | 1) {
    const shelf = shelfRef.current;
    const firstCard = shelf?.children[0] as HTMLElement | undefined;
    if (!shelf || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(shelf).columnGap) || 12;

    shelf.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  function keepShelfLooped() {
    const shelf = shelfRef.current;
    if (!shelf) return;

    const loopWidth = getLoopWidth(shelf);
    if (!loopWidth) return;

    if (shelf.scrollLeft <= loopWidth * 0.25) {
      shelf.scrollLeft += loopWidth;
    } else if (shelf.scrollLeft >= loopWidth * 1.75) {
      shelf.scrollLeft -= loopWidth;
    }
  }

  return (
    <section className="mx-auto w-[min(1380px,calc(100%-48px))] py-12 max-[900px]:w-[min(720px,calc(100%-32px))] max-[640px]:w-[calc(100%-28px)] max-[640px]:py-9" id="trending">
      <div className="min-w-0">
        <div className="mb-7 flex items-start justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-bold tracking-[0.12em] text-[#df6571] uppercase">Curated for your skin</span>
            <h2 className="text-[clamp(26px,3vw,38px)] font-semibold leading-none tracking-[-0.04em] text-[#252625]">Trending Recommendations</h2>
            <p className="mt-2.5 text-sm text-[#64645f]">Personalized skincare picks worth adding to your routine.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[#dfd0c8] bg-white text-[#4e4946] transition-colors hover:border-[#df6571] hover:bg-[#fff1f2] hover:text-[#b94051] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df6571]"
              type="button"
              onClick={() => moveShelf(-1)}
              aria-label="View previous products"
            >
              <CaretLeftIcon size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-[#dfd0c8] bg-white text-[#4e4946] transition-colors hover:border-[#df6571] hover:bg-[#fff1f2] hover:text-[#b94051] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df6571]"
              type="button"
              onClick={() => moveShelf(1)}
              aria-label="View next products"
            >
              <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={shelfRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Trending skincare products"
          onScroll={keepShelfLooped}
        >
          {Array.from({ length: 3 }, (_, cycle) =>
            products.map((product) => (
              <article
                className="flex w-[78%] shrink-0 snap-start flex-col rounded-[15px] border border-[#e1d3cb] bg-white p-3 transition-[border-color,box-shadow] duration-200 hover:border-[#e7a0a7] hover:shadow-[0_12px_30px_rgba(115,74,54,.1)] sm:w-[calc((100%-24px)/3)] lg:w-[calc((100%-36px)/4)] xl:w-[calc((100%-60px)/6)]"
                data-product-card
                aria-hidden={cycle !== 1}
                key={`${cycle}-${product.name}`}
              >
                <div className="mb-2.5 flex items-center justify-between gap-2 text-[10px]">
                  <span className="truncate font-medium text-[#b94051]">{product.badge}</span>
                  <span className="shrink-0 rounded-full bg-[#edf5e9] px-2 py-1 font-semibold text-[#4f7b45]">{product.match} match</span>
                </div>
                <div className="relative mb-3 h-[180px] overflow-hidden rounded-xl bg-[#f5ede8] sm:h-[150px]">
                  <Image
                    className="object-contain p-1"
                    src={product.image}
                    alt={`${product.name} product`}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 17vw"
                  />
                </div>
                <h3 className="min-h-10 text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[#252625]">{product.name}</h3>
                <p className="mt-1 min-h-[54px] text-xs leading-relaxed text-[#64645f]">{product.description}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#514d49]">
                  <span>{product.rating}</span>
                  <StarIcon className="shrink-0 text-[#efa514]" size={13} weight="fill" aria-hidden="true" />
                  <span className="truncate font-normal text-[#8a827d]">product rating</span>
                </div>
              </article>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
