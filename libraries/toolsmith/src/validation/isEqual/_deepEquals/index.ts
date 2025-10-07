import type { Value } from "../../../types/index.ts"

import all from "@sitebender/toolsmith/vanilla/array/all/index.ts"
import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import and from "@sitebender/toolsmith/vanilla/logic/and/index.ts"
import not from "@sitebender/toolsmith/vanilla/logic/not/index.ts"
import or from "@sitebender/toolsmith/vanilla/logic/or/index.ts"
import keys from "@sitebender/toolsmith/vanilla/object/keys/index.ts"
import allPass from "@sitebender/toolsmith/vanilla/validation/allPass/index.ts"
import anyPass from "@sitebender/toolsmith/vanilla/validation/anyPass/index.ts"
import is from "@sitebender/toolsmith/vanilla/validation/is/index.ts"
import isArray from "@sitebender/toolsmith/vanilla/validation/isArray/index.ts"
import isDate from "@sitebender/toolsmith/vanilla/validation/isDate/index.ts"
import isNaN from "@sitebender/toolsmith/vanilla/validation/isNaN/index.ts"
import isNull from "../../isNull/index.ts"
import isNumber from "../../isNumber/index.ts"
import isObject from "@sitebender/toolsmith/vanilla/validation/isObject/index.ts"
import isRegExp from "@sitebender/toolsmith/vanilla/validation/isRegExp/index.ts"
import isUndefined from "@sitebender/toolsmith/vanilla/validation/isUndefined/index.ts"
import isUnequal from "@sitebender/toolsmith/vanilla/validation/isUnequal/index.ts"

//++ Private helper function for deep equality comparison
export default function _deepEquals(
	x: unknown,
	y: unknown,
	seen: WeakMap<object, unknown>,
): boolean {
	// Handle primitive equality and same reference
	if (is(x)(y)) {
		return true
	}

	// Check for +0 vs -0 case
	// Don't use isZero here to avoid circular dependency - check directly
	if (isNumber(x) && x === 0 && isNumber(y) && y === 0) {
		return is(x)(y) // This will distinguish +0 from -0
	}

	// Handle NaN equality
	if (and(allPass([isNumber, isNaN])(x))(allPass([isNumber, isNaN])(y))) {
		return true
	}

	// Handle null/undefined
	const isNullOrUndefined = anyPass([isNull, isUndefined])
	if (or(isNullOrUndefined(x))(isNullOrUndefined(y))) {
		return false
	}

	// Must be objects from here
	if (or(not(isObject(x)))(not(isObject(y)))) {
		return false
	}

	// Check for circular reference
	if (and(isObject(x))(seen.has(x as object))) {
		return is(seen.get(x as object))(y)
	}
	if (isObject(x)) {
		seen.set(x as object, y as unknown)
	}

	// Handle Dates
	if (and(isDate(x))(isDate(y))) {
		return is((x as Date).getTime())((y as Date).getTime())
	}

	// Handle RegExp
	if (and(isRegExp(x))(isRegExp(y))) {
		return and(is((x as RegExp).source)((y as RegExp).source))(
			is((x as RegExp).flags)((y as RegExp).flags),
		)
	}

	// Handle Arrays
	if (and(isArray(x))(isArray(y))) {
		if (isUnequal(length(x as Array<Value>))(length(y as Array<Value>))) {
			return false
		}
		return all((val: Value, i: number) =>
			_deepEquals(val, (y as Array<Value>)[i], seen)
		)(x as Array<Value>)
	}

	// Only compare plain objects (not arrays)
	if (or(isArray(x))(isArray(y))) {
		return false
	}

	// Handle regular objects
	const xObj = x as Record<string, unknown>
	const yObj = y as Record<string, unknown>
	const keysX = keys(xObj)
	const keysY = keys(yObj)

	if (isUnequal(length(keysX))(length(keysY))) {
		return false
	}

	// Check if all keys exist and values are equal
	return all((key: string) =>
		and(includes(key)(keysY))(_deepEquals(xObj[key], yObj[key], seen))
	)(keysX)
}
