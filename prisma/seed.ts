import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('roadmaat123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'klaas@roadmaat.app' },
    update: {},
    create: {
      email: 'klaas@roadmaat.app',
      name: 'Klaas Smit',
      role: 'Mentor',
      password: passwordHash,
    },
  });

  await prisma.post.upsert({
    where: { id: 'seed-post-1' },
    update: {},
    create: {
      id: 'seed-post-1',
      title: 'Nieuwe parkeerplek',
      content: 'Truckstop Joost heeft nu stroom en veilig parkeren voor vrachtwagens.',
      authorId: user.id,
    },
  });

  const defaultLocations = [
    { name: 'Truckstop Joost', category: 'Parking', status: 'Open', distance: '3.1 km' },
    { name: 'Cafe de Schans', category: 'Restaurant', status: 'Busy', distance: '7.4 km' },
    { name: 'AB Texel Hub', category: 'Klant', status: 'Open', distance: '5.7 km' },
    { name: 'Fabriek Noord', category: 'Fabriek', status: 'Review', distance: '11.2 km' },
  ];

  for (const location of defaultLocations) {
    await prisma.location.upsert({
      where: { id: `seed-location-${location.name}` },
      update: {},
      create: {
        id: `seed-location-${location.name}`,
        ...location,
      },
    });
  }

  await prisma.group.upsert({
    where: { id: 'seed-group-texel' },
    update: {},
    create: {
      id: 'seed-group-texel',
      name: 'Texel Team',
      focus: 'Route updates',
      memberCount: 14,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
