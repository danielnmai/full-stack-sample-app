import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.upsert({
    where: { email: 'test@email.com' },
    update: {},
    create: {
      email: 'test@email.com',
      name: 'Test User',
      password: bcrypt.hashSync('1234', 10),
    },
  });
  const invoice1 = await prisma.invoice.upsert({
    where: { id: 1 },
    update: {},
    create: {
      vendorName: 'Amazon',
      description: 'Office equipments',
      amount: 50000,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });

  const invoice2 = await prisma.invoice.upsert({
    where: { id: 2 },
    update: {},
    create: {
      vendorName: 'Office Depot',
      description: 'Dell printer',
      amount: 29500,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });

  console.log({ user, invoice1, invoice2 });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
