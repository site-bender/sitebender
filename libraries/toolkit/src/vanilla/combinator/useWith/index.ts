/**
 * Transforms arguments before passing to a function
 * Accepts an array of transformer functions and applies them to corresponding arguments
 *
 * @pure Creates a new function without side effects
 * @curried Function is curried with transformers
 * @param fn - Function to call with transformed arguments
 * @param transformers - Array of functions to transform arguments
 * @returns Function that transforms arguments before calling fn
 * @example
 * ```typescript
 * const parseInts = useWith(
 *   (a: number, b: number) => a + b,
 *   [parseInt, parseInt]
 * )
 * parseInts("10", "20") // 30
 *
 * // Different transformers for each argument
 * const processData = useWith(
 *   (name: string, age: number, active: boolean) =>
 *     `${name} is ${age} and ${active ? "active" : "inactive"}`,
 *   [
 *     (s: string) => s.toUpperCase(),
 *     (s: string) => parseInt(s),
 *     (s: string) => s === "yes"
 *   ]
 * )
 * processData("alice", "25", "yes") // "ALICE is 25 and active"
 * ```
 *
 * Note: The number of transformers should match the number of arguments
 * expected by the function. Extra transformers are ignored, missing ones
 * pass arguments through unchanged.
 */
const useWith = <R>(
	fn: (...args: ReadonlyArray<unknown>) => R,
	transformers: ReadonlyArray<(arg: unknown) => unknown>,
) =>
(...args: ReadonlyArray<unknown>): R => {
	const transformedArgs = args.map((arg, index) =>
		transformers[index] ? transformers[index](arg) : arg
	)
	return fn(...transformedArgs)
}

export default useWith
