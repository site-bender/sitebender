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
 * @example
 * ```typescript
 * // Positive values (approaches x for large x)
 * softplus(0)
 * // 0.693... (ln(2))
 *
 * softplus(1)
 * // 1.313... (ln(1 + e))
 *
 * softplus(2)
 * // 2.127... (approaches 2)
 *
 * softplus(5)
 * // 5.007... (very close to 5)
 *
 * softplus(10)
 * // 10.000045... (essentially 10)
 *
 * // Negative values (approaches 0)
 * softplus(-1)
 * // 0.313... (ln(1 + 1/e))
 *
 * softplus(-2)
 * // 0.127...
 *
 * softplus(-5)
 * // 0.007...
 *
 * softplus(-10)
 * // 0.0000454... (very close to 0)
 *
 * // Around zero (smooth transition)
 * softplus(-0.5)
 * // 0.474...
 *
 * softplus(0.5)
 * // 0.974...
 *
 * // Large values (numerical stability)
 * softplus(100)
 * // 100 (approaches identity for large x)
 *
 * softplus(-100)
 * // 3.72e-44 (approaches 0)
 *
 * // Invalid inputs
 * softplus(null)
 * // NaN
 *
 * softplus(undefined)
 * // NaN
 *
 * softplus("1")
 * // NaN
 *
 * softplus(NaN)
 * // NaN
 *
 * softplus(Infinity)
 * // Infinity
 *
 * softplus(-Infinity)
 * // 0
 *
 * // Comparison with ReLU
 * const relu = (x: number) => Math.max(0, x)
 * const x = -2
 * relu(x) // 0 (hard cutoff)
 * softplus(x) // 0.127 (smooth transition)
 *
 * // Derivative (sigmoid function)
 * const softplusDerivative = (x: number) => {
 *   return 1 / (1 + Math.exp(-x)) // sigmoid(x)
 * }
 * softplusDerivative(0) // 0.5
 * softplusDerivative(2) // 0.88...
 *
 * // Neural network activation
 * const layer = [0.5, -1.2, 2.3, -0.8, 1.5]
 * const activated = layer.map(softplus)
 * // [0.974, 0.263, 2.398, 0.371, 1.702]
 *
 * // Parametric softplus (β-softplus)
 * const betaSoftplus = (beta: number) => (x: number) =>
 *   (1/beta) * Math.log(1 + Math.exp(beta * x))
 * const softplus2 = betaSoftplus(2)
 * softplus2(1) // 0.663... (sharper transition)
 *
 * // Inverse softplus (softplus^-1)
 * const inverseSoftplus = (y: number) => {
 *   if (y <= 0) return NaN
 *   return Math.log(Math.exp(y) - 1)
 * }
 * inverseSoftplus(softplus(2)) // 2
 *
 * // Numerical stability for large values
 * const stableSoftplus = (x: number) => {
 *   if (x > 20) return x // Avoid overflow
 *   if (x < -20) return Math.exp(x) // Avoid underflow
 *   return Math.log(1 + Math.exp(x))
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Smooth - Differentiable everywhere
 * @property Range - Output is always positive [0, ∞)
 */
const softplus = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
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
