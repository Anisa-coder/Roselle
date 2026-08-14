import { CirclesThreePlusIcon } from "@phosphor-icons/react/dist/ssr/CirclesThreePlus";
import { DropIcon } from "@phosphor-icons/react/dist/ssr/Drop";
import { FlowerIcon } from "@phosphor-icons/react/dist/ssr/Flower";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import { SunIcon } from "@phosphor-icons/react/dist/ssr/Sun";

export const skinTypes = [
  { name: "Oily Skin", short: "Oily", description: "Shiny appearance, enlarged pores, prone to breakouts.", icon: DropIcon, color: "text-[#5a8d48]" },
  { name: "Dry Skin", short: "Dry", description: "Flaky, tight, or rough texture, needs hydration.", icon: DropIcon, color: "text-[#3d97d9]" },
  { name: "Combination Skin", short: "Combination", description: "Oily in some areas, dry in others.", icon: CirclesThreePlusIcon, color: "text-[#6da447]" },
  { name: "Sensitive Skin", short: "Sensitive", description: "Easily irritated, red, or reactive.", icon: LeafIcon, color: "text-[#e25f72]" },
  { name: "Acne-Prone Skin", short: "Acne-Prone", description: "Prone to breakouts, blackheads, and bumps.", icon: FlowerIcon, color: "text-[#20a5a4]" },
  { name: "Normal Skin", short: "Normal", description: "Balanced, clear, with minimal imperfections.", icon: SunIcon, color: "text-[#e69316]" },
];

export const products = [
  { badge: "Best for Oily Skin", name: "Gentle Foaming Cleanser", description: "Deep cleanse without stripping natural oils.", rating: "4.7", match: "92%", image: "/images/products/product-1.png" },
  { badge: "Top Rated for Acne", name: "Niacinamide Serum 10%", description: "Minimizes pores and controls excess oil.", rating: "4.8", match: "95%", image: "/images/products/product-2.png" },
  { badge: "Best for Dry Skin", name: "Ceramide Barrier Moisturizer", description: "Strengthens the skin barrier and locks in moisture.", rating: "4.8", match: "94%", image: "/images/products/product-3.png" },
  { badge: "Daily Essential", name: "Gel Sunscreen SPF 50 PA++++", description: "Lightweight, no white cast, broad-spectrum protection.", rating: "4.7", match: "92%", image: "/images/products/product-4.png" },
  { badge: "Top Pick for Sensitive", name: "Calming Soothing Toner", description: "Reduces redness and soothes irritation.", rating: "4.6", match: "92%", image: "/images/products/product-5.png" },
  { badge: "Best Exfoliant", name: "Salicylic Acid Cleanser", description: "Clears pores and helps prevent breakouts.", rating: "4.7", match: "93%", image: "/images/products/product-6.png" },
  { badge: "Barrier Repair", name: "Barrier Repair Cream", description: "Repairs, hydrates, and relieves dry skin.", rating: "4.7", match: "92%", image: "/images/products/product-7.png" },
  { badge: "Brightening Pick", name: "Vitamin C Brightening Serum", description: "Fades dark spots and evens skin tone.", rating: "4.8", match: "92%", image: "/images/products/product-8.png" },
];
