import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Formats an ISBN-10 for display with hyphens (e.g., "0-123-45678-9")
export default function formatIsbn10(): (isbn10: Isbn10) => string {
	return function formatToDisplay(isbn10: Isbn10): string {
		return `${isbn10[0]}-${isbn10.slice(1, 4)}-${isbn10.slice(4, 9)}-${isbn10[9]}`
	}
}
