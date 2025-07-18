import { DashboardSidebar } from "@/components/supabase-default/dashboard-sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen bg-gray-100 dark:bg-gray-800">
			<DashboardSidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
