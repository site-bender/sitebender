import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import randomBoolean from "../../../../../src/random/randomBoolean/index.ts"

Deno.test("randomBoolean - JSDoc examples (non-deterministic)", async (t) => {
	// Note: We can't test exact outputs for random functions,
	// but we can verify the behavior and types

	await t.step("fair coin flip (50/50)", () => {
		const result = randomBoolean()
		assertEquals(typeof result, "boolean")
	})

	await t.step("always true", () => {
		// With probability 1, should always be true
		for (let i = 0; i < 100; i++) {
			assertEquals(randomBoolean(1), true)
		}
	})

	await t.step("always false", () => {
		// With probability 0, should always be false
		for (let i = 0; i < 100; i++) {
			assertEquals(randomBoolean(0), false)
		}
	})

	await t.step("invalid probability uses default 0.5", () => {
		// Just verify it returns a boolean
		assertEquals(typeof randomBoolean(null), "boolean")
		assertEquals(typeof randomBoolean(-0.5), "boolean")
		assertEquals(typeof randomBoolean(1.5), "boolean")
	})
})

Deno.test("randomBoolean - statistical distribution with tolerance", () => {
	const testProbability = (
		probability: number,
		samples = 10000,
		tolerance = 0.02,
	) => {
		let trueCount = 0

		for (let i = 0; i < samples; i++) {
			if (randomBoolean(probability)) {
				trueCount++
			}
		}

		const actualProbability = trueCount / samples
		const difference = Math.abs(actualProbability - probability)

		// Check if within tolerance
		return difference <= tolerance
	}

	// Test various probabilities
	assertEquals(testProbability(0.1), true, "10% probability failed")
	assertEquals(testProbability(0.3), true, "30% probability failed")
	assertEquals(testProbability(0.5), true, "50% probability failed")
	assertEquals(testProbability(0.7), true, "70% probability failed")
	assertEquals(testProbability(0.9), true, "90% probability failed")
})

Deno.test("randomBoolean - boundary probabilities", () => {
	// Test probability 0 - should always be false
	for (let i = 0; i < 1000; i++) {
		assertEquals(randomBoolean(0), false)
	}

	// Test probability 1 - should always be true
	for (let i = 0; i < 1000; i++) {
		assertEquals(randomBoolean(1), true)
	}
})

Deno.test("randomBoolean - property: always returns boolean", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.float({ min: 0, max: 1 }),
				fc.constant(null),
				fc.constant(undefined),
				fc.float(), // Any float, including out of range
			),
			(probability) => {
				const result = randomBoolean(probability as any)
				return typeof result === "boolean"
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("randomBoolean - property: respects probability bounds", () => {
	fc.assert(
		fc.property(
			fc.float({ min: 0, max: 1, noNaN: true }),
			(probability) => {
				// Skip if not a valid probability
				if (
					!Number.isFinite(probability) || probability < 0 ||
					probability > 1
				) {
					return true // Skip invalid inputs
				}

				// Run multiple samples
				const samples = 1000
				let trueCount = 0

				for (let i = 0; i < samples; i++) {
					if (randomBoolean(probability)) {
						trueCount++
					}
				}

				const actualProbability = trueCount / samples

				// With 1000 samples, we expect to be within 5% of target
				// This accounts for random variation
				const tolerance = 0.05
				const difference = Math.abs(actualProbability - probability)

				// Special cases for extreme probabilities
				if (probability === 0) return trueCount === 0
				if (probability === 1) return trueCount === samples

				return difference <= tolerance
			},
		),
		{ numRuns: 100 }, // Fewer runs since each test does 1000 samples
	)
})

Deno.test("randomBoolean - probability clamping", () => {
	// Probabilities > 1 should be clamped to 1
	for (let i = 0; i < 100; i++) {
		assertEquals(randomBoolean(1.5), true)
		assertEquals(randomBoolean(100), true)
	}

	// Probabilities < 0 should be clamped to 0
	for (let i = 0; i < 100; i++) {
		assertEquals(randomBoolean(-0.5), false)
		assertEquals(randomBoolean(-100), false)
	}

	// Infinity and -Infinity are not finite, so they default to 0.5
	// These will return random values
	const infResult = randomBoolean(Infinity)
	assertEquals(typeof infResult, "boolean")

	const negInfResult = randomBoolean(-Infinity)
	assertEquals(typeof negInfResult, "boolean")
})

Deno.test("randomBoolean - invalid input handling", () => {
	// These should use default probability (0.5) and return boolean
	const invalidInputs = [
		NaN,
		"0.5",
		{},
		[],
		() => 0.5,
		null,
		undefined,
	]

	for (const input of invalidInputs) {
		const result = randomBoolean(input as any)
		assertEquals(typeof result, "boolean")
	}
})

Deno.test("randomBoolean - distribution independence", () => {
	// Each call should be independent
	const results: boolean[] = []

	// Generate many values with 50% probability
	for (let i = 0; i < 1000; i++) {
		results.push(randomBoolean(0.5))
	}

	// Check that we have both true and false values
	const hasTrue = results.some((r) => r === true)
	const hasFalse = results.some((r) => r === false)

	assertEquals(hasTrue, true, "Should have at least one true value")
	assertEquals(hasFalse, true, "Should have at least one false value")

	// Check for reasonable distribution (not all same)
	const trueCount = results.filter((r) => r).length
	const ratio = trueCount / results.length

	// With 1000 samples at 50%, we expect between 40% and 60%
	assertEquals(ratio > 0.4 && ratio < 0.6, true)
})

Deno.test("randomBoolean - Monte Carlo simulation verification", () => {
	// Simulate the JSDoc example
	const probability = 0.6
	const trials = 10000

	const successes = Array.from(
		{ length: trials },
		() => randomBoolean(probability),
	).filter(Boolean).length

	const expectedSuccesses = trials * probability
	const tolerance = trials * 0.02 // 2% tolerance

	const difference = Math.abs(successes - expectedSuccesses)

	assertEquals(
		difference < tolerance,
		true,
		`Expected ~${expectedSuccesses} successes, got ${successes}`,
	)
})
