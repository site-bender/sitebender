import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Logical AND operation on two values
//++ Returns boolean (not JavaScript && behavior which preserves types)
export default function and(left: Value) {
	return function andWithLeft(right: Value): boolean {
		//++ [EXCEPTION] Boolean() and && permitted in Toolsmith for performance - provides curried and wrapper
		return Boolean(left) && Boolean(right)
	}
}
