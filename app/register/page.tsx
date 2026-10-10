'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Registratie mislukt');
      }

      router.push('/login');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registratie mislukt');
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
          <h1>Account aanmaken</h1>
          <p>Maak een beveiligde account aan om te starten met RoadMaat.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Naam
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label>
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Wachtwoord
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          </label>

          {error ? <div className="error-box">{error}</div> : null}

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Aanmaken...' : 'Account aanmaken'}
          </button>
        </form>

        <div className="auth-links">
          <Link href="/login">Al een account?</Link>
          <Link href="/">Home</Link>
        </div>
      </div>
    </main>
  );
}
