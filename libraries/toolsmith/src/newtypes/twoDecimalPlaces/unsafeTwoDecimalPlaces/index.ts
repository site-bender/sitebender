import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as TwoDecimalPlaces without validation - USE WITH CAUTION
export default function unsafeTwoDecimalPlaces(n: number): TwoDecimalPlaces {
	return n as TwoDecimalPlaces
}
