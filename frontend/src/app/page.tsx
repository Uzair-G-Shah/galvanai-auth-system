


// // frontend\src\app\page.tsx


// "use client";

// import { useAuth } from "@/hooks/use-auth";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function HomePage() {
//   const { isAuthenticated, user } = useAuth();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
//       <div className="text-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
//           Welcome to GalvanAI
//         </h1>
//         <p className="mt-4 text-lg text-gray-600">
//           A demonstration of a full-stack authentication system.
//         </p>
//         <div className="mt-8">
//           {isAuthenticated ? (
//             <div className="space-y-4">
//               <p className="text-xl">
//                 Hello, <strong>{user?.first_name}!</strong>
//               </p>
//               <Link href="/dashboard/users">
//                 <Button size="lg">
//                   Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Link href="/login">
//               <Button size="lg">
//                 Login to Get Started <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }










"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // This clears cookies and redirects to /login
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to GalvanAI
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A demonstration of a full-stack authentication system.
        </p>
        <div className="mt-8">
          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-xl">
                Hello, <strong>{user?.first_name}!</strong>
              </p>
              {user?.role === "super_admin" ? (
                <Link href="/dashboard/users">
                  <Button size="lg">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button size="lg">
                Login to Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
