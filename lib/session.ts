import { cookies } from 'next/headers';
import { createSessionToken, verifySessionToken, type SessionUser } from '@/lib/session-token';

export { createSessionToken, verifySessionToken };
export type { SessionPayload, SessionUser } from '@/lib/session-token';

const SESSION_COOKIE = 'roadmaat_session';

export async function getSessionFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function setSessionCookie(user: SessionUser) {
  const cookieStore = cookies();
  const token = await createSessionToken(user);

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE);
}
