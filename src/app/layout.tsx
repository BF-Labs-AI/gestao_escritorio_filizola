import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css";

export const metadata: Metadata = {
  title: "D&F ERP | Gestão Previdenciária",
  description: "Sistema de Escritório de Advocacia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased min-h-screen bg-[#0A0A0A] text-white`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
