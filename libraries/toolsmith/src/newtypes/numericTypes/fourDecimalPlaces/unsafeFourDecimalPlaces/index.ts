import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as FourDecimalPlaces without validation - USE WITH CAUTION
export default function unsafeFourDecimalPlaces(n: number): FourDecimalPlaces {
	return n as FourDecimalPlaces
}
