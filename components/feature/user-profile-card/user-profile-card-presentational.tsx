import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import type { UserProfileCardPresentationalProps } from "./types";

const getRoleBadgeVariant = (role: string) => {
	switch (role) {
		case "admin":
			return "destructive";
		case "moderator":
			return "default";
		default:
			return "secondary";
	}
};

const getRoleLabel = (role: string) => {
	switch (role) {
		case "admin":
			return "管理者";
		case "moderator":
			return "モデレーター";
		default:
			return "一般ユーザー";
	}
};

export function UserProfileCardPresentational({
	user,
	error,
}: UserProfileCardPresentationalProps) {
	if (error || !user) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="text-center text-red-600">
						<p>{error || "ユーザー情報の取得に失敗しました"}</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="h-5 w-5" />
					プロフィール情報
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						メールアドレス
					</p>
					<p className="text-lg">{user.email}</p>
				</div>
				{user.first_name && (
					<div>
						<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
							名前
						</p>
						<p className="text-lg">
							{user.first_name} {user.last_name}
						</p>
					</div>
				)}
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						権限
					</p>
					<div className="mt-1">
						<Badge variant={getRoleBadgeVariant(user.role)}>
							{getRoleLabel(user.role)}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
