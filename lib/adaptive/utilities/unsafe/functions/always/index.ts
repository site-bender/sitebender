/**
 * Returns a function that always returns the given value
 * Useful for creating constant functions regardless of input
 *
 * @param value - The value to always return
 * @returns Function that ignores its arguments and returns value
 * @example
 * ```typescript
 * const alwaysTrue = always(true)
 * alwaysTrue() // true
 * alwaysTrue(false) // true
 * alwaysTrue(1, 2, 3) // true
 *
 * // Useful as a default function
 * const handlers = {
 *   success: (data: unknown) => console.log("Success:", data),
 *   error: (err: Error) => console.error("Error:", err),
 *   default: always(null)
 * }
 *
 * // Use in array methods
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.map(always(0)) // [0, 0, 0, 0, 0]
 * numbers.filter(always(true)) // [1, 2, 3, 4, 5]
 * numbers.filter(always(false)) // []
 *
 * // Useful with conditional logic
 * const processValue = (shouldProcess: boolean) =>
 *   shouldProcess ? (x: number) => x * 2 : always(0)
 *
 * const processor1 = processValue(true)
 * const processor2 = processValue(false)
 * processor1(5) // 10
 * processor2(5) // 0
 *
 * // Create mock functions for testing
 * const mockApi = {
 *   getUser: always({ id: 1, name: "Test User" }),
 *   getConfig: always({ theme: "dark" })
 * }
 * ```
 *
 * Note: The returned function accepts any arguments but ignores them all.
 * This is the K combinator in combinatory logic.
 */
const always = <T>(value: T) => (..._args: ReadonlyArray<unknown>): T => value

export default always
