import { useState, useEffect } from "react";
import { chessEndpoints } from "../api";
import type { PlayerProfile } from "@chess-gm/types";

export interface UseGrandmasterProfileResult {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
}

// Custom hook to fetch and manage the state of a grandmaster's player profile
export function useGrandmasterProfile(
  username: string
): UseGrandmasterProfileResult {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const data = await chessEndpoints.getPlayerProfile(username);

        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to fetch player profile:", err);
        if (isMounted) {
          setError("Failed to load player profile. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (username) {
      fetchProfile();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [username]);

  return { profile, loading, error };
}
