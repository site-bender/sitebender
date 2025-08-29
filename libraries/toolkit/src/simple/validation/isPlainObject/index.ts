/**
 * Checks if a value is a plain object
 *
 * Determines whether a value is a plain object created by the Object constructor
 * or with object literal syntax {}. Returns false for arrays, functions, dates,
 * regex, class instances, and other specialized objects. A plain object has either
 * Object.prototype or null as its prototype. This is useful for configuration
 * objects, JSON-like data, and API payloads.
 *
 * Plain object criteria:
 * - Created with {} or new Object()
 * - Has Object.prototype or null as prototype
 * - Not an array, function, or built-in object type
 * - Not a class instance (except Object)
 * - Includes objects from Object.create(null)
 *
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 * @example
 * ```typescript
 * // Plain objects
 * isPlainObject({})                    // true
 * isPlainObject({ a: 1, b: 2 })        // true
 * isPlainObject(new Object())          // true
 * isPlainObject(Object.create(null))   // true (null prototype)
 *
 * // Not plain: primitives and null
 * isPlainObject(null)                  // false
 * isPlainObject(42)                    // false
 * isPlainObject("string")              // false
 *
 * // Not plain: arrays and functions
 * isPlainObject([])                    // false
 * isPlainObject(() => {})              // false
 *
 * // Not plain: built-in objects
 * isPlainObject(new Date())            // false
 * isPlainObject(new Map())             // false
 * isPlainObject(/regex/)               // false
 *
 * // Not plain: class instances
 * class Person {
 *   constructor(public name: string) {}
 * }
 * isPlainObject(new Person("Alice"))   // false
 *
 * // Deep merge safety
 * const deepMerge = (target: any, source: any): any => {
 *   if (!isPlainObject(target) || !isPlainObject(source)) {
 *     return source
 *   }
 *   return Object.keys(source).reduce((result, key) => ({
 *     ...result,
 *     [key]: isPlainObject(source[key]) && isPlainObject(target[key])
 *       ? deepMerge(target[key], source[key])
 *       : source[key]
 *   }), { ...target })
 * }
 *
 * // Configuration validation
 * const validateConfig = (value: unknown): boolean =>
 *   isPlainObject(value)
 * 
 * validateConfig({ port: 3000 })       // true
 * validateConfig(new URL("http://"))   // false
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isPlainObject = (value: unknown): boolean => {
	// Check if it's an object type and not null
	if (typeof value !== "object" || value === null) {
		return false
	}

	// Get the prototype
	const proto = Object.getPrototypeOf(value)

	// Plain objects have either Object.prototype or null as prototype
	return proto === null || proto === Object.prototype
}

export default isPlainObject
