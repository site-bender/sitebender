import type { Value } from "../../types/index.ts"
import not from "../../logic/not/index.ts"

//++ Type guard that checks if a value is a JavaScript number primitive (excludes NaN only)
export default function isNumber(value: Value): value is number {
	/*++
	 + [EXCEPTION] Uses typeof, ===, and Number.isNaN operators
	 + These are primitive type checking operations with no higher-level abstraction available
	 */
	return typeof value === "number" && not(Number.isNaN(value))
}
