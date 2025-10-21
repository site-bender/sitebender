import type { UserData } from "../types/index.ts"

import { MIN_AGE, MAX_AGE } from "../constants/index.ts"

//++ Private helper that validates user data
export default function _validateUser(data: UserData): void {
	if (data.age < MIN_AGE || data.age > MAX_AGE) {
		throw new Error("Invalid age")
	}
}
