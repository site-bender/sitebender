import type { Pair, Triple } from "../../../types/tuple/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function uncurry<A, B, R>(
	fn: (a: A) => (b: B) => R,
): (tuple: Pair<A, B>) => R

function uncurry<A, B, C, R>(
	fn: (a: A) => (b: B) => (c: C) => R,
): (tuple: Triple<A, B, C>) => R

function uncurry(fn: (a: unknown) => unknown) {
	// Try to detect arity by calling with test values
	try {
		const test = fn(undefined)
		if (typeof test === "function") {
			const test2 = (test as (b: unknown) => unknown)(undefined)
			if (typeof test2 === "function") {
				// Ternary function
				return (tuple: Triple<unknown, unknown, unknown>) =>
					((fn(tuple[0]) as (b: unknown) => (c: unknown) => unknown)(
						tuple[1],
					) as (c: unknown) => unknown)(tuple[2])
			} else {
				// Binary function
				return (tuple: Pair<unknown, unknown>) =>
					(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
			}
		}
	} catch {
		// Default to binary if detection fails
		return (tuple: Pair<unknown, unknown>) =>
			(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
	}

	// Default to binary
	return (tuple: Pair<unknown, unknown>) =>
		(fn(tuple[0]) as (b: unknown) => unknown)(tuple[1])
}

export default uncurry
