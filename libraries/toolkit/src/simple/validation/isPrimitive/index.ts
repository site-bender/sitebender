/**
 * Checks if a value is a JavaScript primitive
 *
 * Determines whether a value is one of the JavaScript primitive types:
 * string, number, boolean, null, undefined, symbol, or bigint. Primitives
 * are immutable values that are not objects and have no methods (though
 * JavaScript auto-boxes them when accessing properties). This is useful for
 * type checking, serialization, and understanding value vs reference semantics.
 *
 * Primitive types:
 * - string: Text values
 * - number: Numeric values (including NaN and Infinity)
 * - boolean: true or false
 * - null: The null value
 * - undefined: The undefined value
 * - symbol: Unique identifiers (ES6+)
 * - bigint: Large integers (ES2020+)
 *
 * @param value - The value to check
 * @returns True if the value is a primitive, false if it's an object
 * @example
 * ```typescript
 * // Primitive types
 * isPrimitive("hello")                 // true
 * isPrimitive(42)                      // true
 * isPrimitive(true)                    // true
 * isPrimitive(null)                    // true
 * isPrimitive(undefined)               // true
 * isPrimitive(Symbol("id"))            // true
 * isPrimitive(123n)                    // true
 *
 * // Non-primitives
 * isPrimitive({})                      // false
 * isPrimitive([])                      // false
 * isPrimitive(new Date())              // false
 * isPrimitive(() => {})                // false
 * isPrimitive(new String("text"))      // false (boxed)
 *
 * // Filtering mixed array
 * const mixed = [42, "str", true, null, {}, []]
 * const primitives = mixed.filter(isPrimitive)  // [42, "str", true, null]
 *
 * // Serialization check
 * const canSerialize = (value: unknown): boolean =>
 *   isPrimitive(value) && 
 *   typeof value !== "symbol" && 
 *   typeof value !== "bigint" &&
 *   typeof value !== "undefined"
 *
 * // Immutability check
 * const isImmutable = (value: unknown): boolean =>
 *   isPrimitive(value) || Object.isFrozen(value)
 * ```
 * @pure
 * @predicate
 */
const isPrimitive = (value: unknown): boolean => {
	return value === null ||
		(typeof value !== "object" && typeof value !== "function")
}

export default isPrimitive
