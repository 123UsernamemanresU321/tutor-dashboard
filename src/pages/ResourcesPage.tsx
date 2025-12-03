import { useEffect, useMemo, useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

type ResourceRow = {
  id: string;
  title: string;
  subject: string | null;
  level: string | null;
  tags: string[] | null;
  description: string | null;
  favorite?: boolean | null;
};

type HomeworkRow = {
  id: string;
  status: string | null;
  due_date: string | null;
  studentName: string;
  resourceTitle: string;
};

export default function ResourcesPage() {
  const supabase = getSupabaseClient();
  const [resources, setResources] = useState<ResourceRow[]>([]);
  const [homework, setHomework] = useState<HomeworkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [{ data: resData, error: resErr }, { data: hwData, error: hwErr }] = await Promise.all([
          supabase.from('resources').select('id,title,subject,level,tags,description,favorite'),
          supabase.from('homework').select('id,status,due_date,students(name),resources(title)'),
        ]);
        if (resErr) throw resErr;
        if (hwErr) throw hwErr;
        if (!isMounted) return;
        setResources(resData ?? []);
        setHomework(
          hwData?.map((h: any) => ({
            id: h.id,
            status: h.status,
            due_date: h.due_date,
            studentName: h.students?.name ?? 'Student',
            resourceTitle: h.resources?.title ?? 'Resource',
          })) ?? [],
        );
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load resources');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    resources.forEach((r) => {
      (r.tags ?? []).forEach((t) => map.set(t, (map.get(t) ?? 0) + 1));
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [resources]);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (subjectFilter && r.subject !== subjectFilter) return false;
      if (activeTag && !(r.tags || []).includes(activeTag)) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [resources, subjectFilter, search, activeTag]);

  const groupedHw = useMemo(() => {
    const buckets: Record<string, HomeworkRow[]> = { todo: [], progress: [], done: [] };
    homework.forEach((h) => {
      const status = (h.status || '').toLowerCase();
      if (status === 'completed' || status === 'done') buckets.done.push(h);
      else if (status === 'in progress') buckets.progress.push(h);
      else buckets.todo.push(h);
    });
    return buckets;
  }, [homework]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg font-semibold">Resources</h2>
          <p className="text-xs text-slate-500">Worksheets, lectures, and homework tracking. Upload files for quick download.</p>
        </div>
        <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 shadow-sm">
          ＋ Add resource
        </button>
      </div>

      {error && <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-xs">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-2xl p-4 col-span-2 max-h-[75vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex gap-2">
              <select
                className="border border-slate-300 rounded-xl px-2 py-1 text-xs"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="">All subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
              </select>
              <input
                type="text"
                placeholder="Search resources"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-slate-300 rounded-xl px-2 py-1 text-xs w-40"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3 text-[10px]">
            {tags.length === 0 && <span className="text-slate-500">Tags will appear after you add resources.</span>}
            {tags.map(([tag, count]) => (
              <button
                key={tag}
                className={`px-2 py-1 rounded-full border ${activeTag === tag ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300'}`}
                onClick={() => setActiveTag((t) => (t === tag ? '' : tag))}
              >
                #{tag} ({count})
              </button>
            ))}
          </div>
          <ul className="space-y-2 text-xs">
            {loading ? (
              <li className="text-slate-500">Loading…</li>
            ) : filtered.length === 0 ? (
              <li className="text-slate-500">No resources found.</li>
            ) : (
              filtered.map((r) => (
                <li key={r.id} className="border border-slate-200 rounded-xl px-3 py-2 bg-white/85">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-[10px] text-slate-500">
                        {r.subject || 'Subject'} • {r.level || 'Level'}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-[12px]" title="Favorite">
                        {r.favorite ? '⭐' : '☆'}
                      </button>
                      <button className="text-[10px] px-2 py-1 rounded-lg border border-slate-300 hover:bg-slate-50">Edit</button>
                    </div>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-600">{r.description}</div>
                  <div className="mt-1 flex flex-wrap">
                    {(r.tags || []).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-slate-100 mr-1 mb-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2 text-[11px] flex-wrap items-center">
                    <button className="px-2 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Assign to student(s)</button>
                    <button className="px-2 py-1 rounded-lg border border-slate-300 hover:bg-slate-50">Download file</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 col-span-1 max-h-[75vh] overflow-y-auto scrollbar-thin text-xs">
          <h3 className="text-sm font-semibold mb-2">Homework board</h3>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            {(['todo', 'progress', 'done'] as const).map((bucket) => {
              const label = bucket === 'todo' ? 'To Do' : bucket === 'progress' ? 'In progress' : 'Completed';
              const list = groupedHw[bucket];
              return (
                <div key={bucket}>
                  <div className="font-semibold mb-1">{label}</div>
                  <ul className="space-y-1">
                    {list.length === 0 ? (
                      <li className="text-slate-500">Nothing here.</li>
                    ) : (
                      list.map((hw) => (
                        <li key={hw.id} className="border border-slate-200 rounded-lg px-2 py-1 bg-white/85">
                          <div className="font-medium">{hw.resourceTitle}</div>
                          <div className="text-[10px] text-slate-500">
                            {hw.studentName} • Due {hw.due_date ?? 'n/a'}
                          </div>
                          <select className="mt-1 w-full border border-slate-300 rounded-lg px-1 py-0.5 text-[10px]">
                            <option>To do</option>
                            <option>In progress</option>
                            <option>Completed</option>
                          </select>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[10px] text-slate-500">Change status using the dropdown on each card.</p>
        </div>
      </div>
    </div>
  );
}
