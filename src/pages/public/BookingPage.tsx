import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { BookingFormValues } from "@/types/bookingTypes";
import BookingGuestForm from "@/components/booking/BookingGuestFrom";
import SpecialRequest from "@/components/booking/SpecialRequest";
import CouponCard from "@/components/booking/CouponCard";
import BookingSummary from "@/components/booking/BookingSummary";
import useAuth from "@/hooks/useAuth";

export default function BookingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const methods = useForm<BookingFormValues>({
    defaultValues: {
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,

      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      phoneNumber: "",
      notes: "",
      specialRequests: [],
      coupon: "",
    },
  });

  const [discount, setDiscount] = useState(0);

  if (!state) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold">Invalid Booking Request</h2>

        <p className="mt-2 text-muted-foreground">Please select a room first.</p>
      </div>
    );
  }

  const { roomId, hotelId, checkIn, checkOut, guests } = state;

  const onSubmit = (data: BookingFormValues) => {
    navigate("/payment", {
      state: {
        roomId,
        hotelId,
        checkIn,
        checkOut,
        guests,

        guest: data,

        discount,
      },
    });
  };

  return (
    <section className="container py-10 max-w-7xl mx-auto px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Complete Your Booking</h1>

        <p className="mt-2 text-muted-foreground">Review your reservation and enter guest details.</p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <BookingGuestForm />

              <SpecialRequest />

              <CouponCard discount={discount} setDiscount={setDiscount} />
            </div>

            <div className="lg:col-span-4">
              <BookingSummary
                hotelId={hotelId}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                discount={discount}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
