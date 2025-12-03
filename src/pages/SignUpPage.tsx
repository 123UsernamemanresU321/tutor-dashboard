import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '../hooks/useSupabaseClient';

type AccountType = 'student' | 'parent';

export default function SignUpPage() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            accountType,
          },
        },
      });
      if (signUpError) throw signUpError;
      if (accountType === 'student') navigate('/student');
      else navigate('/parent');
    } catch (err: any) {
      setError(err?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-sm text-slate-600 mb-4">Choose whether you are a student or a parent.</p>
      {error && <div className="mb-3 rounded bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">I am a…</label>
          <div className="grid grid-cols-2 gap-2">
            {(['student', 'parent'] as AccountType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAccountType(type)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  accountType === type
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {type === 'student' ? 'Student' : 'Parent'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
