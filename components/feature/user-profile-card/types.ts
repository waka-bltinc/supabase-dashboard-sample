import type { User } from "@/lib/users/types";

export interface UserProfileCardPresentationalProps {
	user: User | null;
	error: string | null;
}
