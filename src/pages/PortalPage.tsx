import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type StudentRow = { id: string; name: string; contract_signed?: boolean | null };

export default function PortalPage() {
  const supabase = getSupabaseClient();
  const [student, setStudent] = useState<StudentRow | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [homework, setHomework] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        const { data: stuRow, error: stuErr } = await supabase
          .from('students')
          .select('id,name,contract_signed')
          .eq('user_id', userId)
          .maybeSingle();
        if (stuErr) throw stuErr;
        if (!stuRow) throw new Error('Student profile not found.');
        if (!isMounted) return;
        setStudent(stuRow);

        const { data: sessData, error: sessErr } = await supabase
          .from('sessions')
          .select('id,date,start_time,duration_hours,subject,topic,session_students(student_id)')
          .order('date', { ascending: true });
        if (sessErr) throw sessErr;
        const filteredSessions =
          sessData?.filter((s: any) => (s.session_students || []).some((ss: any) => ss.student_id === stuRow.id)) ?? [];

        const { data: hwData, error: hwErr } = await supabase
          .from('homework')
          .select('id,status,due_date,resources(title)')
          .eq('student_id', stuRow.id);
        if (hwErr) throw hwErr;

        const { data: invData, error: invErr } = await supabase
          .from('invoices')
          .select('id,total,paid,due_date,issue_date')
          .eq('student_id', stuRow.id)
          .order('due_date', { ascending: true });
        if (invErr) throw invErr;

        const resourceIds = Array.from(new Set((hwData || []).map((h: any) => h.resource_id).filter(Boolean)));
        let resRows: any[] = [];
        if (resourceIds.length) {
          const { data: resData, error: resErr } = await supabase.from('resources').select('id,title,subject,level').in('id', resourceIds);
          if (resErr) throw resErr;
          resRows = resData ?? [];
        }

        const { data: msgData, error: msgErr } = await supabase
          .from('messages')
          .select('id,text,sender,created_at')
          .eq('student_id', stuRow.id)
          .order('created_at', { ascending: true });
        if (msgErr) throw msgErr;

        if (!isMounted) return;
        setSessions(filteredSessions);
        setHomework(hwData ?? []);
        setInvoices(invData ?? []);
        setResources(resRows);
        setMessages(msgData ?? []);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load portal');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const upcomingSessions = useMemo(() => {
    const now = new Date();
    const soon = new Date(now.getTime() + 14 * 86400000);
    return sessions
      .filter((s) => new Date(s.date) >= now && new Date(s.date) <= soon)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [sessions]);

  const openHomework = homework.filter((h) => (h.status || '').toLowerCase() !== 'completed');
  const unpaidInvoices = invoices.filter((inv) => !inv.paid);

  const assignedResources = resources.length
    ? resources
    : Array.from(new Set(homework.map((h: any) => h.resources?.title))).filter(Boolean).map((title) => ({ id: title, title }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">My portal</h2>
        <p className="text-xs text-slate-500">Your schedule, homework, invoices, and resources.</p>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-xs">{error}</div>}

      {!student?.contract_signed && (
        <div className="border border-rose-300 bg-rose-50 text-rose-800 rounded-lg px-3 py-2 text-xs">
          INVALID – CONTRACT NOT SIGNED. Ask your parent/guardian to sign the contract to unlock this portal.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 text-xs">
        <div className="bg-white shadow rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Upcoming sessions</h3>
            <span className="text-[10px] text-slate-500">Next 14 days</span>
          </div>
          <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : upcomingSessions.length === 0 ? (
              <li className="text-slate-500 text-xs">No sessions in the next 14 days.</li>
            ) : (
              upcomingSessions.map((s) => (
                <li key={s.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">{s.subject ?? 'Session'}</div>
                  <div className="text-[10px] text-slate-500">
                    {s.date} {s.start_time || ''} • {Number(s.duration_hours || 0).toFixed(1)}h
                  </div>
                  <div className="text-[10px]">{s.topic || ''}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Homework</h3>
            <span className="text-[10px] text-slate-500">Open items</span>
          </div>
          <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : openHomework.length === 0 ? (
              <li className="text-slate-500 text-xs">No open homework.</li>
            ) : (
              openHomework.map((hw) => (
                <li key={hw.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">{hw.resources?.title ?? 'Homework'}</div>
                  <div className="text-[10px] text-slate-500">Status: {hw.status ?? 'To do'} • Due {hw.due_date ?? 'n/a'}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Invoices</h3>
            <span className="text-[10px] text-slate-500">Unpaid first</span>
          </div>
          <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : invoices.length === 0 ? (
              <li className="text-slate-500 text-xs">No invoices yet.</li>
            ) : (
              [...unpaidInvoices, ...invoices.filter((inv) => inv.paid)].map((inv) => (
                <li key={inv.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">Invoice {inv.id}</div>
                  <div className="text-[10px] text-slate-500">
                    Issued {inv.issue_date || 'n/a'} • Due {inv.due_date || 'n/a'} • R {Number(inv.total || 0).toFixed(2)} •{' '}
                    {inv.paid ? 'Paid' : 'Unpaid'}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Resources</h3>
            <span className="text-[10px] text-slate-500">Assigned to you</span>
          </div>
          <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : assignedResources.length === 0 ? (
              <li className="text-slate-500 text-xs">No resources assigned.</li>
            ) : (
              assignedResources.map((r) => (
                <li key={r.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-[10px] text-slate-500">{r.subject || ''}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Messages</h3>
            <span className="text-[10px] text-slate-500">Tutor ↔ Student</span>
          </div>
          <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : messages.length === 0 ? (
              <li className="text-slate-500 text-xs">No messages yet.</li>
            ) : (
              messages.map((m) => (
                <li key={m.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{m.sender === 'owner' ? 'Tutor' : 'Student'}</span>
                    <span>{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</span>
                  </div>
                  <div className="text-[11px]">{m.text}</div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
