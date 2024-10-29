"use client";

import { useState } from "react";
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

const APPOINTMENTS = [
  {
    id: "1",
    patientName: "John Smith",
    date: new Date("2024-04-10"),
    time: "10:00",
    specialty: "General Practice",
    status: "confirmed",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    patientName: "Emma Wilson",
    date: new Date("2024-04-10"),
    time: "11:30",
    specialty: "Cardiology",
    status: "pending",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    date: new Date("2024-04-11"),
    time: "14:00",
    specialty: "Dermatology",
    status: "confirmed",
    meetLink: "https://meet.google.com/xyz-uvwx-yz",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button>
          <Video className="mr-2 h-4 w-4" />
          Start Consultation
        </Button>
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
            title: "Total Patients",
            value: "156",
            icon: Users,
            color: "text-green-500",
          },
          {
            title: "Upcoming Today",
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
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
                {APPOINTMENTS.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
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
                      {appointment.meetLink ? (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={appointment.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Meet
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm">Confirm</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
            {/* Add comprehensive appointment management UI here */}
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Records</h2>
            {/* Add patient management UI here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}