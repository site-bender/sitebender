import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import map from "../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import findRulesFiles from "./index.ts"

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
				const checkFileStructure = (file: any) => {
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

				map(checkFileStructure)(result)
			}
		},
	)

	await t.step("filters out non-existent files", () => {
		const result = findRulesFiles()

		// All returned files should actually exist
		const checkFileExists = (file: any) => {
			try {
				Deno.statSync(file.jsonPath)
				assertEquals(true, true) // File exists
			} catch {
				assertEquals(true, false, `File should exist: ${file.jsonPath}`)
			}
		}

		map(checkFileExists)(result)
	})

	await t.step("produces consistent paths", () => {
		const result = findRulesFiles()

		// Check that paths are consistent
		const checkPathConsistency = (file: any) => {
			// jsonPath should be path + "/index.json"
			assertEquals(file.jsonPath, `${file.path}/index.json`)

			// markdownPath should be path + "/index.md"
			assertEquals(file.markdownPath, `${file.path}/index.md`)
		}

		map(checkPathConsistency)(result)
	})
})
