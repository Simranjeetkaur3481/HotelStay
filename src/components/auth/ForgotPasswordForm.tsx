import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiMail } from "react-icons/fi";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (data: FormValues) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Password reset link sent to your email.");

      navigate("/login", {
        state: {
          email: data.email,
        },
      });
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-extrabold text-[#00355f]">
          SmartStay
        </h1>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot Password?
          </h2>

              <p className="mt-4 text-gray-500 leading-7">
                Enter your registered email address and we'll send you a secure
                link to reset your password.
              </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none transition-all focus:border-[#00355f] focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
          </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#00355f] text-white font-semibold shadow-lg transition hover:bg-[#004a82] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Reset Link
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm text-gray-500">
                Remember your password?
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <Link
          to="/login"
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 text-[#00355f] font-medium transition hover:bg-gray-50"
        >
          <FiArrowLeft />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
