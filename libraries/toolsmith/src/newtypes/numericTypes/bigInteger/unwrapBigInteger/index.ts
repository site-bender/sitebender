import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a BigInteger branded type back to its underlying bigint value
export default function unwrapBigInteger(bigInteger: BigInteger): bigint {
	return bigInteger
}
