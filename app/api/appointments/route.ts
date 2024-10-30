import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, specialty, symptoms, date, time } = body;

    // Check if user exists first
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    // Save appointment to database
    let userId;
    if (!existingUser) {
      // Create new user if doesn't exist
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'PATIENT',
        },
      });
      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientName: name,
        patientEmail: email,
        phone,
        specialty,
        symptoms,
        date: new Date(date),
        time,
        status: "pending",
        patientId: userId,
      },
      include: {
        patient: true,
      },
    });

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Appointment Confirmation",
      html: `
        <h1>Appointment Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Your appointment has been scheduled for:</p>
        <ul>
          <li>Date: ${new Date(date).toLocaleDateString()}</li>
          <li>Time: ${time}</li>
          <li>Specialty: ${specialty}</li>
        </ul>
      `
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment", details: error.message },
      { status: 500 }
    );
  }
}