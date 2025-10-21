import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Type guard that checks if a value is negative Infinity
export default function isNegativeInfinity(value: Value): boolean {
	/*++
	 + [EXCEPTION] Uses === operator to check -Infinity identity
	 + This is a primitive identity check with no higher-level abstraction available
	 + Returns false for anything other than negative Infinity
	 */
	return value === -Infinity
}
