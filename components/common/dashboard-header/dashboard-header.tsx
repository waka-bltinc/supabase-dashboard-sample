"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Home, Search, User } from "lucide-react";
import * as React from "react";

interface BreadcrumbItemData {
	label: string;
	href?: string;
	icon?: string;
}

interface DashboardHeaderProps {
	title?: string;
	userName?: string;
	breadcrumbs?: BreadcrumbItemData[];
}

const getIcon = (iconName?: string) => {
	switch (iconName) {
		case "Home":
			return Home;
		default:
			return null;
	}
};

export function DashboardHeader({
	title = "ダッシュボード",
	userName = "ユーザー名",
	breadcrumbs = [],
}: DashboardHeaderProps) {
	return (
		<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
			<div className="flex items-center gap-4">
				<SidebarTrigger />
				<div className="flex flex-col gap-1">
					{breadcrumbs.length > 0 && (
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((item, index) => {
									const IconComponent = getIcon(item.icon);
									const isLast = index === breadcrumbs.length - 1;

									return (
										<React.Fragment key={`${item.label}-${index}`}>
											<BreadcrumbItem>
												{isLast ? (
													<BreadcrumbPage className="flex items-center gap-1">
														{IconComponent && (
															<IconComponent className="h-4 w-4" />
														)}
														{item.label}
													</BreadcrumbPage>
												) : (
													<BreadcrumbLink
														href={item.href}
														className="flex items-center gap-1"
													>
														{IconComponent && (
															<IconComponent className="h-4 w-4" />
														)}
														{item.label}
													</BreadcrumbLink>
												)}
											</BreadcrumbItem>
											{!isLast && <BreadcrumbSeparator />}
										</React.Fragment>
									);
								})}
							</BreadcrumbList>
						</Breadcrumb>
					)}
					<h1 className="text-lg font-semibold text-slate-900">{title}</h1>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					className="text-slate-600 hover:text-slate-900"
				>
					<Search className="h-5 w-5" />
					<span className="sr-only">検索</span>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					className="text-slate-600 hover:text-slate-900"
				>
					<Bell className="h-5 w-5" />
					<span className="sr-only">通知</span>
				</Button>

				<div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
						<User className="h-4 w-4" />
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-slate-900">
							{userName}
						</span>
						<span className="text-xs text-slate-500">オンライン</span>
					</div>
				</div>
			</div>
		</header>
	);
}
