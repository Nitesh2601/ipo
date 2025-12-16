"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  // React Query Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      return axios.post("/api/auth/forgotPassword", {
        email,
      });
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "Reset link sent to your email");
      setEmail("");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Try again later."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    forgotPasswordMutation.mutate();
  };

  return (
    <div className="mx-auto mt-20 w-[350px] bg-gray-200 p-8 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
        className='border-black'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Sending…" : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
