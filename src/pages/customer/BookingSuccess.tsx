import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Luggage, Hotel, PartyPopper, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!state?.paymentId) {
      navigate("/", { replace: true });
    }
  }, [navigate, state?.paymentId]);

  useEffect(() => {
    if (count === 0) {
      navigate("/", { replace: true });
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-linear-to-b from-emerald-50 via-background to-background px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Funny Illustration */}
        <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-200/40 blur-3xl" />

          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border bg-white shadow-xl">
            <span className="text-7xl">🧳😎</span>
          </div>

          <PartyPopper className="absolute left-3 top-5 size-8 rotate-[-25deg] text-yellow-500" />
          <PartyPopper className="absolute right-3 top-5 size-8 rotate-25 text-pink-500" />

          <Hotel className="absolute -bottom-3 left-6 size-8 text-primary" />
          <CheckCircle2 className="absolute -bottom-3 right-6 size-8 text-green-600" />
        </div>

        <h1 className="mt-10 text-5xl font-black tracking-tight">Woohoo! 🎉</h1>

        <p className="mt-4 text-xl font-medium">
          Your room said <span className="text-primary">"See you soon!"</span>
        </p>

        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          We've officially reserved your stay. The fluffy pillow has already started waiting for you.
        </p>

        {/* Booking ID */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 shadow-sm">
          <span className="text-muted-foreground">Booking ID</span>

          <span className="font-bold">#{state?.bookingId}</span>
        </div>
        <h2 className="text-3xl">
          Redirecting in {count} second{count > 1 && "s"}...
        </h2>

        {/* Funny Cards */}

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1">
            <Luggage className="mx-auto mb-3 size-8 text-primary" />

            <h3 className="font-semibold">Pack Smart</h3>

            <p className="mt-2 text-sm text-muted-foreground">Maybe leave room for souvenirs this time. 😄</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1">
            <Mail className="mx-auto mb-3 size-8 text-primary" />

            <h3 className="font-semibold">Check Email</h3>

            <p className="mt-2 text-sm text-muted-foreground">Your confirmation is already flying toward your inbox.</p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1">
            <span className="block text-4xl">🌴</span>

            <h3 className="mt-3 font-semibold">Relax Mode</h3>

            <p className="mt-2 text-sm text-muted-foreground">Stress has officially checked out.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="rounded-xl px-8" onClick={() => navigate("/customer/bookings")}>
            View My Booking
          </Button>

          <Button size="lg" variant="outline" className="rounded-xl px-8" onClick={() => navigate("/")}>
            Book Another Adventure
          </Button>
        </div>

        <p className="mt-10 text-sm italic text-muted-foreground">
          P.S. Your suitcase is already more excited than you are. 🧳✨
        </p>
      </div>
    </div>
  );
}
