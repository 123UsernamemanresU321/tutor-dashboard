import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParentDashboard } from '../../hooks/useParentDashboard';

export default function ParentDashboard() {
  const { loading, error, parent, links, success, submitLinkCode } = useParentDashboard();
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    await submitLinkCode(code);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Welcome, {parent?.fullName ?? 'Parent'}</h1>
        <p className="text-sm text-slate-600">Connect to your child using their link code.</p>
      </header>

      {error && <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>}
      {success && <div className="rounded-lg bg-emerald-50 text-emerald-700 px-3 py-2 text-sm">{success}</div>}

      <section className="bg-white shadow rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Link to Your Child</h2>
          {loading && <span className="text-xs text-slate-500">Loading…</span>}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter link code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
          >
            Request Link
          </button>
        </form>
        <p className="text-xs text-slate-500">Your child will see this request and can approve or reject it.</p>
      </section>

      <section className="bg-white shadow rounded-2xl p-4 space-y-3">
        <h2 className="text-lg font-semibold">Your Link Requests</h2>
        {links.length === 0 ? (
          <p className="text-sm text-slate-600">No link requests yet.</p>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{link.studentName}</div>
                  <div className="text-xs text-slate-500">Status: {link.status}</div>
                </div>
                {link.status === 'active' && (
                  <Link
                    to={`/parent/students/${link.studentId}`}
                    className="text-sm text-indigo-700 hover:underline"
                  >
                    View Child Dashboard
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
