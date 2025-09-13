"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2, House } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("OTP sent to your email!");
        router.push(`/verify-otp?email=${data.email}`);
      } else {
        setMessage(result.error || "Failed to send OTP");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 p-4">
      <Link href="/" title="Go Back To Home" className="absolute top-2 left-2 m-4 inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl mb-6 animate-bounce-subtle">
        <House  className="text-white" size={28} />
      </Link>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {message && <p className="text-center text-sm text-blue-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <Mail size={16} /> Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
