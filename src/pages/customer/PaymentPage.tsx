import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import PaymentMethodCard from "./PaymentMethod";
import BookingPaymentSummary from "./PaymentSummary";
import { Badge } from "@/components/ui/badge";

export type PaymentProvider = "Razorpay" | "Stripe";

export default function PaymentScreen() {
  const { id } = useParams();
  const [provider, setProvider] = useState<PaymentProvider>("Razorpay");

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-background">
      <section className="container mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-primary">
            <Lock className="mr-1.5 size-3.5" />
            Secure Checkout
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Complete Your Payment</h1>
          <p className="mt-2 text-muted-foreground">
            Your booking is reserved. Complete payment to confirm your stay.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-600" />
            256-bit SSL encrypted · PCI DSS compliant
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PaymentMethodCard provider={provider} onChange={setProvider} />
          </div>
          <BookingPaymentSummary bookingId={Number(id)} provider={provider} />
        </div>
      </section>
    </div>
  );
}
