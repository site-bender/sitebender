import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as ExactFourDecimals without validation - USE WITH CAUTION
export default function unsafeExactFourDecimals(n: number): ExactFourDecimals {
	return n as ExactFourDecimals
}
