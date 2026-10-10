import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSessionFromCookies } from '@/lib/session';

export async function requireUser() {
  const session = getSessionFromCookies();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  return user;
}
