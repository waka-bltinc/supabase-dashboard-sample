"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";
import type { UsersPagePresentationalProps } from "./types";

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

export function UsersPagePresentational({
	users,
	error,
}: UsersPagePresentationalProps) {
	if (error) {
		return (
			<div className="container mx-auto">
				<Card>
					<CardContent className="p-6">
						<div className="text-center text-red-600">
							<p>{error}</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto space-y-6">
			<div className="flex items-center gap-2">
				<UsersIcon className="h-6 w-6" />
				<h1 className="text-3xl font-bold">ユーザー一覧</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>登録ユーザー ({users?.length || 0}人)</CardTitle>
				</CardHeader>
				<CardContent>
					{!users || users.length === 0 ? (
						<p className="text-center text-gray-500 py-8">
							登録されているユーザーがいません
						</p>
					) : (
						<div className="space-y-4">
							{users.map((user) => (
								<div
									key={user.id}
									className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h3 className="font-medium">
												{user.first_name && user.last_name
													? `${user.first_name} ${user.last_name}`
													: user.email}
											</h3>
											<Badge variant={getRoleBadgeVariant(user.role)}>
												{getRoleLabel(user.role)}
											</Badge>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{user.email}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											登録日:{" "}
											{new Date(user.created_at).toLocaleDateString("ja-JP")}
										</p>
									</div>
									<div className="text-xs text-gray-400 font-mono">
										ID: {user.id.slice(0, 8)}...
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
