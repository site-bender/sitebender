import type { HexColorOptions } from "./types/index.ts"

import not from "../../logic/not/index.ts"
import test from "../../string/test/index.ts"

//++ Validates hexadecimal color codes with optional format restrictions
export default function isHexColor(options: HexColorOptions = {}) {
	const VALID_HEX_CHARS = /^[0-9A-Fa-f]+$/

	return function validateHexColor(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const { requireHash = false, format } = options

		// Check for hash prefix
		const hasHash = value.startsWith("#")

		if (requireHash && not(hasHash)) {
			return false
		}

		// Remove hash if present
		const hex = hasHash ? value.slice(1) : value

		// Check for valid hex characters only
		if (not(test(VALID_HEX_CHARS)(hex))) {
			return false
		}

		// Check length based on format
		const length = hex.length

		switch (format) {
			case "3-digit":
				return length === 3
			case "4-digit":
				return length === 4
			case "6-digit":
				return length === 6
			case "8-digit":
				return length === 8
			case "with-alpha":
				return length === 4 || length === 8
			case "no-alpha":
				return length === 3 || length === 6
			default:
				// Allow all valid lengths
				return length === 3 || length === 4 || length === 6 ||
					length === 8
		}
	}
}

//?? [EXAMPLE] isHexColor()("#FF0000") // true
//?? [EXAMPLE] isHexColor()("#FFF") // true
//?? [EXAMPLE] isHexColor()("FF0000") // true
//?? [EXAMPLE] isHexColor()("#GGG") // false
/*??
 | [EXAMPLE] Require hash prefix
 | const requireHash = isHexColor({ requireHash: true })
 | requireHash("#FF0000")  // true
 | requireHash("FF0000")   // false
 |
 | [EXAMPLE] Specific format validation
 | const sixDigitOnly = isHexColor({ format: "6-digit" })
 | sixDigitOnly("#FF0000") // true
 | sixDigitOnly("#FFF")    // false
 |
 | [GOTCHA] Empty strings return false
 | [PRO] Supports 3, 4, 6, and 8 digit formats with optional alpha channel
 |
*/
