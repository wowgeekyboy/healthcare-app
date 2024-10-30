import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  Clock, 
  Video, 
  Shield, 
  ArrowRight,
  UserCog,
  LogIn
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your Health Journey Begins With a Simple Click
              </h1>
              <p className="text-lg text-muted-foreground">
                Book virtual appointments with top healthcare professionals. 
                Secure, convenient, and available when you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/book">Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">Register Now</Link>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/admin">
                    <UserCog className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800"
                  alt="Doctor with tablet"
                  className="object-cover w-full h-full mix-blend-overlay"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/40 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose HealthBook Pro?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Experience healthcare reimagined for the modern age
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CalendarCheck,
                title: "Easy Scheduling",
                description: "Book appointments in minutes with our intuitive interface",
              },
              {
                icon: Video,
                title: "Virtual Consultations",
                description: "Connect with doctors via secure video calls from anywhere",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health information is protected with enterprise-grade security",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Book appointments anytime, day or night",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-2xl bg-primary px-8 py-12 text-primary-foreground">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-primary-foreground/90">
                  Book your first appointment today and experience healthcare the modern way.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="group"
                  asChild
                >
                  <Link href="/book">
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}