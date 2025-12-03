import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getSupabaseClient } from '../../lib/supabaseClient';

export default function ParentStudentViewPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const supabase = getSupabaseClient();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!studentId) return;
      setLoading(true);
      setError(null);
      try {
        const { data: stu, error: stuErr } = await supabase
          .from('students')
          .select('id,name,grade_level,school_name,contract_signed')
          .eq('id', studentId)
          .maybeSingle();
        if (stuErr) throw stuErr;
        if (!stu) throw new Error('Student not found');

        const { data: sessions, error: sessErr } = await supabase
          .from('sessions')
          .select('id,date,start_time,duration_hours,completed,session_students(student_id)')
          .order('date', { ascending: true });
        if (sessErr) throw sessErr;

        const relevantSessions =
          sessions?.filter((s: any) => (s.session_students || []).some((ss: any) => ss.student_id === studentId)) ?? [];
        const now = new Date();
        const counts = {
          total: relevantSessions.length,
          completed: relevantSessions.filter((s: any) => s.completed).length,
          upcoming: relevantSessions.filter((s: any) => new Date(s.date) >= now).length,
        };

        const [{ count: invPaid }, { count: invUnpaid }] = await Promise.all([
          supabase.from('invoices').select('id', { head: true, count: 'exact' }).eq('student_id', studentId).eq('paid', true),
          supabase.from('invoices').select('id', { head: true, count: 'exact' }).eq('student_id', studentId).eq('paid', false),
        ]);

        if (!isMounted) return;
        setData({
          id: stu.id,
          name: stu.name,
          grade: stu.grade_level ?? '',
          school: stu.school_name ?? '',
          contract_signed: stu.contract_signed,
          sessions: counts,
          invoices: { paid: invPaid ?? 0, unpaid: invUnpaid ?? 0 },
        });
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load student overview.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    void load();
    return () => {
      isMounted = false;
    };
  }, [studentId, supabase]);

  if (!studentId) return <div>Invalid student</div>;

  const contractBadge = useMemo(() => {
    if (!data) return null;
    return (
      <span
        className={`text-[11px] px-2 py-1 rounded-full ${
          data.contract_signed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}
      >
        {data.contract_signed ? 'Contract signed' : 'Contract not signed'}
      </span>
    );
  }, [data]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">
          {data?.name ?? 'Student'} – Overview
        </h1>
        <p className="text-sm text-slate-600">
          High-level summary of sessions, invoices, and progress for this student.
        </p>
        {contractBadge}
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
