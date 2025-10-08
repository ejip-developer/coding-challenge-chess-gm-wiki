//Values from .env file or defaults

export const IS_DEVELOPMENT = import.meta.env.VITE_DEVELOPMENT;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.chess.com/pub";

export const APP_NAME =
  import.meta.env.VITE_APP_NAME || "Chess Grandmasters Wiki";

export const ITEMS_PER_PAGE = Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 24;

// Feature Flags (future use)
export const FEATURE_FLAGS = {
  enableDarkMode: false,
  enableStorybook: false,
  enableAnalytics: false,
} as const;
