import { Link } from 'react-router-dom';

type Props = {
  onRefresh?: () => void;
};

export default function Topbar({ onRefresh }: Props) {
  return (
    <header className="h-16 flex items-center justify-between px-6 gap-4 bg-white border-b border-slate-200">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="search"
            placeholder="Search students, sessions, resources, invoices…"
            className="w-full rounded-2xl border border-slate-200 px-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
          />
          <span className="absolute left-3 top-1.5">🔍</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-2xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 shadow-sm">
          ＋ Student
        </button>
        <button className="px-3 py-1.5 rounded-2xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 shadow-sm">
          ＋ Session
        </button>
        <button
          onClick={onRefresh}
          className="px-3 py-1.5 rounded-2xl border border-slate-300 text-xs font-medium hover:bg-slate-50"
        >
          ⟳ Refresh
        </button>
        <Link
          to="/signin"
          className="px-3 py-1.5 rounded-2xl border border-slate-300 text-xs font-medium hover:bg-slate-50"
        >
          ⏏ Sign out
        </Link>
        <button className="ml-2 inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-300 text-sm">
          🌙
        </button>
      </div>
    </header>
  );
}
