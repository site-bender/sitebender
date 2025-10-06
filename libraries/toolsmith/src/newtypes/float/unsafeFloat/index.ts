import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as Float without validation - use only when input is guaranteed valid
export default function unsafeFloat(n: number): Float {
	return n as Float
}
