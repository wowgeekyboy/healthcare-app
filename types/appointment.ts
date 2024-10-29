export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  date: Date;
  time: string;
  specialty: string;
  symptoms: string;
  meetLink?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  image: string;
  bio: string;
  availability: {
    [key: string]: TimeSlot[];
  };
}