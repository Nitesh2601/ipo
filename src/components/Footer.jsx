"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});


export default function Footer() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange", // real-time validation
  });

  // ⚡ React Query mutation
  const onSubmit = async (data) => {
    try {
      await axios.post("/api/contact", data);
      toast.success("Message sent successfully!");
      reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };


  // ⚡ Handle send
  


  return (
    <footer className="bg-gray-100 border-t mt-16  rounded-2xl">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">

        <div>
          <h3 className="text-lg font-semibold">IPO Hunters</h3>
          <p className="mt-2 text-gray-600">
            Your trusted source for IPO details, GMP trends, allotment updates,
            and market insights.
          </p>
        </div>

        <div>
          
          <ul className="space-y-1 text-gray-700">
            <li>
              <Link href="/privacyPolicy">
                <Button className='bg-[#35a13f] text-white  hover:bg-[#2f8f38]'>
                   Privacy Policy
                </Button>
                
              </Link>
            </li>
          </ul>
        </div>

        <div>
          
          <ul className="space-y-1 text-gray-700">
            <li>
              <Dialog  open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className=" cursor-pointer">
                  <Button
                  className='bg-[#35a13f] text-white  hover:bg-[#2f8f38]'
                  >Contact Us
                  </Button>
                </DialogTrigger>

                <DialogContent className= ' max-w-lg '>
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                  </DialogHeader>

                   <form className="  space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div>
                      <Input
                        placeholder="Your Name"
                        {...register("name")}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <Input
                        placeholder="Your Email"
                        {...register("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Message */}
                    <div className=" w-full">
                      <Textarea
                        className="w-full break-all resize-none"
                        placeholder="Your message..."
                        {...register("message")}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full bg-[#35a13f] text-white  hover:bg-[#2f8f38]" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} IPO Hunters. All information here is from public sources.
      </div>
    </footer>
  );
}
