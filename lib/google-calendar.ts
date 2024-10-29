import { google } from 'googleapis';
import { prisma } from './prisma';

const calendar = google.calendar('v3');

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

export async function createMeeting(appointment: any) {
  try {
    const event = {
      summary: `Medical Appointment with ${appointment.doctor.name}`,
      description: `Appointment for ${appointment.patient.name}`,
      start: {
        dateTime: new Date(
          `${appointment.date.toISOString().split('T')[0]}T${appointment.time}:00`
        ).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(
          `${appointment.date.toISOString().split('T')[0]}T${appointment.time}:00`
        ).toISOString(),
        timeZone: 'UTC',
      },
      conferenceData: {
        createRequest: {
          requestId: appointment.id,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      attendees: [
        { email: appointment.patient.email },
        { email: appointment.doctor.email },
      ],
    };

    const response = await calendar.events.insert({
      auth,
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: event,
    });

    if (response.data.hangoutLink) {
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { meetLink: response.data.hangoutLink },
      });
    }

    return response.data.hangoutLink;
  } catch (error) {
    console.error('Error creating Google Meet:', error);
    throw error;
  }
}