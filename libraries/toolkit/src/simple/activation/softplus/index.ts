import isNullish from "../../validation/isNullish/index.ts"

/**
 * SoftPlus activation function
 *
 * Computes the smooth approximation of ReLU: f(x) = ln(1 + e^x).
 * This function is differentiable everywhere, unlike ReLU which has
 * a non-differentiable point at x = 0. The output is always positive
 * and approaches x for large positive values and 0 for large negative
 * values. Returns NaN for invalid inputs.
 *
 * @param x - Input value
 * @returns ln(1 + e^x), or NaN if invalid
 * @pure
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * softplus(0)       // 0.693... (ln(2))
 * softplus(1)       // 1.313... (ln(1 + e))
 * softplus(-1)      // 0.313... (ln(1 + 1/e))
 *
 * // Approaches x for large positive values
 * softplus(10)      // 10.000045... (≈ 10)
 * softplus(100)     // 100 (approaches identity)
 *
 * // Approaches 0 for large negative values
 * softplus(-10)     // 0.0000454... (≈ 0)
 * softplus(-100)    // 3.72e-44 (approaches 0)
 *
 * // Neural network activation
 * const layer = [0.5, -1.2, 2.3, -0.8, 1.5]
 * const activated = layer.map(softplus)
 * // [0.974, 0.263, 2.398, 0.371, 1.702]
 *
 * // Edge cases
 * softplus(Infinity)  // Infinity
 * softplus(-Infinity) // 0
 * softplus(NaN)       // NaN
 * ```
 */
const softplus = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Handle special cases for numerical stability
	if (!isFinite(x)) {
		if (x === Infinity) return Infinity
		if (x === -Infinity) return 0
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
		return Math.exp(x)
	}

	// Standard computation for moderate values
	return Math.log(1 + Math.exp(x))
}

export default softplus
