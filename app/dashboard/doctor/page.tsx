"use client";

import { useSession } from "next-auth/react";
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
import { Calendar, Users, Clock, Video } from "lucide-react";

export default function DoctorDashboard() {
  const { data: session } = useSession();

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        <Button>
          <Video className="mr-2 h-4 w-4" />
          Start Consultation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[
          {
            title: "Today's Appointments",
            value: "8",
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
            title: "Next Appointment",
            value: "10:00 AM",
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

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                patient: "John Smith",
                time: "10:00 AM",
                status: "confirmed",
                meetLink: "https://meet.google.com/abc",
              },
              {
                patient: "Emma Wilson",
                time: "11:30 AM",
                status: "pending",
              },
            ].map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.patient}</TableCell>
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
    </div>
  );
}