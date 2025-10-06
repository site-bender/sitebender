import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as ExactTwoDecimals without validation - USE WITH CAUTION
export default function unsafeExactTwoDecimals(n: number): ExactTwoDecimals {
	return n as ExactTwoDecimals
}
