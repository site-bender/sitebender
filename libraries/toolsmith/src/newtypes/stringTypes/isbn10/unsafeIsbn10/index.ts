import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Isbn10 without validation - use only when input is guaranteed valid
export default function unsafeIsbn10(): (value: string) => Isbn10 {
	return function unsafeToIsbn10(value: string): Isbn10 {
		return value as Isbn10
	}
}
