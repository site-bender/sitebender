import type { Decimal0 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Decimal0 branded type back to its underlying number value
export default function unwrapDecimal0(d: Decimal0): number {
	return d as number
}
