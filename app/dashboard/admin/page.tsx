"use client";

import { useSession } from "next-auth/react";
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
import { Calendar, Users, Clock, Video } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return null; // Or redirect to login
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[
          {
            title: "Total Appointments",
            value: "24",
            icon: Calendar,
            color: "text-blue-500",
          },
          {
            title: "Total Users",
            value: "156",
            icon: Users,
            color: "text-green-500",
          },
          {
            title: "Active Doctors",
            value: "8",
            icon: Clock,
            color: "text-orange-500",
          },
        ].map((stat, index) => (
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

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    patient: "John Smith",
                    doctor: "Dr. Sarah Johnson",
                    date: new Date(),
                    time: "10:00 AM",
                    status: "confirmed",
                  },
                  {
                    patient: "Emma Wilson",
                    doctor: "Dr. Michael Chen",
                    date: new Date(),
                    time: "11:30 AM",
                    status: "pending",
                  },
                ].map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>
                      {format(appointment.date, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="doctors">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Doctors</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Dr. Sarah Johnson",
                    specialty: "General Practice",
                    email: "sarah.johnson@example.com",
                    status: "active",
                  },
                  {
                    name: "Dr. Michael Chen",
                    specialty: "Cardiology",
                    email: "michael.chen@example.com",
                    status: "active",
                  },
                ].map((doctor, index) => (
                  <TableRow key={index}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>
                      <Badge>{doctor.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "John Smith",
                    email: "john.smith@example.com",
                    joined: new Date(),
                  },
                  {
                    name: "Emma Wilson",
                    email: "emma.wilson@example.com",
                    joined: new Date(),
                  },
                ].map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      {format(patient.joined, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View History
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}