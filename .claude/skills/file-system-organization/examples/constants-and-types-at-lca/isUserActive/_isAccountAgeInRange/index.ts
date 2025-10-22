import betweenInclusive from "@sitebender/toolsmith/validation/betweenInclusive/index.ts"

import {
	MAX_ACCOUNT_AGE_DAYS as MAX,
	MIN_ACCOUNT_AGE_DAYS as MIN,
} from "../constants/index.ts"

//++ Private helper that checks if account age is in valid range
export default function _isAccountAgeInRange(days: number): boolean {
	return betweenInclusive(MIN)(MAX)(days)
}
