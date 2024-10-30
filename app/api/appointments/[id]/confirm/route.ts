import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import { format } from "date-fns";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointmentId = params.id;

    // Update appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: "confirmed",
      },
      include: {
        patient: true,
      },
    });

    // Send confirmation email to patient
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: updatedAppointment.patientEmail,
      subject: "Appointment Confirmed",
      html: `
        <h1>Appointment Confirmed</h1>
        <p>Dear ${updatedAppointment.patientName},</p>
        <p>Your appointment has been confirmed for:</p>
        <ul>
          <li>Date: ${format(new Date(updatedAppointment.date), "MMMM d, yyyy")}</li>
          <li>Time: ${updatedAppointment.time}</li>
          <li>Specialty: ${updatedAppointment.specialty}</li>
        </ul>
        <p>Please arrive 5 minutes before your scheduled time.</p>
      `,
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("Error confirming appointment:", error);
    return NextResponse.json(
      { error: "Failed to confirm appointment" },
      { status: 500 }
    );
  }
} 