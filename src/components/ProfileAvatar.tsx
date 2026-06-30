import { useState } from "react";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/config/profile";

interface ProfileAvatarProps {
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  md: "h-44 w-36",
  lg: "h-60 w-48 md:h-64 md:w-52",
  xl: "h-80 w-64 md:h-[22rem] md:w-72",
};

const ProfileAvatar = ({ size = "lg", className }: ProfileAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-end justify-center overflow-visible",
        sizeClasses[size],
        className
      )}
    >
      {!imageError ? (
        <img
          src={PROFILE.image}
          alt={PROFILE.imageAlt}
          className="h-full w-full object-contain object-bottom"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-card text-4xl font-bold text-primary"
          aria-label={PROFILE.imageAlt}
        >
          HI
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
