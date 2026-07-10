import { ArrowLeft, CalendarDays, Check, Lock, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/constants/api";

export default function BookingAuthPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.roomId) {
      navigate("/hotels", { replace: true });
    }
  }, [navigate, state?.roomId]);

  const booking = {
    roomName: state?.room?.name,
    hotelName: state?.room?.hotelName,
    roomImage:
      state?.room?.images?.[0]?.imageUrl
      ?? "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
    checkIn: state?.checkIn || "12 Jul",
    checkOut: state?.checkOut || "15 Jul",
    guests: state?.guests || 2,
    total: "₹13,500",
  };

  const handleLogin = () => {
    navigate("/login", {
      state: {
        redirectTo: `/booking/${state?.roomId}`,
        bookingData: state,
      },
    });
  };

  const handleRegister = () => {
    navigate("/register", {
      state: {
        redirectTo: `/booking/${state?.roomId}`,
        bookingData: state,
      },
    });
  };

  return (
    <section className="container py-12 max-w-7xl mx-auto">
      <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Room
      </Button>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Booking Summary */}

        <Card className="overflow-hidden lg:col-span-2">
          <img
            src={booking.roomImage.startsWith("http") ? booking.roomImage : `${API_BASE_URL}${booking.roomImage}`}
            alt={booking.roomName}
            className="h-60 w-full object-cover"
          />

          <div className="space-y-6 p-6">
            <div>
              <h2 className="text-xl font-semibold">{booking.roomName}</h2>

              <p className="text-sm text-muted-foreground">{booking.hotelName}</p>
            </div>

            <Separator />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />

                  <span>Check In</span>
                </div>

                <span>{booking.checkIn}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />

                  <span>Check Out</span>
                </div>

                <span>{booking.checkOut}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />

                  <span>Guests</span>
                </div>

                <span>{booking.guests}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Side */}

        <Card className="flex flex-col justify-center p-8 lg:col-span-3">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-4xl font-bold">You're Almost There</h1>

          <p className="mt-4 text-muted-foreground">
            Sign in or create an account to securely complete your reservation and manage your bookings anytime.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />

              <span>Manage your bookings anytime</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />

              <span>Fast checkout on future bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />

              <span>Booking confirmations & invoices</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />

              <span>Secure payment protection</span>
            </div>
          </div>

          <Button size="lg" className="mt-10" onClick={handleLogin}>
            Continue with Email
          </Button>

          <Button variant="outline" size="lg" className="mt-4" onClick={handleRegister}>
            Create Account
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={handleLogin} className="font-medium text-primary hover:underline">
              Sign In
            </button>
          </p>
        </Card>
      </div>
    </section>
  );
}
