"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

export default function VerifyOtpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: data.otp }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ OTP verified! Redirecting...");
        setTimeout(() => router.push("/addSchool"), 1500);
      } else {
        setMessage(result.error || "Invalid OTP");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>

        {message && <p className="text-center text-sm text-blue-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
              <KeyRound size={16} /> OTP Code
            </label>
            <input
              {...register("otp", { required: "OTP is required" })}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
