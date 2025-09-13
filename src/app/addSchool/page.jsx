"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { School, MapPin, Phone, Mail, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setAuthenticated(true);
          setIsLoading(false);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");
    setSubmitStatus("");

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "School added successfully!");
        setSubmitStatus("success");
        reset();

        // Redirect to /showSchool after 2 seconds
        setTimeout(() => {
          router.push("/showSchools");
        }, 2000);
      } else {
        setMessage(result.error || "Something went wrong");
        setSubmitStatus("error");
      }
    } catch (error) {
      setMessage("Failed to add school. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Only render the form if authenticated
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <School className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Add New School
          </h1>
          <p className="text-gray-600 text-lg">Enter school details to add to the directory</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Success/Error Message */}
          {message && (
            <div className={`p-6 ${submitStatus === "success" ? "bg-green-50 border-b border-green-200" : "bg-red-50 border-b border-red-200"}`}>
              <div className="flex items-center gap-3">
                {submitStatus === "success" ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <AlertCircle className="text-red-600" size={24} />
                )}
                <p className={`font-medium ${submitStatus === "success" ? "text-green-800" : "text-red-800"}`}>
                  {message}
                </p>
              </div>
              {submitStatus === "success" && (
                <p className="text-green-600 text-sm mt-2 ml-9">
                  Redirecting to schools list...
                </p>
              )}
            </div>
          )}

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* School Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <School size={16} className="text-blue-600" />
                School Name
              </label>
              <input
                {...register("name", { required: "School name is required" })}
                placeholder="Enter school name"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-green-600" />
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Enter street address"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.address ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">City</label>
                <input
                  {...register("city", { required: "City is required" })}
                  placeholder="Enter city"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.city ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">State</label>
                <input
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter state"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.state ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone size={16} className="text-orange-600" />
                Contact Number
              </label>
              <input
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit contact number"
                  }
                })}
                placeholder="Enter 10-digit contact number"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.contact ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail size={16} className="text-purple-600" />
                Email Address
              </label>
              <input
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address"
                  }
                })}
                placeholder="Enter email address"
                type="email"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.email_id ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                  }`}
              />
              {errors.email_id && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email_id.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload size={16} className="text-indigo-600" />
                School Image
              </label>
              <div className="relative">
                <input
                  {...register("image", { required: "School image is required" })}
                  type="file"
                  accept="image/*"
                  className={`w-full px-4 py-3 border-2 border-dashed rounded-xl focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors.image ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Adding School...
                </>
              ) : (
                <>
                  <School size={20} />
                  Add School
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 pb-6">
            <p className="text-center text-sm text-gray-500">
              All fields are required to create a school profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}