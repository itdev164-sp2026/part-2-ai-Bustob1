import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bruno Bustos — Developer Profile",
  description: "Developer profile for Bruno Bustos showcasing skills and career goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="mx-auto w-full max-w-5xl">{children}</div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
