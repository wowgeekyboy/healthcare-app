"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const AVAILABLE_TIMES = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM",
  "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
    if (session?.user?.role !== "ADMIN") {
      redirect("/");
    }
  }, [session, status]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchAppointments();
    }
  }, [session]);

  const renderAppointments = () => {
    return appointments.map((appointment) => (
      <TableRow key={appointment.id}>
        <TableCell>{appointment.patientName}</TableCell>
        <TableCell>{format(new Date(appointment.date), "MMM d, yyyy")}</TableCell>
        <TableCell>{appointment.time}</TableCell>
        <TableCell>{appointment.doctorName}</TableCell>
        <TableCell>
          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
            {appointment.status}
          </Badge>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No appointments found</TableCell>
              </TableRow>
            ) : (
              renderAppointments()
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}