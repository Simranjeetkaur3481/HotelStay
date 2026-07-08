
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FiArrowLeft } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { useVerifyEmailMutation, useVerifyOtpMutation } from "@/store/api/authApi";

// // import {
// //   useVerifyOtpMutation,
// //   useVerifyEmailMutation,
// // } from "@/redux/api/authApi";

// const schema = z.object({
//   otp: z
//     .string()
//     .min(6, "OTP must be 6 digits")
//     .max(6, "OTP must be 6 digits"),
// });

// type FormValues = z.infer<typeof schema>;

// const VerifyOtp = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email;

//   const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
//   const [sendAgain, { isLoading: resendLoading }] =
//     useVerifyEmailMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormValues) => {
//     try {
//       const res=await verifyOtp({
//         otp: data.otp,
//       }).unwrap();
//       toast.success("OTP verified successfully");
//         console.log(res.data)
//       navigate("/reset-password", {
//         state: {
//           email,
//           otp: data.otp,
//         },
//       });
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       await sendAgain({ email }).unwrap();
//       toast.success("OTP sent again");
//     } catch {
//       toast.error("Unable to resend OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 flex items-center justify-center p-6">

//       <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

//         <div className="flex justify-center">
//           <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
//             <span className="text-4xl">📩</span>
//           </div>
//         </div>

//         <h1 className="mt-6 text-center text-3xl font-bold text-[#00355f]">
//           Verify OTP
//         </h1>

//         <p className="mt-3 text-center text-gray-500">
//           We've sent a verification code to
//         </p>

//         <p className="text-center font-semibold text-[#00355f] mt-2">
//           {email}
//         </p>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mt-8 space-y-6"
//         >
//           <div>
//             <label className="mb-2 block font-medium">
//               Enter OTP
//             </label>

//             <input
//               {...register("otp")}
//               placeholder="123456"
//               maxLength={6}
//               className="h-14 w-full rounded-xl border border-gray-300 text-center text-2xl tracking-[10px] outline-none focus:border-[#00355f] focus:ring-4 focus:ring-blue-100"
//             />

//             {errors.otp && (
//               <p className="mt-2 text-red-500 text-sm">
//                 {errors.otp.message}
//               </p>
//             )}
//           </div>

//           <button
//             disabled={isLoading}
//             className="w-full h-14 rounded-xl bg-[#00355f] text-white font-semibold hover:bg-[#01487e]"
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">

//           <p className="text-gray-500">
//             Didn't receive the code?
//           </p>

//           <button
//             onClick={resendOtp}
//             disabled={resendLoading}
//             className="mt-2 text-[#00355f] font-semibold hover:underline"
//           >
//             {resendLoading
//               ? "Sending..."
//               : "Resend OTP"}
//           </button>

//         </div>

//         <Link
//           to="/login"
//           className="mt-8 flex items-center justify-center gap-2 text-[#00355f] hover:underline"
//         >
//           <FiArrowLeft />
//           Back to Login
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default VerifyOtp;