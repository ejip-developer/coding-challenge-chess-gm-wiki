import type { AxiosInstance } from "axios";
import type { GrandmastersResponse, PlayerProfile } from "@chess-gm/types";

// Chess.com API endpoints interface
export interface ChessEndpoints {
  getGrandmasters: () => Promise<string[]>;
  getPlayerProfile: (username: string) => Promise<PlayerProfile>;
}

// Create API endpoints using the provided Axios client
export function createChessEndpoints(client: AxiosInstance): ChessEndpoints {
  return {
    // Get list of all grandmasters
    // Endpoint: GET /titled/GM
    getGrandmasters: async (): Promise<string[]> => {
      const { data } = await client.get<GrandmastersResponse>("/titled/GM");
      return data.players;
    },

    // Get player profile by username
    // Endpoint: GET /player/{username}
    getPlayerProfile: async (username: string): Promise<PlayerProfile> => {
      const { data } = await client.get<PlayerProfile>(`/player/${username}`);
      return data;
    },
  };
}
