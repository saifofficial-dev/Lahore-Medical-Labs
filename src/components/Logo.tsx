import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: "icon-only" | "full" | "horizontal";
  iconSize?: number;
  className?: string;
}

export function Logo({ variant = "full", iconSize = 48, className = "", ...props }: LogoProps) {
  // Monogram SVG with Two stylized Ls + Slanted Test Tube + Drop
  const logoIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      {...props}
    >
      {/* Background/Base elements - Subtle Shadow effect */}
      <g filter="url(#drop-shadow)">
        {/* Stylized Red "L" (Left Monogram Curve) */}
        <path
          d="M172 45 C158 55, 142 75, 131 98 C115 130, 95 185, 95 205 C95 218, 108 223, 128 223 C155 223, 185 212, 205 198 C208 196, 210 198, 206 204 C192 225, 148 245, 115 245 C86 245, 70 230, 70 205 C70 170, 95 105, 118 68 C131 46, 148 30, 168 30 C175 30, 180 34, 180 40 C180 43, 177 44, 172 45 Z"
          fill="#cf2027"
        />

        {/* Stylized Blue "L" (Right Monogram Curve) */}
        <path
          d="M212 55 C202 65, 188 85, 175 110 C162 135, 144 175, 144 195 C144 205, 152 210, 168 210 C192 210, 222 195, 240 180 C243 178, 245 180, 242 185 C222 212, 182 232, 155 232 C132 232, 120 220, 120 198 C120 168, 140 115, 158 82 C170 60, 185 45, 202 45 C208 45, 212 48, 212 53 C212 55, 212 55, 212 55 Z"
          fill="#1e3a8a"
        />

        {/* Slanted Test Tube Representation */}
        {/* Slanted Tube outline and fluid */}
        <g transform="translate(15, 0)">
          {/* Blood Fluid Inside Tube */}
          <path
            d="M214 74 L190 178 C187 191, 196 200, 205 195 L228 92 Z"
            fill="url(#blood-gradient)"
          />
          {/* Outlines & Cap Ring of Test Tube */}
          <rect
            x="215"
            y="60"
            width="15"
            height="115"
            rx="7.5"
            transform="rotate(13, 222.5, 117.5)"
            stroke="#cf2027"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Measurement ticks on test tube */}
          <path d="M210 110 L216 111" stroke="#cf2027" strokeWidth="3" />
          <path d="M207 122 L213 123" stroke="#cf2027" strokeWidth="3" />
          <path d="M204 134 L210 135" stroke="#cf2027" strokeWidth="3" />
          <path d="M201 146 L207 147" stroke="#cf2027" strokeWidth="3" />

          {/* Blood droplet hanging above the tube */}
          <path
            d="M228 42 C228 42, 233 49, 233 53 C233 55.7, 230.7 58, 228 58 C225.2 58, 223 55.7, 223 53 C223 49, 228 42, 228 42 Z"
            fill="#cf2027"
          />
        </g>
      </g>

      {/* Definitions for Gradients and Shadows */}
      <defs>
        <linearGradient id="blood-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="100%" stopColor="#cf2027" />
        </linearGradient>
        <filter id="drop-shadow" x="50" y="20" width="240" height="240" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.08" />
        </filter>
      </defs>
    </svg>
  );

  if (variant === "icon-only") {
    return logoIcon;
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3.5 select-none ${className}`}>
        {logoIcon}
        <div className="text-left">
          <h1 className="font-sans font-black text-xl tracking-tight leading-none text-slate-950 uppercase">
            LAHORE LAB
          </h1>
          <p className="text-[10px] text-[#cf2027] font-serif tracking-tight font-black mt-1 leading-none italic">
            The right lab At the right time
          </p>
        </div>
      </div>
    );
  }

  // Vertical/Full logo format (exact match of branding guidelines)
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {logoIcon}
      <div className="mt-1">
        <h1 className="font-sans text-3xl font-black text-[#cf2027] tracking-tight leading-none select-none">
          Lahore Lab
        </h1>
        <p className="text-xs text-slate-800 font-serif font-semibold mt-1 tracking-normal leading-none italic select-none">
          The right <span className="text-[#cf2027] font-bold">lab</span> At the right time
        </p>
      </div>
    </div>
  );
}
