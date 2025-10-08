export interface PlayerProfile {
  "@id": string;
  url: string;
  username: string;
  title?: string;
  status: string;
  closed: "fair_play_violations" | "premium" | "mod" | "staff";
  name?: string;
  avatar?: string;
}
