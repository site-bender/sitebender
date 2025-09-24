import isNaN from "../../validation/isNaN/index.ts"
import isPositiveInfinity from "../../validation/isPositiveInfinity/index.ts"
import isNegativeInfinity from "../../validation/isNegativeInfinity/index.ts"

/**
 * Converts a number to a percentage string representation
 *
 * Transforms numeric values into formatted percentage strings with
 * configurable decimal places and optional percent sign. Handles special
 * numeric values gracefully and provides consistent formatting.
 *
 * Conversion rules:
 * - Numbers: multiplied by 100 and formatted with specified decimals
 * - NaN: returns "NaN%" or "NaN" based on includeSign option
 * - Infinity: returns "Infinity%" or "-Infinity%" appropriately
 * - Negative zero: preserves sign in output
 *
 * @curried (options) => (value) => result
 * @param options - Configuration object for percentage formatting
 * @param options.decimals - Number of decimal places (default: 2)
 * @param options.includeSign - Whether to append "%" sign (default: true)
 * @param value - The numeric value to convert (0.5 = 50%)
 * @returns Formatted percentage string
 * @example
 * ```typescript
 * // Basic usage with defaults (2 decimals, includes %)
 * const format = toPercent({})
 * format(0.5)                        // "50.00%"
 * format(0.125)                      // "12.50%"
 * format(-0.25)                      // "-25.00%"
 *
 * // Custom options
 * toPercent({ decimals: 0 })(0.5)   // "50%"
 * toPercent({ decimals: 1 })(0.125) // "12.5%"
 * toPercent({ includeSign: false })(0.5)  // "50.00"
 *
 * // Edge cases
 * format(NaN)                        // "NaN%"
 * format(Infinity)                   // "Infinity%"
 *
 * // Financial reporting
 * const growth = [0.045, 0.032, -0.012]
 * const report = growth.map(toPercent({ decimals: 1 }))
 * // ["4.5%", "3.2%", "-1.2%"]
 * ```
 * @pure
 * @safe
 */
export default function toPercent(
	options: {
		decimals?: number
		includeSign?: boolean
	} = {},
): (value: number) => string {
	return function toPercentInner(value: number): string {
		const { decimals = 2, includeSign = true } = options

		// Handle special cases
		if (isNaN(value)) {
			return includeSign ? "NaN%" : "NaN"
		}

		if (isPositiveInfinity(value)) {
			return includeSign ? "Infinity%" : "Infinity"
		}

		if (isNegativeInfinity(value)) {
			return includeSign ? "-Infinity%" : "-Infinity"
		}

		// Convert to percentage (multiply by 100)
		const percentage = value * 100

		// Format with specified decimal places
		const formatted = percentage.toFixed(Math.max(0, decimals))

		// Add percent sign if requested
		return includeSign ? `${formatted}%` : formatted
	}
}
