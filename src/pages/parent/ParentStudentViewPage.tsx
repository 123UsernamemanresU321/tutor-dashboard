import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentOverviewForParent } from '../../api/links';

export default function ParentStudentViewPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!studentId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getStudentOverviewForParent(studentId);
        setData(res);
      } catch (err: any) {
        setError(err?.message || 'Failed to load student overview.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [studentId]);

  if (!studentId) return <div>Invalid student</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">
          {data?.name ?? 'Student'} – Overview
        </h1>
        <p className="text-sm text-slate-600">
          High-level summary of sessions, invoices, and progress for this student.
        </p>
      </header>

      {error && <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>}

      <section className="bg-white shadow rounded-2xl p-4 space-y-2">
        <h2 className="text-lg font-semibold">Student details</h2>
        <div className="text-sm text-slate-700">Name: {data?.name ?? '—'}</div>
        <div className="text-sm text-slate-700">Grade: {data?.grade ?? '—'}</div>
        <div className="text-sm text-slate-700">School: {data?.school ?? '—'}</div>
      </section>

      <section className="bg-white shadow rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold">Sessions</h3>
          <div className="text-sm text-slate-700">Total: {data?.sessions?.total ?? 0}</div>
          <div className="text-sm text-slate-700">Completed: {data?.sessions?.completed ?? 0}</div>
          <div className="text-sm text-slate-700">Upcoming: {data?.sessions?.upcoming ?? 0}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold">Invoices</h3>
          <div className="text-sm text-slate-700">Paid: {data?.invoices?.paid ?? 0}</div>
          <div className="text-sm text-slate-700">Unpaid: {data?.invoices?.unpaid ?? 0}</div>
        </div>
      </section>
      {loading && <p className="text-sm text-slate-500">Loading…</p>}
    </div>
  );
}
