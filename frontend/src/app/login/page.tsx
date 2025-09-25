


// frontend\src\app\login\page.tsx

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
import { loginUser } from "@/lib/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values);
      const { user, tokens } = response.data;
      login(user, tokens);
      toast.success("Login successful!");
      router.push(user.role === "super_admin" ? "/dashboard/users" : "/");
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.info("Please verify your email with the OTP sent.");
        router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
      } else {
        const errorMessage = error.response?.data?.message || "Login failed.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
<p className="text-center text-sm text-gray-600">
  {"Don't have an account? "}
  <Link href="/" className="text-blue-600 hover:underline">Go back home</Link>
</p>

      </div>
    </main>
  );
}
