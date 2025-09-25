
// // // frontend\src\app\(dashboard)\dashboard\users\data-table.tsx
// // "use client";

// // import {
// //   ColumnDef,
// //   flexRender,
// //   getCoreRowModel,
// //   getPaginationRowModel,
// //   getSortedRowModel,
// //   SortingState,
// //   useReactTable,
// // } from "@tanstack/react-table";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Button } from "@/components/ui/button";
// // import React, { useState, useMemo } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { UserForm } from "@/components/dashboard/UserForm";
// // import { User } from "@/types";
// // import { deleteUser } from "@/lib/auth";
// // import { toast } from "sonner";
// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// // } from "@/components/ui/alert-dialog";

// // interface DataTableProps<TData extends User, TValue> {
// //   columns: (
// //     openEditDialog: (user: TData) => void,
// //     openDeleteDialog: (user: TData) => void
// //   ) => ColumnDef<TData, TValue>[];
// //   data: TData[];
// //   onUserAction: () => void; // Callback to refresh data after any action
// // }

// // export function DataTable<TData extends User, TValue>({
// //   columns: columnsFn,
// //   data,
// //   onUserAction,
// // }: DataTableProps<TData, TValue>) {
// //   const [sorting, setSorting] = useState<SortingState>([]);
// //   const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
// //   const [isEditDialogOpen, setEditDialogOpen] = useState(false);
// //   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState<TData | null>(null);

// //   const openEditDialog = (user: TData) => {
// //     setSelectedUser(user);
// //     setEditDialogOpen(true);
// //   };

// //   const openDeleteDialog = (user: TData) => {
// //     setSelectedUser(user);
// //     setDeleteDialogOpen(true);
// //   };
  
// //   const handleDeleteUser = async () => {
// //     if (!selectedUser) return;
// //     try {
// //       await deleteUser(selectedUser.id);
// //       toast.success("User deleted successfully.");
// //       onUserAction(); // Refresh data
// //       setDeleteDialogOpen(false);
// //       setSelectedUser(null);
// //     } catch (error) {
// //       toast.error("Failed to delete user.");
// //     }
// //   };

// //   // useMemo hook correctly creates the columns array by calling the passed function
// //   const columns = useMemo(
// //     () => columnsFn(openEditDialog, openDeleteDialog),
// //     [columnsFn]
// //   );
    
// //   const table = useReactTable({
// //     data,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     onSortingChange: setSorting,
// //     getSortedRowModel: getSortedRowModel(),
// //     state: {
// //         sorting,
// //     }
// //   });

// //   return (
// //     <div>
// //       <div className="flex items-center justify-end py-4">
// //         <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
// //           <DialogTrigger asChild>
// //             <Button>Add New User</Button>
// //           </DialogTrigger>
// //           <DialogContent className="sm:max-w-[425px]">
// //             <DialogHeader>
// //               <DialogTitle>Create a New User</DialogTitle>
// //             </DialogHeader>
// //             <UserForm
// //               onSuccess={() => {
// //                 setCreateDialogOpen(false);
// //                 onUserAction();
// //               }}
// //             />
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //       <div className="rounded-md border">
// //         <Table>
// //           <TableHeader>
// //             {table.getHeaderGroups().map((headerGroup) => (
// //               <TableRow key={headerGroup.id}>
// //                 {headerGroup.headers.map((header) => {
// //                   return (
// //                     <TableHead key={header.id}>
// //                       {header.isPlaceholder
// //                         ? null
// //                         : flexRender(
// //                             header.column.columnDef.header,
// //                             header.getContext()
// //                           )}
// //                     </TableHead>
// //                   );
// //                 })}
// //               </TableRow>
// //             ))}
// //           </TableHeader>
// //           <TableBody>
// //             {table.getRowModel().rows?.length ? (
// //               table.getRowModel().rows.map((row) => (
// //                 <TableRow
// //                   key={row.id}
// //                   data-state={row.getIsSelected() && "selected"}
// //                 >
// //                   {row.getVisibleCells().map((cell) => (
// //                     <TableCell key={cell.id}>
// //                       {flexRender(
// //                         cell.column.columnDef.cell,
// //                         cell.getContext()
// //                       )}
// //                     </TableCell>
// //                   ))}
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   className="h-24 text-center"
// //                 >
// //                   No users found.
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </div>
// //       <div className="flex items-center justify-end space-x-2 py-4">
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           onClick={() => table.previousPage()}
// //           disabled={!table.getCanPreviousPage()}
// //         >
// //           Previous
// //         </Button>
// //         <Button
// //           variant="outline"
// //           size="sm"
// //           onClick={() => table.nextPage()}
// //           disabled={!table.getCanNextPage()}
// //         >
// //           Next
// //         </Button>
// //       </div>

// //       {/* Edit User Dialog */}
// //       <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
// //         <DialogContent className="sm:max-w-[425px]">
// //           <DialogHeader>
// //             <DialogTitle>Edit User: {selectedUser?.first_name}</DialogTitle>
// //           </DialogHeader>
// //           <UserForm
// //             userToEdit={selectedUser}
// //             onSuccess={() => {
// //               setEditDialogOpen(false);
// //               onUserAction();
// //             }}
// //           />
// //         </DialogContent>
// //       </Dialog>
      
// //       {/* Delete User Alert Dialog */}
// //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
// //         <AlertDialogContent>
// //           <AlertDialogHeader>
// //             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
// //             <AlertDialogDescription>
// //               This action cannot be undone. This will permanently delete the user account for <strong>{selectedUser?.email}</strong>.
// //             </AlertDialogDescription>
// //           </AlertDialogHeader>
// //           <AlertDialogFooter>
// //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// //             <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
// //                 Delete
// //             </AlertDialogAction>
// //           </AlertDialogFooter>
// //         </AlertDialogContent>
// //       </AlertDialog>
// //     </div>
// //   );
// // }














// // frontend\src\app\(dashboard)\dashboard\users\data-table.tsx
// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import React, { useState, useMemo, useCallback } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { UserForm } from "@/components/dashboard/UserForm";
// import { User } from "@/types";
// import { deleteUser } from "@/lib/auth";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface DataTableProps<TData extends User, TValue> {
//   columns: (
//     openEditDialog: (user: TData) => void,
//     openDeleteDialog: (user: TData) => void
//   ) => ColumnDef<TData, TValue>[];
//   data: TData[];
//   onUserAction: () => void; // refresh callback
// }

// export function DataTable<TData extends User, TValue>({
//   columns: columnsFn,
//   data,
//   onUserAction,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
//   const [isEditDialogOpen, setEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<TData | null>(null);

//   /* --------------------------------------------------------------------------
//    * Memo-stable callbacks – prevents infinite loops in the column definition
//    * -------------------------------------------------------------------------- */
//   const openEditDialog = useCallback((user: TData) => {
//     setSelectedUser(user);
//     setEditDialogOpen(true);
//   }, []);

//   const openDeleteDialog = useCallback((user: TData) => {
//     setSelectedUser(user);
//     setDeleteDialogOpen(true);
//   }, []);

//   const handleDeleteUser = async () => {
//     if (!selectedUser) return;
//     try {
//       await deleteUser(selectedUser.id);
//       toast.success("User deleted successfully.");
//       onUserAction();
//       setDeleteDialogOpen(false);
//       setSelectedUser(null);
//     } catch (error) {
//       toast.error("Failed to delete user.");
//     }
//   };

//   /* -------------------------------------------------------------------------- */
//   /*                            Column definition memo                          */
//   /* -------------------------------------------------------------------------- */
//   const columns = useMemo(
//     () => columnsFn(openEditDialog, openDeleteDialog),
//     [columnsFn, openEditDialog, openDeleteDialog]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       sorting,
//     },
//   });

//   return (
//     <div>
//       {/* --------------------------- Create user dialog --------------------------- */}
//       <div className="flex items-center justify-end py-4">
//         <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>Add New User</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Create a New User</DialogTitle>
//             </DialogHeader>
//             <UserForm
//               onSuccess={() => {
//                 setCreateDialogOpen(false);
//                 onUserAction();
//               }}
//             />
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* ------------------------------ Data table ------------------------------ */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No users found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* ------------------------- Pagination controls -------------------------- */}
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>

//       {/* ---------------------------- Edit user dialog --------------------------- */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit User: {selectedUser?.first_name}</DialogTitle>
//           </DialogHeader>
//           <UserForm
//             userToEdit={selectedUser}
//             onSuccess={() => {
//               setEditDialogOpen(false);
//               onUserAction();
//             }}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* --------------------------- Delete user alert --------------------------- */}
//       <AlertDialog
//         open={isDeleteDialogOpen}
//         onOpenChange={setDeleteDialogOpen}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the
//               user account for <strong>{selectedUser?.email}</strong>.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteUser}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }










// frontend\src\app\(dashboard)\dashboard\users\data-table.tsx
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/dashboard/UserForm";
import { User } from "@/types";
import { deleteUser } from "@/lib/auth";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableProps<TData extends User, TValue> {
  columns: (
    openEditDialog: (user: TData) => void,
    openDeleteDialog: (user: TData) => void
  ) => ColumnDef<TData, TValue>[];
  data: TData[];
  onUserAction: () => void; // refresh callback
}

export function DataTable<TData extends User, TValue>({
  columns: columnsFn,
  data,
  onUserAction,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TData | null>(null);

  /* --------------------------------------------------------------------------
   * Memo-stable callbacks – prevents infinite loops in the column definition
   * --------------------------------------------------------------------------
   */
  const openEditDialog = useCallback((user: TData) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((user: TData) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id);
      toast.success("User deleted successfully.");
      onUserAction();
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            Column definition memo                          */
  /* -------------------------------------------------------------------------- */
  const columns = useMemo(
    () => columnsFn(openEditDialog, openDeleteDialog),
    [columnsFn, openEditDialog, openDeleteDialog]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      {/* --------------------------- Create user dialog --------------------------- */}
      <div className="flex items-center justify-end py-4">
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New User</DialogTitle>
            </DialogHeader>
            <UserForm
              onSuccess={() => {
                setCreateDialogOpen(false);
                onUserAction();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* ------------------------------ Data table ------------------------------ */}
      <div className="overflow-x-auto">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ------------------------- Pagination controls -------------------------- */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* ---------------------------- Edit user dialog --------------------------- */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User: {selectedUser?.first_name}</DialogTitle>
          </DialogHeader>
          <UserForm
            userToEdit={selectedUser}
            onSuccess={() => {
              setEditDialogOpen(false);
              onUserAction();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* --------------------------- Delete user alert --------------------------- */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account for <strong>{selectedUser?.email}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
