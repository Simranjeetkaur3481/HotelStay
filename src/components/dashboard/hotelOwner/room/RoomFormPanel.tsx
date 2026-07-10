import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import type { RoomFormData } from "@/types/dashboardTypes";

type RoomFormPanelProps = {
  mode: "create" | "edit";
  values: RoomFormData;
  onChange: (values: RoomFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function RoomFormPanel({ mode, values, onChange, onSubmit, onCancel, isLoading }: RoomFormPanelProps) {
  const { data: hotelsData } = useGetHotelsQuery({});
  const hotels = hotelsData?.data ?? [];

  const set = <K extends keyof RoomFormData>(key: K, val: RoomFormData[K]) =>
    onChange({ ...values, [key]: val });

  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/60">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Add New Room" : "Edit Room"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Hotel</Label>
            <Select
              value={values.hotelId ? String(values.hotelId) : ""}
              onValueChange={(v) => set("hotelId", Number(v))}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select hotel" />
              </SelectTrigger>
              <SelectContent>
                {hotels.map((hotel: { id: number; name: string }) => (
                  <SelectItem key={hotel.id} value={String(hotel.id)}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Room Name</Label>
            <Input value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Deluxe Sea View" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Price per Night (₹)</Label>
            <Input type="number" min={0} value={values.pricePerNight || ""} onChange={(e) => set("pricePerNight", Number(e.target.value))} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Max Occupancy</Label>
            <Input type="number" min={1} value={values.maxOccupancy} onChange={(e) => set("maxOccupancy", Number(e.target.value))} className="rounded-xl" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea value={values.description} onChange={(e) => set("description", e.target.value)} placeholder="Room details..." className="rounded-xl" rows={3} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="isAvailable" checked={values.isAvailable} onCheckedChange={(v) => set("isAvailable", !!v)} />
            <Label htmlFor="isAvailable">Available for booking</Label>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={onSubmit} disabled={isLoading} className="rounded-xl">
            {isLoading ? "Saving..." : mode === "create" ? "Create Room" : "Update Room"}
          </Button>
          <Button variant="outline" onClick={onCancel} className="rounded-xl">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
