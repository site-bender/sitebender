import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a ExactThreeDecimals without validation - only use when you know the value is valid
export default function unsafeExactThreeDecimals(n: number): ExactThreeDecimals {
	return n as ExactThreeDecimals
}
