import type { ReactElement } from 'react';

export default function MeetingsLoading(): ReactElement {
  return (
    <div role="status" className="mx-auto max-w-5xl px-4 py-8">
      <p className="mb-5 text-sm font-medium text-slate-600">
        Loading meeting schedule...
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-48 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}
