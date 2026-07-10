import { Camera, Loader2, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeader from "@/components/dashboard/hotelOwner/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfileQuery, useUpdateProfileMutation, useUploadAvatarMutation } from "@/store/api/profileApi";
import { API_BASE_URL } from "@/constants/api";
import toast from "react-hot-toast";
import { useRef } from "react";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
});

type ProfileForm = z.infer<typeof schema>;

const CustomerProfile = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const profile = data?.data;

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    values: {
      fullName: profile?.fullName ?? "",
      email: profile?.email ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
    },
  });

  const onSubmit = async (formData: ProfileForm) => {
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadAvatar(file).unwrap();
      toast.success("Avatar updated");
    } catch {
      toast.error("Failed to upload avatar");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Profile Settings" description="Manage your personal information and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm ring-1 ring-border/60 lg:col-span-1">
          <CardContent className="flex flex-col items-center p-8">
            <div className="relative">
              <Avatar className="size-28 ring-4 ring-primary/10">
                <AvatarImage src={profile?.avatarUrl ? `${API_BASE_URL}${profile.avatarUrl}` : undefined} />
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {profile?.fullName?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
              >
                <Camera className="size-4" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{profile?.fullName}</h3>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <p className="mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
              {profile?.role?.replace("_", " ").toLowerCase()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName"><User className="mr-1 inline size-4" />Full Name</Label>
                <Input id="fullName" {...register("fullName")} className="rounded-xl" />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email"><Mail className="mr-1 inline size-4" />Email</Label>
                <Input id="email" type="email" {...register("email")} className="rounded-xl" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber"><Phone className="mr-1 inline size-4" />Phone Number</Label>
                <Input id="phoneNumber" {...register("phoneNumber")} className="rounded-xl" placeholder="+91 XXXXX XXXXX" />
              </div>
              <Button type="submit" disabled={isUpdating} className="rounded-xl">
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerProfile;
