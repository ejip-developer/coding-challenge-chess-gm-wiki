import styles from "./Spinner.module.scss";

export interface SpinnerProps {
  message?: string;
}

export function Spinner({ message }: SpinnerProps) {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner}>
        <span className={styles.piece} aria-hidden="true">
          ♔
        </span>
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
