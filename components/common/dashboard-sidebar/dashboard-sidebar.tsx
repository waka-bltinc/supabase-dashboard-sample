"use client";

import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";
import {
	BarChart3,
	Database,
	FileText,
	Home,
	Key,
	LogOut,
	Plus,
	Settings,
	Shield,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

const mainMenuItems = [
	{
		title: "ダッシュボード",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "データベース",
		url: "/database",
		icon: Database,
		items: [
			{
				title: "テーブル",
				url: "/database/tables",
			},
			{
				title: "SQL エディター",
				url: "/database/sql-editor",
			},
			{
				title: "バックアップ",
				url: "/database/backups",
			},
		],
	},
	{
		title: "認証",
		url: "/auth",
		icon: Shield,
		items: [
			{
				title: "ユーザー",
				url: "/auth/users",
			},
			{
				title: "ポリシー",
				url: "/auth/policies",
			},
			{
				title: "プロバイダー",
				url: "/auth/providers",
			},
		],
	},
	{
		title: "ストレージ",
		url: "/storage",
		icon: FileText,
		items: [
			{
				title: "バケット",
				url: "/storage/buckets",
			},
			{
				title: "ファイル管理",
				url: "/storage/files",
			},
		],
	},
	{
		title: "API",
		url: "/api",
		icon: Key,
		items: [
			{
				title: "キー",
				url: "/api/keys",
			},
			{
				title: "ドキュメント",
				url: "/api/docs",
			},
		],
	},
	{
		title: "ログ & 分析",
		url: "/logs",
		icon: BarChart3,
		items: [
			{
				title: "ログ",
				url: "/logs/explorer",
			},
			{
				title: "パフォーマンス",
				url: "/logs/performance",
			},
		],
	},
];

const bottomMenuItems = [
	{
		title: "設定",
		url: "/settings",
		icon: Settings,
	},
];

const logoutItem = {
	title: "ログアウト",
	icon: LogOut,
	action: "logout" as const,
};

export function DashboardSidebar() {
	const { state } = useSidebar();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const supabase = createClient();
			await supabase.auth.signOut();
			router.push("/auth/login");
		} catch (error) {
			console.error("ログアウトエラー:", error);
		}
	};

	return (
		<Sidebar
			className="border-r border-slate-700 bg-slate-900 text-slate-100"
			variant="sidebar"
			collapsible="icon"
		>
			<SidebarHeader className="border-b border-slate-700 bg-slate-900">
				<div className="flex items-center gap-2 px-2 py-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
						<Database className="h-4 w-4 text-white" />
					</div>
					{state === "expanded" && (
						<div className="flex flex-col">
							<span className="text-sm font-semibold text-slate-100">
								Supabase
							</span>
							<span className="text-xs text-slate-400">my-project</span>
						</div>
					)}
				</div>
				{state === "expanded" && (
					<>
						<div className="px-2">
							<SidebarInput
								placeholder="検索..."
								className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
							/>
						</div>
						<div className="px-2">
							<Button
								size="sm"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white"
							>
								<Plus className="h-4 w-4 mr-2" />
								新しいプロジェクト
							</Button>
						</div>
					</>
				)}
			</SidebarHeader>

			<SidebarContent className="bg-slate-900">
				<SidebarGroup>
					<SidebarGroupLabel className="text-slate-400">
						メニュー
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainMenuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										className="text-slate-300 hover:bg-slate-800 hover:text-slate-100 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
									>
										<item.icon className="h-4 w-4" />
										<span>{item.title}</span>
									</SidebarMenuButton>
									{item.items && (
										<SidebarMenuSub className="border-slate-600">
											{item.items.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton className="text-slate-400 hover:bg-slate-800 hover:text-slate-100 data-[active=true]:bg-blue-600 data-[active=true]:text-white">
														<span>{subItem.title}</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{bottomMenuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={item.title}
										className="text-slate-300 hover:bg-slate-800 hover:text-slate-100 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
									>
										<item.icon className="h-4 w-4" />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
							<SidebarMenuItem>
								<SidebarMenuButton
									tooltip={logoutItem.title}
									onClick={handleLogout}
									className="text-red-300 hover:bg-red-800 hover:text-red-100"
								>
									<logoutItem.icon className="h-4 w-4" />
									<span>{logoutItem.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t border-slate-700 bg-slate-900">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="text-slate-300 hover:bg-slate-800 hover:text-slate-100"
						>
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300">
								<User className="h-4 w-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold text-slate-100">
									ユーザー名
								</span>
								<span className="truncate text-xs text-slate-400">
									user@example.com
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
