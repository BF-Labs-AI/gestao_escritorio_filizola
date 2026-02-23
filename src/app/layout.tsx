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
    <html lang="pt-BR">
      <body className={`font-sans antialiased min-h-screen`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
