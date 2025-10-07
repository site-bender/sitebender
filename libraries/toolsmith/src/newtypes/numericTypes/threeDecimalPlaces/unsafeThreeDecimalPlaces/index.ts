import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a ThreeDecimalPlaces without validation - only use when you know the value is valid
export default function unsafeThreeDecimalPlaces(n: number): ThreeDecimalPlaces {
	return n as ThreeDecimalPlaces
}
