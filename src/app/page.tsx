import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { SkinTypesSection } from "@/components/sections/skin-types-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhySection } from "@/components/sections/why-section";

export default function Home() {
  return (
    <div className="min-w-0 overflow-hidden bg-[#fffdfb]" id="home">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <WhySection />
        <SkinTypesSection />
        <ProductsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
