import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/store/api/authApi";
import { getDashboardPathForRole } from "@/constants/roles";

import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const schema = z.object({
  emailOrUsername: z
    .string()
    .trim()
    .min(1, "Please enter your email or username"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginType = z.infer<typeof schema>;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const formSubmit = async (data: LoginType) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);
      if (!res.success || !res.data) {
        throw new Error(res?.message || "Invalid credentials");
      }
      dispatch(setUser(res?.data));
      navigate(getDashboardPathForRole(res.data.role));
    } catch (error: any) {
      console.log(error?.data?.message || "something went wrong");
    }
  };
  return (

  <div className="w-full max-w-md mx-auto">
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-[#00355f] mt-10">
        SmartStay
      </h1>

      <h2 className="mt-8 text-3xl font-bold text-gray-900">
        Welcome Back 👋
      </h2>

      <p className="mt-3 text-gray-500 leading-7">
        Sign in to continue managing your bookings and discover your next stay.
      </p>
    </div>

    <form
      onSubmit={handleSubmit(formSubmit)}
      className="space-y-6"
    >
      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Email or Username
        </label>

        <Input
          {...register("emailOrUsername")}
          placeholder="Enter your email or username"
          className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#00355f]"
        />

        {errors.emailOrUsername && (
          <p className="mt-2 text-sm text-red-500">
            {errors.emailOrUsername.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>

          <Link
            to="/forgotPassword"
            className="text-sm font-medium text-[#00355f] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-12 rounded-xl border-gray-300 pr-12 focus:ring-2 focus:ring-[#00355f]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00355f]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl bg-[#00355f] hover:bg-[#01487e] text-white text-base font-semibold shadow-lg transition-all duration-300"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>

      {/* Divider */}
      <div className="flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">
          Or continue with
        </span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl hover:shadow-md transition"
        >
          <FcGoogle size={22} />
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl hover:shadow-md transition"
        >
          <FaApple size={22} />
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl hover:shadow-md transition"
        >
          <FaFacebookF
            size={18}
            className="text-blue-600"
          />
        </Button>
      </div>

      {/* Register */}
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#00355f] hover:underline"
        >
          Create Account
        </Link>
      </p>
    </form>
  </div>

  );
};

export default LoginForm;
