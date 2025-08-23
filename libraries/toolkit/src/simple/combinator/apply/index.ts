/**
 * Calls a function with an array of arguments
 * Spreads array elements as individual arguments to the function
 *
 * @param fn - Function to call
 * @param args - Array of arguments to pass
 * @returns Result of calling fn with spread arguments
 * @example
 * ```typescript
 * const add3 = (a: number, b: number, c: number) => a + b + c
 * apply(add3, [1, 2, 3]) // 6
 *
 * // Equivalent to:
 * add3(...[1, 2, 3]) // 6
 *
 * // Useful with Math functions
 * apply(Math.max, [1, 5, 3, 9, 2]) // 9
 * apply(Math.min, [1, 5, 3, 9, 2]) // 1
 *
 * // Convert between function signatures
 * const greet = (first: string, last: string, title: string) =>
 *   `${title} ${first} ${last}`
 *
 * const greetFromArray = (parts: [string, string, string]) =>
 *   apply(greet, parts)
 *
 * greetFromArray(["Jane", "Doe", "Dr."]) // "Dr. Jane Doe"
 *
 * // Dynamic function calls
 * const operations = {
 *   add: (a: number, b: number) => a + b,
 *   multiply: (a: number, b: number) => a * b,
 *   subtract: (a: number, b: number) => a - b
 * }
 *
 * const calculate = (op: keyof typeof operations, args: [number, number]) =>
 *   apply(operations[op], args)
 *
 * calculate("add", [5, 3]) // 8
 * calculate("multiply", [5, 3]) // 15
 * ```
 *
 * Note: This is particularly useful when you have arguments in array form
 * but need to pass them to a function expecting separate parameters.
 */
const apply = <T extends ReadonlyArray<unknown>, R>(
	fn: (...args: T) => R,
	args: T,
): R => fn(...args)

export default apply
