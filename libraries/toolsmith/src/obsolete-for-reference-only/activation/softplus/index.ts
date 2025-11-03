import exponential from "../../math/exponential/index.ts"
import logarithm from "../../math/logarithm/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import isNegativeInfinity from "../../validation/isNegativeInfinity/index.ts"
import isPositiveInfinity from "../../validation/isPositiveInfinity/index.ts"

//++ Smooth approximation of ReLU activation
export default function softplus(
	x: number | null | undefined,
): number {
	// Explicit infinities first
	if (isNegativeInfinity(x)) {
		return 0
	}

	if (isPositiveInfinity(x)) {
		return Infinity
	}

	// Reject all non-finite (includes null/undefined/NaN)
	if (isFinite(x)) {
		// For large positive x, softplus(x) ≈ x
		// This avoids overflow in exp(x)
		if (x > 20) {
			return x
		}

		// For large negative x, softplus(x) ≈ exp(x)
		// This avoids computing log(1 + very small number)
		if (x < -20) {
			return exponential(x)
		}

		// Standard computation for moderate values
		return logarithm(Math.E)(1 + exponential(x))
	}

	return NaN
}
