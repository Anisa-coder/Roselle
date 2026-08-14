"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function TextHoverEffect({
  text,
  duration = 0.12,
  className,
}: {
  text: string;
  duration?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const reduceMotion = useReducedMotion();
  const roselleWordmark = text.toLowerCase() === "roselle";

  useEffect(() => {
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return;

    setMaskPosition({
      cx: `${((cursor.x - svgRect.left) / svgRect.width) * 100}%`,
      cy: `${((cursor.y - svgRect.top) / svgRect.height) * 100}%`,
    });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 340 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn("cursor-pointer select-none uppercase", className)}
      role="img"
      aria-label={text}
    >
      <defs>
        <linearGradient id="roselleTextGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="30%" x2="100%" y2="70%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#b94051" />
              <stop offset="30%" stopColor="#ef8490" />
              <stop offset="58%" stopColor="#d56572" />
              <stop offset="80%" stopColor="#7e9e65" />
              <stop offset="100%" stopColor="#b94051" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="roselleRevealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: reduceMotion ? 0 : duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="roselleTextMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#roselleRevealMask)" />
        </mask>
      </defs>

      {roselleWordmark ? (
        <>
          <RoselleOutline stroke="#b94051" opacity={hovered ? 0.16 : 0} />
          <motion.g
            initial={reduceMotion ? false : { strokeDashoffset: 1000, strokeDasharray: 1000 }}
            animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
            transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
          >
            <RoselleOutline stroke="#cf5968" />
          </motion.g>
          <RoselleOutline stroke="url(#roselleTextGradient)" strokeWidth={0.6} mask="url(#roselleTextMask)" />
        </>
      ) : (
        <>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.4" stroke="#b94051" fill="transparent" opacity={hovered ? 0.16 : 0} className="font-sans text-7xl font-bold">{text}</text>
          <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.4" stroke="#cf5968" fill="transparent" className="font-sans text-7xl font-bold" initial={reduceMotion ? false : { strokeDashoffset: 1000, strokeDasharray: 1000 }} animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }} transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}>{text}</motion.text>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" stroke="url(#roselleTextGradient)" strokeWidth="0.55" mask="url(#roselleTextMask)" fill="transparent" className="font-sans text-7xl font-bold">{text}</text>
        </>
      )}
    </svg>
  );
}

function RoselleOutline({
  stroke,
  strokeWidth = 0.42,
  opacity = 1,
  mask,
}: {
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
  mask?: string;
}) {
  return (
    <g stroke={stroke} strokeWidth={strokeWidth} fill="transparent" opacity={opacity} mask={mask}>
      <text x="8" y="51" dominantBaseline="middle" className="font-sans text-7xl font-bold">R</text>
      <g transform="translate(61 26) scale(2.05)">
        <path d="M12 21c-1.38-1.7-3.72-1.86-5.35-3.12-1.72-1.32-2.06-3.62-.76-5.26-1.04-1.88-.36-4.28 1.57-5.23.2-2.16 2.18-3.73 4.36-3.34 1.46-1.62 4.1-1.46 5.34.35 2.16-.14 3.93 1.66 3.76 3.79 1.76 1.17 2.17 3.57.88 5.2 1 1.87.28 4.2-1.62 5.12-1.73 1.04-4.02.98-5.42 2.49H12Z" />
        <path d="M8.1 11.05c1.04-2.56 4.2-3.55 6.26-1.86 1.92-.26 3.65 1.36 3.25 3.25-.34 1.64-1.9 2.87-3.63 2.74-1.5 1.36-4.02.99-4.92-.83-.76-1.53-.1-3.37 1.35-4.2 1.22-.7 2.85-.39 3.72.69.68.84.58 2.12-.23 2.84-.7.63-1.83.58-2.47-.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12.3" cy="12.4" r="1.15" />
      </g>
      <text x="108" y="51" dominantBaseline="middle" className="font-sans text-7xl font-bold">SELLE</text>
    </g>
  );
}

export function FooterBackgroundGradient() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 8%, #fffdfb 45%, rgba(223, 101, 113, 0.2) 100%)",
      }}
      aria-hidden="true"
    />
  );
}
