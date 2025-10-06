import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as EightDecimalPlaces without validation - use only when input is guaranteed valid
export default function unsafeEightDecimalPlaces(
	n: number,
): EightDecimalPlaces {
	return n as EightDecimalPlaces
}
