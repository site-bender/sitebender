import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import type { PerFileAnalysis } from "../../types/index.ts"

import computeFunctionStats from "./index.ts"

Deno.test("computeFunctionStats", async function testComputeFunctionStats(t) {
	await t.step("computes stats for functions", function testFunctions() {
		const files: Array<PerFileAnalysis> = [
			{
				pathAbs: "/test/file1.ts",
				pathRel: "file1.ts",
				lines: 100,
				functions: [
					{ name: "func1", loc: 10, startLine: 1, endLine: 10 },
					{ name: "func2", loc: 20, startLine: 11, endLine: 30 },
				],
			},
			{
				pathAbs: "/test/file2.ts",
				pathRel: "file2.ts",
				lines: 200,
				functions: [
					{ name: "func3", loc: 30, startLine: 1, endLine: 30 },
				],
			},
		]

		const result = computeFunctionStats(files)

		assertEquals(result.total, 3)
		assertEquals(result.mean, 20)
		assertEquals(result.median, 20)
		assertEquals(Math.round(result.stdDev), 8) // ~8.16
	})

	await t.step("handles no functions", function testNoFunctions() {
		const files: Array<PerFileAnalysis> = [
			{
				pathAbs: "/test/file1.ts",
				pathRel: "file1.ts",
				lines: 100,
				functions: [],
			},
		]

		const result = computeFunctionStats(files)

		assertEquals(result.total, 0)
		assertEquals(result.mean, 0)
		assertEquals(result.median, 0)
		assertEquals(result.stdDev, 0)
	})

	await t.step("handles empty array", function testEmpty() {
		const files: Array<PerFileAnalysis> = []

		const result = computeFunctionStats(files)

		assertEquals(result.total, 0)
		assertEquals(result.mean, 0)
		assertEquals(result.median, 0)
		assertEquals(result.stdDev, 0)
	})
})
