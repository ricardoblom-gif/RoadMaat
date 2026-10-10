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

const SESSION_SECRET = process.env.SESSION_SECRET;
const encoder = new TextEncoder();

function base64UrlEncodeBytes(value: Uint8Array) {
  let binary = '';
  for (let index = 0; index < value.length; index += 1) {
    binary += String.fromCharCode(value[index]);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlEncode(value: string) {
  return base64UrlEncodeBytes(encoder.encode(value));
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return new TextDecoder().decode(
    Uint8Array.from(atob(padded + pad), (character) => character.charCodeAt(0)),
  );
}

async function getSigningKey() {
  if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
    throw new Error('SESSION_SECRET must be set to at least 32 characters');
  }

  return crypto.subtle.importKey(
    'raw',
    encoder.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function createSessionToken(user: SessionUser) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    ...user,
    iat: now,
    exp: now + 60 * 60 * 24 * 7,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await crypto.subtle.sign('HMAC', await getSigningKey(), encoder.encode(unsignedToken));

  return `${unsignedToken}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [header, payload, signature] = parts;
    const parsedHeader = JSON.parse(base64UrlDecode(header)) as { alg?: string; typ?: string };
    if (parsedHeader.alg !== 'HS256' || parsedHeader.typ !== 'JWT') {
      return null;
    }

    const signatureBase64 = signature.replace(/-/g, '+').replace(/_/g, '/');
    const signatureBytes = Uint8Array.from(
      atob(signatureBase64 + '='.repeat((4 - (signatureBase64.length % 4)) % 4)),
      (character) => character.charCodeAt(0),
    );
    const isValid = await crypto.subtle.verify(
      'HMAC',
      await getSigningKey(),
      signatureBytes,
      encoder.encode(`${header}.${payload}`),
    );
    if (!isValid) {
      return null;
    }

    const parsedPayload = JSON.parse(base64UrlDecode(payload)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (
      !parsedPayload.id ||
      !parsedPayload.email ||
      !parsedPayload.name ||
      !parsedPayload.role ||
      !parsedPayload.exp ||
      parsedPayload.exp <= now
    ) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}
