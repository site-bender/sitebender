import type { Value } from "@sitebender/toolsmith/types/index.ts"
import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import isFinite from "@sitebender/toolsmith/validation/isFinite/index.ts"

/*++
 + Alias for isFinite - real numbers are finite numbers
 + (excludes Infinity, -Infinity, NaN, and non-numbers)
 */
export default function isRealNumber(value: Value): value is RealNumber {
	return isFinite(value)
}
