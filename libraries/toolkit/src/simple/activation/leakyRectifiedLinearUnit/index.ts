/**
 * Leaky Rectified Linear Unit (Leaky ReLU) activation function
 * 
 * A variant of ReLU that allows a small gradient when the input is negative,
 * preventing "dying ReLU" problem. Uses f(x) = x for x > 0 and f(x) = αx
 * for x ≤ 0, where α is the leak coefficient (typically 0.01).
 * Returns NaN for invalid inputs.
 * 
 * @curried (alpha) => (x) => activated value
 * @param alpha - Leak coefficient for negative values (typically 0.01)
 * @param x - Input value
 * @returns Activated value, or NaN if invalid
 * @example
 * ```typescript
 * // Standard Leaky ReLU (α = 0.01)
 * leakyRectifiedLinearUnit(0.01)(5)
 * // 5 (positive input unchanged)
 * 
 * leakyRectifiedLinearUnit(0.01)(-5)
 * // -0.05 (negative input × 0.01)
 * 
 * leakyRectifiedLinearUnit(0.01)(0)
 * // 0
 * 
 * // Different leak coefficients
 * leakyRectifiedLinearUnit(0.1)(-10)
 * // -1 (10% leak)
 * 
 * leakyRectifiedLinearUnit(0.2)(-5)
 * // -1 (20% leak)
 * 
 * leakyRectifiedLinearUnit(0.3)(-2)
 * // -0.6 (30% leak)
 * 
 * // Parametric ReLU (learnable α)
 * leakyRectifiedLinearUnit(0.25)(3)
 * // 3
 * 
 * leakyRectifiedLinearUnit(0.25)(-4)
 * // -1
 * 
 * // Edge cases
 * leakyRectifiedLinearUnit(0)(5)
 * // 5 (becomes standard ReLU when α = 0)
 * 
 * leakyRectifiedLinearUnit(0)(-5)
 * // 0 (standard ReLU behavior)
 * 
 * leakyRectifiedLinearUnit(1)(5)
 * // 5 (becomes identity when α = 1)
 * 
 * leakyRectifiedLinearUnit(1)(-5)
 * // -5 (identity function)
 * 
 * // Invalid inputs
 * leakyRectifiedLinearUnit(null)(5)
 * // NaN
 * 
 * leakyRectifiedLinearUnit(0.01)(null)
 * // NaN
 * 
 * leakyRectifiedLinearUnit(0.01)("5")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Neural network forward pass
 * const neurons = [-2, -1, 0, 1, 2, 3]
 * const alpha = 0.01
 * const activated = neurons.map(leakyRectifiedLinearUnit(alpha))
 * // [-0.02, -0.01, 0, 1, 2, 3]
 * 
 * // Gradient computation for backpropagation
 * function leakyReluGradient(alpha: number, x: number): number {
 *   return x > 0 ? 1 : alpha
 * }
 * 
 * // Layer activation
 * function activateLayer(
 *   inputs: number[],
 *   alpha: number = 0.01
 * ): number[] {
 *   const activate = leakyRectifiedLinearUnit(alpha)
 *   return inputs.map(activate)
 * }
 * 
 * // Comparison with standard ReLU
 * const input = -3
 * const relu = Math.max(0, input)  // 0
 * const leakyRelu = leakyRectifiedLinearUnit(0.01)(input)  // -0.03
 * // Leaky ReLU maintains gradient
 * 
 * // Different variants
 * const standardLeaky = leakyRectifiedLinearUnit(0.01)
 * const veryLeaky = leakyRectifiedLinearUnit(0.3)
 * const parametric = leakyRectifiedLinearUnit(0.25)
 * 
 * // Testing gradient flow
 * const testValues = [-10, -1, -0.1, 0, 0.1, 1, 10]
 * const gradientFlow = testValues.map(x => ({
 *   input: x,
 *   output: leakyRectifiedLinearUnit(0.01)(x),
 *   gradient: x > 0 ? 1 : 0.01
 * }))
 * 
 * // Partial application for fixed alpha
 * const leakyRelu01 = leakyRectifiedLinearUnit(0.01)
 * const leakyRelu02 = leakyRectifiedLinearUnit(0.02)
 * 
 * leakyRelu01(-100)  // -1
 * leakyRelu02(-100)  // -2
 * 
 * // Custom activation with different negative slope
 * function customActivation(negativeSlope: number) {
 *   return leakyRectifiedLinearUnit(negativeSlope)
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Continuous - No discontinuity at x=0
 */
const leakyRectifiedLinearUnit = (
	alpha: number | null | undefined
) => (
	x: number | null | undefined
): number => {
	if (alpha == null || typeof alpha !== 'number') {
		return NaN
	}
	
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	// Leaky ReLU: f(x) = x if x > 0, else α × x
	return x > 0 ? x : alpha * x
}

export default leakyRectifiedLinearUnit