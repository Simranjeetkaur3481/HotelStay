export interface RoomSearchQuery {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests?: string;
}

export function parseRoomSearchParams(searchParams: URLSearchParams): RoomSearchQuery | null {
  const destination = searchParams.get("destination")?.trim() ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = searchParams.get("guests") ?? undefined;

  if (!destination || !checkIn || !checkOut) {
    return null;
  }

  return { destination, checkIn, checkOut, guests };
}