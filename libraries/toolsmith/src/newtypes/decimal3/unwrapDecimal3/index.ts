import type { Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Decimal3 back to a regular number for use with external APIs or serialization
export default function unwrapDecimal3(d: Decimal3): number {
	return d as number
}
