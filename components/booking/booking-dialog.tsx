"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { format } from "date-fns";
import BookingForm from "./booking-form";

export function BookingDialog({ isOpen, onClose, date, time }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Fill in your details to book an appointment for {format(date, "MMMM d, yyyy")} at {time}
          </DialogDescription>
        </DialogHeader>
        <BookingForm 
          date={date} 
          time={time} 
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}