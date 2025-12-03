import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSupabaseClient } from '../../hooks/useSupabaseClient';

type Props = {
  children: ReactNode;
};

const navItems = [
  { to: '/student', label: 'Student Dashboard' },
  { to: '/parent', label: 'Parent Dashboard' },
  { to: '/signup', label: 'Sign Up' },
  { to: '/signin', label: 'Sign In' },
];

export default function MainLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (err) {
      console.error('Sign out failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-indigo-700">
            My Tutoring Dashboard
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-full transition ${
                  location.pathname === item.to
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="px-3 py-1.5 rounded-full text-sm text-slate-700 hover:bg-slate-100"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
