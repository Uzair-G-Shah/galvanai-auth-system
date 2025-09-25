
// frontend\src\app\(dashboard)\dashboard\users\columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = (
  openEditDialog: (user: User) => void,
  openDeleteDialog: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "profile_picture_url",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      const fallback = `${user.first_name[0]}${user.last_name[0]}`;
      const imageUrl = user.profile_picture_url
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_picture_url}`
        : "";
      return (
        <Avatar>
          <AvatarImage src={imageUrl} alt={`${user.first_name}'s avatar`} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile",
  },
  {
    accessorKey: "is_verified",
    header: "Status",
    cell: ({ row }) => {
      const isVerified = row.getValue("is_verified");
      return isVerified ? (
        <Badge variant="default">Verified</Badge>
      ) : (
        <Badge variant="destructive">Pending</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => openEditDialog(user)}>
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => openDeleteDialog(user)}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

