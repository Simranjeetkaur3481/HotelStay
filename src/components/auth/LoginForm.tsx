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
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const schema = z.object({
  emailOrUsername: z.string().trim().min(1, "Please enter your email or username"),
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
    reset,
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
    <div className="space-y-3 sm:space-y-5">
      <div className="space-y-2 mb-5">
        <h3 className="text-3xl font-bold text-(--primary-color) mb-7">SmartStay</h3>
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Get the full experience</h2>
        <p className="text-sm sm:text-[16px]">Track prices, make trip planning easier and enjoy faster booking</p>
      </div>

      <form onSubmit={handleSubmit(formSubmit)} className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label htmlFor="emailOrUsername" className="text-sm font-medium mb-1 inline-block">
            Email or Username
          </label>

          <Input id="emailOrUsername" type="text" autoComplete="username" {...register("emailOrUsername")} />

          {errors.emailOrUsername && <p className="text-sm text-destructive">{errors.emailOrUsername.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium mb-1 inline-block">
            Password
          </label>

          <div className="relative ">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
          <Link
            to={"/forgotPassword"}
            className="flex w-full text-(--primary-color) justify-end cursor-pointer font-medium text-sm"
          >
            Forgot your password?
          </Link>

          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="h-11 w-full ">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button type="button" variant="outline" className="h-11 w-full transition hover:bg-muted">
            <FcGoogle className="h-4 w-4" />
          </Button>

          <Button type="button" variant="outline" className="h-11 w-full transition hover:bg-muted">
            <FaApple className="h-4 w-4" />
          </Button>

          <Button type="button" variant="outline" className="h-11 w-full transition hover:bg-muted">
            <FaFacebookF className="h-4 w-4 text-blue-600" />
          </Button>
        </div>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" replace className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
