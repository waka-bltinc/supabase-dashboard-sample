"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Home, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "ダッシュボード", href: "/dashboard", icon: Home },
  { name: "ユーザー", href: "/dashboard/users", icon: Users },
  { name: "設定", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form action="/auth/logout" method="post">
          <Button variant="ghost" type="submit" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </Button>
        </form>
      </div>
    </div>
  );
}