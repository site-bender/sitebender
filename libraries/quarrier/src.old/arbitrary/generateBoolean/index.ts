import type { Result } from "@sitebender/toolsmith/monads/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { GeneratorError, Seed } from "../../types/index.ts"

import advanceSeed from "../../random/advanceSeed/index.ts"

//++ Generates a deterministic boolean value from a seed
export default function generateBoolean(
	seed: Seed,
): Result<boolean, GeneratorError> {
	// Advance the seed to get next random value
	const nextSeed = advanceSeed(seed)

	// Use the least significant bit to determine boolean
	// This gives us a 50/50 distribution
	const value = (nextSeed.value & 1) === 1

	return ok(value)
}

//?? [EXAMPLE] generateBoolean({ value: 12345, path: [] }) // Result.Ok(true)
//?? [EXAMPLE] generateBoolean({ value: 12346, path: [] }) // Result.Ok(false)
//?? [EXAMPLE] generateBoolean({ value: 99999, path: [] }) // Result.Ok(true)
//?? [GOTCHA] Uses least significant bit for even distribution
//?? [PRO] Deterministic - same seed always produces same boolean
//?? [PRO] Balanced distribution - approximately 50/50 true/false
//?? [PRO] Simple and efficient - single bit check
//?? [CON] Distribution quality depends on PRNG quality
