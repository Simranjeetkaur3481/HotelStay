import type { BookingFormValues } from "@/types/bookingTypes";
import type { UseFormSetValue } from "react-hook-form";

export function calculateNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const diff = end.getTime() - start.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// default checkin and checkout

export const getDefaultBookingDates = () => {
  const today = new Date();

  const checkIn = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const checkOut = tomorrow.toISOString().split("T")[0];

  return {
    checkIn,
    checkOut,
  };
};

//handleCheckIn
export const handleCheckInChange = (checkIn: string, setValue: UseFormSetValue<BookingFormValues>) => {
  setValue("checkIn", checkIn);

  setValue("checkOut", addDays(checkIn, 1), {
    shouldDirty: true,
    shouldValidate: true,
  });
};

export const getToday = () => new Date().toISOString().split("T")[0];

// export const addDays = (date: string, days: number) => {
//   const d = new Date(date);
//   d.setDate(d.getDate() + days);
//   return d.toISOString().split("T")[0];
// };
export const addDays = (date: string, days: number) => {
  if (!date) {
    throw new Error("addDays: date is required");
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error(`addDays: Invalid date "${date}"`);
  }

  d.setDate(d.getDate() + days);

  return d.toISOString().split("T")[0];
};
export const getNextCheckOutDate = (checkIn: string) => {
  return addDays(checkIn, 1);
};