"use client";

import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[A-Za-z]/, "Password must contain at least one letter"),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return axios.post("/api/auth/resetPassword", {
        token,
        password: data.password,
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Password updated successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Reset failed");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md border rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>

      {!token ? (
        <p className="text-red-500 text-center">
          Invalid or missing token.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {mutation.isPending ? "Updating…" : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}
