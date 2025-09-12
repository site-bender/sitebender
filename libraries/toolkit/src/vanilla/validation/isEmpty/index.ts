//++ Checks if a value is empty based on its type (null, undefined, empty string/array/object/Map/Set)
export default function isEmpty(value: unknown): boolean {
	// Nullish values are empty
	if (value === null || value === undefined) {
		return true
	}

	// Strings and arrays check length
	if (typeof value === "string" || Array.isArray(value)) {
		return value.length === 0
	}

	// Array-like objects check length
	if (
		typeof value === "object" && "length" in value &&
		typeof value.length === "number"
	) {
		return value.length === 0
	}

	// Maps and Sets check size
	if (value instanceof Map || value instanceof Set) {
		return value.size === 0
	}

	// WeakMaps and WeakSets can't be determined as empty
	if (value instanceof WeakMap || value instanceof WeakSet) {
		return false
	}

	// Plain objects check for own enumerable properties
	if (typeof value === "object" && value.constructor === Object) {
		return Object.keys(value).length === 0
	}

	// All other values (numbers, booleans, functions, etc.) are not empty
	return false
}

//?? [EXAMPLE] isEmpty(null) // true
//?? [EXAMPLE] isEmpty(undefined) // true
//?? [EXAMPLE] isEmpty("") // true
//?? [EXAMPLE] isEmpty([]) // true
//?? [EXAMPLE] isEmpty({}) // true
//?? [EXAMPLE] isEmpty("   ") // false (whitespace is not empty)
//?? [EXAMPLE] isEmpty(0) // false (numbers never empty)
//?? [EXAMPLE] isEmpty(false) // false (booleans never empty)
/*??
 | [EXAMPLE]
 | const data = ["hello", "", null, [], "world", {}]
 | data.filter(item => !isEmpty(item))  // ["hello", "world"]
 |
 | [GOTCHA] Whitespace strings are NOT considered empty
 | [PRO] Handles all common JavaScript types appropriately
 |
*/
