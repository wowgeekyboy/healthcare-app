import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'ADMIN',
    },
  });

  // Create doctors
  const doctors = [
    { name: "Doctor X", email: "doctorx@example.com", password: "Doctor@123!" },
    { name: "Doctor Y", email: "doctory@example.com", password: "Doctor@123!" },
    { name: "Doctor Z", email: "doctorz@example.com", password: "Doctor@123!" },
  ];

  for (const doctor of doctors) {
    await prisma.user.upsert({
      where: { email: doctor.email },
      update: {},
      create: {
        name: doctor.name,
        email: doctor.email,
        password: await bcrypt.hash(doctor.password, 10),
        role: 'DOCTOR',
      },
    });
  }

  // Create patients
  const patients = [
    {
      email: 'john.smith@example.com',
      name: 'John Smith',
      password: 'Patient@123',
    },
    {
      email: 'emma.wilson@example.com',
      name: 'Emma Wilson',
      password: 'Patient@123',
    },
  ];

  for (const patient of patients) {
    await prisma.user.upsert({
      where: { email: patient.email },
      update: {},
      create: {
        ...patient,
        password: await bcrypt.hash(patient.password, 10),
        role: 'PATIENT',
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });