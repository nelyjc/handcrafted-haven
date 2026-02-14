import type { ReactNode } from 'react';
import SideNav from "@/app/ui/dashboard/sidenav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-slate-600 p-4 md:w-64 md:border-b-0 md:border-r md:p-6">
        <SideNav />
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}