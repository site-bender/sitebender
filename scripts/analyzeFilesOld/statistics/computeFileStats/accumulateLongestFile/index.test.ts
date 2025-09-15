import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import type { PerFileAnalysis } from "../../../types/index.ts"

import accumulateLongestFile from "./index.ts"

//++ Tests for accumulateLongestFile function
Deno.test("accumulateLongestFile", async function testAccumulateLongestFile(t) {
	await t.step("accumulates total lines and keeps longest file", function testAccumulation() {
		const file1: PerFileAnalysis = {
			pathAbs: "/test/file1.ts",
			pathRel: "test/file1.ts",
			lines: 100,
			functions: [],
		}

		const file2: PerFileAnalysis = {
			pathAbs: "/test/file2.ts",
			pathRel: "test/file2.ts",
			lines: 150,
			functions: [],
		}

		const initial = { total: 0, longest: file1 }
		const result = accumulateLongestFile(initial, file2)

		assertEquals(result.total, 150)
		assertEquals(result.longest, file2)
	})

	await t.step("keeps existing longest when new file is shorter", function testKeepLongest() {
		const longFile: PerFileAnalysis = {
			pathAbs: "/long.ts",
			pathRel: "long.ts",
			lines: 500,
			functions: [],
		}

		const shortFile: PerFileAnalysis = {
			pathAbs: "/short.ts",
			pathRel: "short.ts",
			lines: 50,
			functions: [],
		}

		const initial = { total: 500, longest: longFile }
		const result = accumulateLongestFile(initial, shortFile)

		assertEquals(result.total, 550)
		assertEquals(result.longest, longFile)
	})

	await t.step("handles equal line counts", function testEqualLines() {
		const file1: PerFileAnalysis = {
			pathAbs: "/file1.ts",
			pathRel: "file1.ts",
			lines: 100,
			functions: [],
		}

		const file2: PerFileAnalysis = {
			pathAbs: "/file2.ts",
			pathRel: "file2.ts",
			lines: 100,
			functions: [],
		}

		const initial = { total: 100, longest: file1 }
		const result = accumulateLongestFile(initial, file2)

		assertEquals(result.total, 200)
		assertEquals(result.longest, file1) // Keeps existing when equal
	})

	await t.step("processes multiple files correctly", function testMultipleFiles() {
		const files: Array<PerFileAnalysis> = [
			{ pathAbs: "/a.ts", pathRel: "a.ts", lines: 50, functions: [] },
			{ pathAbs: "/b.ts", pathRel: "b.ts", lines: 200, functions: [] },
			{ pathAbs: "/c.ts", pathRel: "c.ts", lines: 100, functions: [] },
			{ pathAbs: "/d.ts", pathRel: "d.ts", lines: 300, functions: [] },
			{ pathAbs: "/e.ts", pathRel: "e.ts", lines: 75, functions: [] },
		]

		const result = files.reduce(
			accumulateLongestFile,
			{ total: 0, longest: files[0] }
		)

		assertEquals(result.total, 725)
		assertEquals(result.longest.lines, 300)
		assertEquals(result.longest.pathRel, "d.ts")
	})

	await t.step("handles empty files", function testEmptyFiles() {
		const emptyFile: PerFileAnalysis = {
			pathAbs: "/empty.ts",
			pathRel: "empty.ts",
			lines: 0,
			functions: [],
		}

		const nonEmptyFile: PerFileAnalysis = {
			pathAbs: "/content.ts",
			pathRel: "content.ts",
			lines: 10,
			functions: [],
		}

		const initial = { total: 10, longest: nonEmptyFile }
		const result = accumulateLongestFile(initial, emptyFile)

		assertEquals(result.total, 10)
		assertEquals(result.longest, nonEmptyFile)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/statistics/computeFileStats/accumulateLongestFile/index.test.ts