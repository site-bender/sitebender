/**
 * Creates a function bound to a specific context (this)
 * Functional wrapper around Function.prototype.bind for method binding
 *
 * @param fn - Function or method to bind
 * @param context - The value to use as 'this'
 * @returns Bound function
 * @pure
 * @curried
 * @example
 * ```typescript
 * // Bind object methods for standalone use
 * const person = {
 *   name: "Alice",
 *   greet(greeting: string) {
 *     return `${greeting}, I'm ${this.name}`
 *   }
 * }
 *
 * const greetAlice = bind(person.greet, person)
 * greetAlice("Hello") // "Hello, I'm Alice"
 *
 * // Pass bound methods to higher-order functions
 * const logger = {
 *   prefix: "[LOG]",
 *   log(message: string) {
 *     console.log(`${this.prefix} ${message}`)
 *   }
 * }
 *
 * const messages = ["Error", "Warning", "Info"]
 * messages.forEach(bind(logger.log, logger))
 * // Logs: "[LOG] Error", "[LOG] Warning", "[LOG] Info"
 *
 * // Bind built-in methods
 * const slice = bind(Array.prototype.slice, [1, 2, 3, 4, 5])
 * slice(1, 3) // [2, 3]
 * ```
 *
 * Note: In functional programming, prefer pure functions over methods.
 * This utility is mainly for interop with object-oriented APIs.
 */
const bind = <T, Args extends ReadonlyArray<unknown>, R>(
	fn: (this: T, ...args: Args) => R,
	context: T,
) =>
(...args: Args): R =>
	(fn as unknown as (...args: unknown[]) => R).apply(
		context as unknown,
		[...args] as unknown[],
	)

export default bind
