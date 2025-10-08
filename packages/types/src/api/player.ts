export type PlayerStatus =
  | "basic"
  | "premium"
  | "mod"
  | "staff"
  | "closed"
  | "closed:fair_play_violations";

export interface PlayerProfile {
  "@id": string;
  url: string;
  username: string;
  player_id: number;
  title?: string;
  status: PlayerStatus;
  name?: string;
  avatar?: string;
  location?: string;
  country: string;
  joined: number;
  last_online: number;
  followers: number;
  is_streamer: boolean;
  twitch_url?: string;
  fide?: number;
  verified?: boolean;
  league?: string;
  streaming_platforms?: string[];
}
