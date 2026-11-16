import { Suspense } from 'react';
import type { ReactElement } from 'react';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps): ReactElement {
  return (
    <Suspense fallback={<p role="status">Loading meeting editor...</p>}>
      <EditMeetingContent params={params} />
    </Suspense>
  );
}

async function EditMeetingContent({
  params,
}: EditMeetingPageProps): Promise<ReactElement> {
  const { id } = await params;

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">Edit meeting</h2>
      <p className="mt-2 text-slate-600">
        Editing meeting {id} is not implemented yet.
      </p>
    </section>
  );
}
