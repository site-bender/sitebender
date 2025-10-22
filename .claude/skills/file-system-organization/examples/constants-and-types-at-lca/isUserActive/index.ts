import type { UserData } from "./types/index.ts"

import _isAccountAgeInRange from "./_isAccountAgeInRange/index.ts"

//++ Checks if a user account is active based on account age
export default function isUserActive(user: UserData): boolean {
	return _isAccountAgeInRange(user.accountAgeDays)
}
