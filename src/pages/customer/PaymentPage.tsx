import {
  CreditCard,
  Wallet,
  Landmark,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  return (
    <section className="container py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Payment
      </h1>

      <div className="grid gap-8 lg:grid-cols-12">

        {/* Left */}

        <div className="space-y-5 lg:col-span-8">

          <Card>

            <CardHeader>

              <CardTitle>
                Select Payment Method
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <button className="flex w-full items-center gap-4 rounded-lg border p-4 transition hover:border-primary">

                <CreditCard />

                Credit / Debit Card

              </button>

              <button className="flex w-full items-center gap-4 rounded-lg border p-4 transition hover:border-primary">

                <Wallet />

                UPI

              </button>

              <button className="flex w-full items-center gap-4 rounded-lg border p-4 transition hover:border-primary">

                <Landmark />

                Net Banking

              </button>

            </CardContent>

          </Card>

        </div>

        {/* Right */}

        <div className="lg:col-span-4">

          Booking Summary

        </div>

      </div>

      <Button
        className="mt-8 w-full"
        size="lg"
      >
        Pay Now
      </Button>

    </section>
  );
}