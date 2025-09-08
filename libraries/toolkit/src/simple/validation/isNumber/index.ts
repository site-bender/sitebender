import not from "../../logic/not/index.ts"

//++ Type guard that checks if a value is a JavaScript number primitive (excludes NaN)
export default function isNumber(value: unknown): value is number {
	return typeof value === "number" && not(Number.isNaN(value))
}

//?? [EXAMPLE] isNumber(123) // true
//?? [EXAMPLE] isNumber(-42) // true
//?? [EXAMPLE] isNumber(3.14) // true
//?? [EXAMPLE] isNumber(0) // true
//?? [EXAMPLE] isNumber(NaN) // false (Not a Number)
//?? [EXAMPLE] isNumber(Infinity) // true
//?? [EXAMPLE] isNumber("123") // false (string, not number)
//?? [EXAMPLE] isNumber(null) // false
//?? [EXAMPLE] isNumber(undefined) // false
/*??
 * [EXAMPLE]
 * const processValue = (value: unknown): number =>
 *   isNumber(value) ? value * 2 : 0
 *
 * const mixed = [42, "123", 3.14, null, NaN]
 * const numbers = mixed.filter(isNumber)  // [42, 3.14]
 *
 * function safeCalculation(a: unknown, b: unknown): number {
 *   if (isNumber(a) && isNumber(b)) {
 *     return a + b  // TypeScript knows these are numbers
 *   }
 *   return 0
 * }
 *
 * [PRO] Simple and direct - tests exactly what the name says
 * [PRO] Excludes NaN for semantic correctness (NaN means "Not a Number")
 * [PRO] Includes all valid number values: integers, decimals, Infinity
 * [GOTCHA] Infinity and -Infinity return true (they're valid numbers in JS)
 */
