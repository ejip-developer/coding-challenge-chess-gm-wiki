import { useMemo } from "react";
import { AVATAR_FALLBACK_BG } from "@chess-gm/utils";
import styles from "./Avatar.module.scss";

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  username: string;
}

// Avatar component with image and colored initial fallback
export function Avatar({ src, alt, size = "md", username }: AvatarProps) {
  // Deterministic color based on username's first character
  const fallbackColor = useMemo(() => {
    const charCode = username.charCodeAt(0);
    const index = charCode % AVATAR_FALLBACK_BG.length;
    return AVATAR_FALLBACK_BG[index];
  }, [username]);

  const initial = username[0]?.toUpperCase() || "?";

  // If image available, render img element
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${styles.avatar} ${styles[size]}`}
        onError={(e) => {
          // Hide broken image
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    );
  }

  // Fallback to colored initial
  return (
    <div
      className={`${styles.avatarFallback} ${styles[size]}`}
      style={{ backgroundColor: fallbackColor }}
      role="img"
      aria-label={alt}
    >
      {initial}
    </div>
  );
}
