"use client"

import { BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <>
      <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">
            ITDEV-164
          </span>
        </div>
        <ModeToggle />
      </header>
      <div className="flex items-center gap-4 border-b border-border bg-background px-4 py-3">
        <BreadcrumbNav />
      </div>
    </>
  );
}
