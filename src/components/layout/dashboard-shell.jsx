"use client";

import { MenuIcon } from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function DashboardShell({ children }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="hidden w-64 shrink-0 lg:block">
        <AppSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b bg-background px-4 py-2 lg:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" />}>
              <MenuIcon />
              <span className="sr-only">Open navigation</span>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <Topbar />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
