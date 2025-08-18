/**
 * Transforms arguments before passing to a function
 * Accepts an array of transformer functions and applies them to corresponding arguments
 *
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
 *
 * // Useful for adapting incompatible interfaces
 * const average = (nums: Array<number>) =>
 *   nums.reduce((a, b) => a + b, 0) / nums.length
 *
 * const averageStrings = useWith(
 *   average,
 *   [(strs: Array<string>) => strs.map(Number)]
 * )
 * averageStrings(["1", "2", "3", "4"]) // 2.5
 * ```
 *
 * Note: The number of transformers should match the number of arguments
 * expected by the function. Extra transformers are ignored, missing ones
 * pass arguments through unchanged.
 */
// deno-lint-ignore no-explicit-any
const useWith = <R>(
	fn: (...args: ReadonlyArray<any>) => R,
	transformers: ReadonlyArray<(arg: any) => any>,
) =>
// deno-lint-ignore no-explicit-any
(...args: ReadonlyArray<any>): R => {
	const transformedArgs = args.map((arg, index) =>
		transformers[index] ? transformers[index](arg) : arg
	)
	return fn(...transformedArgs)
}

export default useWith
