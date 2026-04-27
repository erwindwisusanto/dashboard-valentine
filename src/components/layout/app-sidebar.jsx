"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BotIcon,
  ChartColumnIcon,
  LayoutDashboardIcon,
  LogsIcon,
  DatabaseIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/dashboard/ai", label: "AI", icon: BotIcon },
  { href: "/dashboard/sessions", label: "Sessions", icon: MessagesSquareIcon },
  { href: "/dashboard/live-chat", label: "Playgrounds", icon: MessageSquareIcon },
  { href: "/dashboard/knowledge-base", label: "Knowledge Base", icon: DatabaseIcon },
  { href: "/dashboard/logs", label: "Logs", icon: LogsIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartColumnIcon },
];

export function AppSidebar({ onNavigate }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r bg-sidebar p-3">
      <div className="mb-4 rounded-lg border bg-card px-3 py-2">
        <p className="text-xs text-muted-foreground">Internal Dashboard</p>
        <p className="font-medium">Chatbot Platform</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
