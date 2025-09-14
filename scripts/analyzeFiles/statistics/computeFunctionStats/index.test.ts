import {
	assertEquals,
	assertAlmostEquals,
} from "https://deno.land/std/assert/mod.ts"

import type { FileFunction } from "../../types/index.ts"

import computeFunctionStats from "./index.ts"

//++ Tests for computeFunctionStats that calculates statistical metrics for functions
Deno.test("computeFunctionStats", async function testComputeFunctionStats(t) {
	await t.step("returns zeros for empty array", function testEmptyArray() {
		const result = computeFunctionStats([])

		assertEquals(result.total, 0)
		assertEquals(result.mean, 0)
		assertEquals(result.median, 0)
		assertEquals(result.stdDev, 0)
	})

	await t.step("calculates stats for single function", function testSingleFunction() {
		const functions: FileFunction[] = [
			{ name: "test", loc: 10, startLine: 1, endLine: 10 }
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.total, 1)
		assertEquals(result.mean, 10)
		assertEquals(result.median, 10)
		assertEquals(result.stdDev, 0)
	})

	await t.step("calculates mean correctly", function testMean() {
		const functions: FileFunction[] = [
			{ name: "func1", loc: 10, startLine: 1, endLine: 10 },
			{ name: "func2", loc: 20, startLine: 1, endLine: 10 },
			{ name: "func3", loc: 30, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.total, 3)
		assertEquals(result.mean, 20)
	})

	await t.step("calculates median for odd number of functions", function testMedianOdd() {
		const functions: FileFunction[] = [
			{ name: "func1", loc: 10, startLine: 1, endLine: 10 },
			{ name: "func2", loc: 20, startLine: 1, endLine: 10 },
			{ name: "func3", loc: 30, startLine: 1, endLine: 10 },
			{ name: "func4", loc: 40, startLine: 1, endLine: 10 },
			{ name: "func5", loc: 50, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.median, 30)
	})

	await t.step("calculates median for even number of functions", function testMedianEven() {
		const functions: FileFunction[] = [
			{ name: "func1", loc: 10, startLine: 1, endLine: 10 },
			{ name: "func2", loc: 20, startLine: 1, endLine: 10 },
			{ name: "func3", loc: 30, startLine: 1, endLine: 10 },
			{ name: "func4", loc: 40, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.median, 25) // Average of 20 and 30
	})

	await t.step("calculates standard deviation", function testStandardDeviation() {
		const functions: FileFunction[] = [
			{ name: "func1", loc: 2, startLine: 1, endLine: 10 },
			{ name: "func2", loc: 4, startLine: 1, endLine: 10 },
			{ name: "func3", loc: 4, startLine: 1, endLine: 10 },
			{ name: "func4", loc: 4, startLine: 1, endLine: 10 },
			{ name: "func5", loc: 5, startLine: 1, endLine: 10 },
			{ name: "func6", loc: 5, startLine: 1, endLine: 10 },
			{ name: "func7", loc: 7, startLine: 1, endLine: 10 },
			{ name: "func8", loc: 9, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.total, 8)
		assertEquals(result.mean, 5)
		assertEquals(result.median, 4.5)
		assertAlmostEquals(result.stdDev, 2, 0.1)
	})

	await t.step("handles functions with varying line counts", function testVaryingLineCounts() {
		const functions: FileFunction[] = [
			{ name: "tiny", loc: 1, startLine: 1, endLine: 1 },
			{ name: "small", loc: 5, startLine: 1, endLine: 10 },
			{ name: "medium", loc: 15, startLine: 1, endLine: 10 },
			{ name: "large", loc: 50, startLine: 1, endLine: 10 },
			{ name: "huge", loc: 100, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		assertEquals(result.total, 5)
		assertEquals(result.mean, 34.2)
		assertEquals(result.median, 15)
		// Standard deviation should be relatively high due to variance
		assertEquals(result.stdDev > 30, true)
	})

	await t.step("sorts functions before calculating median", function testSortsForMedian() {
		// Functions provided out of order
		const functions: FileFunction[] = [
			{ name: "func3", loc: 30, startLine: 1, endLine: 10 },
			{ name: "func1", loc: 10, startLine: 1, endLine: 10 },
			{ name: "func5", loc: 50, startLine: 1, endLine: 10 },
			{ name: "func2", loc: 20, startLine: 1, endLine: 10 },
			{ name: "func4", loc: 40, startLine: 1, endLine: 10 },
		]

		const result = computeFunctionStats(functions)

		// Median should be 30 (middle value when sorted)
		assertEquals(result.median, 30)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFunctionStats/index.test.ts