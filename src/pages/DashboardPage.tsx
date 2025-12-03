import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type UpcomingSession = {
  id: string;
  date: string;
  start_time: string | null;
  subject: string | null;
  topic: string | null;
  studentNames: string[];
};

export default function DashboardPage() {
  const supabase = getSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpi, setKpi] = useState({
    activeStudents: 0,
    hoursWeek: 0,
    expectedIncome: 0,
    overdue: 0,
    homeworkDue: 0,
    nextSession: null as UpcomingSession | null,
  });
  const [upcoming, setUpcoming] = useState<UpcomingSession[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const now = new Date();
        const sevenAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        // Sessions with joins for student names
        const { data: sessions, error: sessErr } = await supabase
          .from('sessions')
          .select('id,date,start_time,duration_hours,subject,topic,session_students(student_id,students(name))')
          .gte('date', startOfWeek.toISOString().slice(0, 10))
          .lte('date', sevenAhead.toISOString().slice(0, 10))
          .order('date', { ascending: true });
        if (sessErr) throw sessErr;

        const upcomingList: UpcomingSession[] =
          sessions?.map((s: any) => ({
            id: s.id,
            date: s.date,
            start_time: s.start_time,
            subject: s.subject,
            topic: s.topic,
            studentNames:
              s.session_students?.map((ss: any) => ss.students?.name || 'Student').filter(Boolean) ?? [],
          })) ?? [];

        const hoursWeek = (sessions || [])
          .filter((s: any) => new Date(s.date) >= startOfWeek && new Date(s.date) <= sevenAhead)
          .reduce((sum: number, s: any) => sum + Number(s.duration_hours || 0), 0);

        // Active students = distinct student_ids with a session in last 30 days
        const thirtyAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const { data: recentLinks, error: linkErr } = await supabase
          .from('session_students')
          .select('student_id,sessions(date)')
          .gt('sessions.date', thirtyAgo.toISOString().slice(0, 10));
        if (linkErr) throw linkErr;
        const activeIds = new Set((recentLinks || []).map((r: any) => r.student_id));

        // Invoices
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
        const { data: invoices, error: invErr } = await supabase
          .from('invoices')
          .select('id,total,paid,due_date,issue_date')
          .gte('issue_date', firstOfMonth);
        if (invErr) throw invErr;
        const expectedIncome = (invoices || []).reduce((sum: number, inv: any) => sum + Number(inv.total || 0), 0);
        const overdue = (invoices || []).filter(
          (inv: any) => !inv.paid && inv.due_date && new Date(inv.due_date) < now,
        ).length;

        // Homework due in 5 days
        const fiveAhead = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        const { data: hw, error: hwErr } = await supabase
          .from('homework')
          .select('id,due_date,status')
          .eq('status', 'To do')
          .lte('due_date', fiveAhead.toISOString().slice(0, 10));
        if (hwErr) throw hwErr;

        setKpi({
          activeStudents: activeIds.size,
          hoursWeek,
          expectedIncome,
          overdue,
          homeworkDue: hw?.length ?? 0,
          nextSession: upcomingList[0] ?? null,
        });
        setUpcoming(upcomingList);
      } catch (err: any) {
        setError(err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [supabase]);

  const upcomingSeven = useMemo(() => upcoming.slice(0, 10), [upcoming]);

  return (
    <div className="space-y-6">
      <section className="bg-white shadow rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Weekly direction</p>
            <h3 className="text-sm font-semibold">Focus & reflection</h3>
          </div>
          <span className="text-xs text-slate-500">Live from data</span>
        </div>
        {error && <div className="text-sm text-rose-700 bg-rose-50 px-3 py-2 rounded">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="border border-slate-200 rounded-lg p-3 bg-white/70">
            <div className="text-[10px] text-slate-500">Next session</div>
            <div className="font-semibold">
              {kpi.nextSession
                ? `${kpi.nextSession.studentNames.join(', ')} • ${kpi.nextSession.subject ?? ''}`
                : 'No sessions planned'}
            </div>
            <div className="text-[10px] text-slate-500">
              {kpi.nextSession ? `${kpi.nextSession.date} ${kpi.nextSession.start_time ?? ''}` : ''}
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-white/70">
            <div className="text-[10px] text-slate-500">Homework due soon</div>
            <div className="font-semibold">{kpi.homeworkDue}</div>
            <div className="text-[10px] text-slate-500">Due within 5 days</div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-white/70">
            <div className="text-[10px] text-slate-500">Overdue invoices</div>
            <div className="font-semibold text-rose-600">{kpi.overdue}</div>
            <div className="text-[10px] text-slate-500">Follow up today</div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: 'Active students', value: kpi.activeStudents },
          { label: 'Hours this week', value: kpi.hoursWeek.toFixed(1) },
          { label: 'Expected income (month)', value: `R ${kpi.expectedIncome.toFixed(0)}` },
          { label: 'Overdue invoices', value: kpi.overdue },
        ].map((card) => (
          <div key={card.label} className="bg-white shadow rounded-2xl p-5 space-y-1">
            <h3 className="text-xs font-medium text-slate-500 mb-1">{card.label}</h3>
            <div className="text-2xl font-semibold text-slate-900">{card.value}</div>
            <p className="text-[11px] text-slate-500">
              {loading ? 'Loading…' : 'Live from Supabase data'}
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="bg-white shadow rounded-2xl p-5 col-span-7">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Subject mix (hours)</h3>
            <span className="text-xs text-slate-500">Based on sessions</span>
          </div>
          <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
            Add charts here (e.g., Chart.js) using sessions.subject data.
          </div>
        </div>
        <div className="bg-white shadow rounded-2xl p-5 col-span-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Upcoming sessions (next 7 days)</h3>
            {loading && <span className="text-xs text-slate-500">Loading…</span>}
          </div>
          <ul className="text-xs space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {upcomingSeven.length === 0 ? (
              <li className="text-slate-500">No upcoming sessions</li>
            ) : (
              upcomingSeven.map((s) => (
                <li key={s.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">{s.studentNames.join(', ')}</div>
                  <div className="text-[10px] text-slate-500">
                    {s.subject ?? 'Session'} • {s.date} {s.start_time ?? ''}
                  </div>
                  <div className="text-[10px]">{s.topic ?? ''}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
