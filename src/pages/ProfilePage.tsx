export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Your profile</h2>
        <p className="text-xs text-slate-500">Account details, security, and data controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        <div className="bg-white shadow rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Account</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Unverified</span>
          </div>
          <div className="text-[11px] text-slate-500">Email</div>
          <div className="text-sm font-semibold">—</div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <div className="text-[11px] text-slate-500">Role</div>
              <div className="text-[11px] font-semibold">—</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">User ID</div>
              <div className="text-[11px] font-semibold truncate">—</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <div className="text-[11px] text-slate-500">Created</div>
              <div className="text-[11px] font-semibold">—</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Last sign-in</div>
              <div className="text-[11px] font-semibold">—</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2">Session expires: —</div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 space-y-3 border border-rose-200 bg-rose-50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-rose-700">Delete account</h3>
            <span className="text-[10px] text-rose-600">Irreversible</span>
          </div>
          <p className="text-[11px] text-rose-700">
            This deletes your account and all associated data (students, sessions, invoices, resources, notes). You’ll
            need to sign up again to use the dashboard.
          </p>
          <button className="px-3 py-1.5 rounded-xl border border-rose-400 bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700">
            Delete my account
          </button>
          <div className="text-[11px] text-rose-700"></div>
        </div>
      </div>
    </div>
  );
}
