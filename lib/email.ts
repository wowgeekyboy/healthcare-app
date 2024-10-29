import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendAppointmentConfirmation(
  to: string,
  appointmentDetails: {
    patientName: string;
    doctorName: string;
    date: Date;
    time: string;
    meetLink?: string;
  }
) {
  const { patientName, doctorName, date, time, meetLink } = appointmentDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Appointment Confirmation - HealthBook Pro',
    html: `
      <h1>Appointment Confirmed!</h1>
      <p>Dear ${patientName},</p>
      <p>Your appointment has been confirmed with the following details:</p>
      <ul>
        <li>Doctor: ${doctorName}</li>
        <li>Date: ${date.toLocaleDateString()}</li>
        <li>Time: ${time}</li>
        ${meetLink ? `<li>Video Call Link: <a href="${meetLink}">${meetLink}</a></li>` : ''}
      </ul>
      <p>Thank you for choosing HealthBook Pro!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}