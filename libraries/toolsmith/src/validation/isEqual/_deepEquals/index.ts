import type { Value } from "../../../types/index.ts"

import all from "@sitebender/toolsmith/array/all/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import keys from "@sitebender/toolsmith/object/keys/index.ts"
import allPass from "@sitebender/toolsmith/validation/allPass/index.ts"
import anyPass from "@sitebender/toolsmith/validation/anyPass/index.ts"
import is from "@sitebender/toolsmith/validation/is/index.ts"
import isArray from "@sitebender/toolsmith/validation/isArray/index.ts"
import isDate from "@sitebender/toolsmith/validation/isDate/index.ts"
import isNaN from "@sitebender/toolsmith/validation/isNaN/index.ts"
import isNull from "../../isNull/index.ts"
import isNumber from "../../isNumber/index.ts"
import isObject from "@sitebender/toolsmith/validation/isObject/index.ts"
import isRegExp from "@sitebender/toolsmith/validation/isRegExp/index.ts"
import isUndefined from "@sitebender/toolsmith/validation/isUndefined/index.ts"
import isUnequal from "@sitebender/toolsmith/validation/isUnequal/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

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
		const sourceMatch = is((x as RegExp).source)((y as RegExp).source)
		const flagsMatch = is((x as RegExp).flags)((y as RegExp).flags)
		return Boolean(and(sourceMatch)(flagsMatch))
	}

	// Handle Arrays
	if (and(isArray(x))(isArray(y))) {
		const xLength = length(x as Array<Value>)
		const yLength = length(y as Array<Value>)

		// Both lengths must be Ok for comparison
		if (not(and(isOk(xLength))(isOk(yLength)))) {
			return false
		}

		// TypeScript now knows both are Ok
		if (isOk(xLength) && isOk(yLength)) {
			if (isUnequal(xLength.value)(yLength.value)) {
				return false
			}
		}

		const allResult = all((val: Value, i: number): boolean =>
			_deepEquals(val, (y as Array<Value>)[i], seen)
		)(x as Array<Value>)

		// Return false if all() returned an error, otherwise return the boolean value
		return isOk(allResult) ? allResult.value : false
	}

	// Only compare plain objects (not arrays)
	if (or(isArray(x))(isArray(y))) {
		return false
	}

	// Handle regular objects
	const xObj = x as Record<string, unknown>
	const yObj = y as Record<string, unknown>
	const keysXResult = keys(xObj)
	const keysYResult = keys(yObj)

	// Both keys() must succeed
	if (isError(keysXResult) || isError(keysYResult)) {
		return false
	}

	const keysX = keysXResult.value
	const keysY = keysYResult.value

	const xKeysLength = length(keysX)
	const yKeysLength = length(keysY)

	// Both lengths must be Ok
	if (not(and(isOk(xKeysLength))(isOk(yKeysLength)))) {
		return false
	}

	// TypeScript now knows both are Ok
	if (isOk(xKeysLength) && isOk(yKeysLength)) {
		if (isUnequal(xKeysLength.value)(yKeysLength.value)) {
			return false
		}
	}

	// Check if all keys exist and values are equal
	const allResult = all((key: string): boolean => {
		const includesResult = includes(key)(keysY)
		const keyIncluded = isOk(includesResult) ? includesResult.value : false
		return keyIncluded && _deepEquals(xObj[key], yObj[key], seen)
	})(keysX)

	// Return false if all() returned an error, otherwise return the boolean value
	return isOk(allResult) ? allResult.value : false
}
