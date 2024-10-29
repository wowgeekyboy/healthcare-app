import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin
  await prisma.user.upsert({
    where: { email: 'admin@healthbook.com' },
    update: {},
    create: {
      email: 'admin@healthbook.com',
      name: 'Admin User',
      password: await bcrypt.hash('Admin@123', 10),
      role: 'ADMIN',
    },
  });

  // Create doctors
  const doctors = [
    {
      email: 'sarah.johnson@healthbook.com',
      name: 'Dr. Sarah Johnson',
      password: 'Doctor@123',
      specialty: 'General Practice',
      bio: 'Dr. Johnson has over 15 years of experience in general practice and preventive medicine.',
    },
    {
      email: 'michael.chen@healthbook.com',
      name: 'Dr. Michael Chen',
      password: 'Doctor@123',
      specialty: 'Cardiology',
      bio: 'Specialized in cardiovascular health with a focus on preventive cardiology.',
    },
  ];

  for (const doctor of doctors) {
    await prisma.user.upsert({
      where: { email: doctor.email },
      update: {},
      create: {
        ...doctor,
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