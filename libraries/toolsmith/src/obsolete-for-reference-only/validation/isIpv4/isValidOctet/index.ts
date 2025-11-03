import not from "../../../logic/not/index.ts"
import test from "../../../string/test/index.ts"

//++ Validates a single IPv4 octet (0-255)
export default function isValidOctet(octet: string): boolean {
	const ONLY_DIGITS = /^\d+$/

	// Check for empty octet
	if (octet.length === 0) {
		return false
	}

	// Check if octet contains only digits
	if (not(test(ONLY_DIGITS)(octet))) {
		return false
	}

	// Convert to number and check range
	const num = parseInt(octet, 10)

	return num >= 0 && num <= 255
}
