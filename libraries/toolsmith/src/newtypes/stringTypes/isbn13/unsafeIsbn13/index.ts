import type { Isbn13 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Isbn13 without validation - use only when input is guaranteed valid
export default function unsafeIsbn13(): (value: string) => Isbn13 {
	return function unsafeToIsbn13(value: string): Isbn13 {
		return value as Isbn13
	}
}
