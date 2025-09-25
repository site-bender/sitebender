import isFunction from "../isFunction/index.ts"
import isSymbol from "../isSymbol/index.ts"
import isUndefined from "../isUndefined/index.ts"

//++ Type guard that checks if a value can be serialized to JSON
export default function isSerializable(value: unknown): boolean {
	// Values that cannot be serialized
	if (isUndefined(value) || isSymbol(value) || isFunction(value)) {
		return false
	}

	return true
}

//?? [EXAMPLE] isSerializable("hello") // true
//?? [EXAMPLE] isSerializable(42) // true
//?? [EXAMPLE] isSerializable(null) // true
//?? [EXAMPLE] isSerializable({ a: 1 }) // true
//?? [EXAMPLE] isSerializable([1, 2, 3]) // true
//?? [EXAMPLE] isSerializable(undefined) // false
//?? [EXAMPLE] isSerializable(Symbol("test")) // false
//?? [EXAMPLE] isSerializable(() => {}) // false
/*??
 | [EXAMPLE]
 | const processForJson = (value: unknown) => {
 |   if (isSerializable(value)) {
 |     return JSON.stringify(value)
 |   }
 |   return null
 | }
 |
 | processForJson({ a: 1 }) // '{"a":1}'
 | processForJson(undefined) // null
 | processForJson(() => {}) // null
 */
