import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function UserProfileCardSkeleton() {
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
					<div className="h-6 w-48 animate-pulse bg-gray-200 rounded mt-1" />
				</div>
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						名前
					</p>
					<div className="h-6 w-32 animate-pulse bg-gray-200 rounded mt-1" />
				</div>
				<div>
					<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
						権限
					</p>
					<div className="h-6 w-20 animate-pulse bg-gray-200 rounded mt-1" />
				</div>
			</CardContent>
		</Card>
	);
}