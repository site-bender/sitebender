/**
 * Calls a function with individual arguments
 * Functional wrapper for immediate function invocation
 *
 * @param fn - Function to call
 * @param args - Arguments to pass
 * @returns Result of function call
 * @example
 * ```typescript
 * // Simple function call
 * const add = (a: number, b: number) => a + b
 * call(add, 5, 3) // 8
 *
 * // Useful for invoking functions dynamically
 * const operations = {
 *   add: (a: number, b: number) => a + b,
 *   multiply: (a: number, b: number) => a * b,
 *   subtract: (a: number, b: number) => a - b
 * }
 *
 * const operate = (op: keyof typeof operations, x: number, y: number) =>
 *   call(operations[op], x, y)
 *
 * operate("add", 10, 5) // 15
 * operate("multiply", 10, 5) // 50
 *
 * // Call methods with proper context
 * const person = {
 *   name: "Bob",
 *   greet(greeting: string) {
 *     return `${greeting}, I'm ${this.name}`
 *   }
 * }
 *
 * // Use bind with call for methods
 * call(bind(person.greet, person), "Hi") // "Hi, I'm Bob"
 *
 * // Invoke functions from arrays
 * const funcs = [
 *   () => "first",
 *   () => "second",
 *   () => "third"
 * ]
 *
 * funcs.map(f => call(f)) // ["first", "second", "third"]
 *
 * // Conditional function execution
 * const maybeCall = <T>(cond: boolean, fn: () => T, defaultVal: T): T =>
 *   cond ? call(fn) : defaultVal
 *
 * maybeCall(true, () => "yes", "no") // "yes"
 * maybeCall(false, () => "yes", "no") // "no"
 * ```
 *
 * Note: This is primarily useful when you need to invoke a function
 * that's been selected dynamically or passed as a parameter.
 */
const call = <T extends ReadonlyArray<unknown>, R>(
	fn: (...args: T) => R,
	...args: T
): R => fn(...args)

export default call
