import type { ApproximateDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as ApproximateDecimal without validation - use only when input is guaranteed valid
export default function unsafeApproximateDecimal(
	n: number,
): ApproximateDecimal {
	return n as ApproximateDecimal
}
