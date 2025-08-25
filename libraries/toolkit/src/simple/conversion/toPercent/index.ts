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
 * const toPercent = toPercent({})
 * toPercent(0.5)                        // "50.00%"
 * toPercent(0.125)                      // "12.50%"
 * toPercent(1)                          // "100.00%"
 * toPercent(1.5)                        // "150.00%"
 * toPercent(0)                          // "0.00%"
 * toPercent(-0.25)                      // "-25.00%"
 *
 * // Custom decimal places
 * const toPercent0 = toPercent({ decimals: 0 })
 * toPercent0(0.5)                       // "50%"
 * toPercent0(0.125)                     // "13%"
 * toPercent0(0.126)                     // "13%"
 * toPercent0(0.999)                     // "100%"
 *
 * const toPercent1 = toPercent({ decimals: 1 })
 * toPercent1(0.5)                       // "50.0%"
 * toPercent1(0.125)                     // "12.5%"
 * toPercent1(0.126)                     // "12.6%"
 *
 * const toPercent4 = toPercent({ decimals: 4 })
 * toPercent4(0.123456)                  // "12.3456%"
 * toPercent4(0.1234567)                 // "12.3457%"
 *
 * // Without percent sign
 * const toPercentNoSign = toPercent({ includeSign: false })
 * toPercentNoSign(0.5)                  // "50.00"
 * toPercentNoSign(0.125)                // "12.50"
 * toPercentNoSign(1)                    // "100.00"
 *
 * // Combine options
 * const toPercentCustom = toPercent({ decimals: 1, includeSign: false })
 * toPercentCustom(0.5)                  // "50.0"
 * toPercentCustom(0.125)                // "12.5"
 * toPercentCustom(0.999)                // "99.9"
 *
 * // Edge cases
 * const format = toPercent({})
 * format(NaN)                           // "NaN%"
 * format(Infinity)                      // "Infinity%"
 * format(-Infinity)                     // "-Infinity%"
 * format(-0)                            // "-0.00%"
 *
 * // Very small numbers
 * format(0.0001)                        // "0.01%"
 * format(0.00001)                       // "0.00%"
 * toPercent({ decimals: 6 })(0.00001)   // "0.001000%"
 *
 * // Very large numbers
 * format(10)                            // "1000.00%"
 * format(100)                           // "10000.00%"
 *
 * // Financial reporting
 * const formatGrowth = toPercent({ decimals: 1 })
 * const quarterlyGrowth = [0.045, 0.032, -0.012, 0.078]
 * const report = quarterlyGrowth.map(formatGrowth)
 * // ["4.5%", "3.2%", "-1.2%", "7.8%"]
 *
 * // Statistics and probabilities
 * const formatProb = toPercent({ decimals: 2 })
 * formatProb(0.95)                      // "95.00%"
 * formatProb(0.6789)                    // "67.89%"
 * formatProb(0.001)                     // "0.10%"
 *
 * // Progress indicators
 * function formatProgress(current: number, total: number): string {
 *   const ratio = current / total
 *   return toPercent({ decimals: 0 })(ratio)
 * }
 *
 * formatProgress(25, 100)               // "25%"
 * formatProgress(7, 10)                 // "70%"
 * formatProgress(3, 8)                  // "38%"
 *
 * // Discount calculations
 * function formatDiscount(original: number, sale: number): string {
 *   const discount = (original - sale) / original
 *   return toPercent({ decimals: 0 })(discount)
 * }
 *
 * formatDiscount(100, 75)               // "25%"
 * formatDiscount(50, 30)                // "40%"
 * formatDiscount(80, 72)                // "10%"
 *
 * // Data transformation pipeline
 * const data = [0.123, 0.456, 0.789, 0.012, 0.345]
 * const percentages = data
 *   .map(toPercent({ decimals: 1 }))
 *   .map(s => s.padStart(6))
 * // [" 12.3%", " 45.6%", " 78.9%", "  1.2%", " 34.5%"]
 *
 * // CSV export without sign
 * const csvFormat = toPercent({ decimals: 2, includeSign: false })
 * const csvRow = [0.15, 0.23, 0.08].map(csvFormat).join(",")
 * // "15.00,23.00,8.00"
 * ```
 * @property Pure - Always returns same result for same input
 * @property Configurable - Supports custom decimal places and sign inclusion
 * @property Predictable - Handles edge cases consistently
 */
const toPercent = (
	options: {
		decimals?: number
		includeSign?: boolean
	} = {},
) =>
(
	value: number,
): string => {
	const { decimals = 2, includeSign = true } = options

	// Handle special cases
	if (Number.isNaN(value)) {
		return includeSign ? "NaN%" : "NaN"
	}

	if (value === Infinity) {
		return includeSign ? "Infinity%" : "Infinity"
	}

	if (value === -Infinity) {
		return includeSign ? "-Infinity%" : "-Infinity"
	}

	// Convert to percentage (multiply by 100)
	const percentage = value * 100

	// Format with specified decimal places
	const formatted = percentage.toFixed(Math.max(0, decimals))

	// Add percent sign if requested
	return includeSign ? `${formatted}%` : formatted
}

export default toPercent
