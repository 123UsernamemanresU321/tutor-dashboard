import { useStudentDashboard } from '../../hooks/useStudentDashboard';

export default function StudentDashboard() {
  const { loading, error, student, requests, activeParents, respond, reload } = useStudentDashboard();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Welcome, {student?.displayName ?? 'Student'}</h1>
        <p className="text-sm text-slate-600">
          Share your link code with your parent so they can connect to your account.
        </p>
      </header>

      {error && (
        <div className="rounded-lg bg-rose-50 text-rose-700 px-3 py-2 text-sm">
          {error} <button onClick={reload} className="underline">Retry</button>
        </div>
      )}

      <section className="bg-white shadow rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">Your Link Code</h2>
            <p className="text-sm text-slate-600">Give this code to your parent.</p>
          </div>
          <button
            type="button"
            className="text-sm text-indigo-700 hover:underline"
            onClick={() => {
              if (student?.linkCode) navigator.clipboard?.writeText(student.linkCode);
            }}
          >
            Copy
          </button>
        </div>
        <div className="font-mono text-lg bg-slate-100 px-4 py-2 rounded-lg inline-block">
          {student?.linkCode ?? '—'}
        </div>
      </section>

      <section className="bg-white shadow rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Parent Link Requests</h2>
          {loading && <span className="text-xs text-slate-500">Loading…</span>}
        </div>
        {requests.filter((r) => r.status === 'pending').length === 0 ? (
          <p className="text-sm text-slate-600">No pending requests at the moment.</p>
        ) : (
          <div className="space-y-2">
            {requests
              .filter((r) => r.status === 'pending')
              .map((req) => (
                <div
                  key={req.id}
                  className="border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{req.parentName}</div>
                    <div className="text-xs text-slate-500">{req.parentEmail}</div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <button
                      className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700"
                      onClick={() => respond(req.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1 rounded-full bg-rose-100 text-rose-700"
                      onClick={() => respond(req.id, 'reject')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="bg-white shadow rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Linked Parents</h2>
        </div>
        {activeParents.length === 0 ? (
          <p className="text-sm text-slate-600">You don’t have any linked parents yet.</p>
        ) : (
          <div className="space-y-2">
            {activeParents.map((p: any) => (
              <div key={p.id} className="border border-slate-200 rounded-xl px-3 py-2">
                <div className="font-medium">{p.parentName ?? p.name ?? 'Parent'}</div>
                <div className="text-xs text-slate-500">{p.parentEmail ?? p.email}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
