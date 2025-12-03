import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/students', label: 'Students', icon: '👥' },
  { to: '/schedule', label: 'Schedule', icon: '📅' },
  { to: '/resources', label: 'Resources', icon: '📚' },
  { to: '/finance', label: 'Finance', icon: '💰' },
  { to: '/reports', label: 'Reports', icon: '📊' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/portal', label: 'My portal', icon: '📂' },
  { to: '/parent-portal', label: 'Parent portal', icon: '👪' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
      <div className="px-4 py-4 flex items-center gap-2 border-b border-slate-800">
        <div className="h-9 w-9 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <div>
          <div className="font-semibold text-sm">Tutor Control Center</div>
          <div className="text-xs text-slate-400">Physics • Chemistry • Maths</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto scrollbar-thin pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-full block text-left px-4 py-2 text-sm hover:bg-slate-800 transition ${
                isActive ? 'bg-slate-800 text-white' : 'text-slate-200'
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
