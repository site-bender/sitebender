import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Logical OR operation on two values
//++ Returns boolean (not JavaScript || behavior which preserves types)
export default function or(left: Value) {
	return function orWithLeft(right: Value): boolean {
		/*++
		 + [EXCEPTION] Uses || operator for boolean OR logic
		 + This is a primitive boolean operation with no higher-level abstraction available
		 */
		return Boolean(left) || Boolean(right)
	}
}
