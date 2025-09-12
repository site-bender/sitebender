/**
 * Wraps a constructor function for use without 'new'
 * Converts a class constructor into a regular function
 *
 * @param Constructor - Constructor function to wrap
 * @returns Function that creates instances without 'new'
 * @pure
 * @example
 * ```typescript
 * // Work with built-in constructors
 * const createDate = construct(Date)
 * const date1 = createDate("2024-01-01") // Same as new Date("2024-01-01")
 * const date2 = createDate(2024, 0, 1) // Same as new Date(2024, 0, 1)
 *
 * // Work with custom classes
 * class Person {
 *   constructor(public name: string, public age: number) {}
 *   greet() {
 *     return `Hello, I'm ${this.name}`
 *   }
 * }
 *
 * const createPerson = construct(Person)
 * const alice = createPerson("Alice", 30)
 * alice.greet() // "Hello, I'm Alice"
 * alice instanceof Person // true
 *
 * // Useful with higher-order functions
 * const names = ["Alice", "Bob", "Charlie"]
 * const people = names.map((name, i) => createPerson(name, 20 + i))
 *
 * // Compose with other functions
 * const createError = construct(Error)
 * const errors = [
 *   "Not found",
 *   "Invalid input",
 *   "Timeout"
 * ].map(createError)
 * ```
 *
 * Note: The constructed instances are identical to using 'new'.
 * This is primarily useful for functional composition and mapping.
 */
const construct = <T extends ReadonlyArray<unknown>, R>(
	Constructor: new (...args: T) => R,
) =>
(...args: T): R => new Constructor(...args)

export default construct
