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
import isWeakMap from "../isWeakMap/index.ts"
import isWeakSet from "../isWeakSet/index.ts"
import either from "../either/index.ts"

//++ Checks if a value is empty based on its type (null, undefined, empty string/array/object/Map/Set)
export default function isEmpty(value: unknown): boolean {
	// Nullish values are empty
	if (isNullish(value)) {
		return true
	}

	// Strings check length
	if (isString(value)) {
		return stringLength(value) === 0
	}

	// Arrays check length
	if (isArray(value)) {
		return arrayLength(value) === 0
	}

	// Maps check size
	if (isMap(value)) {
		return mapSize(value) === 0
	}

	// Sets check size
	if (isSet(value)) {
		return setSize(value) === 0
	}

	if (either(isWeakMap)(isWeakSet)(value)) {
		return false
	}

	// Plain objects check for own enumerable properties
	if (isPlainObject(value)) {
		return arrayLength(keys(value)) === 0
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
//?? [GOTCHA] Whitespace strings are NOT considered empty
//?? [GOTCHA] WeakMaps and WeakSets always return false since we can't check their contents
//?? [PRO] Handles all common JavaScript types appropriately
