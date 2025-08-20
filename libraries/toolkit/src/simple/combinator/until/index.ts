/**
 * Calls a function repeatedly until a predicate returns true
 * Applies the function to its own output until the condition is met
 *
 * @param predicate - Condition to check (stops when true)
 * @param fn - Function to apply repeatedly
 * @param initial - Starting value
 * @returns Final value when predicate returns true
 * @example
 * ```typescript
 * // Find the next power of 2 greater than a number
 * const nextPowerOf2 = (n: number) =>
 *   until(
 *     (x: number) => x > n,
 *     (x: number) => x * 2,
 *     1
 *   )
 *
 * nextPowerOf2(10) // 16 (1 -> 2 -> 4 -> 8 -> 16)
 * nextPowerOf2(100) // 128
 *
 * // Reduce a number to single digit by summing digits
 * const sumDigits = (n: number): number => {
 *   const sum = String(n).split('').reduce((a, b) => a + Number(b), 0)
 *   return sum
 * }
 *
 * const digitalRoot = (n: number) =>
 *   until(
 *     (x: number) => x < 10,
 *     sumDigits,
 *     n
 *   )
 *
 * digitalRoot(99) // 9 (99 -> 18 -> 9)
 * digitalRoot(12345) // 6 (12345 -> 15 -> 6)
 *
 * // Find first Thursday from a date
 * const nextThursday = (date: Date) =>
 *   until(
 *     (d: Date) => d.getDay() === 4,
 *     (d: Date) => new Date(d.getTime() + 86400000),
 *     date
 *   )
 * ```
 *
 * Note: Be careful to ensure the predicate will eventually return true,
 * or this function will run forever. Consider adding a maximum iteration
 * count for safety in production code.
 */
const until = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
	initial: T,
): T => {
	let current = initial
	while (!predicate(current)) {
		current = fn(current)
	}
	return current
}

export default until
