import type { Isbn13 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwrap function that extracts string from ISBN13 branded type
export default function unwrapIsbn13(): (isbn13: Isbn13) => string {
	return function unwrapToString(isbn13: Isbn13): string {
		return isbn13
	}
}
