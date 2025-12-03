import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSupabaseClient } from '../../hooks/useSupabaseClient';

export default function SignInPage() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
    } else {
      navigate('/student');
    }
    setLoading(false);
  };

  // If user is already signed in, you can redirect; kept simple
  if (!supabase) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-2">Sign in</h1>
      <p className="text-sm text-slate-600 mb-4">Access your tutoring dashboard.</p>
      {error && <div className="mb-3 rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center items-center rounded-full bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
