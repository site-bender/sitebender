import type { Decimal0 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as Decimal0 without validation - USE WITH CAUTION
export default function unsafeDecimal0(n: number): Decimal0 {
	return n as Decimal0
}
