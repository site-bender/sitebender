import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a value is a bigint type
export default function _isBigInteger(n: bigint): n is BigInteger {
	return typeof n === "bigint"
}
