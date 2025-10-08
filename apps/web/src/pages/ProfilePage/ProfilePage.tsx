import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useGrandmasterProfile } from "../../hooks/useGrandmasterProfile";
import { useTimeSince } from "../../hooks/useTimeSince";
import { Avatar, Spinner, ErrorMessage } from "@chess-gm/ui";
import {
  formatDate,
  formatRelativeTime,
  getPlayerStatusLabel,
  getPlayerStatusColor,
  isPlayerClosed,
} from "@chess-gm/utils";
import styles from "./ProfilePage.module.scss";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return <ErrorMessage message="No username provided" />;
  }

  const { profile, loading, error } = useGrandmasterProfile(username);

  const timeSince = useTimeSince(profile?.last_online ?? Date.now() / 1000);

  const showRealtimeClock = useMemo(() => {
    if (!profile) return false;

    const hoursSinceLastOnline = Math.floor(
      (Date.now() / 1000 - profile.last_online) / 3600
    );

    return hoursSinceLastOnline < 24;
  }, [profile]);

  if (loading || !profile) {
    return <Spinner message="Loading profile..." />;
  }

  if (loading) return <Spinner message="Loading profile..." />;
  if (error || !profile) {
    return <ErrorMessage message={error || "Profile not found"} />;
  }

  const isClosed = isPlayerClosed(profile);
  const statusLabel = getPlayerStatusLabel(profile.status);
  const statusColor = getPlayerStatusColor(profile.status);

  return (
    <div className="container py-4">
      <div className={styles.backButton}>
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
          Back to all Grandmasters
        </Link>
      </div>

      {/* Account Closed Warning */}
      {isClosed && (
        <div className="alert alert-danger" role="alert">
          <i
            className="bi bi-exclamation-triangle-fill me-2"
            aria-hidden="true"
          ></i>
          <strong>Account Status:</strong> {statusLabel}
        </div>
      )}

      {/* Profile Header */}
      <article className="card shadow-sm mb-4">
        <div className="card-body">
          <div className={styles.header}>
            <Avatar
              src={profile.avatar}
              username={profile.username}
              alt={`${profile.username}'s profile picture`}
              size="xl"
            />
            <div className={styles.headerInfo}>
              <h1 className={styles.usernameTitle}>{profile.username}</h1>
              {profile.name && (
                <p className={styles.realName}>{profile.name}</p>
              )}

              <div className={styles.badges}>
                {profile.title && (
                  <span className="badge bg-warning text-dark">
                    <i
                      className="bi bi-trophy-fill me-1"
                      aria-hidden="true"
                    ></i>
                    {profile.title}
                  </span>
                )}
                <span className={`badge bg-${statusColor}`}>{statusLabel}</span>
                {profile.verified && (
                  <span className="badge bg-primary" title="Verified account">
                    <i
                      className="bi bi-patch-check-fill me-1"
                      aria-hidden="true"
                    ></i>
                    Verified
                  </span>
                )}
                {profile.is_streamer && (
                  <span className="badge bg-danger">
                    <i className="bi bi-broadcast me-1" aria-hidden="true"></i>
                    Streamer
                  </span>
                )}
              </div>

              {profile.location && (
                <p className="text-muted mb-0 mt-2">
                  <i className="bi bi-geo-alt-fill me-1" aria-hidden="true"></i>
                  {profile.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Activity Clock */}
      <section className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className={styles.sectionTitle}>
            <i className="bi bi-clock-history me-2" aria-hidden="true"></i>
            Activity Status
          </h2>
          <div className={styles.clockContent}>
            <div>
              {showRealtimeClock ? (
                <>
                  <p className="text-muted mb-2">
                    Time since last online (hh:mm:ss):
                  </p>
                  <div className={styles.clockDisplay} aria-live="polite">
                    {timeSince.formatted}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-muted mb-2">Day(s) since last online:</p>
                  <div className={styles.relativeTime}>
                    {formatRelativeTime(profile.last_online)}
                  </div>
                </>
              )}
            </div>
            <div className={styles.clockMeta}>
              <small className="text-muted">Last seen:</small>
              <p className="mb-0 fw-medium">
                {formatDate(profile.last_online)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className={styles.sectionTitle}>
            <i className="bi bi-bar-chart-fill me-2" aria-hidden="true"></i>
            Player Statistics
          </h2>
          <dl className={styles.statsGrid}>
            <div className={styles.stat}>
              <dt className="text-muted small">Player ID</dt>
              <dd className="mb-0 fw-bold">{profile.player_id}</dd>
            </div>
            <div className={styles.stat}>
              <dt className="text-muted small">Joined</dt>
              <dd className="mb-0 fw-bold">{formatDate(profile.joined)}</dd>
            </div>
            <div className={styles.stat}>
              <dt className="text-muted small">Followers</dt>
              <dd className="mb-0 fw-bold">
                {profile.followers.toLocaleString()}
              </dd>
            </div>
            {profile.league && (
              <div className={styles.stat}>
                <dt className="text-muted small">League</dt>
                <dd className="mb-0 fw-bold">{profile.league}</dd>
              </div>
            )}
            {profile.fide && (
              <div className={styles.stat}>
                <dt className="text-muted small">FIDE Rating</dt>
                <dd className="mb-0 fw-bold">{profile.fide}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* External Links */}
      <section className="card shadow-sm">
        <div className="card-body">
          <h2 className={styles.sectionTitle}>
            <i className="bi bi-link-45deg me-2" aria-hidden="true"></i>
            External Links
          </h2>
          <div className={styles.links}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i
                className="bi bi-box-arrow-up-right me-2"
                aria-hidden="true"
              ></i>
              View on Chess.com
            </a>
            {profile.twitch_url && (
              <a
                href={profile.twitch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="bi bi-twitch me-2" aria-hidden="true"></i>
                Watch on Twitch
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
