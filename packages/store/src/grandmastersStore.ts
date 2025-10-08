import { create } from "zustand";
import type { ChessEndpoints } from "@chess-gm/api-client";
import { DEFAULT_ITEMS_PER_PAGE } from "@chess-gm/utils";

// State interface for grandmasters store
export interface GrandmastersState {
  // Data
  grandmasters: string[];
  filteredGrandmasters: string[];

  // Pagination
  currentPage: number;
  pageSize: number;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Search
  searchQuery: string;

  // Actions
  fetchGrandmasters: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setPageSize: (size: number) => void;
  reset: () => void;
}

// Factory function to create a zustand store for managing grandmasters data
// Accepts API endpoints and optional initial page size
export function createGrandmastersStore(
  endpoints: ChessEndpoints,
  initialPageSize = DEFAULT_ITEMS_PER_PAGE
) {
  return create<GrandmastersState>((set, get) => ({
    // Initial state
    grandmasters: [],
    filteredGrandmasters: [],
    currentPage: 0,
    pageSize: initialPageSize,
    isLoading: false,
    error: null,
    searchQuery: "",

    // Fetch all grandmasters from API
    fetchGrandmasters: async (): Promise<void> => {
      set({ isLoading: true, error: null });
      try {
        const players = await endpoints.getGrandmasters();
        set({
          grandmasters: players,
          filteredGrandmasters: players,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Failed to fetch grandmasters:", error);
        set({
          error: "Failed to load grandmasters. Please try again.",
          isLoading: false,
        });
      }
    },

    // Set current page (0-indexed)
    setCurrentPage: (page: number): void => {
      set({ currentPage: page });
      // Smooth scroll to top
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    // Search/Filter grandmasters by username
    setSearchQuery: (query: string): void => {
      const { grandmasters } = get();
      const normalizedQuery = query.toLowerCase().trim();

      const filtered = normalizedQuery
        ? grandmasters.filter((username) =>
            username.toLowerCase().includes(normalizedQuery)
          )
        : grandmasters;

      set({
        searchQuery: query,
        filteredGrandmasters: filtered,
        currentPage: 0, // Reset to first page on search
      });
    },

    // Update page size
    setPageSize: (size: number): void => {
      set({
        pageSize: size,
        currentPage: 0, // Reset to first page when changing page size
      });
    },

    // Reset store to initial state
    reset: (): void => {
      set({
        grandmasters: [],
        filteredGrandmasters: [],
        currentPage: 0,
        isLoading: false,
        error: null,
        searchQuery: "",
      });
    },
  }));
}

// Type for using the grandmasters store
export type UseGrandmastersStore = ReturnType<typeof createGrandmastersStore>;
