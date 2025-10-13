import length from "@sitebender/toolsmith/array/length/index.ts"
import keys from "@sitebender/toolsmith/object/keys/index.ts"

import type { FunctionInfo } from "../types/index.ts"

/**
 * Sum the count of functions across categories (for use with reduce)
 */
export default function _sumCategoryCounts(
	sum: number,
	category: Record<string, FunctionInfo>,
): number {
	return sum + length(keys(category))
}
