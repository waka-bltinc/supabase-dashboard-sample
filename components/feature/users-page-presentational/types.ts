import type { User } from "@/lib/users/types";

export interface UsersPagePresentationalProps {
	users: User[] | null;
	error: string | null;
}
