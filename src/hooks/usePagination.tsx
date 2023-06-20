import { useEffect, useMemo, useState } from "react";

const PAGINATION_SIZE = 12; // Results on one page

export default function usePagination<T>(entries: T[]) {
  const pageCount = useMemo(
    () => Math.ceil(entries.length / PAGINATION_SIZE),
    [entries]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const showingFrom = useMemo(
    () => (currentPage - 1) * PAGINATION_SIZE + 1,
    [currentPage]
  );
  const showingTo = useMemo(
    () =>
      currentPage === pageCount
        ? entries.length
        : currentPage * PAGINATION_SIZE,
    [currentPage, entries, pageCount]
  );

  // Making sure that page is set to 1 every time entries change
  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  return {
    currentPage,
    setCurrentPage,
    showingFrom,
    showingTo,
    pageCount,
    items: entries.slice(
      (currentPage - 1) * PAGINATION_SIZE, // Doing - 1 because index starts from 1 and not 0
      currentPage * PAGINATION_SIZE
    ),
  };
}
