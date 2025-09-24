import type { Value } from "../../../../types/index.ts"

import keys from "../../../object/keys/index.ts"
import isNumber from "../../isNumber/index.ts"
import isObject from "../../isObject/index.ts"
import isDate from "../../isDate/index.ts"
import isRegExp from "../../isRegExp/index.ts"
import isNull from "../../isNull/index.ts"
import isUndefined from "../../isUndefined/index.ts"
import or from "../../../logic/or/index.ts"
import and from "../../../logic/and/index.ts"
import anyPass from "../../anyPass/index.ts"
import isArray from "../../isArray/index.ts"
import length from "../../../array/length/index.ts"
import isUnequal from "../../isUnequal/index.ts"
import not from "../../../logic/not/index.ts"
import allPass from "../../allPass/index.ts"
import all from "../../../array/all/index.ts"
import includes from "../../../array/includes/index.ts"
import isNaN from "../../isNaN/index.ts"
import isZero from "../../isZero/index.ts"
import is from "../../is/index.ts"

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
	if (and(allPass([isNumber, isZero])(x))(allPass([isNumber, isZero])(y))) {
		return is(x)(y)
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
