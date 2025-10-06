import type { ApproximateDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an ApproximateDecimal branded type back to its underlying number value
export default function unwrapApproximateDecimal(
	value: ApproximateDecimal,
): number {
	return value as number
}
