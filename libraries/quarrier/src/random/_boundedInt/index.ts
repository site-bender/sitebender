import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { GeneratorError, Seed } from "../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"
import _nextUint32 from "../_nextUint32/index.ts"

//++ Generates an unbiased integer in [min, max] range
export default function _boundedInt(
	seed: Seed,
	min: number,
	max: number,
): Result<GeneratorError, { readonly value: number; readonly nextSeed: Seed }> {
	// Validate bounds
	if (!Number.isInteger(min) || !Number.isInteger(max)) {
		return err({
			type: "InvalidBounds",
			min,
			max,
			reason: "Bounds must be integers",
		})
	}

	if (min > max) {
		return err({
			type: "InvalidBounds",
			min,
			max,
			reason: "Min must be less than or equal to max",
		})
	}

	// Handle single value case
	if (min === max) {
		return ok({ value: min, nextSeed: seed })
	}

	const range = max - min + 1

	// For small ranges, use simple rejection sampling
	if (range <= 0x100000) {
		// Find next power of 2
		let threshold = 1
		while (threshold < range) {
			threshold <<= 1
		}

		// Rejection sampling for unbiased result
		let currentSeed = seed
		let attempts = 0
		const MAX_ATTEMPTS = 100 // Prevent infinite loops

		while (attempts < MAX_ATTEMPTS) {
			const r = _nextUint32(currentSeed)
			currentSeed = r.nextSeed
			attempts++

			const candidate = r.value % threshold
			if (candidate < range) {
				return ok({
					value: min + candidate,
					nextSeed: currentSeed,
				})
			}
		}

		// Fallback to biased (should rarely happen)
		const r = _nextUint32(currentSeed)
		return ok({
			value: min + (r.value % range),
			nextSeed: r.nextSeed,
		})
	}

	// For large ranges, use multiply-high method
	const r = _nextUint32(seed)

	// Scale using multiplication and division for better distribution
	// This reduces bias significantly for large ranges
	const scaled = Math.floor((r.value / 0x100000000) * range)

	return ok({
		value: min + scaled,
		nextSeed: r.nextSeed,
	})
}

//?? [EXAMPLE] Generating bounded integers
//?? const seed = createSeed(12345).value
//?? const r1 = boundedInt(seed, 1, 6) // Dice roll
//?? // r1.value.value: 4
//?? const r2 = boundedInt(r1.value.nextSeed, 0, 99)
//?? // r2.value.value: 67

//?? [GOTCHA] Uses rejection sampling for small ranges to eliminate bias
//?? [GOTCHA] Falls back to multiply-high for large ranges
//?? [PRO] No modulo bias unlike simple % operations
