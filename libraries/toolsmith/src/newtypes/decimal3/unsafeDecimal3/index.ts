import type { Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a Decimal3 without validation - only use when you know the value is valid
export default function unsafeDecimal3(n: number): Decimal3 {
	return n as Decimal3
}
