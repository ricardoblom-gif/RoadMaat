import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSessionFromCookies } from '@/lib/session';

const createPostSchema = z.object({
  title: z.string().trim().min(2).max(180),
  content: z.string().trim().min(10).max(5000),
});

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = getSessionFromCookies();

  if (!session) {
    return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Controleer je bericht en probeer opnieuw' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.id } });

    if (!user) {
      return NextResponse.json({ error: 'Gebruiker niet gevonden' }, { status: 401 });
    }

    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        content: parsed.data.content,
        authorId: user.id,
      },
      include: { author: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Bericht aanmaken is mislukt' }, { status: 500 });
  }
}
