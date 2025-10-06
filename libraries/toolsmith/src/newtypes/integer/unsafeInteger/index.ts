import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as Integer without validation - use only when input is guaranteed valid
export default function unsafeInteger(n: number): Integer {
	return n as Integer
}
