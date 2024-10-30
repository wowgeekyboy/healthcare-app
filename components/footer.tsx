"use client";

import { Button } from "@/components/ui/button"; // Ensure this import is present
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gynoveda</h3>
            <p className="text-sm text-muted-foreground">
              Making healthcare accessible through modern technology.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:underline">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@gynoveda.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Healthcare Ave, Medical District</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Working Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Monday - Friday:</span>
                <br />
                10:00 AM - 7:00 PM
              </li>
              <li>
                <span className="font-medium">Saturday:</span>
                <br />
                10:00 AM - 4:00 PM
              </li>
              <li>
                <span className="font-medium">Sunday:</span>
                <br />
                Closed
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gynoveda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}