export type HotelFormData = {
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  address: string;
  starRating: number;
  isActive: boolean;
};

export type RoomFormData = {
  hotelId: number;
  name: string;
  description: string;
  pricePerNight: number;
  maxOccupancy: number;
  isAvailable: boolean;
};

export type PolicyFormData = {
  hotelId: number;
  title: string;
  description: string;
};

export type AmenityFormData = {
  name: string;
  icon: string;
};

export const emptyHotelForm = (): HotelFormData => ({
  name: "",
  description: "",
  city: "",
  state: "",
  country: "India",
  address: "",
  starRating: 3,
  isActive: true,
});

export const emptyRoomForm = (): RoomFormData => ({
  hotelId: 0,
  name: "",
  description: "",
  pricePerNight: 0,
  maxOccupancy: 2,
  isAvailable: true,
});
