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
import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";

export default function PatientDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
        <Button asChild>
          <Link href="/book">Book New Appointment</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[
          {
            title: "Upcoming Appointments",
            value: "2",
            icon: Calendar,
            color: "text-blue-500",
          },
          {
            title: "Past Appointments",
            value: "5",
            icon: Clock,
            color: "text-green-500",
          },
          {
            title: "Next Appointment",
            value: "Tomorrow, 10:00 AM",
            icon: Video,
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
        <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add actual appointment data here */}
            <TableRow>
              <TableCell>Dr. Sarah Johnson</TableCell>
              <TableCell>{format(new Date(), "MMM d, yyyy")}</TableCell>
              <TableCell>10:00 AM</TableCell>
              <TableCell>
                <Badge>Confirmed</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  Join Meeting
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}