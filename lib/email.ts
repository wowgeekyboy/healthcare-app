import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patientId, doctorId, date, time, specialty } = body;

    // Create appointment in database
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
        time,
        specialty,
        status: "pending",
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    // Send email to patient
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: appointment.patient.email,
      subject: "Appointment Confirmation",
      html: `
        <h1>Appointment Confirmation</h1>
        <p>Your appointment has been scheduled with ${appointment.doctor.name}</p>
        <p>Date: ${format(new Date(date), "MMMM d, yyyy")}</p>
        <p>Time: ${time}</p>
      `,
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}