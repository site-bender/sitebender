import allPass from "../allPass/index.ts"
import either from "../either/index.ts"
import isFunction from "../isFunction/index.ts"
import isNull from "../isNull/index.ts"
import isObject from "../isObject/index.ts"
import isUndefined from "../isUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isPromise = (value: unknown): value is Promise<unknown> => {
	// Check for null/undefined first
	if (either(isNull)(isUndefined)(value)) {
		return false
	}

	// Check for native Promise (most common case)
	if (value instanceof Promise) {
		return true
	}

	// Duck-type check for thenable objects
	return allPass([
		isObject,
		(obj: unknown) => isFunction((obj as { then?: unknown }).then),
	])(value)
}

export default isPromise
