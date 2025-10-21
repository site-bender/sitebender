import type { Value } from "@sitebender/toolsmith/types/index.ts"
import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a value is a bigint type
export default function isBigInteger(value: Value): value is BigInteger {
	/*++
	 + [EXCEPTION] Uses typeof and === operators for primitive type checking
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return typeof value === "bigint"
}
