const VISIBLE_PAGE_COUNT = 3;

/**
 * Returns exactly three page numbers (or fewer when totalPages < 3),
 * sliding so the current page stays in view when possible.
 */
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  visibleCount = VISIBLE_PAGE_COUNT,
): number[] => {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= visibleCount) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(visibleCount / 2);
  let start = currentPage - half;
  start = Math.max(1, Math.min(start, totalPages - visibleCount + 1));

  return Array.from({ length: visibleCount }, (_, index) => start + index);
};
