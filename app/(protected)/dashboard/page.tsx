import { UserManagementCard } from "@/components/feature/user-management-card/user-management-card";
import { UserProfileCard } from "@/components/feature/user-profile-card/user-profile-card";
import { Home } from "lucide-react";
import { Suspense } from "react";

function ProfileCardLoading() {
	return <div className="h-64 animate-pulse bg-gray-200 rounded-lg" />;
}

function ManagementCardLoading() {
	return <div className="h-64 animate-pulse bg-gray-200 rounded-lg" />;
}

export default function DashboardPage() {
	return (
		<div className="container mx-auto space-y-6">
			<div className="flex items-center gap-2">
				<Home className="h-6 w-6" />
				<h1 className="text-3xl font-bold">ダッシュボード</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Suspense fallback={<ProfileCardLoading />}>
					<UserProfileCard />
				</Suspense>
				<Suspense fallback={<ManagementCardLoading />}>
					<UserManagementCard />
				</Suspense>
			</div>
		</div>
	);
}
