export function calculateTotalPages(totalItems: number | null, pageSize: number): number {
  if (!totalItems || totalItems <= 0) return 1;
  return Math.ceil(totalItems / pageSize);
}

export function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const pages: number[] = [];
  const maxButtons = 5;

  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
