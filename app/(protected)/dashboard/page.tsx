import { getCurrentUser } from "@/lib/users/fetcher";
import { DashboardPagePresentational } from "../../../components/feature/dashboard-page-presentational/";

export default async function DashboardPage() {
	const { user, error } = await getCurrentUser();

	if (error || !user) {
		// redirect("/auth/login");
		console.log(error);
	}

	return <DashboardPagePresentational user={user} error={error} />;
}
