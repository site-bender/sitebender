//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type NumericOptions = {
	allowNegative?: boolean
	allowDecimal?: boolean
	allowScientific?: boolean
}

const isNumeric = (
	options: NumericOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const {
			allowNegative = false,
			allowDecimal = false,
			allowScientific = false,
		} = options

		// Build regex pattern based on options
		let pattern = "^"

		// Optional negative sign
		if (allowNegative) {
			pattern += "-?"
		}

		if (allowScientific) {
			// Scientific notation: [sign]digits[.digits][e|E[sign]digits]
			if (allowDecimal) {
				// With decimal: -123.45e-10
				pattern += "\\d*\\.?\\d+([eE][+-]?\\d+)?$"
			} else {
				// Without decimal but with scientific: -123e10
				pattern += "\\d+([eE][+-]?\\d+)?$"
			}
		} else if (allowDecimal) {
			// Decimal without scientific: -123.45
			// Allow leading decimal (.5), trailing decimal (5.), or both sides (5.5)
			pattern += "(\\d*\\.\\d*|\\d+)$"
			// Need to ensure at least one digit exists
		} else {
			// Just digits: -123
			pattern += "\\d+$"
		}

		const regex = new RegExp(pattern)
		const isValid = regex.test(value)

		// Additional validation for decimal-only case
		if (isValid && allowDecimal && !allowScientific) {
			// Ensure we don't have just a decimal point
			if (value === "." || value === "-." || value === "-.") {
				return false
			}
			// Ensure no multiple decimal points
			const decimalCount = (value.match(/\./g) || []).length
			if (decimalCount > 1) {
				return false
			}
		}

		return isValid
	}
}

export default isNumeric
