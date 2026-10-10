import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromCookies } from '@/lib/session';

export async function GET() {
  const session = getSessionFromCookies();

  if (!session) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  const locations = await prisma.location.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(locations);
}
