import {
  // Facebook,
  // Instagram,
  // Twitter,
  // Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-linear-to-b from-card to-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-3xl font-bold text-primary"
            >
              HotelStay
            </Link>

            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              Discover luxury hotels, cozy stays, and unforgettable
              experiences. Whether it's a weekend getaway or your next
              big adventure, HotelStay helps you find the perfect stay.
            </p>

            {/* <div className="mt-8 flex gap-3">
              {[
                // Facebook,
                Instagram,
                Twitter,
                Linkedin,
              ].map((Icon, index) => (
                <button
                  key={index}
                  className="rounded-xl border p-3 transition hover:bg-primary hover:text-white"
                >
                  <Icon className="size-5" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Company
            </h3>

            <div className="space-y-3">
              <Link
                to="/"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Home
              </Link>

              <Link
                to="/hotels"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Hotels
              </Link>

              <Link
                to="/searchRooms"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Search Rooms
              </Link>

              <Link
                to="/login"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Support
            </h3>

            <div className="space-y-3">
              <Link
                to="/login"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Help Center
              </Link>

              <Link
                to="/register"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Create Account
              </Link>

              <Link
                to="/hotels"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Popular Hotels
              </Link>

              <Link
                to="/searchRooms"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Search Rooms
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 text-primary" />
                <span>New Delhi, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-5 text-primary" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <span>support@hotelhub.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} HotelStay. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/hotels" className="transition hover:text-primary">
              Hotels
            </Link>
            <Link to="/searchRooms" className="transition hover:text-primary">
              Rooms
            </Link>
            <Link to="/login" className="transition hover:text-primary">
              Account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}