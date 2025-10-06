import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an FourDecimalPlaces branded type back to its underlying number value
export default function unwrapFourDecimalPlaces(value: FourDecimalPlaces): number {
	return value as number
}
