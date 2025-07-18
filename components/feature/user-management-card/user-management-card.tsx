import { getCurrentUser } from "@/lib/users/fetcher";
import { UserManagementCardPresentational } from "./user-management-card-presentational";

export async function UserManagementCard() {
	let user = null;
	let error = null;

	try {
		const result = await getCurrentUser();

		user = result.user || null;
		error = result.error;
	} catch (err) {
		error =
			err instanceof Error ? err.message : "ユーザー情報の取得に失敗しました";
	}

	return <UserManagementCardPresentational user={user} error={error} />;
}
