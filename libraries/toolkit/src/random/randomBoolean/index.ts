/**
 * Generates a random boolean value with optional bias
 * 
 * Returns true or false randomly. By default, there's a 50% chance for each.
 * An optional probability parameter can bias the result toward true.
 * Uses Math.random() for pseudo-random generation.
 * 
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 * 
 * @param probability - Probability of returning true (0-1, default 0.5)
 * @returns Random boolean value
 * @example
 * ```typescript
 * // Fair coin flip (50/50)
 * randomBoolean()
 * // true
 * 
 * randomBoolean()
 * // false
 * 
 * // Biased toward true (70% true)
 * randomBoolean(0.7)
 * // true (more likely)
 * 
 * // Biased toward false (20% true)
 * randomBoolean(0.2)
 * // false (more likely)
 * 
 * // Always true
 * randomBoolean(1)
 * // true
 * 
 * // Always false
 * randomBoolean(0)
 * // false
 * 
 * // Simulate events
 * const criticalHit = randomBoolean(0.15) // 15% chance
 * const dodged = randomBoolean(0.3)       // 30% chance
 * 
 * // Random feature flags
 * const showNewFeature = randomBoolean(0.1) // 10% rollout
 * 
 * // A/B testing
 * const isGroupA = randomBoolean() // 50/50 split
 * 
 * // Monte Carlo simulation
 * const successes = Array.from({ length: 1000 }, 
 *   () => randomBoolean(0.6)
 * ).filter(Boolean).length
 * // ~600 successes
 * 
 * // Invalid probability uses default 0.5
 * randomBoolean(null)
 * // true or false (50/50)
 * 
 * randomBoolean(-0.5)
 * // true or false (50/50)
 * 
 * randomBoolean(1.5)
 * // true or false (50/50)
 * ```
 * @property Impure - Non-deterministic pseudo-random generation
 * @property Biasable - Optional probability parameter for weighted results
 * @property Safe - Invalid probabilities default to 0.5
 */
const randomBoolean = (
	probability: number | null | undefined = 0.5
): boolean => {
	// Validate and clamp probability to [0, 1]
	let p = probability
	if (p == null || typeof p !== 'number' || !isFinite(p)) {
		p = 0.5
	} else {
		p = Math.max(0, Math.min(1, p))
	}
	
	return Math.random() < p
}

export default randomBoolean