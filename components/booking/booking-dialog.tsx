import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookingForm } from "./booking-form"

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  date: Date
  time: string
}

export function BookingDialog({ isOpen, onClose, date, time }: BookingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Fill in your details to confirm your appointment.
          </DialogDescription>
        </DialogHeader>
        <BookingForm date={date} time={time} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}