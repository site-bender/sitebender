import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Converts a value to a decimal percentage (0-1 range) by dividing by 100
 * 
 * Parses a numeric value and converts it to a decimal representation of a percentage.
 * Input values are treated as percentages (0-100 range) and converted to decimals
 * (0-1 range) for mathematical operations. For example, "50" becomes 0.5, representing
 * 50%. This is useful for calculations where percentages need to be applied as
 * multipliers.
 * 
 * Valid formats:
 * - Integers: "50" → 0.5, "100" → 1.0, "0" → 0.0
 * - Decimals: "33.33" → 0.3333, "99.99" → 0.9999
 * - Negative percentages: "-10" → -0.1 (for discounts/adjustments)
 * - Values over 100: "150" → 1.5 (for growth rates)
 * 
 * Invalid formats:
 * - Non-numeric strings: "abc", "50%", "fifty"
 * - Objects, arrays, null, undefined
 * - NaN, Infinity values
 * 
 * @curried (value) => Either<Array<AdaptiveError>, number>
 * @param value - The percentage value to convert (0-100 scale)
 * @returns Either an array of errors (Left) or the decimal value (Right)
 * @example
 * ```typescript
 * // Standard percentages (0-100 → 0-1)
 * castToPercent("50")      // { right: 0.5 }
 * castToPercent("100")     // { right: 1 }
 * castToPercent("0")       // { right: 0 }
 * castToPercent("25")      // { right: 0.25 }
 * castToPercent("75")      // { right: 0.75 }
 * 
 * // Decimal percentages
 * castToPercent("33.33")   // { right: 0.3333 }
 * castToPercent("99.99")   // { right: 0.9999 }
 * castToPercent("12.5")    // { right: 0.125 }
 * castToPercent("0.1")     // { right: 0.001 }
 * 
 * // Edge cases
 * castToPercent("150")     // { right: 1.5 } - over 100%
 * castToPercent("-10")     // { right: -0.1 } - negative percentage
 * castToPercent("200")     // { right: 2 } - 200%
 * 
 * // Numbers are converted to strings first
 * castToPercent(50)        // { right: 0.5 }
 * castToPercent(33.33)     // { right: 0.3333 }
 * castToPercent(0)         // { right: 0 }
 * 
 * // Invalid values
 * castToPercent("abc")
 * // { left: [{ type: "castToPercent", value: "Percent", message: "Cannot cast \"abc\" to a percent." }] }
 * 
 * castToPercent("50%")
 * // { left: [{ type: "castToPercent", value: "Percent", message: "Cannot cast \"50%\" to a percent." }] }
 * 
 * castToPercent(null)
 * // { left: [{ type: "castToPercent", value: "Percent", message: "Cannot cast null to a percent." }] }
 * 
 * // Practical usage examples
 * import { isRight } from "../../../types"
 * 
 * const applyDiscount = (price: number, discountValue: Value) => {
 *   const discount = castToPercent(discountValue)
 *   if (isRight(discount)) {
 *     return price * (1 - discount.right)
 *   }
 *   return price
 * }
 * 
 * applyDiscount(100, "20")   // 80 (20% off)
 * applyDiscount(50, "10")    // 45 (10% off)
 * applyDiscount(200, "abc")  // 200 (invalid discount)
 * 
 * const calculateTax = (amount: number, taxRate: Value) => {
 *   const rate = castToPercent(taxRate)
 *   if (isRight(rate)) {
 *     return amount * rate.right
 *   }
 *   return 0
 * }
 * 
 * calculateTax(100, "15")    // 15 (15% tax)
 * calculateTax(50, "8.5")    // 4.25 (8.5% tax)
 * 
 * // Compound interest calculation
 * const compound = (principal: number, rateValue: Value, years: number) => {
 *   const rate = castToPercent(rateValue)
 *   if (isRight(rate)) {
 *     return principal * Math.pow(1 + rate.right, years)
 *   }
 *   return principal
 * }
 * 
 * compound(1000, "5", 3)     // 1157.625 (5% for 3 years)
 * compound(1000, "10", 2)    // 1210 (10% for 2 years)
 * ```
 * @property Pure - always returns the same result for the same input
 * @property Total - handles all possible input values, returning Either type
 * @property Mathematical - converts percentage notation (0-100) to decimal (0-1)
 */
const castToPercent = (value: Value): Either<Array<AdaptiveError>, number> => {
	// Convert value to string for parsing
	const stringValue = String(value)
	
	// Use the number matcher to validate format
	if (MATCHERS.number.test(stringValue)) {
		const parsed = parseFloat(stringValue)
		
		// Check for NaN or Infinity
		if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
			// Convert from percentage (0-100) to decimal (0-1)
			return { right: parsed / 100 }
		}
	}

	// Return error for invalid input
	return {
		left: [
			Error("castToPercent")("Percent")(
				`Cannot cast ${JSON.stringify(value)} to a percent.`,
			),
		],
	}
}

export default castToPercent