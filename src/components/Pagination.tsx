import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  hasMore: boolean;
}

export default function Pagination({ currentPage, totalPages, baseUrl, hasMore }: PaginationProps) {
  if (totalPages <= 1 && !hasMore) {
    return null;
  }

  const pages = [];
  const displayPages = hasMore ? totalPages : totalPages;
  
  for (let i = 1; i <= displayPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <nav className="nav-bar nav-bar--center">
        {currentPage <= 1 ? (
          <span className="nav-link nav-link--black nav-link--disabled">Prev</span>
        ) : (
          <Link 
            className="nav-link nav-link--black" 
            href={`${baseUrl}?page=${currentPage - 1}`}
          >
            Prev
          </Link>
        )}

        {pages.map((pageNum) => (
          <Link
            key={pageNum}
            className={`nav-link nav-link--black${currentPage === pageNum ? ' nav-link--active' : ''}`}
            href={`${baseUrl}?page=${pageNum}`}
          >
            {pageNum}
          </Link>
        ))}

        {hasMore && currentPage === totalPages && (
          <Link
            className="nav-link nav-link--black"
            href={`${baseUrl}?page=${currentPage + 1}`}
          >
            {totalPages + 1}
          </Link>
        )}

        {currentPage >= totalPages && !hasMore ? (
          <span className="nav-link nav-link--black nav-link--disabled">Next</span>
        ) : (
          <Link 
            className="nav-link nav-link--black" 
            href={`${baseUrl}?page=${currentPage + 1}`}
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
