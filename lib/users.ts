import { createClient } from "@/lib/supabase/server";

export type User = {
	id: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	role: "user" | "moderator" | "admin";
	created_at: string;
	updated_at: string;
};

export async function getCurrentUser(): Promise<{
	user: User | null;
	error: string | null;
}> {
	const supabase = await createClient();

	const { data: authUser, error: authError } = await supabase.auth.getUser();
	if (authError || !authUser?.user) {
		return { user: null, error: "認証が必要です" };
	}

	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", authUser.user.id)
		.single();

	if (error) {
		return { user: null, error: "ユーザー情報の取得に失敗しました" };
	}

	return { user: user as User, error: null };
}

export async function getUsers(): Promise<{
	users: User[] | null;
	error: string | null;
}> {
	const supabase = await createClient();

	// 現在のユーザーを取得して権限確認
	const { user: currentUser, error: userError } = await getCurrentUser();
	if (userError || !currentUser) {
		return { users: null, error: userError || "認証が必要です" };
	}

	// admin または moderator のみ全ユーザーを取得可能
	if (!["admin", "moderator"].includes(currentUser.role)) {
		return { users: null, error: "権限がありません" };
	}

	const { data: users, error } = await supabase
		.from("users")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		return { users: null, error: "ユーザー一覧の取得に失敗しました" };
	}

	return { users: users as User[], error: null };
}
