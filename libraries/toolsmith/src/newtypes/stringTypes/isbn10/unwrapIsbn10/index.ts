import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an Isbn10 branded type back to its underlying string value
export default function unwrapIsbn10(): (isbn10: Isbn10) => string {
	return function unwrapToString(isbn10: Isbn10): string {
		return isbn10
	}
}
