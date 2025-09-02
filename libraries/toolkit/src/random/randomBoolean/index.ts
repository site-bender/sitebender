import isNullish from "../../simple/validation/isNullish/index.ts"

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
 * randomBoolean()     // true or false
 *
 * // Biased toward true (70% true)
 * randomBoolean(0.7)  // true (more likely)
 *
 * // Biased toward false (20% true)
 * randomBoolean(0.2)  // false (more likely)
 *
 * // Edge cases
 * randomBoolean(1)    // always true
 * randomBoolean(0)    // always false
 *
 * // A/B testing
 * const isGroupA = randomBoolean()  // 50/50 split
 *
 * // Monte Carlo simulation
 * const successes = Array.from({ length: 1000 },
 *   () => randomBoolean(0.6)
 * ).filter(Boolean).length  // ~600
 * ```
 * @impure
 * @safe
 */
const randomBoolean = (
	probability: number | null | undefined = 0.5,
): boolean => {
	// Validate and clamp probability to [0, 1]
	let p = probability
	if (isNullish(p) || typeof p !== "number" || !isFinite(p)) {
		p = 0.5
	} else {
		p = Math.max(0, Math.min(1, p))
	}

	return Math.random() < p
}

export default randomBoolean
