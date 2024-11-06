import type { Metadata } from "next";
import 'regenerator-runtime/runtime';
import { Inter as FontSans } from "next/font/google"
import { AuthProvider } from "@/context/auth.context";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/landing/navbar";
import { cookies } from "next/headers";
import RefreshToken from "@/components/refresh.token";
import { Analytics } from "@vercel/analytics/react"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Mogi App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  return (
    <AuthProvider initialToken={token?.value as string}>
      <html lang="en">
        <body  className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
                {children}
            {token && <RefreshToken />}
            <Analytics />
          </body>
      </html>
    </AuthProvider>
    
  );
}