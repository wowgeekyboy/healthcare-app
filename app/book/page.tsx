"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Clock } from "lucide-react";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { TimeSlot } from "@/types/appointment";

const AVAILABLE_TIMES: TimeSlot[] = [
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: false },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: false },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
];

export default function BookAppointment() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowDialog(true);
  };

const handleBooking = async () => {
  if (!date || !selectedTime) return;

  const response = await fetch('/api/book-appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patientName: session.user.name, // Assuming you have the patient's name from the session
      date: date.toISOString().split('T')[0], // Format date as needed
      time: selectedTime,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.message); // Success message
    // Optionally reset the form or show a success dialog
  } else {
    const errorData = await response.json();
    console.error('Error:', errorData.error);
  }
};

  const getAvailableTimeSlots = (appointments, selectedDate) => {
    const bookedSlots = appointments
      .filter(appointment => appointment.date === selectedDate)
      .map(appointment => appointment.time);

    return AVAILABLE_TIMES.filter(slot => !bookedSlots.includes(slot.time));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Book an Appointment</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Select Date</h2>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return (
                date < today ||
                date > new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000) ||
                date.getDay() === 0
              );
            }}
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Available Time Slots</h2>
          </div>
          {date ? (
            <ScrollArea className="h-[300px] pr-4">
              <div className="grid grid-cols-2 gap-4">
                {getAvailableTimeSlots(appointments, date).map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className="w-full"
                    disabled={!slot.available}
                    onClick={() => handleTimeSelect(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Please select a date first
            </div>
          )}
        </Card>
      </div>

      {date && selectedTime && (
        <BookingDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          date={date}
          time={selectedTime}
        />
      )}
    </div>
  );
}