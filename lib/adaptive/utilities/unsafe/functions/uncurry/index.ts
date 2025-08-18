/**
 * Converts a curried function to a function on tuples
 * The opposite of curry - takes a curried function and allows calling with all arguments at once
 *
 * @param fn - Curried function to uncurry
 * @returns Function that takes all arguments at once
 * @example
 * ```typescript
 * // Start with a curried function
 * const curriedAdd = (a: number) => (b: number) => (c: number) => a + b + c
 * curriedAdd(1)(2)(3) // 6
 *
 * // Uncurry it to take all arguments at once
 * const add = uncurry(curriedAdd)
 * add(1, 2, 3) // 6
 *
 * // Useful for converting curried utilities
 * const curriedGreet = (greeting: string) => (name: string) =>
 *   `${greeting}, ${name}!`
 * const greet = uncurry(curriedGreet)
 * greet("Hello", "Alice") // "Hello, Alice!"
 *
 * // Works with partially applied functions
 * const multiply = uncurry((a: number) => (b: number) => a * b)
 * multiply(5, 3) // 15
 *
 * // Can uncurry deeply nested functions
 * const deep = (a: string) => (b: string) => (c: string) => (d: string) =>
 *   `${a}-${b}-${c}-${d}`
 * const flat = uncurry(deep)
 * flat("one", "two", "three", "four") // "one-two-three-four"
 * ```
 *
 * Note: The type system cannot fully infer the uncurried signature,
 * so 'any' is used for the arguments. In practice, you know the arity
 * based on the curried function's structure.
 */
// deno-lint-ignore no-explicit-any
const uncurry = (fn: any) =>
// deno-lint-ignore no-explicit-any
(...args: any[]): any => {
	let result = fn
	for (const arg of args) {
		if (typeof result === "function") {
			result = result(arg)
		} else {
			break
		}
	}
	return result
}

export default uncurry
