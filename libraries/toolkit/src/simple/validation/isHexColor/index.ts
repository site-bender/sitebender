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
 * // Basic hex color validation (all formats)
 * const isValidHex = isHexColor()
 *
 * isValidHex("#FFF")           // true (3-digit)
 * isValidHex("#FFFF")          // true (4-digit with alpha)
 * isValidHex("#FF0000")        // true (6-digit)
 * isValidHex("#FF0000FF")      // true (8-digit with alpha)
 * isValidHex("FFF")            // true (without hash)
 * isValidHex("FF0000")         // true (without hash)
 * isValidHex("#GGG")           // false (invalid characters)
 * isValidHex("#FF00")          // false (invalid length)
 * isValidHex("")               // false (empty)
 *
 * // Require hash prefix
 * const requireHash = isHexColor({ requireHash: true })
 *
 * requireHash("#FF0000")       // true
 * requireHash("#FFF")          // true
 * requireHash("FF0000")        // false (missing hash)
 * requireHash("FFF")           // false (missing hash)
 *
 * // Allow only 6-digit format
 * const sixDigitOnly = isHexColor({ format: "6-digit" })
 *
 * sixDigitOnly("#FF0000")      // true
 * sixDigitOnly("#00FF00")      // true
 * sixDigitOnly("AABBCC")       // true
 * sixDigitOnly("#FFF")         // false (3-digit)
 * sixDigitOnly("#FF0000FF")    // false (8-digit)
 *
 * // Allow only 3-digit format
 * const threeDigitOnly = isHexColor({ format: "3-digit" })
 *
 * threeDigitOnly("#FFF")       // true
 * threeDigitOnly("#000")       // true
 * threeDigitOnly("ABC")        // true
 * threeDigitOnly("#FF0000")    // false (6-digit)
 * threeDigitOnly("#FFFF")      // false (4-digit)
 *
 * // Allow only formats with alpha channel
 * const withAlpha = isHexColor({ format: "with-alpha" })
 *
 * withAlpha("#FFFF")           // true (4-digit with alpha)
 * withAlpha("#FF0000FF")       // true (8-digit with alpha)
 * withAlpha("#FFF")            // false (no alpha)
 * withAlpha("#FF0000")         // false (no alpha)
 *
 * // Allow only formats without alpha channel
 * const noAlpha = isHexColor({ format: "no-alpha" })
 *
 * noAlpha("#FFF")              // true (3-digit)
 * noAlpha("#FF0000")           // true (6-digit)
 * noAlpha("#FFFF")             // false (has alpha)
 * noAlpha("#FF0000FF")         // false (has alpha)
 *
 * // Case insensitive validation
 * const validator = isHexColor()
 *
 * validator("#fff")            // true (lowercase)
 * validator("#FFF")            // true (uppercase)
 * validator("#Ff0")            // true (mixed case)
 * validator("#aAbBcC")         // true
 *
 * // CSS color validation
 * const validateCSSColor = (color: unknown): string | null => {
 *   if (typeof color !== "string") {
 *     return "Color must be text"
 *   }
 *
 *   const trimmed = color.trim()
 *   if (trimmed.length === 0) {
 *     return "Color is required"
 *   }
 *
 *   if (!isHexColor({ requireHash: true })(trimmed)) {
 *     return "Invalid hex color format"
 *   }
 *
 *   return null
 * }
 *
 * validateCSSColor("#FF0000")  // null (valid)
 * validateCSSColor("FF0000")   // "Invalid hex color format"
 * validateCSSColor("#XYZ")     // "Invalid hex color format"
 *
 * // Color palette validation
 * const colors = [
 *   "#FF0000",  // Red
 *   "#00FF00",  // Green
 *   "#0000FF",  // Blue
 *   "invalid",
 *   "#FFF",     // White
 *   "#000000",  // Black
 * ]
 *
 * const validColors = colors.filter(isHexColor({ requireHash: true }))
 * // ["#FF0000", "#00FF00", "#0000FF", "#FFF", "#000000"]
 *
 * // Theme color extraction
 * const extractThemeColors = (
 *   cssText: string
 * ): Array<string> => {
 *   const hexPattern = /#[0-9A-Fa-f]{3,8}/g
 *   const matches = cssText.match(hexPattern) || []
 *
 *   return matches.filter(isHexColor({ requireHash: true }))
 * }
 *
 * const css = "color: #FF0000; background: #00FF00FF; border: #XYZ;"
 * extractThemeColors(css)  // ["#FF0000", "#00FF00FF"]
 *
 * // Convert short to long format
 * const expandHexColor = (hex: string): string | null => {
 *   if (!isHexColor({ format: "3-digit" })(hex)) {
 *     return null
 *   }
 *
 *   const clean = hex.replace("#", "")
 *   const expanded = clean.split("").map(c => c + c).join("")
 *   return "#" + expanded
 * }
 *
 * expandHexColor("#F00")       // "#FF0000"
 * expandHexColor("#ABC")       // "#AABBCC"
 * expandHexColor("#FF0000")    // null (not 3-digit)
 *
 * // Opacity validation
 * const hasOpacity = (hex: string): boolean => {
 *   return isHexColor({ format: "with-alpha" })(hex)
 * }
 *
 * hasOpacity("#FF0000FF")      // true (fully opaque)
 * hasOpacity("#FF000080")      // true (50% opacity)
 * hasOpacity("#FF0000")        // false (no alpha channel)
 *
 * // Invalid inputs
 * const checker = isHexColor()
 *
 * checker(null)                // false
 * checker(undefined)           // false
 * checker(123)                 // false (not a string)
 * checker("")                  // false (empty)
 * checker("#")                 // false (only hash)
 * checker("##FFF")             // false (double hash)
 * checker("#FF")               // false (2 digits)
 * checker("#FFFFF")            // false (5 digits)
 * checker("#FFFFFFF")          // false (7 digits)
 * checker("#GGGHHH")           // false (invalid characters)
 * checker("rgb(255,0,0)")      // false (RGB format)
 *
 * // Brand color validation
 * const brandColors = {
 *   primary: "#1E90FF",
 *   secondary: "#FFA500",
 *   accent: "#32CD32",
 *   error: "#FF0000",
 *   warning: "#FFD700",
 *   success: "#00FF00"
 * }
 *
 * const validateBrandColors = (
 *   colors: Record<string, string>
 * ): Array<string> => {
 *   const validator = isHexColor({ requireHash: true, format: "6-digit" })
 *   const invalid: Array<string> = []
 *
 *   for (const [name, color] of Object.entries(colors)) {
 *     if (!validator(color)) {
 *       invalid.push(name)
 *     }
 *   }
 *
 *   return invalid
 * }
 *
 * validateBrandColors(brandColors)  // [] (all valid)
 *
 * // Dark mode color generation
 * const isValidThemeColor = (
 *   color: string,
 *   allowAlpha: boolean = false
 * ): boolean => {
 *   const format = allowAlpha ? undefined : "no-alpha"
 *   return isHexColor({ requireHash: true, format })(color)
 * }
 *
 * isValidThemeColor("#FF0000", false)     // true
 * isValidThemeColor("#FF0000FF", false)   // false (has alpha)
 * isValidThemeColor("#FF0000FF", true)    // true
 *
 * // Color picker validation
 * const validateColorInput = (
 *   input: string
 * ): { valid: boolean; normalized: string | null } => {
 *   const withHash = isHexColor({ requireHash: true })
 *   const withoutHash = isHexColor({ requireHash: false })
 *
 *   if (withHash(input)) {
 *     return { valid: true, normalized: input.toUpperCase() }
 *   }
 *
 *   if (withoutHash(input)) {
 *     return { valid: true, normalized: "#" + input.toUpperCase() }
 *   }
 *
 *   return { valid: false, normalized: null }
 * }
 *
 * validateColorInput("#ff0000")  // { valid: true, normalized: "#FF0000" }
 * validateColorInput("ff0000")   // { valid: true, normalized: "#FF0000" }
 * validateColorInput("invalid")  // { valid: false, normalized: null }
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Format-aware - Can validate specific hex formats
 * @property Case-insensitive - Accepts both uppercase and lowercase
 * @property Hash-flexible - Optional hash prefix validation
 * @property Strict - Returns false for invalid formats
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
