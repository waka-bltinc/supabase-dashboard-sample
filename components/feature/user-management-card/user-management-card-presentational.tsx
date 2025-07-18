import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";
import type { UserManagementCardPresentationalProps } from "./types";

export function UserManagementCardPresentational({
	user,
	error,
}: UserManagementCardPresentationalProps) {
	if (error || !user) {
		return null;
	}

	const canViewUsers = ["admin", "moderator"].includes(user.role);

	if (!canViewUsers) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Users className="h-5 w-5" />
					ユーザー管理
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					システム内のユーザーを確認・管理できます
				</p>
				<Link href="/dashboard/users">
					<Button className="w-full">
						<Users className="mr-2 h-4 w-4" />
						ユーザー一覧を見る
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
