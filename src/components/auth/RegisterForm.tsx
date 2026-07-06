import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { Input } from '../ui/input'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  role: z.enum(["Administrator", "Hotel Owner", "Customer", "Support"]),
});

type RegisterType = z.infer<typeof schema>;

const roleOptions = [
  { value: "Customer", label: "Customer" },
  { value: "Hotel Owner", label: "Hotel Owner" },
] as const;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<RegisterType>({
   defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "Customer",
    },
    resolver: zodResolver(schema),
  })

  const formSubmit = () =>{

  }
  return (
      <div className="flex h-full max-h-[80vh] flex-col">
      {/* Header */}
      <div className="space-y-2 pb-4">
         <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Join the Club</h2>
        <p className="text-sm sm:text-[16px]">Begin your journey to effortless luxury and curated hospitality</p>
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto p-2 hide-scrollbar">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="fullName" className="text-sm font-medium mb-1 inline-block">
              Full Name
            </label>

            <Input id="fullName" {...register("fullName")} />

            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="username" className="text-sm font-medium mb-1 inline-block">
              Username
            </label>

            <Input id="username" {...register("username")} />

            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1 inline-block">
              Email
            </label>

            <Input id="email" type="email" autoComplete="email" {...register("email")} />

            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium mb-1 inline-block">
              Password
            </label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-sm font-medium mb-1 inline-block">
              Phone Number
            </label>

            <Input id="phoneNumber" type="tel" autoComplete="tel" {...register("phoneNumber")} />

            {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label htmlFor="role" className="text-sm font-medium mb-1 inline-block">
              Account Role
            </label>

            <select
              id="role"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              {...register("role")}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting }
            className="h-11 w-full "
          >
            {isSubmitting  ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="pb-4 text-center">
            Already have an account?{" "}
            <Link to="/login" replace className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm