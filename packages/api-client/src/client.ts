import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from "axios";
import { DEFAULT_API_TIMEOUT } from "@chess-gm/utils";

// Configuration interface for the Chess.com API clients
export interface ChessApiClientConfig {
  baseURL: string;
  timeout?: number;
  isDevelopment?: boolean;
}

// Create and configure an Axios instance for the Chess.com API
export function createChessApiClient(
  config: ChessApiClientConfig
): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? DEFAULT_API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor for logging (development only)
  if (config.isDevelopment) {
    client.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
        console.log(
          `[API Request] ${requestConfig.method?.toUpperCase()} ${
            requestConfig.url
          }`
        );
        return requestConfig;
      }
    );
  }

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const message = error.response?.data
        ? String(error.response.data)
        : error.message;
      console.error("[API Error]", message);
      return Promise.reject(error);
    }
  );

  return client;
}
