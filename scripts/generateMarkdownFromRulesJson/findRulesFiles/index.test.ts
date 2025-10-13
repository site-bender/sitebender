import { assertEquals } from "@std/assert"

import type { RulesFile } from "../types/index.ts"

import map from "../../../libraries/toolsmith/src/array/map/index.ts"
import findRulesFiles from "./index.ts"

function checkFileStructure(file: RulesFile): void {
	assertEquals(typeof file.path, "string")
	assertEquals(typeof file.jsonPath, "string")
	assertEquals(typeof file.markdownPath, "string")

	// jsonPath should end with .json
	assertEquals(file.jsonPath.endsWith(".json"), true)

	// markdownPath should end with .md
	assertEquals(file.markdownPath.endsWith(".md"), true)

	// path should not end with index.json
	assertEquals(file.path.endsWith("/index.json"), false)
}

function checkFileExists(file: RulesFile): void {
	try {
		Deno.statSync(file.jsonPath)
		assertEquals(true, true) // File exists
	} catch {
		assertEquals(true, false, `File should exist: ${file.jsonPath}`)
	}
}

function checkPathConsistency(file: RulesFile): void {
	// jsonPath should be path + "/index.json"
	assertEquals(file.jsonPath, `${file.path}/index.json`)

	// markdownPath should be path + "/index.md"
	assertEquals(file.markdownPath, `${file.path}/index.md`)
}

//++ Tests for findRulesFiles
Deno.test("findRulesFiles", async (t) => {
	await t.step(
		"returns array of RulesFile objects with correct structure",
		() => {
			const result = findRulesFiles()

			// Should be an array
			assertEquals(Array.isArray(result), true)

			// If we find any files, check their structure
			if (result.length > 0) {
				map(checkFileStructure)(result)
			}
		},
	)

	await t.step("filters out non-existent files", () => {
		const result = findRulesFiles()

		// All returned files should actually exist
		map(checkFileExists)(result)
	})

	await t.step("produces consistent paths", () => {
		const result = findRulesFiles()

		// Check that paths are consistent
		map(checkPathConsistency)(result)
	})
})
