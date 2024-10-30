"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

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

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            {/* Add overview content here */}
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No appointments found</TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{format(new Date(appointment.date), "MMM d, yyyy")}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {appointment.status === "pending" ? (
                          <Button size="sm" onClick={() => handleConfirmAppointment(appointment.id)}>
                            Confirm
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">View Details</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}