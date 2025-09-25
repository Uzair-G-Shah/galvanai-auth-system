
// // frontend\src\app\(dashboard)\dashboard\users\page.tsx



// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { User } from "@/types";
// import { getUsers } from "@/lib/auth";
// import { columns } from "./columns";
// import { DataTable } from "./data-table";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await getUsers();
//       setUsers(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch users.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   if (loading) {
//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-6">User Management</h1>
//             <div className="space-y-2">
//                 <Skeleton className="h-12 w-full" />
//                 <Skeleton className="h-12 w-full" />
//                 <Skeleton className="h-12 w-full" />
//                 <Skeleton className="h-12 w-full" />
//             </div>
//         </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       {/* The DataTable now handles its own state for dialogs */}
//       <DataTable columns={columns} data={users} onUserAction={fetchUsers} />
//     </div>
//   );
// }














"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@/types";
import { getUsers } from "@/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Ensure this is imported (from Shadcn)
import { LogOut } from "lucide-react"; // For the icon
import { useAuth } from "@/hooks/use-auth"; // For logout hook

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth(); // Inline: Get logout from hook

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Inline: Logout handler function
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        {/* Inline: The Shadcn Button with handler and icon */}
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <DataTable columns={columns} data={users} onUserAction={fetchUsers} />
    </div>
  );
}


