import type { Decimal1 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Decimal1 back to a regular number for use with external APIs or serialization
export default function unwrapDecimal1(d: Decimal1): number {
	return d as number
}
