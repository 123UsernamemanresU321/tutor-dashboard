import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type InvoiceRow = {
  id: string;
  student_id: string | null;
  total: number | null;
  paid: boolean | null;
  due_date: string | null;
  issue_date: string | null;
};

type StudentRow = {
  id: string;
  name: string;
};

type UnbilledRow = {
  student: string;
  hours: number;
  lastDate: string;
};

export default function FinancePage() {
  const supabase = getSupabaseClient();
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [{ data: stuData, error: stuErr }, { data: invData, error: invErr }, { data: sessData, error: sessErr }] =
          await Promise.all([
            supabase.from('students').select('id,name'),
            supabase.from('invoices').select('id,student_id,total,paid,due_date,issue_date'),
            supabase.from('sessions').select('id,date,duration_hours,invoice_id,session_students(student_id)'),
          ]);
        if (stuErr) throw stuErr;
        if (invErr) throw invErr;
        if (sessErr) throw sessErr;
        if (!isMounted) return;
        setStudents(stuData ?? []);
        setInvoices(invData ?? []);
        setSessions(sessData ?? []);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load finance data');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const balances = useMemo(() => {
    const map: Record<string, { unpaid: number; count: number }> = {};
    invoices.forEach((inv) => {
      if (!inv.student_id) return;
      const bucket = map[inv.student_id] ?? { unpaid: 0, count: 0 };
      if (!inv.paid) {
        bucket.unpaid += Number(inv.total || 0);
        bucket.count += 1;
      }
      map[inv.student_id] = bucket;
    });
    return students.map((s) => ({
      student: s.name,
      balance: map[s.id]?.unpaid ?? 0,
      unpaid: map[s.id]?.count ?? 0,
    }));
  }, [students, invoices]);

  const overdue = useMemo(() => {
    const today = new Date();
    return invoices
      .filter((inv) => !inv.paid && inv.due_date && new Date(inv.due_date) < today)
      .map((inv) => {
        const studentName = students.find((s) => s.id === inv.student_id)?.name ?? 'Student';
        return { ...inv, student: studentName };
      });
  }, [invoices, students]);

  const unbilled = useMemo<UnbilledRow[]>(() => {
    // sessions with no invoice_id considered unbilled
    const map: Record<string, { hours: number; last: string }> = {};
    sessions.forEach((s) => {
      if (s.invoice_id) return;
      const studentId = s.session_students?.[0]?.student_id;
      if (!studentId) return;
      const hours = Number(s.duration_hours || 0);
      const lastDate = s.date || '';
      const bucket = map[studentId] ?? { hours: 0, last: lastDate };
      bucket.hours += hours;
      if (bucket.last < lastDate) bucket.last = lastDate;
      map[studentId] = bucket;
    });
    return Object.entries(map).map(([sid, val]) => ({
      student: students.find((s) => s.id === sid)?.name ?? 'Student',
      hours: val.hours,
      lastDate: val.last || 'n/a',
    }));
  }, [sessions, students]);

  const forecast = useMemo(() => {
    const today = new Date();
    const soon = new Date(today.getTime() + 14 * 86400000);
    const dueSoon = invoices.filter(
      (inv) => !inv.paid && inv.due_date && new Date(inv.due_date) >= today && new Date(inv.due_date) <= soon,
    );
    const overdueTotal = overdue.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
    const dueSoonTotal = dueSoon.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
    return { overdueTotal, dueSoonTotal, dueSoon };
  }, [invoices, overdue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-semibold">Finance</h2>
          <p className="text-xs text-slate-500">Invoices, balances & overdue reminders.</p>
        </div>
        <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 shadow-sm">
          ＋ Create invoice
        </button>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-xs">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs">
        <div className="bg-white shadow rounded-2xl p-4 col-span-2 max-h-[75vh] overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-semibold mb-2">Student balances</h3>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-left text-[10px] text-slate-500 border-b border-slate-200">
                <th className="py-1 pr-1">Student</th>
                <th className="py-1 pr-1 text-right">Balance</th>
                <th className="py-1 pr-1 text-right">Unpaid invoices</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-2 text-slate-500" colSpan={3}>
                    Loading…
                  </td>
                </tr>
              ) : (
                balances.map((row) => (
                  <tr key={row.student}>
                    <td className="py-1 pr-1">{row.student}</td>
                    <td className="py-1 pr-1 text-right">R {Number(row.balance || 0).toFixed(2)}</td>
                    <td className="py-1 pr-1 text-right">{row.unpaid}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 col-span-1 max-h-[75vh] overflow-y-auto scrollbar-thin">
          <h3 className="text-sm font-semibold mb-2">Overdue invoices</h3>
          <ul className="space-y-2 text-[11px]">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : overdue.length === 0 ? (
              <li className="text-slate-500">No overdue invoices.</li>
            ) : (
              overdue.map((inv) => (
                <li key={inv.id} className="border border-rose-200 bg-rose-50 text-rose-900 rounded-lg px-2 py-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{inv.student}</div>
                      <div className="text-[10px]">
                        Invoice {inv.id} • Due {inv.due_date} • R {Number(inv.total || 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="text-[10px] px-2 py-0.5 rounded-lg border border-rose-300 bg-rose-100">Mark paid</button>
                      <button className="text-[10px] px-2 py-0.5 rounded-lg border border-rose-300 bg-white">Reminder text</button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <p className="mt-2 text-[10px] text-slate-500">
            Click “Reminder text” to generate a polite message you can paste into email or chat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-xs mt-4">
        <div className="bg-white shadow rounded-2xl p-4 col-span-2">
          <h3 className="text-sm font-semibold mb-2">Unbilled hours</h3>
          <ul className="space-y-2 text-[11px]">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : unbilled.length === 0 ? (
              <li className="text-slate-500">No unbilled sessions detected.</li>
            ) : (
              unbilled.map((item) => (
                <li
                  key={item.student + item.lastDate}
                  className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{item.student}</div>
                    <div className="text-[10px] text-slate-500">
                      {item.hours.toFixed(1)}h since {item.lastDate}
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-semibold">Hours only (rate not stored)</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 col-span-1">
          <h3 className="text-sm font-semibold mb-2">Cashflow forecast (14 days)</h3>
          <div className="text-sm font-semibold">
            R {forecast.dueSoonTotal.toFixed(0)} due in 14 days • R {forecast.overdueTotal.toFixed(0)} overdue
          </div>
          <ul className="space-y-1 text-[11px] mt-2">
            {forecast.dueSoon.length === 0 ? (
              <li className="text-slate-500">No invoices due in the next 14 days.</li>
            ) : (
              forecast.dueSoon.map((inv) => (
                <li key={inv.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80 flex justify-between">
                  <span>
                    {students.find((s) => s.id === inv.student_id)?.name ?? 'Student'} • Due {inv.due_date}
                  </span>
                  <span className="font-semibold">R {Number(inv.total || 0).toFixed(0)}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
