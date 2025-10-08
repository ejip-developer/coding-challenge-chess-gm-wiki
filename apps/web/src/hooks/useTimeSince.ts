import { useState, useEffect } from "react";
import { calculateTimeSince } from "@chess-gm/utils";
import type { TimeSince } from "@chess-gm/types";

// Custom hook to calculate and update time since last online timestamp
export function useTimeSince(lastOnlineTimestamp: number): TimeSince {
  const [timeSince, setTimeSince] = useState<TimeSince>(
    calculateTimeSince(lastOnlineTimestamp)
  );

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setTimeSince(calculateTimeSince(lastOnlineTimestamp));
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  return timeSince;
}
