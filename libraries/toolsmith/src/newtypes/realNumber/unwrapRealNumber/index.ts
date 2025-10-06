import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a RealNumber branded type back to its underlying number value
export default function unwrapRealNumber(
	value: RealNumber,
): number {
	return value as number
}
