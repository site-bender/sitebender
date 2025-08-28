/**
 * Validates hexadecimal color codes
 *
 * Checks whether a string is a valid hexadecimal color code in either
 * 3-digit, 4-digit (with alpha), 6-digit, or 8-digit (with alpha) format.
 * Optionally validates specific formats and whether the hash prefix is
 * required. Returns false for non-string values, empty strings, or
 * invalid color codes.
 *
 * Supported formats:
 * - 3-digit: #RGB or RGB (e.g., #F00, ABC)
 * - 4-digit: #RGBA or RGBA (e.g., #F00F, ABCD)
 * - 6-digit: #RRGGBB or RRGGBB (e.g., #FF0000, AABBCC)
 * - 8-digit: #RRGGBBAA or RRGGBBAA (e.g., #FF0000FF, AABBCCDD)
 * - Case-insensitive validation (a-f, A-F)
 * - Optional hash (#) prefix
 *
 * @param options - Optional configuration for validation strictness
 * @returns A predicate function that validates hex color codes
 * @example
 * ```typescript
 * // Basic validation
 * const validate = isHexColor()
 * validate("#FF0000")     // true
 * validate("#FFF")        // true
 * validate("FF0000")      // true (no hash)
 * validate("#GGG")        // false
 *
 * // Require hash prefix
 * const requireHash = isHexColor({ requireHash: true })
 * requireHash("#FF0000")  // true
 * requireHash("FF0000")   // false
 *
 * // Specific format validation  
 * const sixDigitOnly = isHexColor({ format: "6-digit" })
 * sixDigitOnly("#FF0000") // true
 * sixDigitOnly("#FFF")    // false
 *
 * // Alpha channel validation
 * const withAlpha = isHexColor({ format: "with-alpha" })
 * withAlpha("#FF0000FF")  // true (8-digit)
 * withAlpha("#FFFF")      // true (4-digit)
 * withAlpha("#FF0000")    // false
 *
 * // Filter valid colors
 * const colors = ["#FF0000", "invalid", "#00FF00"]
 * colors.filter(isHexColor({ requireHash: true }))
 * // ["#FF0000", "#00FF00"]
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
type HexColorFormat =
	| "3-digit"
	| "4-digit"
	| "6-digit"
	| "8-digit"
	| "with-alpha"
	| "no-alpha"

type HexColorOptions = {
	requireHash?: boolean
	format?: HexColorFormat
}

const isHexColor = (
	options: HexColorOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const { requireHash = false, format } = options

		// Check for hash prefix
		const hasHash = value.startsWith("#")
		if (requireHash && !hasHash) {
			return false
		}

		// Remove hash if present
		const hex = hasHash ? value.slice(1) : value

		// Check for valid hex characters only
		if (!/^[0-9A-Fa-f]+$/.test(hex)) {
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
				return length === 3 || length === 4 || length === 6 || length === 8
		}
	}
}

export default isHexColor
