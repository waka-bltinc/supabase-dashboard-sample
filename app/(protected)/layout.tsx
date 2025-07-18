import { DashboardHeader } from "@/components/common/dashboard-header";
import { DashboardSidebar } from "@/components/common/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	const breadcrumbs = [
		{ label: "ホーム", href: "/", icon: "Home" },
		{ label: "ダッシュボード" },
	];

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<DashboardHeader title="ダッシュボード" breadcrumbs={breadcrumbs} />
				<main className="flex-1 p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
