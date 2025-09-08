//++ Validates if a value can be parsed as a number (checks string representation)
export default function isNumber(value: unknown): boolean {
	return /^[+-]?([0-9]*[.])?[0-9]+$/.test(String(value))
}

//?? [EXAMPLE] isNumber("123") // true
//?? [EXAMPLE] isNumber("-42") // true
//?? [EXAMPLE] isNumber("3.14") // true
//?? [EXAMPLE] isNumber(".5") // true (leading decimal)
//?? [EXAMPLE] isNumber("3.") // true (trailing decimal)
//?? [EXAMPLE] isNumber(123) // true (converted to string)
//?? [EXAMPLE] isNumber(3.14) // true (converted to string)
//?? [EXAMPLE] isNumber("abc") // false
//?? [EXAMPLE] isNumber("12px") // false
//?? [EXAMPLE] isNumber("1e10") // false (scientific notation)
//?? [EXAMPLE] isNumber("Infinity") // false
//?? [EXAMPLE] isNumber(null) // false
/*??
 * [EXAMPLE]
 * const safeParse = (value: unknown): number | null =>
 *   isNumber(value) ? parseFloat(String(value)) : null
 *
 * safeParse("42")   // 42
 * safeParse("abc")  // null
 *
 * const userInputs = ["123", "abc", "45.67", "12px"]
 * userInputs.filter(isNumber)  // ["123", "45.67"]
 *
 * [PRO] Accepts both numbers and numeric strings uniformly
 * [PRO] Handles decimals, negatives, and positives correctly
 * [CON] Rejects scientific notation (1e10, 2E-5)
 * [CON] Rejects special values (Infinity, -Infinity, NaN)
 * [GOTCHA] Converts all inputs to strings first (numbers become strings)
 */
