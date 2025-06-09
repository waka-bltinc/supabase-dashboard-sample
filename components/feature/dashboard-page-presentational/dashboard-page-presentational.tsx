"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Shield, Users } from "lucide-react";
import Link from "next/link";
import type { DashboardPagePresentationalProps } from "./types";

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

export function DashboardPagePresentational({
	user,
	error,
}: DashboardPagePresentationalProps) {
	if (error || !user) {
		return (
			<div className="container mx-auto">
				<Card>
					<CardContent className="p-6">
						<div className="text-center text-red-600">
							<p>{error || "ユーザー情報の取得に失敗しました"}</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const canViewUsers = ["admin", "moderator"].includes(user.role);

	return (
		<div className="container mx-auto space-y-6">
			<div className="flex items-center gap-2">
				<Home className="h-6 w-6" />
				<h1 className="text-3xl font-bold">ダッシュボード</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

				{canViewUsers && (
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
				)}
			</div>
		</div>
	);
}
