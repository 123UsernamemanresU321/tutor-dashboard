import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type LinkedStudent = {
  id: string;
  name: string;
  grade?: string | null;
  email?: string | null;
  contract_signed?: boolean | null;
};

type StudentBundle = {
  student: LinkedStudent;
  sessions: any[];
  homework: any[];
  invoices: any[];
  resources: any[];
};

export default function ParentPortalPage() {
  const supabase = getSupabaseClient();
  const [bundles, setBundles] = useState<StudentBundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr) throw userErr;
        const userId = userData.user?.id;
        if (!userId) throw new Error('Not signed in');
        const { data: parentRow, error: parentErr } = await supabase
          .from('parents')
          .select('id')
          .eq('user_id', userId)
          .maybeSingle();
        if (parentErr) throw parentErr;
        if (!parentRow) throw new Error('Parent profile not found.');

        const { data: links, error: linkErr } = await supabase
          .from('parent_students')
          .select('student_id,relationship,students(id,name,grade_level,student_email,contract_signed)')
          .eq('parent_id', parentRow.id)
          .eq('relationship', 'active');
        if (linkErr) throw linkErr;
        const students: LinkedStudent[] =
          links?.map((row: any) => ({
            id: row.student_id,
            name: row.students?.name ?? 'Student',
            grade: row.students?.grade_level,
            email: row.students?.student_email,
            contract_signed: row.students?.contract_signed,
          })) ?? [];

        const bundlesData: StudentBundle[] = [];
        for (const stu of students) {
          const [{ data: sessData, error: sessErr }, { data: hwData, error: hwErr }, { data: invData, error: invErr }] =
            await Promise.all([
              supabase
                .from('sessions')
                .select('id,date,start_time,duration_hours,subject,topic,session_students(student_id)')
                .order('date', { ascending: true }),
              supabase
                .from('homework')
                .select('id,status,due_date,resource_id,resources(title)')
                .eq('student_id', stu.id),
              supabase
                .from('invoices')
                .select('id,total,paid,due_date,issue_date')
                .eq('student_id', stu.id)
                .order('due_date', { ascending: true }),
            ]);
          if (sessErr) throw sessErr;
          if (hwErr) throw hwErr;
          if (invErr) throw invErr;

          const filteredSessions =
            sessData?.filter((s: any) => (s.session_students || []).some((ss: any) => ss.student_id === stu.id)) ?? [];
          const resourceIds = Array.from(new Set((hwData || []).map((h: any) => h.resource_id).filter(Boolean)));
          let resRows: any[] = [];
          if (resourceIds.length) {
            const { data: resData, error: resErr } = await supabase
              .from('resources')
              .select('id,title,subject,level')
              .in('id', resourceIds);
            if (resErr) throw resErr;
            resRows = resData ?? [];
          }
          bundlesData.push({
            student: stu,
            sessions: filteredSessions,
            homework: hwData ?? [],
            invoices: invData ?? [],
            resources: resRows,
          });
        }

        if (!isMounted) return;
        setBundles(bundlesData);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load parent portal.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const now = useMemo(() => new Date(), []);
  const soon = useMemo(() => new Date(now.getTime() + 14 * 86400000), [now]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Parent portal</h1>
        <p className="text-sm text-slate-600">View your linked students, their schedules, homework, and invoices.</p>
      </header>

      {error && <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>}
      {loading && <p className="text-sm text-slate-500">Loading…</p>}

      {bundles.length === 0 && !loading ? (
        <div className="rounded-2xl bg-white shadow p-4 text-sm text-slate-600">
          You have no active linked students yet. Request a link from the parent dashboard.
        </div>
      ) : null}

      {bundles.map((bundle) => {
        const upcomingSessions =
          bundle.sessions
            .filter((s: any) => {
              const d = new Date(s.date);
              return d >= now && d <= soon;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) ?? [];
        const openHomework = bundle.homework.filter(
          (h: any) => (h.status || '').toLowerCase() !== 'completed'
        );
        const unpaidInvoices = bundle.invoices.filter((inv: any) => !inv.paid);
        return (
          <div key={bundle.student.id} className="bg-white shadow rounded-2xl p-4 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{bundle.student.name}</div>
                <div className="text-xs text-slate-500">
                  {bundle.student.grade ? `Grade ${bundle.student.grade} • ` : ''}
                  {bundle.student.email || ''}
                </div>
              </div>
              <span
                className={`text-[11px] px-2 py-1 rounded-full ${
                  bundle.student.contract_signed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {bundle.student.contract_signed ? 'Contract signed' : 'Contract not signed'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <section className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Upcoming sessions (14 days)</h3>
                  <span className="text-[11px] text-slate-500">{upcomingSessions.length}</span>
                </div>
                {upcomingSessions.length === 0 ? (
                  <p className="text-xs text-slate-500">No sessions scheduled.</p>
                ) : (
                  <ul className="space-y-1 text-xs">
                    {upcomingSessions.map((s: any) => (
                      <li key={s.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                        <div className="font-semibold">{s.subject}</div>
                        <div className="text-[10px] text-slate-500">
                          {s.date} {s.start_time || ''} • {s.duration_hours || 1}h
                        </div>
                        <div className="text-[10px] text-slate-600">{s.topic || ''}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Homework</h3>
                  <span className="text-[11px] text-slate-500">{openHomework.length} open</span>
                </div>
                {openHomework.length === 0 ? (
                  <p className="text-xs text-slate-500">No open homework.</p>
                ) : (
                  <ul className="space-y-1 text-xs">
                    {openHomework.map((h: any) => (
                      <li key={h.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                        <div className="font-semibold">{h.resources?.title || 'Homework'}</div>
                        <div className="text-[10px] text-slate-500">
                          Status: {h.status || 'To do'} • Due {h.due_date || 'n/a'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <section className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Invoices</h3>
                  <span className="text-[11px] text-slate-500">
                    {unpaidInvoices.length} unpaid / {bundle.invoices.length} total
                  </span>
                </div>
                {bundle.invoices.length === 0 ? (
                  <p className="text-xs text-slate-500">No invoices yet.</p>
                ) : (
                  <ul className="space-y-1 text-xs">
                    {bundle.invoices.map((inv: any) => (
                      <li key={inv.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                        <div className="font-semibold">Invoice {inv.id}</div>
                        <div className="text-[10px] text-slate-500">
                          Issued {inv.issue_date || 'n/a'} • Due {inv.due_date || 'n/a'} • R{' '}
                          {Number(inv.total || 0).toFixed(2)} • {inv.paid ? 'Paid' : 'Unpaid'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Resources</h3>
                  <span className="text-[11px] text-slate-500">{bundle.resources.length}</span>
                </div>
                {bundle.resources.length === 0 ? (
                  <p className="text-xs text-slate-500">No resources assigned.</p>
                ) : (
                  <ul className="space-y-1 text-xs">
                    {bundle.resources.map((r: any) => (
                      <li key={r.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                        <div className="font-semibold">{r.title}</div>
                        <div className="text-[10px] text-slate-500">
                          {r.subject} {r.level ? `• ${r.level}` : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
}
