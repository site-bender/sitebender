import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates an ExactOneDecimal without validation - only use when you know the value is valid
export default function unsafeExactOneDecimal(n: number): ExactOneDecimal {
	return n as ExactOneDecimal
}
