import type { Decimal1 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a Decimal1 without validation - only use when you know the value is valid
export default function unsafeDecimal1(n: number): Decimal1 {
	return n as Decimal1
}
