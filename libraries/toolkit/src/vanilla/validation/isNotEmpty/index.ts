import arrayLength from "../../array/length/index.ts"
import keys from "../../object/keys/index.ts"
import mapSize from "../../map/size/index.ts"
import setSize from "../../set/size/index.ts"
import stringLength from "../../string/length/index.ts"
import isArray from "../isArray/index.ts"
import isMap from "../isMap/index.ts"
import isNullish from "../isNullish/index.ts"
import isPlainObject from "../isPlainObject/index.ts"
import isSet from "../isSet/index.ts"
import isString from "../isString/index.ts"

//++ Checks if a value is not empty based on its type
export default function isNotEmpty(value: unknown): boolean {
	if (isNullish(value)) {
		return false
	}

	if (isString(value)) {
		return stringLength(value) > 0
	}

	if (isArray(value)) {
		return arrayLength(value) > 0
	}

	if (isMap(value)) {
		return mapSize(value) > 0
	}

	if (isSet(value)) {
		return setSize(value) > 0
	}

	if (isPlainObject(value)) {
		return arrayLength(keys(value)) > 0
	}

	// All other values (numbers, booleans, functions, etc.) are considered not empty
	return true
}

//?? [EXAMPLE] isNotEmpty(null) // false
//?? [EXAMPLE] isNotEmpty(undefined) // false
//?? [EXAMPLE] isNotEmpty("") // false
//?? [EXAMPLE] isNotEmpty([]) // false
//?? [EXAMPLE] isNotEmpty({}) // false
//?? [EXAMPLE] isNotEmpty(new Map()) // false
//?? [EXAMPLE] isNotEmpty(new Set()) // false
//?? [EXAMPLE] isNotEmpty("hello") // true
//?? [EXAMPLE] isNotEmpty([1, 2, 3]) // true
//?? [EXAMPLE] isNotEmpty({ a: 1 }) // true
//?? [EXAMPLE] isNotEmpty(new Map([["key", "value"]])) // true
//?? [EXAMPLE] isNotEmpty(new Set([1, 2, 3])) // true
//?? [EXAMPLE] isNotEmpty(123) // true (numbers are not empty)
//?? [EXAMPLE] isNotEmpty(true) // true (booleans are not empty)
