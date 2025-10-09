import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an TwoDecimalPlaces branded type back to its underlying number value
export default function unwrapTwoDecimalPlaces(
	value: TwoDecimalPlaces,
): number {
	return value as number
}
