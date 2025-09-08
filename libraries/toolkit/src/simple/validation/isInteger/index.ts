//++ Checks if a value is an integer (whole number with no fractional component)
export default function isInteger(value: unknown): value is number {
	return Number.isInteger(value)
}

//?? [EXAMPLE] isInteger(42) // true
//?? [EXAMPLE] isInteger(-42) // true
//?? [EXAMPLE] isInteger(0) // true
//?? [EXAMPLE] isInteger(1.5) // false
//?? [EXAMPLE] isInteger(NaN) // false
//?? [EXAMPLE] isInteger(1.0) // true (no fractional part)
//?? [EXAMPLE] isInteger(Number.MAX_SAFE_INTEGER) // true
//?? [EXAMPLE] isInteger("5") // false (string)
//?? [EXAMPLE] isInteger(null) // false
//?? [EXAMPLE] isInteger(Infinity) // false
/*??
 * [EXAMPLE]
 * const values = [1, 1.5, 2, Math.PI, 3, "4"]
 * values.filter(isInteger)  // [1, 2, 3]
 *
 * const isValidIndex = (val: unknown, len: number): boolean =>
 *   isInteger(val) && val >= 0 && val < len
 *
 * const isValidPort = (port: unknown): boolean =>
 *   isInteger(port) && port >= 0 && port <= 65535
 *
 * [GOTCHA] 1.0 returns true because it has no fractional component
 * [GOTCHA] Includes both safe and unsafe integers (beyond MAX_SAFE_INTEGER)
 */
