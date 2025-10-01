import allPass from "../allPass/index.ts"
import either from "../either/index.ts"
import gte from "../gte/index.ts"
import isFunction from "../isFunction/index.ts"
import isInteger from "../isInteger/index.ts"
import isNaN from "../isNaN/index.ts"
import isNull from "../isNull/index.ts"
import isNumber from "../isNumber/index.ts"
import isObject from "../isObject/index.ts"
import isString from "../isString/index.ts"
import isUndefined from "../isUndefined/index.ts"
import lte from "../lte/index.ts"
import nonePass from "../nonePass/index.ts"

//++ Checks if a value is array-like (has length property and numeric indices)
export default function isArrayLike(
	value: unknown,
): value is ArrayLike<unknown> {
	// Check for null/undefined first
	if (either(isNull)(isUndefined)(value)) {
		return false
	}

	// Check if it's an object or string (primitives except string aren't array-like)
	if (nonePass([isObject, isString, isFunction])(value)) {
		return false
	}

	// Get the length property
	const len = (value as ArrayLike<unknown>).length

	// Validate length is a number first
	if (!isNumber(len)) {
		return false
	}

	// Now we know it's a number, validate it's a non-negative safe integer
	const numLen = len as number
	return allPass([
		gte(0),
		lte(Number.MAX_SAFE_INTEGER),
		isInteger,
		nonePass([isNaN]),
	])(numLen)
}
