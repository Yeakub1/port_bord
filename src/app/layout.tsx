import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers/Providers";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dasboard for managing data of Yeakub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
