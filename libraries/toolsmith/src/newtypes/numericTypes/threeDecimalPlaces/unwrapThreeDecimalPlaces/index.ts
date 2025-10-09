import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a ThreeDecimalPlaces back to a regular number for use with external APIs or serialization
export default function unwrapThreeDecimalPlaces(
	d: ThreeDecimalPlaces,
): number {
	return d as number
}
