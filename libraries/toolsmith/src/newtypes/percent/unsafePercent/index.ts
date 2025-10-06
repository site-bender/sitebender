import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as Percent without validation - use only when input is guaranteed valid
export default function unsafePercent(n: number): Percent {
	return n as Percent
}
