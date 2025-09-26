import not from "../../logic/not/index.ts"
import exponential from "../../math/exponential/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import isInfinite from "../../validation/isInfinite/index.ts"
import isNegativeInfinity from "../../validation/isNegativeInfinity/index.ts"
import isNumber from "../../validation/isNumber/index.ts"

/*++
 | SoftPlus activation function
 |
 | Computes the smooth approximation of ReLU: f(x) = ln(1 + e^x).
 | This function is differentiable everywhere, unlike ReLU which has
 | a non-differentiable point at x = 0. The output is always positive
 | and approaches x for large positive values and 0 for large negative
 | values. Returns NaN for invalid inputs.
 */
export default function softplus(
	x: number | null | undefined,
): number {
	if (not(isNumber(x))) {
		return NaN
	}

	// Handle special cases for numerical stability
	if (not(isFinite(x))) {
		if (isInfinite(x)) return Infinity
		if (isNegativeInfinity(x)) return 0
		return NaN
	}

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
	return Math.log(1 + Math.exp(x))
}

//?? [EXAMPLE] `softplus(0)       // 0.693... (ln(2))`
//?? [EXAMPLE] `softplus(1)       // 1.313... (ln(1 + e))`
//?? [EXAMPLE] `softplus(-1)      // 0.313... (ln(1 + 1/e))`
//?? [EXAMPLE] `softplus(10)      // 10.000045... (≈ 10)`
//?? [EXAMPLE] `softplus(100)     // 100 (approaches identity)`
//?? [EXAMPLE] `softplus(-10)     // 0.0000454... (≈ 0)`
//?? [EXAMPLE] `softplus(-100)    // 3.72e-44 (approaches 0)`
//?? [EXAMPLE] `softplus(Infinity)  // Infinity`
//?? [EXAMPLE] `softplus(-Infinity) // 0`
//?? [EXAMPLE] `softplus(NaN)       // NaN`
/*??
 | [EXAMPLE]
 | ```ts
 | // Neural network activation
 | const layer = [0.5, -1.2, 2.3, -0.8, 1.5]
 | const activated = layer.map(softplus)
 | // [0.974, 0.263, 2.398, 0.371, 1.702]
 | ```
 */
