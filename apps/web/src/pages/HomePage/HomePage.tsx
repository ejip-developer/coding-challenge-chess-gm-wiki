import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGrandmastersStore } from "../../store/index";
import { Avatar, Spinner, ErrorMessage } from "@chess-gm/ui";
import ReactPaginate from "react-paginate";
import styles from "./HomePage.module.scss";

export function HomePage() {
  const {
    filteredGrandmasters,
    currentPage,
    pageSize,
    isLoading,
    error,
    fetchGrandmasters,
    setCurrentPage,
    setSearchQuery,
    searchQuery,
  } = useGrandmastersStore();

  // Fetch grandmasters on mount
  useEffect(() => {
    fetchGrandmasters();
  }, [fetchGrandmasters]);

  // Calculate pagination
  const pageCount = Math.ceil(filteredGrandmasters.length / pageSize);

  // Get current page items
  const currentPageItems = useMemo(() => {
    const startIndex = currentPage * pageSize;
    return filteredGrandmasters.slice(startIndex, startIndex + pageSize);
  }, [filteredGrandmasters, currentPage, pageSize]);

  // Handle page change
  const handlePageChange = (data: { selected: number }): void => {
    setCurrentPage(data.selected);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Handle clear search
  const handleClearSearch = (): void => {
    setSearchQuery("");
  };

  if (isLoading) return <Spinner message="Loading grandmasters..." />;
  if (error)
    return <ErrorMessage message={error} onRetry={fetchGrandmasters} />;

  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min(
    (currentPage + 1) * pageSize,
    filteredGrandmasters.length
  );

  return (
    <div className="container py-4">
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>
          <i className="bi bi-trophy-fill me-2" aria-hidden="true"></i>
          All Grandmasters
        </h2>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className="input-group input-group-lg">
            <span className="input-group-text">
              <i className="bi bi-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search grandmasters..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search grandmasters"
            />
            {searchQuery && (
              <button
                className="btn btn-outline-secondary"
                onClick={handleClearSearch}
                aria-label="Clear search"
                type="button"
              >
                <i className="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </div>

        {/* Results info */}
        <p className="text-muted">
          {filteredGrandmasters.length === 0 && searchQuery ? (
            "No grandmasters found"
          ) : (
            <>
              Showing {startIndex}–{endIndex} of{" "}
              <strong>{filteredGrandmasters.length.toLocaleString()}</strong>{" "}
              grandmasters
            </>
          )}
        </p>
      </div>

      {/* Grandmaster Grid */}
      {currentPageItems.length === 0 ? (
        <div className={styles.emptyState}>
          <i
            className="bi bi-search"
            style={{ fontSize: "3rem", color: "#6c757d" }}
            aria-hidden="true"
          ></i>
          <p className="mt-3 text-muted">
            No grandmasters found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {currentPageItems.map((username) => (
            <Link
              key={username}
              to={`/profile/${username}`}
              className={styles.cardLink}
            >
              <article className="card shadow-sm h-100">
                <div className={styles.cardBody}>
                  <Avatar
                    username={username}
                    alt={`${username}'s avatar`}
                    size="md"
                  />
                  <div className={styles.info}>
                    <h3 className={styles.username}>{username}</h3>
                    <span className={styles.badge}>
                      <i
                        className="bi bi-trophy-fill me-1"
                        aria-hidden="true"
                      ></i>
                      Grandmaster
                    </span>
                  </div>
                  <i
                    className="bi bi-chevron-right text-muted"
                    aria-hidden="true"
                  ></i>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <nav aria-label="Grandmasters pagination" className="mt-4">
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={currentPage}
            onPageChange={handlePageChange}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            disabledClassName="disabled"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            previousLabel={
              <>
                <i className="bi bi-chevron-left" aria-hidden="true"></i>
                <span className="d-none d-sm-inline ms-1">Previous</span>
              </>
            }
            nextLabel={
              <>
                <span className="d-none d-sm-inline me-1">Next</span>
                <i className="bi bi-chevron-right" aria-hidden="true"></i>
              </>
            }
            breakLabel="..."
            ariaLabelBuilder={(pageIndex) => `Go to page ${pageIndex}`}
          />
        </nav>
      )}
    </div>
  );
}
