'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages?: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageCount =
    totalPages !== undefined &&
    Number.isSafeInteger(totalPages) &&
    totalPages > 0
      ? totalPages
      : 0;
  const requestedPage = Number(searchParams.get('page') ?? '1');
  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Meeting pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          scroll={false}
          className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded bg-slate-200 px-4 py-2 text-slate-500">
          Previous
        </span>
      )}
      <span aria-current="page" className="text-sm text-slate-700">
        Page {currentPage} of {pageCount}
      </span>
      {currentPage < pageCount ? (
        <Link
          href={createPageURL(currentPage + 1)}
          scroll={false}
          className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
        >
          Next
        </Link>
      ) : (
        <span className="rounded bg-slate-200 px-4 py-2 text-slate-500">
          Next
        </span>
      )}
    </nav>
  );
}
