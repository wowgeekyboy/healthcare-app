import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const doctors = [
  { id: 1, name: "Doctor X", email: "doctorx@example.com", appointments: [] },
  { id: 2, name: "Doctor Y", email: "doctory@example.com", appointments: [] },
  { id: 3, name: "Doctor Z", email: "doctorz@example.com", appointments: [] },
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { patientName, date, time } = req.body;

    // Find an available doctor
    const availableDoctor = doctors.find(doctor => {
      return !doctor.appointments.some(appointment => appointment.date === date && appointment.time === time);
    });

    if (!availableDoctor) {
      return res.status(400).json({ error: 'No available doctors for the selected time.' });
    }

    // Assign the appointment to the doctor
    availableDoctor.appointments.push({ date, time, patientName });

    // Send email to the doctor
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: availableDoctor.email,
      subject: 'New Appointment Booking',
      text: `You have a new appointment with ${patientName} on ${date} at ${time}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Appointment booked successfully', doctor: availableDoctor.name });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}