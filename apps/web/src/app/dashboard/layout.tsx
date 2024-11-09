import React, { Suspense } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";
import Topbar from "@/components/dashboard/topbar";
import { ToastProvider } from "@/components/ui/toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/Loading";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex h-screen">
        <Sidebar />
          <div className="flex-1 flex flex-col overflow-y-auto">
              <Topbar />
              <div className="md:p-8 flex-1 md:mb-0 mb-8">
                    {children}
                <ToastContainer />
              </div>
          </div>
      </div>
  );
}
