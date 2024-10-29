"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  date: Date;
  time: string;
  onClose: () => void;
}

const SPECIALTIES = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
];

export default function BookingForm({ date, time, onClose }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          specialty: formData.get("specialty"),
          symptoms: formData.get("symptoms"),
          date,
          time,
        }),
      });

      if (!response.ok) throw new Error("Failed to book appointment");

      toast({
        title: "Appointment Booked!",
        description: `Your appointment has been scheduled for ${format(date, "MMMM d, yyyy")} at ${time}.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8 p-6">
      <h2 className="text-xl font-semibold mb-6">Complete Your Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty Required</Label>
            <Select name="specialty" required>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTIES.map((specialty) => (
                  <SelectItem key={specialty} value={specialty.toLowerCase()}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptoms">Symptoms (Optional)</Label>
          <Textarea
            id="symptoms"
            name="symptoms"
            placeholder="Briefly describe your symptoms..."
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </Card>
  );
}