export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-xs text-slate-500">Theme, layout & data backup.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-2xl p-5 text-xs space-y-3">
          <h3 className="text-sm font-semibold mb-1">Appearance</h3>
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select className="border border-slate-300 rounded-xl px-2 py-1 text-xs">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span>Layout density</span>
            <select className="border border-slate-300 rounded-xl px-2 py-1 text-xs">
              <option>Comfortable</option>
              <option>Compact</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 text-xs space-y-3">
          <h3 className="text-sm font-semibold mb-1">Goals & defaults</h3>
          <div className="flex items-center justify-between gap-2">
            <span>Weekly hours goal</span>
            <input type="number" step="0.5" className="border border-slate-300 rounded-xl px-2 py-1 text-xs w-24" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Monthly income goal (R)</span>
            <input type="number" step="100" className="border border-slate-300 rounded-xl px-2 py-1 text-xs w-24" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Default session duration (h)</span>
            <input type="number" step="0.25" className="border border-slate-300 rounded-xl px-2 py-1 text-xs w-24" />
          </div>
          <div>
            <label className="block text-[11px] mb-1">Weekly reflection note</label>
            <textarea
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-2 py-1 text-[11px]"
              placeholder="What matters this week?"
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 text-xs space-y-3">
          <h3 className="text-sm font-semibold mb-1">Data backup</h3>
          <p>Export your dashboard data as JSON and paste it somewhere safe. You can import it later.</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-2xl bg-slate-900 text-white text-xs shadow-sm">Export</button>
            <button className="px-3 py-1.5 rounded-2xl border border-slate-300 text-xs">Import</button>
          </div>
          <textarea
            rows={5}
            className="mt-2 w-full border border-slate-300 rounded-lg px-2 py-1 text-[11px]"
            placeholder="Exported JSON will appear here. Paste JSON here to import."
          />
        </div>

        <div className="bg-white shadow rounded-2xl p-5 text-xs space-y-3">
          <h3 className="text-sm font-semibold mb-1">Activity log</h3>
          <p className="text-[11px] text-slate-500">Recent actions for this account (last 25).</p>
          <ul className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
            <li className="text-slate-500 text-xs">No activity recorded yet.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
