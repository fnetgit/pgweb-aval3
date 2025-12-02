import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePagination(totalItems: number, itemsPerPage: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validPage =
    totalPages > 0 && currentPage > totalPages ? 1 : currentPage;
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    if (validPage === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", validPage.toString());
    }
    setSearchParams(searchParams, { replace: true });
  }, [validPage, searchParams, setSearchParams]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage: validPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    resetPage,
  };
}
