import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Logical OR operation on two values
//++ Returns boolean (not JavaScript || behavior which preserves types)
export default function or(left: Value) {
	return function orWithLeft(right: Value): boolean {
		//++ [EXCEPTION] Boolean() and || permitted in Toolsmith for performance - provides curried or wrapper
		return Boolean(left) || Boolean(right)
	}
}
