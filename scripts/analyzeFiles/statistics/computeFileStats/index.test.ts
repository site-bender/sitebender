import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import type { PerFileAnalysis } from "../../types/index.ts"

import computeFileStats from "./index.ts"

Deno.test("computeFileStats", async function testComputeFileStats(t) {
	await t.step("computes stats for single file", function testSingleFile() {
		const files: Array<PerFileAnalysis> = [
			{
				pathAbs: "/test/file1.ts",
				pathRel: "file1.ts",
				lines: 100,
				functions: [],
			},
		]

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "file1.ts")
		assertEquals(result.longestFile.lines, 100)
		assertEquals(result.mean, 100)
		assertEquals(result.median, 100)
		assertEquals(result.stdDev, 0)
	})

	await t.step(
		"computes stats for multiple files",
		function testMultipleFiles() {
			const files: Array<PerFileAnalysis> = [
				{
					pathAbs: "/test/file1.ts",
					pathRel: "file1.ts",
					lines: 50,
					functions: [],
				},
				{
					pathAbs: "/test/file2.ts",
					pathRel: "file2.ts",
					lines: 100,
					functions: [],
				},
				{
					pathAbs: "/test/file3.ts",
					pathRel: "file3.ts",
					lines: 150,
					functions: [],
				},
			]

			const result = computeFileStats(files)

			assertEquals(result.longestFile.path, "file3.ts")
			assertEquals(result.longestFile.lines, 150)
			assertEquals(result.mean, 100)
			assertEquals(result.median, 100)
			assertEquals(Math.round(result.stdDev), 41) // ~40.82
		},
	)

	await t.step("handles empty array", function testEmpty() {
		const files: Array<PerFileAnalysis> = []

		const result = computeFileStats(files)

		assertEquals(result.longestFile.path, "")
		assertEquals(result.longestFile.lines, 0)
		assertEquals(result.mean, 0)
		assertEquals(result.median, 0)
		assertEquals(result.stdDev, 0)
	})
})
