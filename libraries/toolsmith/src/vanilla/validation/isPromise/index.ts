import allPass from "../allPass/index.ts"
import either from "../either/index.ts"
import isFunction from "../isFunction/index.ts"
import isNull from "../isNull/index.ts"
import isObject from "../isObject/index.ts"
import isUndefined from "../isUndefined/index.ts"

/**
 * Type guard that checks if a value is a Promise
 *
 * Determines whether a value is a Promise instance or a thenable object
 * (an object with a then method). This includes native Promises, promise-like
 * objects from libraries, and async function return values. The check uses
 * both instanceof and duck-typing to catch Promise-like objects from different
 * contexts or libraries.
 *
 * Promise detection:
 * - Native Promise instances
 * - Async function return values
 * - Promise.resolve() and Promise.reject() results
 * - Thenable objects (objects with a then method)
 * - Promise-like objects from other contexts/libraries
 * - Not included: async functions themselves (before invocation)
 *
 * @param value - The value to check
 * @returns True if the value is a Promise or thenable, false otherwise
 * @example
 * ```typescript
 * // Native Promises
 * isPromise(Promise.resolve(42))       // true
 * isPromise(new Promise(() => {}))     // true
 * isPromise(Promise.all([]))           // true
 *
 * // Async function results
 * async function fetchData() { return "data" }
 * isPromise(fetchData())               // true
 * isPromise(fetchData)                 // false (function itself)
 *
 * // Thenable objects
 * const thenable = { then: (resolve: Function) => resolve(42) }
 * isPromise(thenable)                  // true
 *
 * // Not Promises
 * isPromise(null)                      // false
 * isPromise(42)                        // false
 * isPromise({})                        // false
 * isPromise(() => {})                  // false
 *
 * // Type narrowing
 * async function handleValue(value: unknown): Promise<string> {
 *   if (isPromise(value)) {
 *     return String(await value)
 *   }
 *   return String(value)
 * }
 *
 * // Promise wrapping
 * const ensurePromise = <T>(value: T | Promise<T>): Promise<T> =>
 *   isPromise(value) ? value : Promise.resolve(value)
 * ```
 * @pure
 * @predicate
 */
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
