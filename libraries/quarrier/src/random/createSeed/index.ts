import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { GeneratorError, Seed } from "../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import err from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Creates a validated seed for deterministic random number generation
export default function createSeed(
	state: number,
	stream?: number,
): Result<GeneratorError, Seed> {
	// Validate state is a valid 32-bit integer
	if (!Number.isInteger(state)) {
		return err({
			type: "InvalidSeed",
			seed: state,
			reason: "State must be an integer",
		})
	}

	// Ensure state is within 32-bit range
	const normalizedState = (state >>> 0) || 1 // Ensure non-zero

	// Stream must be odd for PCG algorithm
	const normalizedStream = stream !== undefined
		? ((stream >>> 0) | 1) >>> 0 // Force odd by setting lowest bit, keep unsigned
		: 0x9E3779B9 // Golden ratio as default stream (odd)

	return ok({
		state: normalizedState,
		stream: normalizedStream,
	})
}

//?? [EXAMPLE] Creating a seed
//?? const seed1 = createSeed(12345) // ok({ state: 12345, stream: 0x9E3779B9 })
//?? const seed2 = createSeed(42, 7) // ok({ state: 42, stream: 7 })

//?? [GOTCHA] Stream is always forced to be odd (required by PCG algorithm)
//?? [GOTCHA] Zero state is coerced to 1 to avoid degenerate cycles
