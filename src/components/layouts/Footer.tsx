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
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-3xl font-bold text-primary"
            >
              HotelHub
            </Link>

            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              Discover luxury hotels, cozy stays, and unforgettable
              experiences. Whether it's a weekend getaway or your next
              big adventure, HotelHub helps you find the perfect stay.
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
                to="/about"
                className="block text-muted-foreground transition hover:text-primary"
              >
                About Us
              </Link>

              <Link
                to="/hotels"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Hotels
              </Link>

              <Link
                to="/offers"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Offers
              </Link>

              <Link
                to="/contact"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Contact
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
                to="/faq"
                className="block text-muted-foreground transition hover:text-primary"
              >
                FAQ
              </Link>

              <Link
                to="/privacy"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/help"
                className="block text-muted-foreground transition hover:text-primary"
              >
                Help Center
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
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} HotelHub. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="transition hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-primary"
            >
              Terms
            </Link>

            <Link
              to="/cookies"
              className="transition hover:text-primary"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}