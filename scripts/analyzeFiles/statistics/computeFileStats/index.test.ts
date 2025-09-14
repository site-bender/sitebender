import {
	assertEquals,
	assertAlmostEquals,
} from "https://deno.land/std/assert/mod.ts"

import type { PerFileAnalysis } from "../../types/index.ts"

import computeFileStats from "./index.ts"

//++ Tests for computeFileStats that calculates statistical metrics for files
Deno.test("computeFileStats", async function testComputeFileStats(t) {
	await t.step("returns zeros for empty array", function testEmptyArray() {
		const result = computeFileStats([])

		assertEquals(result.longestFile.path, "<none>")
		assertEquals(result.longestFile.lines, 0)
		assertEquals(result.mean, 0)
		assertEquals(result.median, 0)
		assertEquals(result.stdDev, 0)
	})

	await t.step("calculates stats for single file", function testSingleFile() {
		const files: PerFileAnalysis[] = [
			{
				pathAbs: "/test.ts",
				pathRel: "test.ts",
				lines: 100,
				functions: []
			}
		]

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "test.ts")
		assertEquals(result.longestFile.lines, 100)
		assertEquals(result.mean, 100)
		assertEquals(result.median, 100)
		assertEquals(result.stdDev, 0)
	})

	await t.step("identifies longest file", function testLongestFile() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 50, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 75, functions: [] },
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 125, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "file3.ts")
		assertEquals(result.longestFile.lines, 125)
	})

	await t.step("calculates mean correctly", function testMean() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 10, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 20, functions: [] },
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 30, functions: [] },
			{ pathAbs: "/file4.ts", pathRel: "file4.ts", lines: 40, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.mean, 25)
	})

	await t.step("calculates median for odd number of files", function testMedianOdd() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 10, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 20, functions: [] },
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 30, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.median, 20)
	})

	await t.step("calculates median for even number of files", function testMedianEven() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 10, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 20, functions: [] },
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 30, functions: [] },
			{ pathAbs: "/file4.ts", pathRel: "file4.ts", lines: 40, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.median, 25) // Average of 20 and 30
	})

	await t.step("calculates standard deviation", function testStandardDeviation() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 20, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 40, functions: [] },
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 40, functions: [] },
			{ pathAbs: "/file4.ts", pathRel: "file4.ts", lines: 40, functions: [] },
			{ pathAbs: "/file5.ts", pathRel: "file5.ts", lines: 50, functions: [] },
			{ pathAbs: "/file6.ts", pathRel: "file6.ts", lines: 50, functions: [] },
			{ pathAbs: "/file7.ts", pathRel: "file7.ts", lines: 70, functions: [] },
			{ pathAbs: "/file8.ts", pathRel: "file8.ts", lines: 90, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.mean, 50)
		assertEquals(result.median, 45)
		assertAlmostEquals(result.stdDev, 20, 0.1)
	})

	await t.step("handles files with varying sizes", function testVaryingSizes() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/tiny.ts", pathRel: "tiny.ts", lines: 5, functions: [] },
			{ pathAbs: "/small.ts", pathRel: "small.ts", lines: 25, functions: [] },
			{ pathAbs: "/medium.ts", pathRel: "medium.ts", lines: 150, functions: [] },
			{ pathAbs: "/large.ts", pathRel: "large.ts", lines: 500, functions: [] },
			{ pathAbs: "/huge.ts", pathRel: "huge.ts", lines: 1000, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "huge.ts")
		assertEquals(result.longestFile.lines, 1000)
		assertEquals(result.mean, 336)
		assertEquals(result.median, 150)
		// Standard deviation should be high due to variance
		assertEquals(result.stdDev > 300, true)
	})

	await t.step("sorts files before calculating median", function testSortsForMedian() {
		// Files provided out of order
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file3.ts", pathRel: "file3.ts", lines: 300, functions: [] },
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 100, functions: [] },
			{ pathAbs: "/file5.ts", pathRel: "file5.ts", lines: 500, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 200, functions: [] },
			{ pathAbs: "/file4.ts", pathRel: "file4.ts", lines: 400, functions: [] },
		]

		const result = computeFileStats(files)

		// Median should be 300 (middle value when sorted)
		assertEquals(result.median, 300)
	})

	await t.step("handles edge case with two files", function testTwoFiles() {
		const files: PerFileAnalysis[] = [
			{ pathAbs: "/file1.ts", pathRel: "file1.ts", lines: 100, functions: [] },
			{ pathAbs: "/file2.ts", pathRel: "file2.ts", lines: 200, functions: [] },
		]

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "file2.ts")
		assertEquals(result.longestFile.lines, 200)
		assertEquals(result.mean, 150)
		assertEquals(result.median, 150)
		assertAlmostEquals(result.stdDev, 50, 0.1)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFileStats/index.test.ts