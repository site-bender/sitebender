import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const quadratic = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
) =>
(
	c: number | null | undefined,
): Pair<number, number> => {
	if (isNullish(a) || typeof a !== "number") {
		return pair(NaN)(NaN)
	}

	if (isNullish(b) || typeof b !== "number") {
		return pair(NaN)(NaN)
	}

	if (isNullish(c) || typeof c !== "number") {
		return pair(NaN)(NaN)
	}

	// Not a quadratic equation if a = 0
	if (a === 0) {
		return pair(NaN)(NaN)
	}

	const discriminant = b * b - 4 * a * c

	// No real roots if discriminant is negative
	if (discriminant < 0) {
		return pair(NaN)(NaN)
	}

	const sqrtDiscriminant = Math.sqrt(discriminant)
	const denominator = 2 * a

	// Calculate both roots
	const x1 = (-b + sqrtDiscriminant) / denominator
	const x2 = (-b - sqrtDiscriminant) / denominator

	return pair(x2)(x1)
}

export default quadratic
