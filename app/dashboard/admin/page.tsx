"use client";

import { useEffect, useState } from "react";
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
import { Calendar, Users, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const todayAppointments = appointments.filter(
    (apt) => format(new Date(apt.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "Total Patients",
      value: new Set(appointments.map(apt => apt.patientEmail)).size,
      icon: Users,
      color: "text-green-500",
    },
  ];

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">All Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : todayAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No appointments for today</TableCell>
                  </TableRow>
                ) : (
                  todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {appointment.status === "pending" ? (
                          <Button size="sm">Confirm</Button>
                        ) : (
                          <Button size="sm" variant="outline" asChild>
                            <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer">
                              Join Meet
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
                        <Button size="sm" variant="outline">View Details</Button>
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