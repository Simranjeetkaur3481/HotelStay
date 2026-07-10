import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HotelFormData } from "@/types/dashboardTypes";

type HotelFormPanelProps = {
  mode: "create" | "edit";
  values: HotelFormData;
  onChange: (values: HotelFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function HotelFormPanel({ mode, values, onChange, onSubmit, onCancel, isLoading }: HotelFormPanelProps) {
  const set = <K extends keyof HotelFormData>(key: K, val: HotelFormData[K]) =>
    onChange({ ...values, [key]: val });

  return (
    <Card className="border-0 shadow-sm ring-1 ring-border/60">
      <CardHeader>
        <CardTitle>{mode === "create" ? "Add New Hotel" : "Edit Hotel"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label>Hotel Name</Label>
            <Input value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Grand Palace Resort" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input value={values.city} onChange={(e) => set("city", e.target.value)} placeholder="Goa" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input value={values.state} onChange={(e) => set("state", e.target.value)} placeholder="Goa" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input value={values.country} onChange={(e) => set("country", e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Star Rating</Label>
            <Input type="number" min={1} max={5} value={values.starRating} onChange={(e) => set("starRating", Number(e.target.value))} className="rounded-xl" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Address</Label>
            <Input value={values.address} onChange={(e) => set("address", e.target.value)} placeholder="Street address" className="rounded-xl" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Description</Label>
            <Textarea value={values.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe your property..." className="rounded-xl" rows={4} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="isActive" checked={values.isActive} onCheckedChange={(v) => set("isActive", !!v)} />
            <Label htmlFor="isActive">Active (visible to guests)</Label>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={onSubmit} disabled={isLoading} className="rounded-xl">
            {isLoading ? "Saving..." : mode === "create" ? "Create Hotel" : "Update Hotel"}
          </Button>
          <Button variant="outline" onClick={onCancel} className="rounded-xl">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}
