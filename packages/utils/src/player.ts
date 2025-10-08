import type { PlayerProfile, PlayerStatus } from "@chess-gm/types";

// Check if player account is closed
export function isPlayerClosed(profile: PlayerProfile): boolean {
  return profile.status.startsWith("closed");
}

// Get human-readable label for player status based on status value
export function getPlayerStatusLabel(status: PlayerStatus): string {
  const labels: Record<PlayerStatus, string> = {
    basic: "Free Account",
    premium: "Premium Member",
    mod: "Moderator",
    staff: "Chess.com Staff",
    closed: "Account Closed",
    "closed:fair_play_violations": "Banned (Fair Play Violation)",
  };
  return labels[status];
}

// Get color code for player status based on status value
export function getPlayerStatusColor(status: PlayerStatus): string {
  const colors: Record<PlayerStatus, string> = {
    basic: "secondary",
    premium: "warning",
    mod: "info",
    staff: "primary",
    closed: "dark",
    "closed:fair_play_violations": "danger",
  };
  return colors[status];
}

// Check if player has premium access (premium, mod, or staff)
export function hasPremiumAccess(status: PlayerStatus): boolean {
  return ["premium", "mod", "staff"].includes(status);
}
