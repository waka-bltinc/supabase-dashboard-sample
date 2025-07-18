import type { User } from "@/lib/users/types";

export interface UserManagementCardPresentationalProps {
	user: User | null;
	error: string | null;
}