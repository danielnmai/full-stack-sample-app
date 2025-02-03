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
  await prisma.invoice.upsert({
    where: { id: 1 },
    update: {},
    create: {
      vendorName: 'Amazon',
      description: 'Office equipments',
      amount: 50000,
      dueDate: new Date('2025-12-1'),
      paid: true,
      userId: user.id,
    },
  });

  await prisma.invoice.upsert({
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

  await prisma.invoice.upsert({
    where: { id: 3 },
    update: {},
    create: {
      vendorName: 'Sysco',
      description: 'Rental',
      amount: 49200,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });
  await prisma.invoice.upsert({
    where: { id: 4 },
    update: {},
    create: {
      vendorName: 'Fiber Optics',
      description: 'Rental',
      amount: 22875,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });
  await prisma.invoice.upsert({
    where: { id: 5 },
    update: {},
    create: {
      vendorName: 'Ikea',
      description: 'Rental',
      amount: 15087,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });
  await prisma.invoice.upsert({
    where: { id: 6 },
    update: {},
    create: {
      vendorName: 'Costco',
      description: 'Rental',
      amount: 82000,
      dueDate: new Date('2025-12-1'),
      paid: true,
      userId: user.id,
    },
  });
  await prisma.invoice.upsert({
    where: { id: 7 },
    update: {},
    create: {
      vendorName: 'Costco',
      description: 'Rental',
      amount: 35000,
      dueDate: new Date('2025-12-1'),
      paid: true,
      userId: user.id,
    },
  });

  await prisma.invoice.upsert({
    where: { id: 8 },
    update: {},
    create: {
      vendorName: 'Office Depot',
      description: 'Rental',
      amount: 95000,
      dueDate: new Date('2025-12-1'),
      paid: false,
      userId: user.id,
    },
  });

  await prisma.invoice.upsert({
    where: { id: 9 },
    update: {},
    create: {
      vendorName: 'Staples',
      description: 'Macbook Pro, quantity: 10',
      amount: 2040000,
      dueDate: new Date('2025-12-1'),
      paid: true,
      userId: user.id,
    },
  });
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
