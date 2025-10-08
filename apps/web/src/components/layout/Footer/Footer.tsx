import styles from "./Footer.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className="mb-0 text-center">
          © {currentYear} Chess Grandmasters Wiki · Data provided by{" "}
          <a
            href="https://www.chess.com/news/view/published-data-api"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Chess.com Public API
          </a>
        </p>
      </div>
    </footer>
  );
}
