import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import accumulateVariance from "./index.ts"

//++ Tests for accumulateVariance function
Deno.test("accumulateVariance", async function testAccumulateVariance(t) {
	await t.step("creates accumulator function with mean", function testCreation() {
		const accumulator = accumulateVariance(10)
		assertEquals(typeof accumulator, "function")
	})

	await t.step("accumulates squared differences from mean", function testAccumulation() {
		const mean = 5
		const accumulator = accumulateVariance(mean)

		// Test single accumulation: (7 - 5)² = 4
		const result1 = accumulator(0, 7)
		assertEquals(result1, 4)

		// Test accumulation: 10 + (3 - 5)² = 10 + 4 = 14
		const result2 = accumulator(10, 3)
		assertEquals(result2, 14)
	})

	await t.step("handles values equal to mean", function testEqualToMean() {
		const accumulator = accumulateVariance(10)

		// (10 - 10)² = 0
		const result = accumulator(5, 10)
		assertEquals(result, 5)
	})

	await t.step("calculates variance for dataset", function testDatasetVariance() {
		const numbers = [2, 4, 6, 8, 10]
		const mean = 6
		const accumulator = accumulateVariance(mean)

		// Manually calculate: (2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²
		// = 16 + 4 + 0 + 4 + 16 = 40
		const totalSquaredDiff = numbers.reduce(accumulator, 0)
		assertEquals(totalSquaredDiff, 40)
	})

	await t.step("handles negative mean", function testNegativeMean() {
		const accumulator = accumulateVariance(-5)

		// (0 - (-5))² = 25
		const result = accumulator(0, 0)
		assertEquals(result, 25)
	})

	await t.step("handles decimal values", function testDecimals() {
		const accumulator = accumulateVariance(2.5)

		// (3.7 - 2.5)² = 1.2² = 1.44
		const result = accumulator(0, 3.7)
		assertEquals(result.toFixed(2), "1.44")
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFileStats/accumulateVariance/index.test.ts