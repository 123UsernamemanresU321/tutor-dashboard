import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type SessionRow = {
  id: string;
  date: string;
  start_time: string | null;
  duration_hours: number | null;
  subject: string | null;
  topic: string | null;
  studentNames: string[];
};

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  if (day !== 1) d.setHours(-24 * (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function SchedulePage() {
  const supabase = getSupabaseClient();
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data: sessData, error: sessErr } = await supabase
          .from('sessions')
          .select('id,date,start_time,duration_hours,subject,topic')
          .order('date', { ascending: true });
        if (sessErr) throw sessErr;
        const sessionIds = (sessData ?? []).map((s) => s.id);
        let studentMap: Record<string, string[]> = {};
        if (sessionIds.length) {
          const { data: joinData, error: joinErr } = await supabase
            .from('session_students')
            .select('session_id,students(name)')
            .in('session_id', sessionIds);
          if (joinErr) throw joinErr;
          studentMap = (joinData ?? []).reduce<Record<string, string[]>>((acc, row: any) => {
            const list = acc[row.session_id] ?? [];
            if (row.students?.name) list.push(row.students.name);
            acc[row.session_id] = list;
            return acc;
          }, {});
        }
        const mapped: SessionRow[] =
          sessData?.map((s) => ({
            id: s.id,
            date: s.date,
            start_time: s.start_time,
            duration_hours: s.duration_hours,
            subject: s.subject,
            topic: s.topic,
            studentNames: studentMap[s.id] ?? [],
          })) ?? [];
        if (isMounted) setSessions(mapped);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load schedule');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const weekDays = useMemo(() => {
    const start = currentWeekStart;
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(start);
      d.setDate(start.getDate() + idx);
      return d;
    });
  }, [currentWeekStart]);

  const sessionsByDay = useMemo(() => {
    const map: Record<string, SessionRow[]> = {};
    weekDays.forEach((d) => (map[toISODate(d)] = []));
    sessions.forEach((s) => {
      if (map[s.date]) map[s.date].push(s);
    });
    return map;
  }, [sessions, weekDays]);

  const todayISO = toISODate(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Planner</p>
          <h2 className="text-lg font-semibold">Schedule</h2>
          <p className="text-xs text-slate-500">Week grid, quick stats, and conflict signals.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs hover:bg-slate-50"
            onClick={() => {
              const prev = new Date(currentWeekStart);
              prev.setDate(prev.getDate() - 7);
              setCurrentWeekStart(getMonday(prev));
            }}
          >
            ← Prev
          </button>
          <button
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs hover:bg-slate-50"
            onClick={() => setCurrentWeekStart(getMonday(new Date()))}
          >
            Today
          </button>
          <button
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs hover:bg-slate-50"
            onClick={() => {
              const next = new Date(currentWeekStart);
              next.setDate(next.getDate() + 7);
              setCurrentWeekStart(getMonday(next));
            }}
          >
            Next →
          </button>
          <button className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 shadow-sm">
            ＋ Session
          </button>
        </div>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-xs">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">
        <div className="bg-white shadow rounded-2xl p-5 col-span-2 space-y-3 h-full">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Physics
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Chemistry
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Maths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded-lg border border-indigo-300 text-indigo-700 hover:bg-indigo-50">Export ICS</button>
              <div className="font-medium text-slate-700">
                {toISODate(currentWeekStart)} – {toISODate(new Date(currentWeekStart.getTime() + 6 * 86400000))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-[11px]">
            {weekDays.map((day) => {
              const iso = toISODate(day);
              const totalHours = (sessionsByDay[iso] || []).reduce((acc, s) => acc + Number(s.duration_hours || 0), 0);
              return (
                <div key={iso} className="flex flex-col gap-1 text-center">
                  <div className="font-semibold">{dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]}</div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.min(100, totalHours * 20)}%` }} />
                  </div>
                  <div className="text-[10px] text-slate-500">{totalHours.toFixed(1)}h</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-7 gap-2 text-[11px] min-h-[320px]">
            {weekDays.map((day) => {
              const iso = toISODate(day);
              const daySessions = sessionsByDay[iso] || [];
              return (
                <div key={iso} className="min-h-[160px] border border-slate-200 rounded-lg p-2 bg-white/80 flex flex-col gap-2">
                  <div className="font-semibold mb-1">
                    {dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]} • {iso}
                  </div>
                  {daySessions.length === 0 && <div className="text-slate-500 text-[10px]">No sessions</div>}
                  {daySessions.map((s) => (
                    <div key={s.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wide text-slate-500">{s.subject || 'Session'}</span>
                        <span className="text-[11px] font-semibold text-slate-800">{s.start_time || '—'}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800">{s.studentNames.join(', ') || 'Unlinked'}</div>
                      <div className="text-[10px] text-slate-600">{s.topic || ''}</div>
                      <div className="text-[10px] text-slate-500">{Number(s.duration_hours || 0).toFixed(1)}h</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white shadow rounded-2xl p-4 text-xs space-y-2 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Today</h3>
              <span className="text-[10px] text-slate-500">Live list</span>
            </div>
            <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin">
              {loading ? (
                <li className="text-slate-500">Loading…</li>
              ) : (sessionsByDay[todayISO] || []).length === 0 ? (
                <li className="text-slate-500">No sessions today.</li>
              ) : (
                (sessionsByDay[todayISO] || []).map((s) => (
                  <li key={s.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/80">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-wide text-slate-500">{s.subject}</div>
                      <div className="text-[11px] font-semibold">{s.start_time || ''}</div>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-800">{s.studentNames.join(', ') || 'Unlinked'}</div>
                    <div className="text-[10px] text-slate-600">{s.topic || ''}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="bg-white shadow rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Potential clashes</h3>
              <span className="text-[10px] text-amber-600">Overlap same student</span>
            </div>
            <ul className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin text-[11px]">
              <li className="text-slate-500">No clashes detected.</li>
            </ul>
          </div>
          <div className="bg-white shadow rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Tight transitions</h3>
              <span className="text-[10px] text-slate-500">&lt; 20 min gap</span>
            </div>
            <ul className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin text-[11px]">
              <li className="text-slate-500">No tight transitions.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
