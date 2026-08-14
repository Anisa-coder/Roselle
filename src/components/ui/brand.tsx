function RoseMark() {
  return (
    <svg
      className="mx-px h-[0.82em] w-[0.82em] shrink-0 text-[#df6571]"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21c-1.38-1.7-3.72-1.86-5.35-3.12-1.72-1.32-2.06-3.62-.76-5.26-1.04-1.88-.36-4.28 1.57-5.23.2-2.16 2.18-3.73 4.36-3.34 1.46-1.62 4.1-1.46 5.34.35 2.16-.14 3.93 1.66 3.76 3.79 1.76 1.17 2.17 3.57.88 5.2 1 1.87.28 4.2-1.62 5.12-1.73 1.04-4.02.98-5.42 2.49H12Z"
        fill="currentColor"
      />
      <path
        d="M8.1 11.05c1.04-2.56 4.2-3.55 6.26-1.86 1.92-.26 3.65 1.36 3.25 3.25-.34 1.64-1.9 2.87-3.63 2.74-1.5 1.36-4.02.99-4.92-.83-.76-1.53-.1-3.37 1.35-4.2 1.22-.7 2.85-.39 3.72.69.68.84.58 2.12-.23 2.84-.7.63-1.83.58-2.47-.1"
        stroke="#b94051"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.3" cy="12.4" r="1.15" fill="#fff1ef" />
    </svg>
  );
}

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <a
      className={`inline-flex w-fit items-center font-semibold leading-none tracking-[-0.045em] ${inverse ? "text-white" : "text-[#252625]"} ${compact ? "text-[25px]" : "text-[29px] max-[640px]:text-[25px]"}`}
      href="#home"
      aria-label="Roselle home"
    >
      <span aria-hidden="true" className="inline-flex items-center">
        <span>R</span>
        <RoseMark />
        <span>selle</span>
      </span>
    </a>
  );
}
