import { getVisiblePages } from "./getVisiblePages";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  ariaLabel?: string;
};

const navButtonClass =
  "text-policies-pagination-ink hover:text-policies-pagination-nav-hover policies-focus-ring rounded-full p-1 disabled:cursor-not-allowed disabled:opacity-40";

const pageButtonIdleClass =
  "w-10 h-10 rounded-full border-2 border-policies-pagination-border flex items-center justify-center font-bold text-policies-pagination-ink transition-colors hover:bg-policies-pagination-hover-bg policies-focus-ring";

const pageButtonActiveClass =
  "w-10 h-10 rounded-full bg-policies-pagination-active-bg text-policies-pagination-active-text flex items-center justify-center font-bold policies-focus-ring";

const ChevronLeftIcon = () => (
  <svg
    className="h-5 w-5 sm:h-6 sm:w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="h-5 w-5 sm:h-6 sm:w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  ariaLabel = "Pagination",
}: PaginationProps) => {
  if (totalPages < 2) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const visiblePages = getVisiblePages(safeCurrentPage, totalPages);
  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === totalPages;

  return (
    <nav
      className={`flex items-center justify-center gap-4 pt-4 text-policies-pagination-ink [color-scheme:light] ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className={navButtonClass}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {visiblePages.map((page) => {
        const isActive = page === safeCurrentPage;

        return (
          <button
            key={page}
            type="button"
            className={isActive ? pageButtonActiveClass : pageButtonIdleClass}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={navButtonClass}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
};

export { Pagination };
