import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface PaginationMyProp {
  next: string | null;
  prev: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (url: string, pageNumber: number) => void;
}

export const PaginationProducts = ({
  next,
  prev,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationMyProp) => {
  const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-10 p-10 border-t-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (prev) onPageChange(prev, currentPage - 1);
            }}
            className={
              !prev ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
        <div className="hidden md:flex items-center gap-1">
          {pageNumber.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (page === currentPage) return;
                  const targetUrl = `${BASE_URL}products/?page=${page}`;
                  onPageChange(targetUrl, page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (next) onPageChange(next, currentPage + 1);
            }}
            className={
              !next ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
