import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function UserManagementCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Users className="h-5 w-5" />
					ユーザー管理
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="h-4 w-full animate-pulse bg-gray-200 rounded" />
				<div className="h-10 w-full animate-pulse bg-gray-200 rounded" />
			</CardContent>
		</Card>
	);
}