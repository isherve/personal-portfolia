import { useState } from "react";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/config/profile";

const NetworkBackdrop = () => (
  <svg
    className="absolute inset-0 h-full w-full text-primary/20 dark:text-primary/30"
    viewBox="0 0 500 600"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    aria-hidden
  >
    {[
      [70, 280],
      [190, 250],
      [310, 290],
      [410, 260],
      [130, 370],
      [250, 350],
      [370, 390],
      [90, 470],
      [210, 450],
      [340, 490],
      [160, 540],
      [300, 520],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity={0.5} />
    ))}
    <path
      d="M70 280 L190 250 L310 290 M190 250 L130 370 L250 350 M310 290 L410 260 M250 350 L370 390 M130 370 L90 470 M250 350 L210 450 M370 390 L340 490 M90 470 L210 450 L300 520"
      stroke="currentColor"
      strokeWidth="0.85"
      opacity="0.38"
    />
  </svg>
);

interface HeroPortraitProps {
  className?: string;
}

const HeroPortrait = ({ className }: HeroPortraitProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn("relative mx-auto w-full max-w-[520px] lg:max-w-none", className)}>
      <div className="relative flex h-[380px] sm:h-[440px] lg:h-[520px] xl:h-[560px] items-end justify-center overflow-visible">
        {/* Network lines stay below the face */}
        <div className="absolute inset-x-0 bottom-0 top-[32%] z-0 overflow-hidden pointer-events-none" aria-hidden>
          <NetworkBackdrop />
        </div>

        {!imageError ? (
          <img
            src={PROFILE.image}
            alt={PROFILE.imageAlt}
            className="relative z-10 h-[92%] sm:h-[94%] lg:h-[96%] w-auto max-w-full object-contain object-bottom"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="relative z-10 flex h-[85%] w-64 items-center justify-center rounded-2xl border border-primary/30 bg-card text-5xl font-bold text-primary"
            aria-label={PROFILE.imageAlt}
          >
            HI
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPortrait;
