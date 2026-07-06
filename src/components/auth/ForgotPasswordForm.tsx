import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("invalid email"),
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {};
  return (
    <div>
      {" "}
      <h2 className=" text-3xl font-bold text-[#00355f]">SmartStay</h2>
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Forgot Password?</h2>

        <p className=" max-w-md text-lg leading-8 text-gray-500">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
        <div>
          <label className="mb-3 block text-sm font-semibold text-[#141B2B]">Email Address</label>

          <input
            type="email"
            placeholder="name@company.com"
            className="h-14 w-full rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-[#00355f]"
            {...register("email")}
          />

          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#00355f] font-medium text-white transition hover:bg-[#004a82] disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}

          {!isSubmitting && <FiArrowRight size={18} />}
        </button>
      </form>
      <div className="max-w-md border-t border-gray-200" />
      <Link to={"/login"} className="flex items-center justify-center gap-2 text-[#00355f] transition hover:underline">
        <FiArrowLeft />
        Back to Sign In
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
