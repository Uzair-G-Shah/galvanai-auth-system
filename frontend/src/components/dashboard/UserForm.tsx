

// // frontend\src\components\dashboard\UserForm.tsx
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CreateUserFormData, User } from "@/types";
// import { createUser, updateUser } from "@/lib/auth";
// import { toast } from "sonner";
// import { useEffect } from "react";

// // Base schema for user data
// const userSchema = z.object({
//   first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
//   last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
//   email: z.string().email({ message: "Invalid email address." }),
//   mobile_number: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
// });

// // Schema for creating a new user (requires password and profile picture)
// const createUserSchema = userSchema.extend({
//     password: z.string().min(8, { message: "Password must be at least 8 characters." }),
//     profile_picture: z.instanceof(FileList).optional(),
// });

// // Schema for editing an existing user (password and email are not editable here)
// const updateUserSchema = userSchema.pick({
//     first_name: true,
//     last_name: true,
//     mobile_number: true,
// });


// interface UserFormProps {
//   userToEdit?: User | null;
//   onSuccess: () => void;
// }

// // Determine the form data type based on whether we are editing or creating
// type UserFormValues = z.infer<typeof createUserSchema>;

// export function UserForm({ userToEdit, onSuccess }: UserFormProps) {
//   const isEditMode = !!userToEdit;

//   const form = useForm<UserFormValues>({
//     resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       mobile_number: "",
//       password: "",
//       profile_picture: undefined,
//     },
//   });
  
//   const fileRef = form.register("profile_picture");

//   useEffect(() => {
//     if (isEditMode && userToEdit) {
//       form.reset({
//         first_name: userToEdit.first_name,
//         last_name: userToEdit.last_name,
//         email: userToEdit.email,
//         mobile_number: userToEdit.mobile_number,
//       });
//     }
//   }, [userToEdit, isEditMode, form]);
  
//   const { isSubmitting } = form.formState;

//   const onSubmit = async (values: UserFormValues) => {
//     try {
//       if (isEditMode && userToEdit) {
//         // We only submit fields that are part of the updateUserSchema
//         const updateData = {
//             first_name: values.first_name,
//             last_name: values.last_name,
//             mobile_number: values.mobile_number
//         };
//         await updateUser(userToEdit.id, updateData);
//         toast.success("User updated successfully!");
//       } else {
//         await createUser(values as CreateUserFormData);
//         toast.success("User created successfully! OTP sent to their email.");
//       }
//       onSuccess();
//       form.reset();
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="John" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="john.doe@example.com" {...field} disabled={isEditMode} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="mobile_number"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Mobile Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="123-456-7890" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {!isEditMode && (
//           <>
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="********" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="profile_picture"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Profile Picture (Optional)</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="file" 
//                       accept="image/*"
//                       {...fileRef}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         )}
//         <Button type="submit" disabled={isSubmitting} className="w-full">
//           {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Create User"}
//         </Button>
//       </form>
//     </Form>
//   );
// }





// frontend\src\components\dashboard\UserForm.tsx
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
import { CreateUserFormData, User } from "@/types";
import { createUser, updateUser } from "@/lib/auth";
import { toast } from "sonner";
import { useEffect } from "react";

// Base schema for user data
const userSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile_number: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
});

// Schema for creating a new user (requires password and profile picture)
const createUserSchema = userSchema.extend({
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    profile_picture: z.instanceof(FileList).optional(),
});

// Schema for editing an existing user (password and email are not editable here)
const updateUserSchema = userSchema.pick({
    first_name: true,
    last_name: true,
    mobile_number: true,
});


interface UserFormProps {
  userToEdit?: User | null;
  onSuccess: () => void;
}

// Determine the form data type based on whether we are editing or creating
type UserFormValues = z.infer<typeof createUserSchema>;

export function UserForm({ userToEdit, onSuccess }: UserFormProps) {
  const isEditMode = !!userToEdit;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      password: "",
      profile_picture: undefined,
    },
  });
  
  const fileRef = form.register("profile_picture");

  useEffect(() => {
    if (isEditMode && userToEdit) {
      form.reset({
        first_name: userToEdit.first_name,
        last_name: userToEdit.last_name,
        email: userToEdit.email,
        mobile_number: userToEdit.mobile_number,
      });
    }
  }, [userToEdit, isEditMode, form]);
  
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (isEditMode && userToEdit) {
        // We only submit fields that are part of the updateUserSchema
        const updateData = {
            first_name: values.first_name,
            last_name: values.last_name,
            mobile_number: values.mobile_number
        };
        await updateUser(userToEdit.id, updateData);
        toast.success("User updated successfully!");
      } else {
        await createUser(values as CreateUserFormData);
        toast.success("User created successfully! OTP sent to their email.");
      }
      onSuccess();
      form.reset();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} disabled={isEditMode} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditMode && (
          <>
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
            <FormField
              control={form.control}
              name="profile_picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*"
                      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Create User"}
        </Button>
      </form>
    </Form>
  );
}





// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CreateUserFormData, User } from "@/types";
// import { createUser, updateUser } from "@/lib/auth";
// import { toast } from "sonner";
// import { useEffect, useMemo } from "react";

// /* -------------------------------------------------------------------------- */
// /*                                 Zod schemas                                */
// /* -------------------------------------------------------------------------- */
// const baseSchema = z.object({
//   first_name: z
//     .string()
//     .min(2, { message: "First name must be at least 2 characters." }),
//   last_name: z
//     .string()
//     .min(2, { message: "Last name must be at least 2 characters." }),
//   email: z.string().email({ message: "Invalid email address." }),
//   mobile_number: z
//     .string()
//     .min(10, { message: "Mobile number must be at least 10 digits." }),
// });

// const createUserSchema = baseSchema.extend({
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters." }),
//   profile_picture: z.instanceof(FileList).optional(),
// });

// const updateUserSchema = baseSchema.pick({
//   first_name: true,
//   last_name: true,
//   mobile_number: true,
// });

// /* -------------------------------------------------------------------------- */
// /*                       A superset type used by React-Hook-Form              */
// /* -------------------------------------------------------------------------- */
// type UserFormValues = z.infer<typeof createUserSchema> &
//   Partial<z.infer<typeof updateUserSchema>>; // all possible fields

// /* -------------------------------------------------------------------------- */
// /*                                Component                                   */
// /* -------------------------------------------------------------------------- */
// interface UserFormProps {
//   userToEdit?: User | null;
//   onSuccess: () => void;
// }

// export function UserForm({ userToEdit, onSuccess }: UserFormProps) {
//   const isEditMode = !!userToEdit;

//   // Pick the correct schema at runtime
//   const formSchema = useMemo(
//     () => (isEditMode ? updateUserSchema : createUserSchema),
//     [isEditMode]
//   );

//   const form = useForm<UserFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       mobile_number: "",
//       password: "", // ignored in edit mode
//       profile_picture: undefined,
//     },
//   });

//   /* ----------------------------- Prefill values ---------------------------- */
//   useEffect(() => {
//     if (isEditMode && userToEdit) {
//       form.reset({
//         first_name: userToEdit.first_name,
//         last_name: userToEdit.last_name,
//         email: userToEdit.email,
//         mobile_number: userToEdit.mobile_number,
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userToEdit, isEditMode]);

//   const fileRef = form.register("profile_picture");

//   const { isSubmitting } = form.formState;

//   /* -------------------------------- Submit -------------------------------- */
//   const onSubmit = async (values: UserFormValues) => {
//     try {
//       if (isEditMode && userToEdit) {
//         await updateUser(userToEdit.id, {
//           first_name: values.first_name,
//           last_name: values.last_name,
//           mobile_number: values.mobile_number,
//         });
//         toast.success("User updated successfully!");
//       } else {
//         await createUser(values as unknown as CreateUserFormData);
//         toast.success("User created successfully! OTP sent to their email.");
//       }
//       onSuccess();
//       form.reset();
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "An unexpected error occurred.";
//       toast.error(errorMessage);
//     }
//   };

//   /* -------------------------------- Render -------------------------------- */
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         {/* --------------------------- First Name --------------------------- */}
//         <FormField
//           control={form.control}
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="John" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* --------------------------- Last Name ---------------------------- */}
//         <FormField
//           control={form.control}
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* ----------------------------- Email ------------------------------ */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="john.doe@example.com"
//                   {...field}
//                   disabled={isEditMode}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* ------------------------ Mobile Number -------------------------- */}
//         <FormField
//           control={form.control}
//           name="mobile_number"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Mobile Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="123-456-7890" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* -------- Password & Profile picture only when creating a user ---- */}
//         {!isEditMode && (
//           <>
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="********" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="profile_picture"
//               render={() => (
//                 <FormItem>
//                   <FormLabel>Profile Picture (Optional)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       {...fileRef}
//                       /* field prop unused because we rely on native file input */
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         )}

//         <Button type="submit" disabled={isSubmitting} className="w-full">
//           {isSubmitting
//             ? "Saving..."
//             : isEditMode
//             ? "Save Changes"
//             : "Create User"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

