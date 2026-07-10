import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "@/store/api/authApi";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();
 
      toast.success("Password reset successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <FiLock className="text-4xl text-[#00355f]" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-[#00355f]">
          Reset Password
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              New Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-[#00355f] focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-12 outline-none focus:border-[#00355f] focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#00355f] text-white font-semibold shadow-lg transition hover:bg-[#004a82] disabled:opacity-60"
          >
            {isLoading ? (
              "Resetting..."
            ) : (
              <>
                Reset Password
                <FiArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-gray-500">Remember your password?</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <Link
          to="/login"
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 text-[#00355f] font-medium transition hover:bg-gray-50"
        >
          <FiArrowLeft />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
