import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

export default function ReportsPage() {
  const supabase = getSupabaseClient();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [homework, setHomework] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [{ data: invData, error: invErr }, { data: sessData, error: sessErr }, { data: hwData, error: hwErr }] =
          await Promise.all([
            supabase.from('invoices').select('id,total,paid,issue_date,due_date,student_id'),
            supabase.from('sessions').select('id,subject,duration_hours,is_completed'),
            supabase.from('homework').select('id,status'),
          ]);
        if (invErr) throw invErr;
        if (sessErr) throw sessErr;
        if (hwErr) throw hwErr;
        if (!isMounted) return;
        setInvoices(invData ?? []);
        setSessions(sessData ?? []);
        setHomework(hwData ?? []);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load reports');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const earnings = useMemo(() => {
    const list = invoices.filter((inv) => inv.issue_date && new Date(inv.issue_date) >= startOfMonth);
    const sum = list.reduce((acc, inv) => acc + Number(inv.total || 0), 0);
    return { sum, count: list.length };
  }, [invoices, startOfMonth]);

  const attendance = useMemo(() => {
    const total = sessions.length;
    const completed = sessions.filter((s) => s.is_completed).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [sessions]);

  const hwStats = useMemo(() => {
    const total = homework.length;
    const completed = homework.filter((h) => (h.status || '').toLowerCase() === 'completed').length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [homework]);

  const subjectHours = useMemo(() => {
    const map: Record<string, number> = { Physics: 0, Chemistry: 0, Maths: 0 };
    sessions.forEach((s) => {
      if (map[s.subject]) map[s.subject] += Number(s.duration_hours || 0);
    });
    return map;
  }, [sessions]);

  const unpaidInvoices = invoices.filter((inv) => !inv.paid);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Reports</h2>
        <p className="text-xs text-slate-500">Earnings, attendance, subject mix, and homework completion.</p>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-xs">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white shadow rounded-2xl p-4">
          <div className="text-[11px] text-slate-500">This month earnings</div>
          <div className="text-2xl font-semibold">R {earnings.sum.toFixed(0)}</div>
          <div className="text-[10px] text-slate-500">{earnings.count} invoices this month</div>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <div className="text-[11px] text-slate-500">Attendance</div>
          <div className="text-2xl font-semibold">{attendance.pct}%</div>
          <div className="text-[10px] text-slate-500">
            {attendance.completed}/{attendance.total} completed
          </div>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <div className="text-[11px] text-slate-500">Homework completion</div>
          <div className="text-2xl font-semibold">{hwStats.pct}%</div>
          <div className="text-[10px] text-slate-500">
            {hwStats.completed}/{hwStats.total} completed
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-2">Subject hours (total)</h3>
          <ul className="space-y-1">
            {Object.entries(subjectHours).map(([subj, hours]) => (
              <li key={subj} className="flex justify-between">
                <span>{subj}</span>
                <span>{hours.toFixed(1)}h</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-2">Unpaid invoices</h3>
          <ul className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : unpaidInvoices.length === 0 ? (
              <li className="text-slate-500">No unpaid invoices.</li>
            ) : (
              unpaidInvoices.map((inv) => (
                <li key={inv.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">Invoice {inv.id}</div>
                  <div className="text-[10px] text-slate-500">
                    Due {inv.due_date || 'n/a'} • R {Number(inv.total || 0).toFixed(2)}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
