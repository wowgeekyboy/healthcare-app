import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DOCTORS = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Practice",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
    bio: "Dr. Johnson has over 15 years of experience in general practice and preventive medicine.",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400",
    bio: "Specialized in cardiovascular health with a focus on preventive cardiology.",
  },
  {
    id: "3",
    name: "Dr. Emily Williams",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400",
    bio: "Dedicated to providing comprehensive care for children from newborns to adolescents.",
  },
  {
    id: "4",
    name: "Dr. James Martinez",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
    bio: "Expert in treating various skin conditions with the latest dermatological techniques.",
  },
];

export default function DoctorsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Our Medical Team</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DOCTORS.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {doctor.specialty}
              </p>
              <p className="text-sm mb-4">{doctor.bio}</p>
              <Button asChild className="w-full">
                <Link href={`/book?doctor=${doctor.id}`}>
                  Book Appointment
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}