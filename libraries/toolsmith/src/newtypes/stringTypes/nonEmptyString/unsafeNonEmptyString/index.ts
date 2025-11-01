import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as NonEmptyString without validation - use only when input is guaranteed valid
export default function unsafeNonEmptyString(value: string): NonEmptyString {
	return value as NonEmptyString
}
