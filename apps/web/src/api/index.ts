import {
  createChessApiClient,
  createChessEndpoints,
} from "@chess-gm/api-client";
import { API_BASE_URL, IS_DEVELOPMENT } from "../config/constants";

// Create singleton API client
export const chessApi = createChessApiClient({
  baseURL: API_BASE_URL,
  isDevelopment: IS_DEVELOPMENT,
});

// Create singleton API endpoints
export const chessEndpoints = createChessEndpoints(chessApi);
