import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Your payments and personal information are protected with industry-standard security.",
  },
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description:
      "Book confidently knowing you'll always get competitive prices and exclusive offers.",
  },
  {
    icon: BadgeCheck,
    title: "Instant Confirmation",
    description:
      "Receive immediate booking confirmation with no hidden surprises.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our travel experts are available around the clock whenever you need assistance.",
  },
];
import React from 'react'

const WhyChooseUs = () => {
  return (
    <section className="bg-muted/30 py-20">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mx-auto mb-14 max-w-3xl text-center">

      <p className="font-semibold text-primary">
        Why Choose HotelHub
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Book With Confidence
      </h2>

      <p className="mt-4 text-muted-foreground">
        We make finding and booking your perfect stay effortless,
        secure, and affordable.
      </p>

    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="rounded-3xl border bg-background p-8 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
            <Icon className="size-7" />
          </div>

          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

export default WhyChooseUs