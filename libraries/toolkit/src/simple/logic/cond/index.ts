/**
 * Multi-way conditional expression (like switch/case or if/else-if chains)
 *
 * Evaluates a list of [predicate, result] pairs in order, returning the
 * result of the first predicate that evaluates to truthy. If no predicates
 * match, returns undefined. This provides a functional alternative to
 * imperative switch statements or if/else-if chains.
 *
 * Each pair consists of:
 * - A predicate function that receives the input value
 * - A result function that produces the output if the predicate matches
 *
 * @param pairs - Array of [predicate, result] tuples
 * @param value - The value to test against predicates
 * @returns Result of first matching predicate, or undefined if no match
 * @example
 * ```typescript
 * // Basic number classification
 * const classifyNumber = cond<number, string>([
 *   [n => n < 0, () => "negative"],
 *   [n => n === 0, () => "zero"],
 *   [n => n > 0, () => "positive"]
 * ])
 *
 * classifyNumber(-5)                   // "negative"
 * classifyNumber(0)                    // "zero"
 * classifyNumber(10)                   // "positive"
 *
 * // Grade calculation
 * const getGrade = cond<number, string>([
 *   [n => n >= 90, () => "A"],
 *   [n => n >= 80, () => "B"],
 *   [n => n >= 70, () => "C"],
 *   [n => n >= 60, () => "D"],
 *   [() => true, () => "F"]  // Default case
 * ])
 *
 * // FizzBuzz implementation
 * const fizzBuzz = cond<number, string>([
 *   [n => n % 15 === 0, () => "FizzBuzz"],
 *   [n => n % 3 === 0, () => "Fizz"],
 *   [n => n % 5 === 0, () => "Buzz"],
 *   [() => true, n => String(n)]
 * ])
 *
 * // State machine transitions
 * type State = "idle" | "loading" | "success" | "error"
 * type Action = { type: string; payload?: unknown }
 *
 * const transition = cond<Action, State>([
 *   [a => a.type === "FETCH_START", () => "loading"],
 *   [a => a.type === "FETCH_SUCCESS", () => "success"],
 *   [a => a.type === "FETCH_ERROR", () => "error"],
 *   [a => a.type === "RESET", () => "idle"],
 *   [() => true, () => "idle"]  // Default to idle
 * ])
 *
 * // Validation with error messages
 * const validate = cond<string, { valid: boolean; message: string }>([
 *   [s => s.length === 0, () => ({ valid: false, message: "Required field" })],
 *   [s => s.length < 3, () => ({ valid: false, message: "Too short" })],
 *   [s => s.length > 100, () => ({ valid: false, message: "Too long" })],
 *   [s => !/^[a-zA-Z]+$/.test(s), () => ({ valid: false, message: "Letters only" })],
 *   [() => true, () => ({ valid: true, message: "Valid" })]
 * ])
 *
 * // Pricing tiers
 * const calculatePrice = cond<number, number>([
 *   [qty => qty >= 100, qty => qty * 0.70],
 *   [qty => qty >= 50, qty => qty * 0.80],
 *   [qty => qty >= 20, qty => qty * 0.90],
 *   [qty => qty >= 10, qty => qty * 0.95],
 *   [() => true, qty => qty * 1.00]
 * ])
 *
 * // No default case - returns undefined
 * const partial = cond<number, string>([
 *   [n => n > 0, () => "positive"],
 *   [n => n < 0, () => "negative"]
 *   // No case for zero
 * ])
 *
 * partial(5)                           // "positive"
 * partial(-5)                          // "negative"
 * partial(0)                           // undefined
 * ```
 * @pure
 * @curried
 */
const cond = <T, R>(
	pairs: Array<[(value: T) => unknown, (value: T) => R]>,
) =>
(
	value: T,
): R | undefined => {
	const match = pairs.find(([predicate]) => predicate(value))
	return match ? match[1](value) : undefined
}

export default cond
