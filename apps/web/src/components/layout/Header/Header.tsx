import { Link } from "react-router-dom";
import { APP_NAME } from "../../../config/constants";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/" className={styles.brand}>
          <span className={styles.icon} aria-hidden="true">
            ♔
          </span>
          <div className={styles.brandText}>
            <h1 className={styles.title}>{APP_NAME}</h1>
            <p className={styles.subtitle}>Powered by Chess.com API</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
