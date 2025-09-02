import isbn10 from "../isbn10/index.ts"
import isbn13 from "../isbn13/index.ts"

export default function isbn(input: string): string {
	// Remove all non-digit characters
	const cleanedDigits = input.replace(/\D/g, "")

	// Determine the format based on the rules
	if (cleanedDigits.length === 0) {
		return "" // No input, return empty string
	}

	// Rule 2: If the first character is not a 9, assume ISBN-10
	if (cleanedDigits[0] !== "9") {
		return isbn10(cleanedDigits.slice(0, 10)) // Limit to 10 characters
	}

	// Rule 3: If the first character is 9 and the second is not 7, assume ISBN-10
	if (cleanedDigits.length >= 2 && cleanedDigits[1] !== "7") {
		return isbn10(cleanedDigits.slice(0, 10)) // Limit to 10 characters
	}

	// Rule 4: If the first two characters are 97 and the third is not 8 or 9, assume ISBN-10
	if (cleanedDigits.length >= 3 && !["8", "9"].includes(cleanedDigits[2])) {
		return isbn10(cleanedDigits.slice(0, 10)) // Limit to 10 characters
	}

	// Rule 5: If the first three characters are 978 or 979, assume ISBN-13
	if (
		cleanedDigits.length >= 3 &&
		["978", "979"].includes(cleanedDigits.slice(0, 3))
	) {
		return isbn13(cleanedDigits.slice(0, 13)) // Limit to 13 characters
	}

	// If none of the above rules apply, return the cleaned input (wait for more input)
	return cleanedDigits
}
