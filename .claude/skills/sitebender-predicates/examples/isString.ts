import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Type guard that checks if a value is a string primitive (not String object)
export default function isString(value: Value): value is string {
	/*++
	 + [EXCEPTION] Uses typeof and === operators for primitive type checking
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return typeof value === "string"
}
