'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get('query') ?? '';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // always reset to page 1 on a new search
    const normalizedTerm = term.trim();
    if (normalizedTerm) {
      params.set('query', normalizedTerm);
    } else {
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  useEffect(() => {
    handleSearch.cancel();
  }, [handleSearch, searchParams]);

  return (
    <input
      key={searchParams.toString()}
      type="search"
      placeholder="Search by speaker, leader, or meeting type..."
      defaultValue={query}
      onChange={(e) => handleSearch(e.target.value)}
      aria-label="Search meetings"
      className="w-full max-w-xl rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-950 shadow-sm focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
    />
  );
}
