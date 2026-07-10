export interface BookingFormValues {
    checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  notes: string;

  specialRequests: string[];

  coupon: string;
}

export interface BookingDetails  {
  checkIn: string;
  checkOut: string;
  guests: number;
};
