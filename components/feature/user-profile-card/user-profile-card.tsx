import { getCurrentUser } from "@/lib/users/fetcher";
import { UserProfileCardPresentational } from "./user-profile-card-presentational";

export async function UserProfileCard() {
	let user = null;
	let error = null;

	try {
		const result = await getCurrentUser();
		user = result.user || null;
		error = result.error;
	} catch (err) {
		error = err instanceof Error ? err.message : "ユーザー情報の取得に失敗しました";
	}

	return <UserProfileCardPresentational user={user} error={error} />;
}
