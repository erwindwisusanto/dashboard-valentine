import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata = {
  title: "Chatbot Internal Dashboard",
  description: "UI skeleton for chatbot operations platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
