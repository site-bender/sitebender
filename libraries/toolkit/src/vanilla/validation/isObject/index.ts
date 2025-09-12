//++ Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
export default function isObject(value: unknown): value is object {
	return value !== null &&
		(typeof value === "object" || typeof value === "function")
}

//?? [EXAMPLE] isObject({}) // true
//?? [EXAMPLE] isObject({ a: 1 }) // true
//?? [EXAMPLE] isObject([]) // true
//?? [EXAMPLE] isObject(() => {}) // true
//?? [EXAMPLE] isObject(new Date()) // true
//?? [EXAMPLE] isObject(null) // false (key distinction)
//?? [EXAMPLE] isObject(42) // false
//?? [EXAMPLE] isObject("string") // false
//?? [EXAMPLE] isObject(undefined) // false
/*??
 | [EXAMPLE]
 | const processValue = (value: unknown) => {
 |   return isObject(value) ? Object.keys(value).length : 0
 | }
 | processValue({ a: 1, b: 2 })  // 2
 | processValue(null)            // 0
 |
 | const mixed = [42, "str", null, { id: 1 }, [1, 2]]
 | const objects = mixed.filter(isObject)  // [{ id: 1 }, [1, 2]]
 |
 | const getProperty = (value: unknown, key: string): unknown =>
 |   isObject(value) ? (value as any)[key] : undefined
 |
 | [PRO] Correctly excludes null despite typeof null === "object"
 | [PRO] Includes all object types: arrays, functions, dates, classes, etc.
 | [CON] Very broad definition (use isPlainObject for plain objects only)
 | [GOTCHA] Functions return true (functions are objects in JavaScript)
 |
*/
