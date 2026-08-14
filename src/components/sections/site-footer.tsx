"use client";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  PinterestLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Skin Types", href: "#skin-types" },
      { label: "Recommendations", href: "#trending" },
      { label: "Trending Products", href: "#trending" },
      { label: "Skin Concerns", href: "#skin-types" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { label: "Skin Quiz", href: "#quiz" },
      { label: "Routine Builder", href: "#about" },
      { label: "Ingredient Guide", href: "#about" },
      { label: "Live Guidance", href: "#quiz", pulse: true },
    ],
  },
];

const contactInfo = [
  { icon: Mail, text: "hello@roselle.skin", href: "mailto:hello@roselle.skin" },
  { icon: Phone, text: "+91 86373 73116", href: "tel:+918637373116" },
  { icon: MapPin, text: "India" },
];

const socialLinks = [
  { icon: FacebookLogoIcon, label: "Facebook" },
  { icon: InstagramLogoIcon, label: "Instagram" },
  { icon: YoutubeLogoIcon, label: "YouTube" },
  { icon: PinterestLogoIcon, label: "Pinterest" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-8 h-fit w-full overflow-hidden border-t border-[#eadfd8] bg-[#fff9f5] text-[#625c58]">
      <FooterBackgroundGradient />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 sm:px-10 md:px-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 border-b border-[#dccdc5] pb-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-14">
          <div className="flex flex-col items-start space-y-5">
            <Brand />
            <p className="max-w-xs text-sm leading-relaxed text-[#625c58]">
              Thoughtful skincare guidance and personalized routines for healthier, more confident skin.
            </p>
            <a className="inline-flex min-h-11 items-center rounded-full border border-[#df6571]/45 bg-white/70 px-5 text-sm font-semibold text-[#b94051] shadow-sm transition-colors hover:bg-[#df6571] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#df6571]" href="#quiz">
              Take the skin quiz
            </a>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-lg font-semibold text-[#252625]">{section.title}</h3>
              <ul className="space-y-3.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <a className="transition-colors hover:text-[#f08c96] focus-visible:text-[#f08c96] focus-visible:outline-none" href={link.href}>{link.label}</a>
                    {link.pulse && <span className="absolute -top-0.5 -right-3 h-2 w-2 animate-pulse rounded-full bg-[#df6571]" aria-hidden="true" />}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-6 text-lg font-semibold text-[#252625]">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li className="flex items-center gap-3" key={text}>
                  <Icon className="shrink-0 text-[#df6571]" size={18} strokeWidth={1.8} aria-hidden="true" />
                  {href ? <a className="transition-colors hover:text-[#f08c96]" href={href}>{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-sm md:flex-row">
          <div className="flex gap-2 text-[#746d69]">
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                className="grid h-11 w-11 place-items-center rounded-full border border-[#dccdc5] bg-white/60 transition-colors hover:border-[#df6571]/60 hover:bg-[#df6571]/10 hover:text-[#b94051] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#df6571]"
                href="#home"
                aria-label={label}
                key={label}
              >
                <Icon size={20} weight="regular" />
              </a>
            ))}
          </div>
          <p className="text-center text-[#746d69] md:text-left">© {new Date().getFullYear()} Roselle. All rights reserved.</p>
        </div>
      </div>

      <div className="relative z-10 -mt-48 -mb-36 hidden h-[30rem] lg:flex">
        <TextHoverEffect text="Roselle" />
      </div>
    </footer>
  );
}
