import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import type { PerFileAnalysis } from "../../../types/index.ts"

import extractLineCount from "./index.ts"

//++ Tests for extractLineCount function
Deno.test("extractLineCount", async function testExtractLineCount(t) {
	await t.step("extracts line count from file analysis", function testExtraction() {
		const fileAnalysis: PerFileAnalysis = {
			pathAbs: "/test/file.ts",
			pathRel: "test/file.ts",
			lines: 42,
			functions: [],
		}

		const result = extractLineCount(fileAnalysis)

		assertEquals(result, 42)
	})

	await t.step("handles zero lines", function testZeroLines() {
		const fileAnalysis: PerFileAnalysis = {
			pathAbs: "/empty.ts",
			pathRel: "empty.ts",
			lines: 0,
			functions: [],
		}

		const result = extractLineCount(fileAnalysis)

		assertEquals(result, 0)
	})

	await t.step("handles large line counts", function testLargeCount() {
		const fileAnalysis: PerFileAnalysis = {
			pathAbs: "/large.ts",
			pathRel: "large.ts",
			lines: 10000,
			functions: [],
		}

		const result = extractLineCount(fileAnalysis)

		assertEquals(result, 10000)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFileStats/extractLineCount/index.test.ts