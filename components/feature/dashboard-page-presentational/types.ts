import type { User } from "@/lib/users/types";

export interface DashboardPagePresentationalProps {
	user: User | null;
	error: string | null;
}
