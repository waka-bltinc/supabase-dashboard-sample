import { UsersPagePresentational } from "@/components/feature/users-page-presentational";
import { getUsers } from "@/lib/users/fetcher";

export default async function UsersPage() {
	const { users, error } = await getUsers();

	return <UsersPagePresentational users={users} error={error} />;
}
