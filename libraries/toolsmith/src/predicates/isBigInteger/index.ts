import type { BigInteger } from "../../types/branded/index.ts"

/*++
 + Type predicate that checks if a value is a bigint type
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isBigInteger(value: unknown): value is BigInteger {
	/*++
	 + [EXCEPTION] Uses typeof and === operators for primitive type checking
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return typeof value === "bigint"
}
