import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type SessionPayload = SessionUser & {
  iat: number;
  exp: number;
};

const SESSION_COOKIE = 'roadmaat_session';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'dev-session-secret-change-me';

function base64UrlEncode(value: string | Buffer) {
  const input = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, 'base64');
}

function signToken(payload: string) {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

export function createSessionToken(user: SessionUser) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    ...user,
    iat: now,
    exp: now + 60 * 60 * 24 * 7,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signToken(`${encodedHeader}.${encodedPayload}`);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [header, payload, signature] = parts;
    const expectedSignature = signToken(`${header}.${payload}`);
    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== actualBuffer.length) {
      return null;
    }

    if (!timingSafeEqual(expectedBuffer, actualBuffer)) {
      return null;
    }

    const parsedPayload = JSON.parse(base64UrlDecode(payload).toString('utf8')) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!parsedPayload.exp || parsedPayload.exp < now) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

export function getSessionFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export function setSessionCookie(user: SessionUser) {
  const cookieStore = cookies();
  const token = createSessionToken(user);

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
