import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates an OneDecimalPlace without validation - only use when you know the value is valid
export default function unsafeOneDecimalPlace(n: number): OneDecimalPlace {
	return n as OneDecimalPlace
}
