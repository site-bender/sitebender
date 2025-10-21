import type { Value } from "../../types/index.ts"
import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import isFinite from "../isFinite/index.ts"

//++ Alias for isFinite - real numbers are finite numbers (excludes Infinity, -Infinity, NaN, and non-numbers)
export default function isRealNumber(value: Value): value is RealNumber {
	return isFinite(value)
}
