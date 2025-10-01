import type { Pair, Triple } from "../../../types/tuple/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function curry<A, B, R>(
	fn: (tuple: Pair<A, B>) => R,
): (a: A) => (b: B) => R

function curry<A, B, C, R>(
	fn: (tuple: Triple<A, B, C>) => R,
): (a: A) => (b: B) => (c: C) => R

function curry(fn: unknown) {
	const f = fn as (tuple: ReadonlyArray<unknown>) => unknown
	const arity = (f as unknown as { length: number }).length === 1 ? 2 : 3

	if (arity === 2) {
		return (a: unknown) => (b: unknown) => f([a, b])
	} else {
		return (a: unknown) => (b: unknown) => (c: unknown) => f([a, b, c])
	}
}

export default curry
