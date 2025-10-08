import styles from "./ErrorMessage.module.scss";

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// A reusable error message component with optional retry button (TODO: implement retry)
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        <i
          className="bi bi-exclamation-triangle-fill text-danger"
          style={{ fontSize: "3rem" }}
          aria-hidden="true"
        ></i>
        <h3 className={styles.title}>Oops! Something went wrong</h3>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button
            className="btn btn-primary mt-3"
            onClick={onRetry}
            type="button"
          >
            <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
