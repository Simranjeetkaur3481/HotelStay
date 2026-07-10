import { Calendar, Loader2, Lock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreatePaymentMutation, useGetBookingByIdQuery, useVerifyPaymentMutation } from "@/store/api/paymentApi";
import type { PaymentProvider } from "./PaymentPage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Props = {
  bookingId: number;
  provider: PaymentProvider;
};

export default function BookingPaymentSummary({ bookingId, provider }: Props) {
  const { data, isLoading } = useGetBookingByIdQuery(Number(bookingId));
  const navigate = useNavigate();
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const booking = data?.data || {};

  const openRazorpay = (payment: {
    publicKey: string;
    amountInSmallestUnit: number;
    currency: string;
    providerOrderId: string;
    paymentId: number;
  }) => {
    const options = {
      key: payment.publicKey,
      amount: payment.amountInSmallestUnit,
      currency: payment.currency,
      order_id: payment.providerOrderId,
      name: "HotelStay",
      description: "Hotel Booking",
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          await verifyPayment({
            paymentId: payment.paymentId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }).unwrap();
          navigate("/payment/success", {
            state: { paymentId: payment.paymentId, bookingId },
          });
        } catch {
          toast.error("Payment verification failed. Please contact support.");
        }
      },
      modal: {
        ondismiss: () => {
          toast.error("Payment cancelled.");
        },
      },
      theme: { color: "#00355f" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const openStripe = (payment: { checkoutUrl: string }) => {
    window.location.href = payment.checkoutUrl;
  };

  const handlePayment = async () => {
    try {
      const res = await createPayment({
        bookingId,
        paymentProvider: provider === "Razorpay" ? 1 : 2,
      }).unwrap();

      const payment = res.data;
      if (provider === "Razorpay") {
        openRazorpay(payment);
        return;
      }
      if (provider === "Stripe") {
        openStripe(payment);
      }
    } catch {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Card className="sticky top-24 border-0 shadow-lg ring-1 ring-border/60">
        <CardContent className="flex h-72 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24 border-0 shadow-lg ring-1 ring-border/60">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 pt-6">
        <div>
          <h3 className="text-lg font-semibold">{booking?.roomName}</h3>
          <p className="text-sm text-muted-foreground">{booking?.hotelName}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" /> Check In
            </span>
            <span className="font-medium">{booking?.checkInDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" /> Check Out
            </span>
            <span className="font-medium">{booking?.checkOutDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4" /> Guests
            </span>
            <span className="font-medium">{booking?.guestCount}</span>
          </div>
        </div>

        <Separator />

        <div className="rounded-xl bg-primary/5 p-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Room charges</span>
            <span>₹{booking?.totalAmount?.toLocaleString()}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-emerald-600">
            <span>Summer discount (SUMMER30)</span>
            <span>Applied at checkout</span>
          </div>
        </div>

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{booking?.totalAmount?.toLocaleString()}</span>
        </div>

        <Button className="h-12 w-full rounded-xl text-base" disabled={isCreating} onClick={handlePayment}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 size-4" />
              Pay with {provider}
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By completing payment you agree to our terms and cancellation policy.
        </p>
      </CardContent>
    </Card>
  );
}
