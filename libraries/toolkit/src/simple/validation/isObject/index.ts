/**
 * Type guard that checks if a value is a non-null object
 *
 * Determines whether a value is an object type but not null. In JavaScript,
 * typeof null === "object" is a well-known quirk, so this function correctly
 * excludes null. Returns true for plain objects, arrays, functions, dates,
 * regex, and all other object types. For plain object checking specifically,
 * consider using isPlainObject instead.
 *
 * Object detection:
 * - Plain objects: {} and Object.create()
 * - Arrays: [] and new Array()
 * - Functions: functions are objects in JavaScript
 * - Class instances: new MyClass()
 * - Built-in objects: Date, RegExp, Map, Set, etc.
 * - Excludes: null (despite typeof null === "object")
 * - Excludes: primitives (string, number, boolean, undefined, symbol, bigint)
 *
 * @param value - The value to check
 * @returns True if the value is a non-null object, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isObject({})                         // true
 * isObject({ a: 1 })                   // true
 * isObject([])                         // true
 * isObject(() => {})                   // true
 * isObject(new Date())                 // true
 * isObject(null)                       // false (key distinction)
 * isObject(42)                         // false
 * isObject("string")                   // false
 *
 * // Type narrowing
 * const processValue = (value: unknown) => {
 *   return isObject(value) ? Object.keys(value).length : 0
 * }
 * processValue({ a: 1, b: 2 })        // 2
 * processValue(null)                  // 0
 *
 * // Filtering mixed arrays
 * const mixed = [42, "str", null, { id: 1 }, [1, 2]]
 * const objects = mixed.filter(isObject)  // [{ id: 1 }, [1, 2]]
 *
 * // Safe property access
 * const getProperty = (value: unknown, key: string): unknown =>
 *   isObject(value) ? (value as any)[key] : undefined
 *
 * getProperty({ name: "Alice" }, "name")  // "Alice"
 * getProperty(null, "name")               // undefined
 * ```
 * @pure
 * @predicate
 */
const isObject = (value: unknown): value is object =>
	value !== null && (typeof value === "object" || typeof value === "function")

export default isObject
