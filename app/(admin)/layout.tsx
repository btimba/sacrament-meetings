import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps): ReactElement {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-950">
          Meeting administration
        </h1>
        <nav aria-label="Meeting administration" className="mt-4">
          <Link
            href="/meetings/new"
            className="font-medium text-blue-800 underline underline-offset-4"
          >
            Create meeting
          </Link>
        </nav>
      </header>
      {children}
    </section>
  );
}
