import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
  return (
    <footer className="no-print mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-5 text-sm text-slate-600">
        Sacrament meeting schedules
      </div>
    </footer>
  );
}
