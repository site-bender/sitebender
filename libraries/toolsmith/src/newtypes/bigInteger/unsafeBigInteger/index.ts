import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a bigint as BigInteger without validation - use only when input is guaranteed valid
export default function unsafeBigInteger(n: bigint): BigInteger {
	return n as BigInteger
}
