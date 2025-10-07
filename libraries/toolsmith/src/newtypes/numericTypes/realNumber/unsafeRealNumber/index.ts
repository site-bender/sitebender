import type { RealNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as RealNumber without validation - use only when input is guaranteed valid
export default function unsafeRealNumber(
	n: number,
): RealNumber {
	return n as RealNumber
}
