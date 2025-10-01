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
