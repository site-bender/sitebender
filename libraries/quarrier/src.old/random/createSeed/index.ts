import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import err from "@sitebender/toolsmith/monads/result/err/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import not from "@sitebender/toolsmith/vanilla/logic/not/index.ts"

import type { GeneratorError, Seed } from "../../types/index.ts"

//++ Creates a deterministic seed for pseudorandom number generation from an integer value
export default function createSeed(
	value: number,
): Result<Seed, GeneratorError> {
	// Validate input
	if (Number.isNaN(value)) {
		return err({
			type: "InvalidSeed",
			seed: value,
			reason: "Seed cannot be NaN",
		} as GeneratorError)
	}

	if (not(Number.isFinite(value))) {
		return err({
			type: "InvalidSeed",
			seed: value,
			reason: "Seed must be finite",
		} as GeneratorError)
	}

	// Truncate floating point to integer
	const intValue = Math.trunc(value)

	// Ensure positive value for PRNG algorithm
	// Using bitwise operations to ensure 32-bit integer range
	const positiveValue = Math.abs(intValue) >>> 0

	// Create seed with empty path (root seed)
	const seed: Seed = {
		value: positiveValue || 1, // Ensure non-zero for PRNG
		path: [],
	}

	return ok(seed)
}

//?? [EXAMPLE] createSeed(12345) // Result.Ok({ value: 12345, path: [] })
//?? [EXAMPLE] createSeed(-42) // Result.Ok({ value: 42, path: [] })
//?? [EXAMPLE] createSeed(3.14159) // Result.Ok({ value: 3, path: [] })
//?? [GOTCHA] Negative numbers are converted to positive values deterministically
//?? [GOTCHA] Floating point numbers are truncated (not rounded) to integers
//?? [GOTCHA] Zero is converted to 1 to ensure proper PRNG behavior
//?? [PRO] Deterministic - same input always produces same seed
//?? [PRO] Handles edge cases gracefully (negatives, floats, zero)
//?? [CON] Limited to 32-bit unsigned integer range due to JavaScript limitations
