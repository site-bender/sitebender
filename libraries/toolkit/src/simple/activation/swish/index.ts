import sigmoid from "../sigmoid/index.ts"

/**
 * Swish activation function (self-gated)
 * 
 * Computes f(x) = x × sigmoid(βx) where β is a trainable parameter
 * (typically 1). Swish is a smooth, non-monotonic function that has
 * shown superior performance in deep networks. When β = 1, it becomes
 * the SiLU (Sigmoid Linear Unit) function. Returns NaN for invalid inputs.
 * 
 * @curried (beta) => (x) => activated value
 * @param beta - Scaling parameter for sigmoid (typically 1)
 * @param x - Input value
 * @returns Activated value, or NaN if invalid
 * @example
 * ```typescript
 * // Standard Swish (β = 1)
 * swish(1)(0)
 * // 0 (0 × sigmoid(0) = 0 × 0.5)
 * 
 * swish(1)(1)
 * // 0.731... (1 × sigmoid(1))
 * 
 * swish(1)(2)
 * // 1.761... (2 × sigmoid(2))
 * 
 * swish(1)(-1)
 * // -0.268... (-1 × sigmoid(-1))
 * 
 * swish(1)(-2)
 * // -0.238... (-2 × sigmoid(-2))
 * 
 * // Large positive values (approaches x)
 * swish(1)(10)
 * // 9.999... (≈ 10)
 * 
 * swish(1)(100)
 * // 100 (sigmoid ≈ 1)
 * 
 * // Large negative values (approaches 0)
 * swish(1)(-10)
 * // -0.00045... (small negative)
 * 
 * swish(1)(-100)
 * // -3.72e-42 (very close to 0)
 * 
 * // Different beta values
 * swish(0.5)(2)
 * // 1.462... (smoother curve)
 * 
 * swish(2)(2)
 * // 1.964... (sharper curve)
 * 
 * swish(0.1)(5)
 * // 3.115... (very smooth)
 * 
 * // Beta = 0 gives f(x) = x/2
 * swish(0)(4)
 * // 2 (4 × 0.5)
 * 
 * // Invalid inputs
 * swish(null)(5)
 * // NaN
 * 
 * swish(1)(null)
 * // NaN
 * 
 * swish(1)("5")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Neural network layer activation
 * const inputs = [-3, -2, -1, 0, 1, 2, 3]
 * const beta = 1
 * const activated = inputs.map(swish(beta))
 * // [-0.142, -0.238, -0.268, 0, 0.731, 1.761, 2.857]
 * 
 * // Gradient for backpropagation
 * function swishGradient(beta: number, x: number): number {
 *   const sig = sigmoid(beta * x)
 *   const swishValue = x * sig
 *   return beta * swishValue + sig * (1 - beta * swishValue)
 * }
 * 
 * // Comparison with other activations
 * const x = 1.5
 * const reluOut = Math.max(0, x)  // 1.5
 * const sigmoidOut = sigmoid(x)   // 0.817...
 * const swishOut = swish(1)(x)    // 1.226...
 * // Swish is between linear and sigmoid
 * 
 * // Temperature-controlled activation
 * function temperatureSwish(temperature: number) {
 *   const beta = 1 / temperature
 *   return swish(beta)
 * }
 * const hot = temperatureSwish(2)    // β = 0.5
 * const cold = temperatureSwish(0.5) // β = 2
 * 
 * // Layer with learnable beta
 * class SwishLayer {
 *   constructor(private beta: number = 1) {}
 *   
 *   activate(inputs: number[]): number[] {
 *     return inputs.map(swish(this.beta))
 *   }
 *   
 *   updateBeta(gradient: number, lr: number) {
 *     this.beta -= gradient * lr
 *   }
 * }
 * 
 * // Smooth approximation to ReLU
 * const smoothRelu = swish(10)  // High beta ≈ ReLU
 * smoothRelu(2)   // 2 (≈ ReLU(2))
 * smoothRelu(-2)  // -1.4e-8 (≈ ReLU(-2) = 0)
 * 
 * // Partial application for fixed beta
 * const swish1 = swish(1)    // Standard
 * const swish05 = swish(0.5)  // Smoother
 * const swish2 = swish(2)     // Sharper
 * 
 * // Testing non-monotonicity
 * const testPoints = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]
 * const outputs = testPoints.map(swish(1))
 * // Notice minimum around x ≈ -1.278
 * 
 * // Bounded below, unbounded above
 * const minValue = swish(1)(-1.278)  // ≈ -0.278 (global minimum)
 * const largePos = swish(1)(1000)    // ≈ 1000 (linear for large x)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Smooth - Continuously differentiable everywhere
 */
const swish = (
	beta: number | null | undefined
) => (
	x: number | null | undefined
): number => {
	if (beta == null || typeof beta !== 'number') {
		return NaN
	}
	
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	// Swish: f(x) = x × sigmoid(βx)
	return x * sigmoid(beta * x)
}

export default swish