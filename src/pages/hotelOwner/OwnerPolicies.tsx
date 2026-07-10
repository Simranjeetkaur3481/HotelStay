import { FileText, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import EmptyState from "@/components/dashboard/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  useGetPoliciesQuery,
  useAddPolicyMutation,
  useUpdatePolicyMutation,
  useDeletePolicyMutation,
} from "@/store/api/policyApi";
import { useGetHotelsQuery } from "@/store/api/hotelApi";
import type { PolicyFormData } from "@/types/dashboardTypes";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

const emptyPolicy = (): PolicyFormData => ({ hotelId: 0, title: "", description: "" });

const OwnerPolicies = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetPoliciesQuery(undefined);
  const { data: hotelsData } = useGetHotelsQuery({});
  const [addPolicy, { isLoading: isAdding }] = useAddPolicyMutation();
  const [updatePolicy, { isLoading: isUpdating }] = useUpdatePolicyMutation();
  const [deletePolicy] = useDeletePolicyMutation();

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [editingPolicy, setEditingPolicy] = useState<{ id: number; hotelId: number } | null>(null);
  const [formValues, setFormValues] = useState<PolicyFormData>(emptyPolicy());
  const [selectedHotelId, setSelectedHotelId] = useState<string>("all");

  const allHotels = hotelsData?.data ?? [];
  const hasOwnershipField = allHotels.some((hotel: Record<string, unknown>) =>
    ["ownerId", "hotelOwnerId", "userId", "createdById"].some((key) => hotel[key] != null)
  );
  const hotels = hasOwnershipField && user?.id
    ? allHotels.filter((hotel: Record<string, unknown>) =>
        [hotel.ownerId, hotel.hotelOwnerId, hotel.userId, hotel.createdById].some((value) => Number(value) === Number(user.id))
      )
    : allHotels;
  const ownerHotelIds = new Set(hotels.map((hotel: { id: number }) => Number(hotel.id)));
  const allPolicies = data?.data ?? [];
  const ownerPolicies = allPolicies.filter((policy: { hotelId?: number }) => !policy.hotelId || ownerHotelIds.has(Number(policy.hotelId)));
  const policies = selectedHotelId === "all"
    ? ownerPolicies
    : ownerPolicies.filter((policy: { hotelId?: number }) => Number(policy.hotelId) === Number(selectedHotelId));

  const openCreate = () => {
    setFormValues(emptyPolicy());
    setEditingPolicy(null);
    setFormMode("create");
  };

  const openEdit = (policy: PolicyFormData & { id: number; hotelId: number }) => {
    setFormValues({ hotelId: policy.hotelId, title: policy.title, description: policy.description });
    setEditingPolicy({ id: policy.id, hotelId: policy.hotelId });
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingPolicy(null);
    setFormValues(emptyPolicy());
  };

  const handleSubmit = async () => {
    if (!formValues.title || !formValues.hotelId) {
      return toast.error("Title and hotel are required");
    }
    try {
      if (formMode === "create") {
        await addPolicy({ hotelId: formValues.hotelId, data: { title: formValues.title, description: formValues.description } }).unwrap();
        toast.success("Policy created");
      } else if (formMode === "edit" && editingPolicy) {
        await updatePolicy({
          hotelId: editingPolicy.hotelId,
          policyId: editingPolicy.id,
          data: { title: formValues.title, description: formValues.description },
        }).unwrap();
        toast.success("Policy updated");
      }
      closeForm();
    } catch {
      toast.error(formMode === "create" ? "Failed to create policy" : "Failed to update policy");
    }
  };

  const handleDelete = async (policy: { hotelId: number; id: number }) => {
    if (!confirm("Delete this policy?")) return;
    try {
      await deletePolicy({ hotelId: policy.hotelId, policyId: policy.id }).unwrap();
      toast.success("Policy deleted");
      if (editingPolicy?.id === policy.id) closeForm();
    } catch {
      toast.error("Failed to delete policy");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hotel Policies"
        description="Define cancellation, check-in, and house rules for your properties."
        action={
          <Button className="rounded-xl" onClick={openCreate}>
            <Plus className="mr-2 size-4" /> Add Policy
          </Button>
        }
      />

      <div className="max-w-xs">
        <Select value={selectedHotelId} onValueChange={setSelectedHotelId}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Filter by hotel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All My Hotels</SelectItem>
            {hotels.map((hotel: { id: number; name: string }) => (
              <SelectItem key={hotel.id} value={String(hotel.id)}>
                {hotel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formMode && (
        <Card className="border-0 shadow-sm ring-1 ring-border/60">
          <CardContent className="space-y-4 p-6">
            <h3 className="font-semibold">{formMode === "create" ? "Add Policy" : "Edit Policy"}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Hotel</Label>
                <Select
                  value={formValues.hotelId ? String(formValues.hotelId) : ""}
                  onValueChange={(v) => setFormValues({ ...formValues, hotelId: Number(v) })}
                  disabled={formMode === "edit"}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select hotel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel: { id: number; name: string }) => (
                      <SelectItem key={hotel.id} value={String(hotel.id)}>{hotel.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Policy Title</Label>
                <Input value={formValues.title} onChange={(e) => setFormValues({ ...formValues, title: e.target.value })} placeholder="e.g. Cancellation Policy" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formValues.description} onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} placeholder="Policy details..." className="rounded-xl" rows={3} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={isAdding || isUpdating} className="rounded-xl">
                {formMode === "create" ? "Create Policy" : "Update Policy"}
              </Button>
              <Button variant="outline" onClick={closeForm} className="rounded-xl">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : !policies.length && !formMode ? (
        <EmptyState icon={FileText} title="No policies defined" description="Add policies to set clear expectations for your guests." />
      ) : (
        <div className="grid gap-4">
          {policies.map((policy: PolicyFormData & { id: number; hotelId: number; hotelName?: string }) => (
            <Card key={policy.id} className="border-0 shadow-sm ring-1 ring-border/60">
              <CardContent className="flex items-start justify-between p-6">
                <div className="flex gap-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{policy.title}</h3>
                    {policy.hotelName && <p className="text-sm text-muted-foreground">{policy.hotelName}</p>}
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{policy.description}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(policy)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(policy)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerPolicies;
