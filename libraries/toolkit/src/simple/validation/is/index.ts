/**
 * Creates a predicate that checks if a value is an instance of a constructor
 *
 * Uses the instanceof operator to check if an object's prototype chain contains
 * the prototype property of a constructor. This is a curried function for creating
 * reusable type checks. Works with built-in types, classes, and constructor functions.
 * Note that instanceof checks fail across different JavaScript realms (e.g., iframes).
 *
 * Type checking behavior:
 * - Classes: checks if object is instance of class
 * - Built-ins: works with Date, RegExp, Error, etc.
 * - Arrays: Array.isArray is more reliable than instanceof Array
 * - Primitives: always false (primitives are not instances)
 * - null/undefined: always false
 * - Cross-realm: fails for objects from different contexts
 *
 * @pure
 * @curried
 * @predicate
 * @param constructor - The constructor function to check against
 * @param value - The value to check
 * @returns True if value instanceof constructor, false otherwise
 * @example
 * ```typescript
 * // Built-in type checks
 * const isDate = is(Date)
 * isDate(new Date())           // true
 * isDate(Date.now())           // false (returns number)
 *
 * const isError = is(Error)
 * isError(new Error("oops"))   // true
 * isError(new TypeError())     // true (TypeError extends Error)
 *
 * // Custom class checking
 * class User {
 *   constructor(public name: string) {}
 * }
 * const isUser = is(User)
 * isUser(new User("Alice"))    // true
 * isUser({ name: "Charlie" })  // false (plain object)
 *
 * // Filtering by type
 * const mixed = [new Date(), "string", 42, new Error("oops")]
 * mixed.filter(is(Error))      // [Error: oops]
 *
 * // Primitives vs objects
 * is(String)("hello")          // false (primitive)
 * is(String)(new String("hi")) // true (object)
 * ```
 */
const is =
	<T>(constructor: new (...args: Array<any>) => T) =>
	(value: unknown): value is T => value instanceof constructor

export default is
