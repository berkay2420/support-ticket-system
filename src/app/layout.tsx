import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket System",
  description: "Professional and simple support ticket management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-emerald-50 via-white to-teal-50`}
      > 
        <Navbar />
        {children}
        <Toaster 
          position="top-center"
          theme="light"
          gap={10}
          toastOptions={{
            classNames: {
              toast: 'bg-white text-slate-900 border border-emerald-200 shadow-md',
              error: 'bg-red-50 border-red-200',
              success: 'bg-emerald-50 border-emerald-200',
            }
          }}
        />
      </body>
    </html>
  );
}