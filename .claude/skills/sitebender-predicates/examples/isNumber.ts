import not from "@sitebender/toolsmith/logic/not/index.ts"

//++ Type guard that checks if a value is a JavaScript number primitive (excludes NaN only)
export default function isNumber(value: unknown): value is number {
	/*++
	 + [EXCEPTION] Uses typeof, ===, and Number.isNaN operators
	 + These are primitive type checking operations with no higher-level abstraction available
	 */
	return typeof value === "number" && not(Number.isNaN(value))
}
