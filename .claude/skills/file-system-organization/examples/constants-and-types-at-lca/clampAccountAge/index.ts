import type { UserData } from "../types/index.ts"

import clamp from "@sitebender/toolsmith/math/clamp/index.ts"

import {
	MAX_ACCOUNT_AGE_DAYS as MAX,
	MIN_ACCOUNT_AGE_DAYS as MIN,
} from "../constants/index.ts"

/*++
 + Private helper that extracts account age from user data,
 + then clamps account age to valid range using shared constants
 */
export default function clampAccountAge(user: UserData): number {
	return clamp(MIN)(MAX)(user.accountAgeDays)
}
