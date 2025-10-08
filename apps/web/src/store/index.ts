import { createGrandmastersStore } from "@chess-gm/store";
import { chessEndpoints } from "../api";
import { ITEMS_PER_PAGE } from "../config/constants";

// Zustand store for managing grandmasters data
export const useGrandmastersStore = createGrandmastersStore(
  chessEndpoints,
  ITEMS_PER_PAGE
);
