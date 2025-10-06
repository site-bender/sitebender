import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an EightDecimalPlaces branded type back to its underlying number value
export default function unwrapEightDecimalPlaces(
	value: EightDecimalPlaces,
): number {
	return value as number
}
