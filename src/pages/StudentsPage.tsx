import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type Student = {
  id: string;
  name: string;
  grade_level?: string | null;
  student_email?: string | null;
  subjects?: string[] | null;
  contract_signed?: boolean;
};

export default function StudentsPage() {
  const supabase = getSupabaseClient();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from('students')
          .select('id,name,grade_level,student_email,subjects,contract_signed')
          .order('created_at', { ascending: true });
        if (err) throw err;
        setStudents(data || []);
        setSelectedId((data && data[0]?.id) || null);
      } catch (e: any) {
        setError(e?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [supabase]);

  const current = useMemo(() => students.find((s) => s.id === selectedId) || null, [students, selectedId]);

  const mixBars = useMemo(() => {
    // Placeholder mix since we don’t yet compute subject hours; spread evenly across subjects if present.
    const subjects = current?.subjects || [];
    const pct = subjects.length ? 100 / subjects.length : 0;
    return {
      physics: subjects.includes('Physics') ? pct : 0,
      chemistry: subjects.includes('Chemistry') ? pct : 0,
      maths: subjects.includes('Maths') ? pct : 0,
    };
  }, [current]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-2xl p-4 col-span-1 max-h-[75vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">All students</h3>
          {loading && <span className="text-xs text-slate-500">Loading…</span>}
        </div>
        {error && <div className="text-sm text-rose-700 bg-rose-50 px-3 py-2 rounded">{error}</div>}
        <ul className="space-y-2 text-xs">
          {students.map((s) => (
            <li
              key={s.id}
              className={`border border-slate-200 bg-white/85 rounded-xl px-3 py-2 hover:bg-slate-50 cursor-pointer ${
                selectedId === s.id ? 'ring-2 ring-indigo-200' : ''
              }`}
              onClick={() => setSelectedId(s.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-[10px] text-slate-500">{s.grade_level || ''}</div>
                </div>
                <div className="text-[11px] text-slate-600">{(s.subjects || []).join(', ')}</div>
              </div>
              <div className="text-[10px] text-slate-500">{s.student_email}</div>
            </li>
          ))}
          {!loading && students.length === 0 && (
            <li className="text-slate-500 text-xs">No students yet.</li>
          )}
        </ul>
      </div>

      <div className="bg-white shadow rounded-2xl p-4 col-span-2 max-h-[75vh] overflow-y-auto scrollbar-thin">
        {!current ? (
          <div className="text-sm text-slate-600">Select a student to view details.</div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold">{current.name}</div>
                <div className="text-[11px] text-slate-500">
                  {current.grade_level || ''} • {(current.subjects || []).join(', ')} • {current.student_email || ''}
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    current.contract_signed ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {current.contract_signed ? 'VALID – CONTRACT SIGNED' : 'INVALID – CONTRACT NOT SIGNED'}
                </div>
              </div>
              <button className="px-2 py-1 text-[11px] rounded-lg border border-slate-300 hover:bg-slate-50">
                Edit
              </button>
            </div>

            <div className="mt-3">
              <h4 className="text-[11px] font-semibold mb-1">Subject mix (placeholder)</h4>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex text-[10px]">
                <div style={{ width: `${mixBars.physics}%` }} className="bg-indigo-500 h-full" />
                <div style={{ width: `${mixBars.chemistry}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${mixBars.maths}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>

            <div className="mt-4">
              <div className="border-b border-slate-200 flex gap-4 text-[11px] mb-2">
                <button className="border-b-2 border-indigo-500 pb-1 font-medium">Timeline</button>
              </div>
              <div className="space-y-2 text-[11px] text-slate-600">
                Hook up detailed timeline, finance, and docs once server RPCs are ready.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
