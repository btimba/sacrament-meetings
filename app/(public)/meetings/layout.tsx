import type { ReactElement, ReactNode } from 'react';

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps): ReactElement {
  return <section className="mx-auto w-full max-w-5xl px-4 py-8">{children}</section>;
}
