import type { Char } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Char without validation - use only when input is guaranteed valid
export default function unsafeChar(value: string): Char {
	return value as Char
}
