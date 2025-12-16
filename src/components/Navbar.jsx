"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { toast } from "sonner"


// ---------------------- ZOD SCHEMAS ----------------------
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").regex(/^[A-Za-z ]+$/, "Name can only contain letters & spaces"),
    username: z.string().min(3, "Username must be at least 3 characters")
      .regex(/^[A-Za-z0-9_]+$/, "Only letters, numbers & underscore allowed"),
    email: z.string().email("Enter a valid email"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[0-9]/, "At least one digit required")
      .regex(/[A-Za-z]/, "At least one letter required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ----------------------------------------------------------

export default function Navbar({ loginOpen, setLoginOpen }) {
  const [loading, setLoading] = useState(false);
  

  // ---------------------- LOGIN FORM ----------------------
  const { register: loginRegister, handleSubmit: loginSubmit, formState: { errors: loginErrors } } =
    useForm({
      resolver: zodResolver(loginSchema),
    });

  // ---------------------- SIGNUP FORM ----------------------
  const {
    register: signupRegister,
    handleSubmit: signupSubmit,
    formState: { errors: signupErrors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // ---------------------- LOGIN HANDLER ----------------------
  const handleLogin = async (data) => {
    
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    console.log('response :', res);

    setLoading(false);

    if (res?.error) {
      toast.error( res.error ||"Invalid email or password");
      return;
    } else {

      toast.success("Logged in successfully");
      setLoginOpen(false);
    }
  };

  // ---------------------- SIGNUP HANDLER ----------------------
  const handleSignup = async (data) => {
   
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();
      setLoading(false);

      if (!result.success) {
        toast.error(result.message || "Signup failed");
        return;
      }
        
      toast.success("Account created successfully 🎉");

      // Auto login after signup
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      setLoginOpen(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");

    }
  };

  return (
    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to IPO Portal</DialogTitle>
        </DialogHeader>

        

        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>

          {/* ---------------- LOGIN TAB ---------------- */}
          <TabsContent value="login">
            <form className="space-y-4 mt-4" onSubmit={loginSubmit(handleLogin)}>
              <div>
                <Label className='pb-1'>Email</Label>
                <Input type="email" placeholder="Enter email" {...loginRegister("email")} />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">{loginErrors.email.message}</p>
                )}
              </div>

              <div>
                <Label className='pb-1'>Password</Label>
                <Input type="password" placeholder="Enter password" {...loginRegister("password")} />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">{loginErrors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-[#35a13f] text-white  hover:bg-[#2f8f38]" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

               {/* ✅ Forgot Password Link */}
              <div className="text-center mt-2">
                <Link 
                  href="/forgotPassword" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

            </form>
          </TabsContent>

          {/* ---------------- SIGNUP TAB ---------------- */}
          <TabsContent value="signup">
            <form className="space-y-4 mt-4" onSubmit={signupSubmit(handleSignup)}>
              
              <div>
                <Label className='pb-1'>Full Name</Label>
                <Input type="text" placeholder="Your name" {...signupRegister("name")} />
                {signupErrors.name && (
                  <p className="text-red-500 text-sm">{signupErrors.name.message}</p>
                )}
              </div>

              <div>
                <Label className='pb-1'>Username</Label>
                <Input type="text" placeholder="Enter username" {...signupRegister("username")} />
                {signupErrors.username && (
                  <p className="text-red-500 text-sm">{signupErrors.username.message}</p>
                )}
              </div>

              <div>
                <Label className='pb-1'>Email</Label>
                <Input type="email" placeholder="Enter email" {...signupRegister("email")} />
                {signupErrors.email && (
                  <p className="text-red-500 text-sm">{signupErrors.email.message}</p>
                )}
              </div>

              <div>
                <Label className='pb-1'>Password</Label>
                <Input type="password" placeholder="Create password" {...signupRegister("password")} />
                {signupErrors.password && (
                  <p className="text-red-500 text-sm">{signupErrors.password.message}</p>
                )}
              </div>

              <div>
                <Label className='pb-1'>Confirm Password</Label>
                <Input type="password" placeholder="Confirm password" {...signupRegister("confirmPassword")} />
                {signupErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">{signupErrors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-[#35a13f] text-white  hover:bg-[#2f8f38]" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
