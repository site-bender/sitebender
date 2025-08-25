/**
 * Conditional function application based on a predicate
 *
 * Applies one of two functions to a value based on whether a predicate
 * returns truthy or falsy. This provides a functional alternative to
 * imperative if/else statements, allowing conditional logic to be
 * composed and chained in pipelines.
 *
 * @param predicate - Function that tests the value
 * @param onTrue - Function to apply if predicate is truthy
 * @param onFalse - Function to apply if predicate is falsy
 * @param value - The value to test and transform
 * @returns Result of onTrue or onFalse function
 * @example
 * ```typescript
 * // Basic conditional transformation
 * const processNumber = ifElse(
 *   (n: number) => n > 0,
 *   (n: number) => n * 2,    // If positive, double it
 *   (n: number) => n * -1     // If not positive, negate it
 * )
 *
 * processNumber(5)                     // 10
 * processNumber(-3)                    // 3
 *
 * // Partial application
 * const ifPositive = ifElse((n: number) => n > 0)
 * const absoluteValue = ifPositive(
 *   (n: number) => n,
 *   (n: number) => -n
 * )
 * absoluteValue(-5)                    // 5
 *
 * // Validation with error paths
 * const validateAge = ifElse(
 *   (age: number) => age >= 0 && age <= 120,
 *   (age: number) => ({ valid: true, value: age }),
 *   (age: number) => ({ valid: false, error: "Invalid age" })
 * )
 *
 * // Chaining conditionals
 * const complexProcess = ifElse(
 *   (x: number) => x !== 0,
 *   ifElse(
 *     (x: number) => x > 0,
 *     (x: number) => Math.sqrt(x),
 *     (x: number) => x * x
 *   ),
 *   () => NaN
 * )
 *
 * // Pipeline integration
 * const pipeline = [
 *   (x: number) => x * 2,
 *   ifElse(
 *     (x: number) => x > 10,
 *     (x: number) => x - 5,
 *     (x: number) => x + 5
 *   )
 * ]
 * ```
 * @pure
 * @curried
 */
const ifElse = <T, R>(
	predicate: (value: T) => unknown,
) =>
(
	onTrue: (value: T) => R,
) =>
(
	onFalse: (value: T) => R,
) =>
(
	value: T,
): R => predicate(value) ? onTrue(value) : onFalse(value)

export default ifElse
