import type { Seed } from "../../types/index.ts"

//++ Advances a seed to the next value in the PRNG sequence using a Linear Congruential Generator
export default function advanceSeed(seed: Seed): Seed {
	//-- Using mutable calculation for LCG algorithm performance - Park & Miller constants
	// LCG formula: next = (a * seed + c) mod m
	// Using Park & Miller "minimal standard" PRNG constants
	// a = 48271, c = 0, m = 2^31 - 1 (2147483647)
	const a = 48271
	const m = 2147483647 // 2^31 - 1 (Mersenne prime)

	// Calculate next value using LCG formula
	// We use c = 0 for Park & Miller variant
	const nextValue = (a * seed.value) % m

	// Ensure result is positive and non-zero
	const positiveValue = nextValue || 1

	// Create new seed with same path (immutable)
	return {
		value: positiveValue >>> 0, // Ensure 32-bit unsigned
		path: seed.path,
	}
}

//?? [EXAMPLE] advanceSeed({ value: 12345, path: [] }) // { value: 595905335, path: [] }
//?? [EXAMPLE] advanceSeed({ value: 1, path: [] }) // { value: 48271, path: [] }
//?? [GOTCHA] Uses Park & Miller LCG algorithm - period of 2^31 - 2
//?? [GOTCHA] Zero seed will produce 1 to maintain non-zero sequence
//?? [PRO] Deterministic - same seed always produces same next value
//?? [PRO] Good statistical properties for testing purposes
//?? [PRO] Fast single multiplication and modulo operation
//?? [CON] Not cryptographically secure - predictable sequence
//?? [ADVANCED] Can be chained repeatedly to generate sequences: advanceSeed(advanceSeed(seed))
