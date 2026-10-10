'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('klaas@roadmaat.app');
  const [password, setPassword] = useState('roadmaat123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Login mislukt');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login mislukt');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-wrap">
            <div className="brand-mark">R</div>
            <span>RoadMaat</span>
          </div>
          <h1>Inloggen</h1>
          <p>Log in om je dashboard en community te openen.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Wachtwoord
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          {error ? <div className="error-box">{error}</div> : null}

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Inloggen...' : 'Inloggen'}
          </button>
        </form>

        <div className="auth-links">
          <Link href="/">Terug naar home</Link>
          <Link href="/register">Account aanmaken</Link>
        </div>
      </div>
    </main>
  );
}
