import type { Value } from "../../types/index.ts"

//++ Type guard that checks if a value is positive Infinity
export default function isPositiveInfinity(value: Value): boolean {
	/*++
	 + [EXCEPTION] Uses === operator to check Infinity identity
	 + This is a primitive identity check with no higher-level abstraction available
	 + Returns false for anything other than positive Infinity
	 */
	return value === Infinity
}
