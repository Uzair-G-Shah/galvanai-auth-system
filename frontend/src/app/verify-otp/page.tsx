
// frontend\src\app\verify-otp\page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { verifyOtp } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  otp: z.string().length(6, { message: "OTP must be 6 digits." }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function VerifyOtpPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      form.setValue("email", email);
    }
  }, [searchParams, form]);

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: OtpFormValues) => {
    try {
      const response = await verifyOtp(values);
      const { user, tokens } = response.data;
      login(user, tokens);
      toast.success("Email verified and logged in!");
      router.push(user.role === "super_admin" ? "/dashboard/users" : "/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Verification failed.";
      toast.error(errorMessage);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Verify OTP</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-gray-600">
          Back to <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </main>
  );
}

