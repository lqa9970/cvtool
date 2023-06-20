import { useEffect, useMemo, useState } from "react";
import { PAGINATION_SIZE } from "../constants";

type UsePaginationReturn<T> = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showingFrom: number;
  showingTo: number;
  pageCount: number;
  items: T[];
};

export default function usePagination<T>(entries: T[]): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = useMemo(
    () => Math.ceil(entries.length / PAGINATION_SIZE),
    [entries]
  );

  const showingFrom = useMemo(
    () => (currentPage - 1) * PAGINATION_SIZE,
    [currentPage]
  );

  const items = useMemo(
    () => entries.slice(showingFrom, currentPage * PAGINATION_SIZE),
    [entries, currentPage, showingFrom]
  );

  const showingTo = useMemo(
    () => showingFrom + items.length,
    [showingFrom, items]
  );

  // Making sure that page is set to 1 every time entries change
  useEffect(() => {
    setCurrentPage(1);
  }, [entries]);

  const safeSetCurrentPage = (page: number) => {
    if (page <= 0) {
      setCurrentPage(0);
      return;
    }
    if (page > pageCount) {
      setCurrentPage(pageCount);
      return;
    }

    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage: safeSetCurrentPage,
    showingFrom,
    showingTo,
    pageCount,
    items,
  };
}
