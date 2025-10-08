import type { TimeSince } from "@chess-gm/types";

// Calculate time since a given Unix timestamp then returns hours, minutes, seconds, and formatted string
// Example: 3661 seconds => { hours: 1, minutes: 1, seconds: 1, formatted: "01:01:01" }
export function calculateTimeSince(unixTimestamp: number): TimeSince {
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = Math.max(0, now - unixTimestamp);

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  const formatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return { hours, minutes, seconds, formatted };
}

// Format Unix timestamp to human-readable date
// Example: 1633036800 => "October 1, 2021"
export function formatDate(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format Unix timestamp to relative time
// Example: 1633036800 => "2 days ago"
export function formatRelativeTime(unixTimestamp: number): string {
  const timeSince = calculateTimeSince(unixTimestamp);

  if (timeSince.hours === 0 && timeSince.minutes === 0) {
    return `${timeSince.seconds} seconds ago`;
  }

  if (timeSince.hours === 0) {
    return `${timeSince.minutes} minutes ago`;
  }

  if (timeSince.hours < 24) {
    return `${timeSince.hours} hours ago`;
  }

  const days = Math.floor(timeSince.hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}
