import isString from "../../validation/isString/index.ts"

/*++
 + Checks if a string is not empty
 + Returns false if non-string value is passed
 */
export default function isNotEmpty(str: string): boolean {
	/*++
	 + [EXCEPTION] Direct .length access is permitted here because:
	 + - TypeScript guarantees str is string
	 + - Predicates are internal utilities, not user-facing
	 + - No validation needed (type system enforces correctness)
	 + - Runtime isString check provides defensive safety
	 */
	return isString(str) && str.length > 0
}
