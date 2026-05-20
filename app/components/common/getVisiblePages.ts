const VISIBLE_PAGE_COUNT = 3;

/**
 * Returns exactly three page numbers (or fewer when totalPages < 3).
 * Pages are grouped into fixed windows of three; the window only advances
 * when the current page moves into the next or previous group (e.g. via
 * prev/next from the last or first visible page button).
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

  const chunkIndex = Math.floor((currentPage - 1) / visibleCount);
  let start = chunkIndex * visibleCount + 1;
  start = Math.max(1, Math.min(start, totalPages - visibleCount + 1));

  return Array.from({ length: visibleCount }, (_, index) => start + index);
};
